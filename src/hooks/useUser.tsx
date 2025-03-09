import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/user";
import { useWallet } from "@solana/wallet-adapter-react";

export const useUser = () => {
  const { connected, publicKey } = useWallet();

  const address = publicKey?.toBase58() || '';

  return useQuery({
    queryKey: ['user', { round: 0, address }],
    queryFn: () => fetchUser({ round: 0, address }),
    staleTime: 60000, // 60초간 캐싱 유지
    refetchInterval: 30000, // 30초마다 자동 갱신
    retry: 3, // 실패시 최대 3회 재시도
    enabled: connected && !!publicKey, // fetch only when connected and publicKey is available
  });
};
