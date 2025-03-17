import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/user";
import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";

export const useUserInfo = () => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useSolanaWallets();

  return useQuery({
    queryKey: ['user', { round: 0, address: wallets.length > 0 ? wallets[0].address : '' }],
    queryFn: () => fetchUser({ round: 0, address: wallets.length > 0 ? wallets[0].address : ''   }),
    staleTime: 60000, // 60초간 캐싱 유지
    refetchInterval: 30000, // 30초마다 자동 갱신
    retry: 3, // 실패시 최대 3회 재시도
    enabled: ready && authenticated && wallets.length > 0, 
  });
};
