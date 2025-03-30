import { useQuery } from "@tanstack/react-query";

import { fetchUser } from "../api/user";

export const useUserInfo = (address: string) => {
  return useQuery({
    queryKey: ["user", { round: 0, address }],
    queryFn: () => fetchUser({ round: 0, address }),
    staleTime: 0, // Never stale
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
    enabled: !!address, // Only fetch when address is present
  });
};
