import { useQuery } from "@tanstack/react-query";
import { fetchPrices } from "../api/trade";

export const usePrices = () => {
  return useQuery({
    queryKey: ['prices'],
    queryFn: fetchPrices,
    staleTime: 1000, // 1초간 캐싱 유지
    refetchInterval: 1000, // 1초마다 자동 갱신
    retry: 3, // 실패시 최대 3회 재시도
  });
};
