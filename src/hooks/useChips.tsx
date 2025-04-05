import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import {
  getAccount,
  getAssociatedTokenAddress,
  TokenAccountNotFoundError,
} from "@solana/spl-token";
import { useQuery } from "@tanstack/react-query";
import { CHIP_TOKEN_ADDRESS } from "../constants";
import { useConnection } from "./useConnection";
import BigNumber from "bignumber.js";

/**
 * Custom hook to fetch the CHIP token balance for a user
 * @param address User's wallet public key
 * @returns Object containing the CHIP token balance and utility functions
 */
export const useChips = (address: string) => {
  const { connection } = useConnection();
  const [chipBalance, setChipBalance] = useState<number>(0);

  // Define the CHIP token mint address from constants
  const chipTokenMint = new PublicKey(CHIP_TOKEN_ADDRESS);

  // Query to fetch the CHIP token balance
  const {
    data: chipBalanceRaw,
    refetch: refetchChipBalance,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chipBalance", { address }],
    queryFn: async () => {
      if (!connection || !address) return 0;

      try {
        // Get the associated token account address for this wallet and token
        const tokenAccountAddress = await getAssociatedTokenAddress(
          chipTokenMint,
          new PublicKey(address)
        );

        // Try to fetch the token account info
        try {
          const tokenAccount = await getAccount(
            connection,
            tokenAccountAddress
          );
          return BigNumber(tokenAccount.amount.toString()).toNumber();
        } catch (err: any) {
          // If the token account doesn't exist, the user has 0 tokens
          if (
            err instanceof TokenAccountNotFoundError ||
            err.name === "TokenAccountNotFoundError"
          ) {
            return 0;
          }
          console.error("Error fetching token account:", err);
          return 0;
        }
      } catch (err: any) {
        console.error("Error fetching CHIP balance:", err);
        return 0;
      }
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
    retry: 3,
    enabled: !!connection && !!address,
  });

  // Convert token amount to human-readable format (assuming 9 decimals like SOL)
  useEffect(() => {
    if (chipBalanceRaw !== undefined) {
      // Assuming CHIP has 9 decimals like SOL
      setChipBalance(BigNumber(chipBalanceRaw).toNumber());
    }
  }, [chipBalanceRaw]);

  return {
    chipBalance,
    chipBalanceRaw,
    refetchChipBalance,
    isLoading,
    error,
  };
};
