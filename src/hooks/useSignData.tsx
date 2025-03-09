import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";

const uint8ArrayToBase64 = (arr: Uint8Array): string => {
  return btoa(String.fromCharCode(...arr));
};

export const useSignData = () => {
  const { wallet, signIn, publicKey, signMessage } = useWallet();

  const signingMsg = "sign in tradedot.fun:1841263854";

  const signData = useCallback(async () => {
    console.log(wallet, publicKey, signMessage);
    if (wallet === null) {
      return;
    }
    if (publicKey === null || !signMessage) {
      signIn && signIn();
      return;
    }

    const signature = await signMessage(Buffer.from(signingMsg));

    return {
      pubkey: publicKey.toBase58(),
      msg: signingMsg,
      signature: uint8ArrayToBase64(signature),
    };

  }, [wallet, signingMsg]);

  return { signData };
}
