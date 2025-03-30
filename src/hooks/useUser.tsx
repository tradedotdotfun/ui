import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { fetchUser } from "../api/user";
import { UserStatus } from "../types/users";

export const useUserInfo = (address: string) => {
  return useQuery({
    queryKey: ["user", { round: 0, address }],
    queryFn: () => fetchUser({ round: 0, address }),
    staleTime: 0, // Never stale
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
    enabled: !!address, // Only fetch when address is present
  });
};

export const useUser = () => {
  const { ready, authenticated, login } = usePrivy();
  const { wallets, createWallet } = useSolanaWallets();
  const [address, setAddress] = useState<string>("");
  const { data: userInfo, refetch: refetchUserInfo } = useUserInfo(address);

  const [status, setStatus] = useState<UserStatus>("loading");

  // Set account status to ready when Privy is ready
  useEffect(() => {
    if (ready) {
      if (!authenticated) {
        return setStatus("not_connected");
      }
      // Use authenticated when Privy is only ready
      if (authenticated) {
        setStatus("connected");
        if (wallets.length > 0) {
          setAddress(wallets[0].address);
        } else {
          createWallet();
        }
      }
      // If user info is fetched, set account status to participated
      // TODO: add logic to change state with information related to staked SOL and CHIP balance
      if (userInfo) {
        if (userInfo.totalEstimatedUSD > 0) {
          setStatus("participated");
        } else {
          setStatus("staked");
        }
      }
    }
  }, [ready, authenticated, wallets, createWallet, userInfo]);

  return { status, address, userInfo, login, refetchUserInfo };
};
