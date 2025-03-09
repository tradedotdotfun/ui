import { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { 
  PhantomWalletAdapter,
  TorusWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import '@solana/wallet-adapter-react-ui/styles.css';
import "./App.css";
import AppRoutes from "./routes";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new TorusWalletAdapter(),
    new SolflareWalletAdapter(),
  ], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <AppRoutes />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App
