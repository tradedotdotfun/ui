import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

import { TRADE_DOT_FUN_ID } from "../constants";

import { useConnection } from "./useConnection";

// Program ID from the deployed contract

/**
 * Custom hook to fetch the current round from VaultData
 * @returns Object containing the current round and utility functions
 */
export const useRound = () => {
  const { connection } = useConnection();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(0);

  const fetchRound = async () => {
    if (!connection) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Find the VaultData PDA
      const [vaultDataPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault_data")],
        new PublicKey(TRADE_DOT_FUN_ID)
      );

      console.log("vaultDataPDA", vaultDataPDA.toString());

      // Fetch account info from the blockchain
      const accountInfo = await connection.getAccountInfo(vaultDataPDA);

      if (!accountInfo) {
        console.log("VaultData account not found");
        setCurrentRound(0);
        setLoading(false);
        return;
      }

      console.log("VaultData account found, size:", accountInfo.data.length);

      // Manually decode the account data
      // Skip past the 8-byte discriminator
      const dataBuffer = accountInfo.data.slice(8);

      // The first field is total_principal_sol (8 bytes)
      // Skip to current_round (next 8 bytes)
      const currentRoundBuf = dataBuffer.slice(8, 16);

      // Convert to BigInt (u64 in Rust is 8 bytes)
      const currentRoundBigInt = BigInt(
        "0x" +
          Buffer.from(currentRoundBuf)
            .reverse() // Account for little-endian encoding
            .toString("hex")
      );

      console.log("currentRoundBigInt", currentRoundBigInt);

      // Convert to number
      setCurrentRound(Number(currentRoundBigInt));
    } catch (err) {
      console.error("Error fetching round data:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRound();

    // Set up interval to refresh data periodically
    const intervalId = setInterval(fetchRound, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, [connection]);

  return {
    currentRound,
    loading,
    error,
    refetchRound: fetchRound,
  };
};
