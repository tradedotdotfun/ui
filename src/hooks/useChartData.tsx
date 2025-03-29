import { useQuery } from "@tanstack/react-query";

import { fetchChartData } from "../api/trade";
import { marketToCoinId, MarketType } from "../types/markets";

export const useChartData = (market: MarketType) => {
  const coinId = marketToCoinId[market];

  return useQuery({
    queryKey: ['chartData', coinId],
    queryFn: () => fetchChartData(coinId),
    staleTime: 60000, // 60초간 캐싱 유지
    refetchInterval: 30000, // 30초마다 자동 갱신
    retry: 3, // 실패시 최대 3회 재시도
  });
};
