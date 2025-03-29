import { useSolanaWallets } from "@privy-io/react-auth";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useCallback } from "react";

const PROGRAM_ID = new PublicKey(
  "AFDcYebrecmbqxNNQa3jht8LkSjUDgCT5T3bV2ncagHG"
);

export const useDepositSol = () => {
  const { ready, wallets } = useSolanaWallets();

  const depositSol = useCallback(async () => {
    const wallet = wallets[0];

    if (!ready || !wallet) return;

    const connection = new Connection("https://api.testnet.sonic.game/");

    const transaction = new Transaction();

    // PDA 주소 계산
    const [vaultPDA] = await PublicKey.findProgramAddressSync(
      [Buffer.from("vault")],
      PROGRAM_ID
    );
    const [vaultDataPDA] = await PublicKey.findProgramAddressSync(
      [Buffer.from("vault_data")],
      PROGRAM_ID
    );

    const instructionData = Buffer.from([108, 81, 78, 117, 125, 155, 56, 200]);

    const instruction = new TransactionInstruction({
      programId: PROGRAM_ID,
      keys: [
        {
          pubkey: new PublicKey(wallet.address),
          isSigner: true,
          isWritable: true,
        },
        { pubkey: vaultPDA, isSigner: false, isWritable: true },
        { pubkey: vaultDataPDA, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      data: instructionData,
    });

    transaction.add(instruction);
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.feePayer = new PublicKey(wallet.address);

    const signature = await wallet.sendTransaction(transaction, connection);

    return signature;
  }, [ready, wallets]);

  return { depositSol };
};
