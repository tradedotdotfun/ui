import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { fetchUser } from "../api/user";
import { UserStatus } from "../types/users";
import { lamportsToSol } from "../utils/numbers";

import { useAccountBalance } from "./useAccountBalance";

export const useUserInfo = (address: string) => {
  return useQuery({
    queryKey: ["user", address],
    queryFn: () => fetchUser({ round: 0, address }),
    enabled: !!address, // address가 있을 때만 실행
    staleTime: 1000 * 60, // 1분 동안 캐싱 유지
    refetchOnMount: false,
    refetchInterval: false,
  });
};

export const useUser = () => {
  const [address, setAddress] = useState<string>("");
  const [status, setStatus] = useState<UserStatus>("loading");
  const [solBalance, setSolBalance] = useState<number>(0);

  const { ready, authenticated, login } = usePrivy();
  const { wallets, createWallet } = useSolanaWallets();
  const { data: userInfo, refetch: refetchUserInfo } = useUserInfo(address);
  // TODO: Add CHIP balance and staked SOL balance
  const { data: solBalanceInLamports, refetch: refetchSolBalance } =
    useAccountBalance(address);
  // const [stakedBalance, setStakedBalance] = useState<number>(0);
  // const [chipBalance, setChipBalance] = useState<number>(0);

  // Set account status to ready when Privy is ready
  useEffect(() => {
    if (ready) {
      if (!authenticated) {
        setStatus("not_connected");
        setAddress("");
        setSolBalance(0);
        return;
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

  useEffect(() => {
    if (solBalanceInLamports) {
      setSolBalance(lamportsToSol(solBalanceInLamports));
    }
  }, [solBalanceInLamports]);

  return {
    status,
    address,
    userInfo,
    solBalance,
    login,
    refetchUserInfo,
    refetchSolBalance,
  };
};
