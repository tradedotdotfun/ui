import { useCallback, } from 'react';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { useSolanaWallets } from '@privy-io/react-auth';


const PROGRAM_ID = new PublicKey("CoFf4ZpbTJRoPxdJ64JvMn4pVR1wjhvARc8ed91i9i37");

export const useDepositSol = () => {
  const { ready, wallets } = useSolanaWallets();

  const depositSol = useCallback(async () => {
    const wallet = wallets[0];

    if (!ready || !wallet) return;

    let connection = new Connection(clusterApiUrl('devnet'));

    let transaction = new Transaction();

    // PDA 주소 계산
    const [vaultPDA] = await PublicKey.findProgramAddressSync(
      [Buffer.from("vault")],
      PROGRAM_ID
    );
    const [vaultDataPDA] = await PublicKey.findProgramAddressSync(
      [Buffer.from("vault_data")],
      PROGRAM_ID
    );

    const instructionData = Buffer.from([
      108,
      81,
      78,
      117,
      125,
      155,
      56,
      200
    ]);

    const instruction = new TransactionInstruction({
      programId: PROGRAM_ID,
      keys: [
        { pubkey: new PublicKey(wallet.address), isSigner: true, isWritable: true },
        { pubkey: vaultPDA, isSigner: false, isWritable: true },
        { pubkey: vaultDataPDA, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      data: instructionData,
    });

    transaction.add(instruction);
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.feePayer = new PublicKey(wallet.address);

    const signature = await wallet.sendTransaction(transaction, connection);

    return signature;

  }, [ready, wallets]);

  return { depositSol };
}
