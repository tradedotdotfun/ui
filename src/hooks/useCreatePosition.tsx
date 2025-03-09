import { useCallback } from "react";
import { createPosition as createPositionApi } from "../api/trade";
import { useSignData } from "./useSignData";

export const useCreatePosition = () => {
  const { signData } = useSignData();
  
  const createPosition = useCallback(async (
    type: "long" | "short",
    leverage: number,
    amountInUsd: number,
    coinId: string,
  ) => {
    const signed = await signData();
    
    if (!signed) return;

    await createPositionApi(
      type,
      leverage,
      amountInUsd,
      coinId,
      signed.pubkey,
      signed.msg,
      signed.signature,
    )
  }, [signData]);

  return { createPosition };
}
