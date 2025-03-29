import { useSolanaWallets } from "@privy-io/react-auth";
import { useCallback } from "react";

const uint8ArrayToBase64 = (arr: Uint8Array): string => {
  return btoa(String.fromCharCode(...arr));
};

export const useSignData = () => {
  const { wallets } = useSolanaWallets();

  const signingMsg = "sign in tradedot.fun:1841263854";

  const signData = useCallback(async () => {
    if (wallets.length === 0) {
      return;
    }
    const wallet = wallets[0];

    const signature = await wallet.signMessage(Buffer.from(signingMsg));

    return {
      pubkey: wallet.address,
      msg: signingMsg,
      signature: uint8ArrayToBase64(signature),
    };
  }, [wallets, signingMsg]);

  return { signData };
};
