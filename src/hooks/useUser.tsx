import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/user";

export const useUserInfo = (address: string) => {

  return useQuery({
    queryKey: ['user', { round: 0, address }],
    queryFn: () => fetchUser({ round: 0, address }),
    staleTime: 0, // 캐싱 유지 X
    refetchInterval: 30000, // 30초마다 자동 갱신
    retry: 3, // 실패시 최대 3회 재시도
  });
};
