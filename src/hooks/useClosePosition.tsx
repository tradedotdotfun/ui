import { useCallback } from "react";

import { closePosition as closePositionApi } from "../api/trade";
import { useToast } from "../providers/ToastProvider";

import { useSignData } from "./useSignData";

export const useClosePosition = () => {
  const { signData } = useSignData();
  const { showToast } = useToast();
  
  const closePosition = useCallback(async (
    positionId: string,
    percentage: number,
  ) => {
    const signed = await signData();
    
    if (!signed) return;

    try {
      const result = await closePositionApi(
        positionId,
        percentage,
        signed.pubkey,
        signed.msg,
        signed.signature,
      );
      
      showToast(
        'success', 
        'Position Closed!', 
        ['Position closed successfully.']
      );
      
      return result;
    } catch (error) {
      console.error("Transaction failed:", error);
      showToast(
        'error', 
        'Failed to Close Position',
        ['Something went wrong.', 
        'Please try again.']
      );
      throw error;
    }
  }, [signData, showToast]);

  return { closePosition };
}
