import { useSolanaWallets } from "@privy-io/react-auth";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";

import { useConfirmTx } from "./useConfirmTx";
import { useConnection } from "./useConnection";
import { useUser } from "./useUser";

const PROGRAM_ID = new PublicKey(
  "AFDcYebrecmbqxNNQa3jht8LkSjUDgCT5T3bV2ncagHG"
);

export const useDepositSol = () => {
  const [signature, setSignature] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [txConfirmed, setTxConfirmed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const { ready, wallets } = useSolanaWallets();
  const { userInfo, refetchUserInfo } = useUser();
  const { connection } = useConnection();
  const { confirmTx, status } = useConfirmTx();

  const resetStates = () => {
    setIsLoading(true);
    setIsFinished(false);
    setTxConfirmed(false);
  };

  const depositSol = useCallback(async () => {
    resetStates();
    const wallet = wallets[0];

    if (!ready || !wallet || !connection) return;

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
    setSignature(signature);
  }, [ready, wallets, connection]);

  useEffect(() => {
    if (signature) {
      confirmTx(signature);
    }
  }, [signature]);

  useEffect(() => {
    if (status === "success") {
      return setTxConfirmed(true);
    }
    if (status === "error") {
      setIsLoading(false);
      return setIsFinished(true);
    }
  }, [status]);

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
  }, [txConfirmed]);

  useEffect(() => {
    if (userInfo && userInfo.availableUSD === 10000) {
      setIsLoading(false);
      setIsFinished(true);
    }
  }, [userInfo]);

  return { depositSol, isLoading, isFinished };
};
