import { Connection, clusterApiUrl } from '@solana/web3.js';

export const useConfirmTx = () => {
  const confirmTx = async (signature: string) => {
    const connection = new Connection(clusterApiUrl('devnet'));
    const latestBlockhash = await connection.getLatestBlockhash();
    
    const confirmation = await connection.confirmTransaction({
      signature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
    });

    if (confirmation.value.err) {
      throw new Error('Transaction failed');
    }

    return true;
  };

  return { confirmTx };
};
