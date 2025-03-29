import { useSolanaWallets } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";

import { fetchPositions } from "../api/user";

export const usePositions = () => {
  const { wallets } = useSolanaWallets();

  return useQuery({
    queryKey: [
      "position",
      { round: 0, address: wallets.length > 0 ? wallets[0].address : "" },
    ],
    queryFn: () =>
      fetchPositions({
        round: 0,
        address: wallets.length > 0 ? wallets[0].address : "",
      }),
    staleTime: 0, // 1초간 캐싱 유지
    refetchInterval: 1000, // 1초마다 자동 갱신
    retry: 3, // 실패시 최대 3회 재시도
    enabled: wallets.length > 0, // fetch only when connected and publicKey is available
  });
};
