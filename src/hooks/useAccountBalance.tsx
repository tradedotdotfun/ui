import { PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";

import { useConnection } from "./useConnection";

export const useAccountBalance = (address: string) => {
  const { connection } = useConnection();

  return useQuery({
    queryKey: ["accountBalance", { address }],
    queryFn: () =>
      connection
        ? connection?.getBalance(new PublicKey(address))
        : Promise.resolve(0),
    staleTime: 0,
    refetchInterval: 30000,
    retry: 3,
    enabled: !!address,
  });
};
