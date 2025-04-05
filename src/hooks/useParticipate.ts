import { useSolanaWallets } from "@privy-io/react-auth";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  Keypair,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID,
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
const REWARD_TOKEN_MINT = new PublicKey(CHIP_TOKEN_ADDRESS);

interface TokenAddressWithInstruction {
  address: PublicKey;
  createInstruction: TransactionInstruction | null;
}

interface ParticipateResult {
  participateRound: (roundNumber: number) => Promise<void>;
  isLoading: boolean;
  isFinished: boolean;
  error: string | null;
}

// Helper function to check if an account exists and create ATA instruction if needed
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
 * Custom hook for participating in a round of the protocol
 *
 * This hook handles all the necessary steps for participating in a round:
 * 1. Checking if user has the required reward tokens
 * 2. Creating necessary token accounts if they don't exist
 * 3. Building and sending the participation transaction
 * 4. Handling transaction confirmation and state updates
 *
 * @returns {ParticipateResult} Object containing the participate function and state variables
 */
export const useParticipate = (): ParticipateResult => {
  const [signature, setSignature] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [txConfirmed, setTxConfirmed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [program, setProgram] = useState<Program | null>(null);

  const { ready, wallets } = useSolanaWallets();
  const { refetchUserInfo } = useUser();
  const { connection } = useConnection();
  const { confirmTx, status } = useConfirmTx();

  // Initialize Anchor Program
  useEffect(() => {
    if (!connection || !ready || !wallets.length) return;

    try {
      // Create a wallet adapter compatible with Anchor
      const browserWallet: Wallet = {
        publicKey: new PublicKey(wallets[0].address),
        // @ts-expect-error - wallet.signTransaction has a different signature than Anchor expects
        signTransaction: async <T extends Transaction>(tx: T): Promise<T> => {
          return wallets[0].signTransaction(tx) as Promise<T>;
        },
        // @ts-expect-error - wallet.signAllTransactions has a different signature than Anchor expects
        signAllTransactions: async <T extends Transaction>(
          txs: T[]
        ): Promise<T[]> => {
          return wallets[0].signAllTransactions(txs) as Promise<T[]>;
        },
        payer: Keypair.generate(), // Dummy keypair, not actually used
      };

      // Create an Anchor provider with the connection and wallet
      const provider = new AnchorProvider(connection, browserWallet, {
        commitment: "processed",
      });

      // Initialize the program with the IDL and provider
      const anchorProgram = new Program(tradeDotFunIDL as Idl, provider);

      setProgram(anchorProgram);
      console.log(
        "Anchor program initialized successfully for participate hook"
      );
    } catch (err) {
      console.error("Error initializing Anchor program:", err);
      setError("Failed to initialize Anchor program");
    }
  }, [connection]);

  const resetStates = () => {
    setIsLoading(true);
    setIsFinished(false);
    setTxConfirmed(false);
    setError(null);
  };

  // Main function to participate in a round
  const participateRound = useCallback(
    async (roundNumber: number = 1) => {
      resetStates();
      const wallet = wallets[0];

      if (!ready || !wallet || !connection || !program) {
        setError("Wallet, connection, or program not ready");
        setIsLoading(false);
        return;
      }

      try {
        const roundNumberBN = new BN(roundNumber);

        // Step 1: Derive necessary Program Derived Addresses (PDAs)
        const [roundPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("round"), roundNumberBN.toArrayLike(Buffer, "le", 8)],
          PROGRAM_ID
        );

        console.log(`Round PDA: ${roundPDA.toString()}`);

        // Step 2: Get user reward token account and check if it exists
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

        // Step 3: Get round's reward token account (will be created if needed)
        const roundRewardTokenAccount = await getAssociatedTokenAddress(
          REWARD_TOKEN_MINT,
          roundPDA,
          true // Allow owner off curve (for PDAs)
        );

        console.log(
          `Round Reward Token Account: ${roundRewardTokenAccount.toString()}`
        );

        // Collection of instructions
        const instructions: TransactionInstruction[] = [];

        // Add token account creation instruction if needed
        if (createUserRewardTokenAccountIx) {
          instructions.push(createUserRewardTokenAccountIx);
        }

        // Step 4: Create participate round instruction using Anchor
        const participateIx = await program.methods
          .participateRound(roundNumberBN)
          .accounts({
            user: new PublicKey(wallet.address),
            round: roundPDA,
            rewardMint: REWARD_TOKEN_MINT,
            userRewardTokenAccount: userRewardTokenAccount,
            roundRewardTokenAccount: roundRewardTokenAccount,
            rewardMintProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          })
          .instruction();

        // Add participate instruction
        instructions.push(participateIx);

        // Step 5: Create and send the transaction
        const transaction = new Transaction();
        transaction.add(...instructions);
        transaction.recentBlockhash = (
          await connection.getLatestBlockhash()
        ).blockhash;
        transaction.feePayer = new PublicKey(wallet.address);

        // Optional: simulate transaction first for debugging
        try {
          const simulation = await connection.simulateTransaction(transaction);
          console.log("Simulation result:", simulation);
        } catch (simError) {
          console.error("Simulation error:", simError);
          // Continue anyway as this is just for debugging
        }

        const signature = await wallet.sendTransaction(transaction, connection);
        setSignature(signature);
        console.log(`Participation transaction sent! Signature: ${signature}`);
      } catch (error: unknown) {
        console.error("Error in participateRound:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        setError(`Transaction failed: ${errorMessage}`);
        setIsLoading(false);
      }
    },
    [ready, wallets, connection, program]
  );

  // Handle transaction confirmation
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
          if (count >= 3) {
            clearInterval(interval);
            setIsLoading(false);
            setIsFinished(true);
          }
        }, 1500);
      }, 3000); // Start after 3 seconds

      // Clean up timeout if the component is unmounted or txConfirmed changes
      return () => clearTimeout(timeout);
    }
  }, [txConfirmed, refetchUserInfo]);

  return { participateRound, isLoading, isFinished, error };
};
