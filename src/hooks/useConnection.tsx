import { Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";

export const useConnection = () => {
  const [connection, setConnection] = useState<Connection | undefined>();

  useEffect(() => {
    const connection = new Connection(import.meta.env.VITE_RPC_URL);
    setConnection(connection);
  }, []);

  return { connection };
};
