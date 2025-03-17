import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/user";

export const useUserInfo = (address: string) => {
  return useQuery({
    queryKey: ['user', { round: 0, address }],
    queryFn: () => fetchUser({ round: 0, address }),
    staleTime: 0, // 데이터를 항상 stale로 취급
    gcTime: 0, // 캐시 즉시 삭제 (이전 cacheTime)
    refetchOnMount: 'always', // 컴포넌트 마운트 시 항상 새로 요청
    refetchOnWindowFocus: true, // 윈도우 포커스 시 항상 새로 요청
    refetchOnReconnect: true, // 네트워크 재연결 시 항상 새로 요청
    refetchInterval: 30000, // 30초마다 자동 갱신
    retry: 3, // 실패시 최대 3회 재시도
  });
};
