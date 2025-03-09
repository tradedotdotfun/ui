import { useCallback } from "react";
import { closePosition as closePositionApi } from "../api/trade";
import { useSignData } from "./useSignData";

export const useClosePosition = () => {
  const { signData } = useSignData();
  
  const closePosition = useCallback(async (
    positionId: string,
    percentage: number,
  ) => {
    const signed = await signData();
    
    if (!signed) return;

    await closePositionApi(
      positionId,
      percentage,
      signed.pubkey,
      signed.msg,
      signed.signature,
    )
  }, [signData]);

  return { closePosition };
}
