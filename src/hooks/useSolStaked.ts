import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

import { TRADE_DOT_FUN_ID } from "../constants";
import { lamportsToSol } from "../utils/numbers";

import { useConnection } from "./useConnection";

/**
 * Custom hook to fetch the total SOL deposited for a user
 * @param userAddress User's wallet public key
 * @returns Object containing the total SOL staked and utility functions
 */
export const useSolStaked = (userAddress: string) => {
  const { connection } = useConnection();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [solStaked, setSolStaked] = useState<number>(0);

  const fetchUserData = async () => {
    if (!connection || !userAddress) {
      setSolStaked(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Find PDA for user data account
      const [userDataPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("user_data"), new PublicKey(userAddress).toBuffer()],
        new PublicKey(TRADE_DOT_FUN_ID)
      );
      console.log("userDataPDA", userDataPDA);

      // text pda new PublicKey("DdasR9wgc7JZuSbPFyb9eN3aaHZPXFMo8GRheoEPtpAe")
      const accountInfo = await connection.getAccountInfo(userDataPDA);
      console.log("accountInfo", accountInfo);

      if (!accountInfo) {
        // If account doesn't exist yet, return 0
        setSolStaked(0);
        setLoading(false);
        return;
      }

      // Manually decode the account data
      // Skip past the 8-byte discriminator
      const dataBuffer = accountInfo.data.slice(8);

      // The first 32 bytes after discriminator are the user's public key
      // Skip past this to get to totalSolDeposited (next 8 bytes)
      const totalSolDepositedBuf = dataBuffer.slice(32, 32 + 8);

      // Convert to BigInt (u64 in Rust is 8 bytes)
      const totalSolDepositedBigInt = BigInt(
        "0x" +
          Buffer.from(totalSolDepositedBuf)
            .reverse() // Account for little-endian encoding
            .toString("hex")
      );
      console.log("totalSolDepositedBigInt", totalSolDepositedBigInt);

      // Convert to number and then to SOL
      const totalSolDeposited = lamportsToSol(Number(totalSolDepositedBigInt));
      setSolStaked(totalSolDeposited);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setSolStaked(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();

    // Set up interval to refresh data periodically
    const intervalId = setInterval(fetchUserData, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, [connection, userAddress]);

  return {
    solStaked,
    loading,
    error,
    refetchSolStaked: fetchUserData,
  };
};
