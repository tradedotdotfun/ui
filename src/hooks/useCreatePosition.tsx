import { useCallback } from "react";
import { createPosition as createPositionApi } from "../api/trade";
import { useSignData } from "./useSignData";
import { useToast } from "../components/ToastProvider";

export const useCreatePosition = () => {
  const { signData } = useSignData();
  const { showToast } = useToast();
  
  const createPosition = useCallback(async (
    type: "long" | "short",
    leverage: number,
    amountInUsd: number,
    coinId: string,
  ) => {
    const signed = await signData();
    
    if (!signed) return;

    try {
      const result = await createPositionApi(
        type,
        leverage,
        amountInUsd,
        coinId,
        signed.pubkey,
        signed.msg,
        signed.signature,
      );
      
      showToast(
        'success', 
        'Position Created!', 
        ['Funds sent!', 
        'Happy trading!']
      );
      
      return result;
    } catch (error) {
      console.error("Transaction failed:", error);
      showToast(
        'error', 
        'Failed to Create Position',
        ['Something went wrong.', 
        'Please try again.']
      );
      throw error;
    }
  }, [signData, showToast]);

  return { createPosition };
}
