import "./App.css";
import AppRoutes from "./routes";
import { ToastProvider } from "./providers/ToastProvider";
import { PrivyProvider } from "@privy-io/react-auth";

function App() {
  // const solanaConnectors = toSolanaWalletConnectors({
  //   // By default, shouldAutoConnect is enabled
  //   shouldAutoConnect: false,
  // })

  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          logo: 'https://raw.githubusercontent.com/tradedotdotfun/contents/66cfd60bdf83998ceb42b4e7e2ed1c62c19d3992/logo.png',
          walletChainType: 'solana-only',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        // externalWallets: {
        //   solana: {
        //     connectors: solanaConnectors,
        //   }
        // },
        solanaClusters: [
          { name: 'mainnet-beta', rpcUrl: 'https://api.mainnet-beta.solana.com' },
          { name: 'devnet', rpcUrl: 'https://api.devnet.solana.com' },
        ],
      }}
    >
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </PrivyProvider>
  );
}

export default App
