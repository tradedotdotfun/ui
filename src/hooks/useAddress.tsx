import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

export const useAddress = () => {
  const [address, setAddress] = useState<string>("");
  const { ready, authenticated } = usePrivy();
  const { wallets } = useSolanaWallets();

  useEffect(() => {
    if (ready && authenticated && wallets.length > 0) {
      setAddress(wallets[0].address);
    } else {
      setAddress("");
    }
  }, [ready, authenticated, wallets]);

  return { address };
};
