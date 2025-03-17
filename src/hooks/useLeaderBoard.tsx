import { useQuery } from "@tanstack/react-query";
import { fetchLeaderBoard } from "../api/leaderboard";

export const useLeaderBoard = () => {
  return useQuery({
    queryKey: ["leaderboard", { round: 0, }],
    queryFn: () => fetchLeaderBoard(0, 10),
    staleTime: 60000, // 60초간 캐싱 유지
    refetchInterval: 30000, // 30초마다 자동 갱신
    retry: 3, // 실패시 최대 3회 재시도
  });
}
