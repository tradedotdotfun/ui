import { Connection } from '@solana/web3.js';
import { useState, useCallback, useEffect } from 'react';

type ConfirmationStatus = 'idle' | 'loading' | 'success' | 'error';

export const useConfirmTx = () => {
  const [status, setStatus] = useState<ConfirmationStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [currentSignature, setCurrentSignature] = useState<string | null>(null);

  const resetState = useCallback(() => {
    setStatus('idle');
    setError(null);
    setAttempts(0);
    setCurrentSignature(null);
  }, []);

  const confirmTx = useCallback((signature: string) => {
    // Reset previous state if there was any
    resetState();
    
    // Set loading state and signature
    setStatus('loading');
    setCurrentSignature(signature);
    
    // This will trigger the useEffect below
  }, [resetState]);

  useEffect(() => {
    if (status !== 'loading' || !currentSignature) return;

    const connection = new Connection("https://api.testnet.sonic.game/");
    let timeoutId: NodeJS.Timeout;

    const checkTransaction = async () => {
      try {
        const latestBlockhash = await connection.getLatestBlockhash();
        const confirmation = await connection.confirmTransaction({
          signature: currentSignature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
        });

        if (!confirmation.value.err) {
          setStatus('success');
          return;
        }

        // Transaction failed on blockchain
        throw new Error('Transaction failed on blockchain');
      } catch (err) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 5) {
          setStatus('error');
          setError(err instanceof Error ? err.message : 'Transaction confirmation failed');
        } else {
          // Schedule next attempt in 1 second
          timeoutId = setTimeout(checkTransaction, 1000);
        }
      }
    };

    // Start checking immediately
    checkTransaction();

    // Cleanup timeout on unmount or status change
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [status, currentSignature, attempts]);

  return {
    confirmTx,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    error,
    attempts,
    reset: resetState
  };
};
