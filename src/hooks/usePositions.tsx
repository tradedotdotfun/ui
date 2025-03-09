import { useQuery } from "@tanstack/react-query";
import { fetchPositions } from "../api/user";
import { useWallet } from "@solana/wallet-adapter-react";

export const usePositions = () => {
  const { connected, publicKey } = useWallet();

  const address = publicKey?.toBase58() || '';

  return useQuery({
    queryKey: ['position', { round: 0, address }],
    queryFn: () => fetchPositions({ round: 0, address }),
    staleTime: 1000, // 60초간 캐싱 유지
    refetchInterval: 1000, // 30초마다 자동 갱신
    retry: 3, // 실패시 최대 3회 재시도
    enabled: connected && !!publicKey, // fetch only when connected and publicKey is available
  });
};
