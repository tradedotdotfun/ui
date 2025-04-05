import { useSolanaWallets } from "@privy-io/react-auth";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  VersionedTransaction,
  TransactionMessage,
  LAMPORTS_PER_SOL,
  AddressLookupTableAccount,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createSyncNativeInstruction,
} from "@solana/spl-token";
import { useCallback, useEffect, useState } from "react";
import BN from "bn.js";
import { Program, AnchorProvider, Idl, Wallet } from "@coral-xyz/anchor";

import { useConfirmTx } from "./useConfirmTx";
import { useConnection } from "./useConnection";
import { useUser } from "./useUser";
import { TRADE_DOT_FUN_ID, CHIP_TOKEN_ADDRESS } from "../constants";
import tradeDotFunIDL from "./trade_dot_fun.json";

// Program and token constants
const PROGRAM_ID = new PublicKey(TRADE_DOT_FUN_ID);
const JUPITER_PROGRAM_ID = new PublicKey(
  "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
);
const SOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");
const INF_MINT = new PublicKey("5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm");
const REWARD_TOKEN_MINT = new PublicKey(CHIP_TOKEN_ADDRESS);
const API_ENDPOINT = "https://quote-api.jup.ag/v6";

// Define types for Jupiter API responses
interface QuoteResponse {
  inputMint: string;
  outputMint: string;
  amount: number;
  otherAmountThreshold: number;
  // Add other fields as needed
}

interface SwapInstructionAccount {
  pubkey: string;
  isSigner: boolean;
  isWritable: boolean;
}

interface SwapInstruction {
  programId: string;
  accounts: SwapInstructionAccount[];
  data: string;
}

interface SwapInstructionsResponse {
  error?: string;
  computeBudgetInstructions: SwapInstruction[];
  swapInstruction: SwapInstruction;
  addressLookupTableAddresses: string[];
}

interface TokenAddressWithInstruction {
  address: PublicKey;
  createInstruction: TransactionInstruction | null;
}

interface DepositSolResult {
  depositSol: (amountSOL?: number, roundNumber?: number) => Promise<void>;
  isLoading: boolean;
  isFinished: boolean;
  error: string | null;
}

// Helper functions for Jupiter API
const getQuote = async (
  fromMint: PublicKey,
  toMint: PublicKey,
  amount: number
): Promise<QuoteResponse> => {
  return fetch(
    `${API_ENDPOINT}/quote?outputMint=${toMint.toBase58()}&inputMint=${fromMint.toBase58()}&amount=${amount}&slippage=0.5&onlyDirectRoutes=true&excludeDexes=ORCA,OPENBOOK&maxAccounts=20`
  ).then((response) => response.json());
};

const getSwapInstructions = async (
  user: PublicKey,
  inputTokenAccount: PublicKey,
  outputTokenAccount: PublicKey,
  quote: QuoteResponse
): Promise<SwapInstructionsResponse> => {
  const data = {
    quoteResponse: quote,
    userPublicKey: user.toBase58(),
    sourceTokenAccount: inputTokenAccount.toBase58(),
    destinationTokenAccount: outputTokenAccount.toBase58(),
    useSharedAccounts: true,
    config: {
      skipUserAccountsRpcCalls: true,
      wrapAndUnwrapSol: false,
      dynamicComputeUnitLimit: true,
      strictTokenAccounts: true,
      dynamicSlippage: {
        minBps: 50,
        maxBps: 1000,
      },
    },
  };

  return fetch(`${API_ENDPOINT}/swap-instructions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

const instructionDataToTransactionInstruction = (
  instruction: SwapInstruction
): TransactionInstruction => {
  return new TransactionInstruction({
    programId: new PublicKey(instruction.programId),
    keys: instruction.accounts.map((key) => ({
      pubkey: new PublicKey(key.pubkey),
      isSigner: key.isSigner,
      isWritable: key.isWritable,
    })),
    data: Buffer.from(instruction.data, "base64"),
  });
};

const getAssociatedTokenAddressWithInstruction = async (
  mint: PublicKey,
  owner: PublicKey
): Promise<TokenAddressWithInstruction> => {
  const address = await getAssociatedTokenAddress(mint, owner, true);
  let createInstruction = null;

  // Check if the token account exists
  try {
    // This will throw if the account doesn't exist
    const response = await fetch(import.meta.env.VITE_RPC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getAccountInfo",
        params: [
          address.toBase58(),
          {
            encoding: "jsonParsed",
          },
        ],
      }),
    });

    const data = await response.json();
    if (!data.result.value) {
      createInstruction = createAssociatedTokenAccountInstruction(
        owner,
        address,
        owner,
        mint
      );
    }
  } catch (e) {
    console.error("Error in getAssociatedTokenAddressWithInstruction:", e);
    // If there's an error, assume the account doesn't exist
    createInstruction = createAssociatedTokenAccountInstruction(
      owner,
      address,
      owner,
      mint
    );
  }

  return { address, createInstruction };
};

/**
 * Custom hook for depositing SOL into the Solana program and swapping to INF token
 *
 * This hook handles all the necessary steps for depositing SOL to the protocol:
 * 1. Creating necessary token accounts if they don't exist
 * 2. Wrapping SOL to WSOL
 * 3. Getting a swap quote from Jupiter
 * 4. Building and sending the transaction with all required instructions
 * 5. Handling transaction confirmation and state updates
 *
 * @returns {DepositSolResult} Object containing the deposit function and state variables
 */
export const useDepositSol = (): DepositSolResult => {
  const [signature, setSignature] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [txConfirmed, setTxConfirmed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [program, setProgram] = useState<Program | null>(null);

  const { ready, wallets } = useSolanaWallets();
  const { userInfo, refetchUserInfo } = useUser();
  const { connection } = useConnection();
  const { confirmTx, status } = useConfirmTx();

  // Initialize Anchor Program
  useEffect(() => {
    console.log("useEffect", connection, ready, wallets.length);
    if (!connection || !ready || !wallets.length) return;

    try {
      // Create a wallet adapter compatible with Anchor
      const browserWallet: Wallet = {
        publicKey: new PublicKey(wallets[0].address),
        // @ts-ignore
        signTransaction: async <T extends Transaction>(tx: T): Promise<T> => {
          return wallets[0].signTransaction(tx) as Promise<T>;
        },
        // @ts-ignore
        signAllTransactions: async <T extends Transaction>(
          txs: T[]
        ): Promise<T[]> => {
          return wallets[0].signAllTransactions(txs) as Promise<T[]>;
        },
        payer: null as any, // Not used in browser
      };

      // Create an Anchor provider with the connection and wallet
      const provider = new AnchorProvider(connection, browserWallet, {
        commitment: "processed",
      });

      // Initialize the program with the IDL and provider
      const anchorProgram = new Program(tradeDotFunIDL as Idl, provider);

      setProgram(anchorProgram);
      console.log("Anchor program initialized successfully");
    } catch (err) {
      console.error("Error initializing Anchor program:", err);
      setError("Failed to initialize Anchor program");
    }
  }, [connection, ready]);

  const resetStates = () => {
    setIsLoading(true);
    setIsFinished(false);
    setTxConfirmed(false);
    setError(null);
  };

  // Main function to deposit SOL and swap to INF token
  const depositSol = useCallback(
    async (amountSOL: number = 0.001, roundNumber: number = 1) => {
      console.log("depositSol", amountSOL, roundNumber);
      resetStates();
      const wallet = wallets[0];

      console.log("wallet", wallet);
      console.log("ready", ready);
      console.log("connection", connection);
      console.log("program", program);

      if (!ready || !wallet || !connection || !program) {
        setError("Wallet, connection, or program not ready");
        setIsLoading(false);
        return;
      }
      console.log("ready", ready);

      try {
        // Convert SOL to lamports
        const amountLamports = amountSOL * LAMPORTS_PER_SOL;
        const roundNumberBN = new BN(roundNumber);

        console.log("amountLamports", amountLamports);
        // Step 1: Derive all Program Derived Addresses (PDAs)
        const [vaultDataPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("vault_data")],
          PROGRAM_ID
        );

        const [vaultAuthority] = PublicKey.findProgramAddressSync(
          [Buffer.from("vault_authority")],
          PROGRAM_ID
        );

        const [roundPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("round"), roundNumberBN.toArrayLike(Buffer, "le", 8)],
          PROGRAM_ID
        );

        const [userDataPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("user_data"), new PublicKey(wallet.address).toBuffer()],
          PROGRAM_ID
        );

        console.log(`Round PDA: ${roundPDA.toString()}`);
        console.log(`User Data PDA: ${userDataPDA.toString()}`);
        console.log(`Vault Data PDA: ${vaultDataPDA.toString()}`);
        console.log(`Vault Authority: ${vaultAuthority.toString()}`);

        // Step 2: Get token accounts and creation instructions if needed
        // Get input token account (WSOL)
        const {
          address: userInputTokenATA,
          createInstruction: createInputTokenATAIx,
        } = await getAssociatedTokenAddressWithInstruction(
          SOL_MINT,
          new PublicKey(wallet.address)
        );

        console.log(`WSOL account: ${userInputTokenATA.toString()}`);

        // Get output token account (INF for vault)
        const vaultOutputTokenAddress = await getAssociatedTokenAddress(
          INF_MINT,
          vaultAuthority,
          true // Allow owner off curve (for PDAs)
        );

        console.log(
          `Vault Output account: ${vaultOutputTokenAddress.toString()}`
        );

        // Get user reward token account and creation instruction if needed
        const {
          address: userRewardTokenAccount,
          createInstruction: createUserRewardTokenAccountIx,
        } = await getAssociatedTokenAddressWithInstruction(
          REWARD_TOKEN_MINT,
          new PublicKey(wallet.address)
        );

        console.log(
          `User Reward Token Account: ${userRewardTokenAccount.toString()}`
        );

        // Collection of ATA creation instructions
        const ataCreationInstructions: TransactionInstruction[] = [];

        // Add token account creation instructions if needed
        if (createInputTokenATAIx) {
          ataCreationInstructions.push(createInputTokenATAIx);
        }

        if (createUserRewardTokenAccountIx) {
          ataCreationInstructions.push(createUserRewardTokenAccountIx);
        }

        // Step 3: Get Jupiter quote and swap instructions
        const quote = await getQuote(SOL_MINT, INF_MINT, amountLamports);

        const jupResponse = await getSwapInstructions(
          new PublicKey(wallet.address),
          userInputTokenATA,
          vaultOutputTokenAddress,
          quote
        );

        if ("error" in jupResponse) {
          setError(`Jupiter API error: ${jupResponse.error}`);
          setIsLoading(false);
          return;
        }

        const {
          computeBudgetInstructions,
          swapInstruction: swapInstructionPayload,
          addressLookupTableAddresses,
        } = jupResponse;

        // Convert Jupiter instructions to TransactionInstructions
        const computeBudgetIxs = computeBudgetInstructions.map(
          instructionDataToTransactionInstruction
        );

        // Get the swap instruction
        const swapIx = instructionDataToTransactionInstruction(
          swapInstructionPayload
        );

        // Step 4: Modify the accounts for the swap instruction to handle vault authority
        const modifiedSwapAccounts = swapIx.keys.map((account) => {
          // Keep the user as signer
          if (account.pubkey.equals(new PublicKey(wallet.address))) {
            return account;
          }

          // If it's a vault-related account, make sure it's not a signer
          if (
            account.pubkey.equals(vaultAuthority) ||
            account.pubkey.equals(vaultDataPDA) ||
            account.pubkey.equals(vaultOutputTokenAddress)
          ) {
            return { ...account, isSigner: false };
          }

          // Default handling for other accounts
          return { ...account, isSigner: false };
        });

        // Check if user's WSOL account exists
        const userInputTokenAccount = await connection.getAccountInfo(
          userInputTokenATA
        );

        // Step 5: Create SOL transfer and wrap instructions
        // Create wrap instruction (transfer SOL to WSOL account)
        const wrapIx = SystemProgram.transfer({
          fromPubkey: new PublicKey(wallet.address),
          toPubkey: userInputTokenATA,
          lamports: amountLamports,
        });

        // Create sync native instruction to update token account
        const syncNativeIx = createSyncNativeInstruction(userInputTokenATA);

        // Step 6: Check if user_data account exists
        const userDataAccount = await connection.getAccountInfo(userDataPDA);

        // Build instructions array
        let instructions: TransactionInstruction[] = [];

        // Step 7: Create initializeUserData instruction using Anchor if needed
        if (!userDataAccount) {
          const initializeUserDataIx = await program.methods
            .initializeUserData()
            .accounts({
              user: new PublicKey(wallet.address),
              userData: userDataPDA,
              systemProgram: SystemProgram.programId,
            })
            .instruction();

          instructions.push(initializeUserDataIx);
        }

        // Add ATA creation instructions if needed
        if (ataCreationInstructions.length > 0) {
          instructions = [...instructions, ...ataCreationInstructions];
        }

        // Add compute budget, wrap, sync instructions
        instructions = [...instructions, ...computeBudgetIxs, wrapIx];

        // Only add sync native if we confirmed the account exists or we're creating it
        if (userInputTokenAccount || createInputTokenATAIx) {
          instructions.push(syncNativeIx);
        }

        // Step 8: Create deposit instruction using Anchor
        const depositIx = await program.methods
          .depositSol(roundNumberBN, swapIx.data)
          .accounts({
            user: new PublicKey(wallet.address),
            inputMint: SOL_MINT,
            inputMintProgram: TOKEN_PROGRAM_ID,
            outputMint: INF_MINT,
            outputMintProgram: TOKEN_PROGRAM_ID,
            userInputTokenAccount: userInputTokenATA,
            vaultTokenAccount: vaultOutputTokenAddress,
            vaultAuthority: vaultAuthority,
            jupiterProgram: JUPITER_PROGRAM_ID,
            rewardMint: REWARD_TOKEN_MINT,
            userRewardTokenAccount: userRewardTokenAccount,
            rewardMintProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            userData: userDataPDA,
            vaultData: vaultDataPDA,
            round: roundPDA,
          })
          .remainingAccounts(modifiedSwapAccounts)
          .instruction();

        // Add deposit instruction
        instructions.push(depositIx);

        // Step 9: Create and send the transaction
        // For versioned transaction with lookup tables
        if (
          addressLookupTableAddresses &&
          addressLookupTableAddresses.length > 0
        ) {
          // Get address lookup tables
          const addressLookupTableAccounts = await Promise.all(
            addressLookupTableAddresses.map((address: string) =>
              connection
                .getAddressLookupTable(new PublicKey(address))
                .then((res) => res.value)
            )
          ).then((accounts) =>
            accounts.filter(
              (account): account is AddressLookupTableAccount =>
                account !== null
            )
          );

          // Create versioned transaction
          const messageV0 = new TransactionMessage({
            payerKey: new PublicKey(wallet.address),
            recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
            instructions,
          }).compileToV0Message(addressLookupTableAccounts);

          const transaction = new VersionedTransaction(messageV0);

          // Optional: simulate transaction first
          try {
            const simulation = await connection.simulateTransaction(
              transaction
            );
            console.log("Simulation result:", simulation);
          } catch (simError) {
            console.error("Simulation error:", simError);
            // Continue anyway as this is just for debugging
          }

          const signature = await wallet.sendTransaction(
            transaction,
            connection
          );
          setSignature(signature);
        } else {
          // Use legacy transaction
          const transaction = new Transaction();
          transaction.add(...instructions);
          transaction.recentBlockhash = (
            await connection.getLatestBlockhash()
          ).blockhash;
          transaction.feePayer = new PublicKey(wallet.address);

          const signature = await wallet.sendTransaction(
            transaction,
            connection
          );
          setSignature(signature);
        }
      } catch (error: unknown) {
        console.error("Error in depositSol:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        setError(`Transaction failed: ${errorMessage}`);
        setIsLoading(false);
      }
    },
    [ready, wallets, connection, program]
  );

  // Step 10: Handle transaction confirmation
  useEffect(() => {
    if (signature) {
      confirmTx(signature);
    }
  }, [signature, confirmTx]);

  // Update state based on transaction confirmation status
  useEffect(() => {
    if (status === "success") {
      setTxConfirmed(true);
    }
    if (status === "error") {
      setError("Transaction failed to confirm");
      setIsLoading(false);
      setIsFinished(true);
    }
  }, [status]);

  // Refresh user info after transaction confirmation
  useEffect(() => {
    if (txConfirmed) {
      // Set a timeout to delay the start of the interval
      const timeout = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          refetchUserInfo();
          count++;
          if (count >= 5) {
            clearInterval(interval);
            setIsLoading(false);
            setIsFinished(true);
          }
        }, 1500);
      }, 5000); // Start after 5 seconds

      // Clean up timeout if the component is unmounted or txConfirmed changes
      return () => clearTimeout(timeout);
    }
  }, [txConfirmed, refetchUserInfo]);

  // Auto-finish when we detect user has 10000 USD available
  useEffect(() => {
    if (userInfo && userInfo.availableUSD === 10000) {
      setIsLoading(false);
      setIsFinished(true);
    }
  }, [userInfo]);

  return { depositSol, isLoading, isFinished, error };
};
