import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { useIsMobile } from "../hooks/useIsMobile";
import { useUserInfo } from "../hooks/useUser";
import { useDepositSol } from "../hooks/useDepositSol";
import TextButton from "./TextButton";
import InsertCoinModal from "./InsertCoinModal";
import LoadingModal from "./LoadingModal";
import Profile from "./Profile";
import { formatAddress } from "../utils/address";
import { useConfirmTx } from "../hooks/useConfirmTx";

export default function MainLogo() {
  const { ready, authenticated, login, user } = usePrivy();
  const { wallets, createWallet } = useSolanaWallets();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready;
  const { confirmTx } = useConfirmTx();

  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { data: userInfo, refetch: refetchUser } = useUserInfo();

  const { depositSol } = useDepositSol();

  const [msg, setMsg] = useState<string>("INSERT COIN");
  const [welcomeMsg, setWelcomeMsg] = useState<string>("Welcome");
  const [isInsertCoinModalOpen, setIsInsertCoinModalOpen] = useState<boolean>(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickTextButton = () => {
    if (isLoading) {
      return setIsLoadingModalOpen(true);
    }
    if (!authenticated) {
      return login();
    }
    if (!userInfo) {
      return setIsInsertCoinModalOpen(true);
    }
    navigate("/trade");
  }

  const handleInsertCoin = async () => {
    setIsLoading(true);
    setIsInsertCoinModalOpen(false);
    setIsLoadingModalOpen(true);

    try {
      const signature = await depositSol();
      // SetInterval to check if the transaction is confirmed for 10 seconds every 1 second
      if (!signature) {
        throw new Error("Transaction creation failed");
      }
      const interval = setInterval(async () => {
        const confirmed = await confirmTx(signature);
        if (confirmed) {
          clearInterval(interval);
          setIsLoading(false);
          setIsLoadingModalOpen(false);
        }
      }, 1000);
    } catch (error) {
      console.error("❌ Error", error);
      setIsLoading(false);
      setIsLoadingModalOpen(false);
    }
  }


  // const handleUpdateName = async () => {
  //   const signed = await signData();
  //   if (!signed) {
  //     return;
  //   }
  //   const { pubkey, msg, signature } = signed;
  //   if (!pubkey || !msg || !signature) {
  //     return;
  //   }
  //   await updateName("trader", pubkey, msg, signature);
  // }

  useEffect(() => {
    if (authenticated && user) {
      console.log("🔄 Refetching user info");
      refetchUser();
      console.log(userInfo);
      if (wallets.length === 0) {
        createWallet();
      } else {
        const wallet = wallets[0];
        setWelcomeMsg(`Welcome ${formatAddress(wallet.address)}`);
      }
    }
  }, [authenticated, user, wallets]);

  useEffect(() => {
    if (userInfo) {
      return setMsg("TRADE NOW!");
    }
    return setMsg("INSERT COIN");
  }, [userInfo]);

  return (
    <div className="relative w-full flex flex-col items-center p-4 text-center overflow-x-hidden">
      {
        isMobile
          ? (<img src='/pepe-punch.gif' alt="pepe-punch" className="w-[128px]" />)
          : (<div className="w-[1040px] font-['Press_Start_2P'] font-[400] text-[80px] text-[#0000FE] mt-[120px]">
            TRADE DOT FUN
          </div>)
      }

      <div className="mt-[44px] text-[28px] text-[#FBB042]">
        Are You the Next{" "}
        <span className="font-bold animate-pulse text-[#FBB042]">
          100x
        </span>{" "}
        Trader?
      </div>

      <p className="text-[12px] mt-[20px] mb-[60px]">
        Enter with just{" "}
        <span className="font-bold animate-pulse bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          0.1 SOL
        </span>{" "}
        and prove your trading skills.
      </p>

      {authenticated ?
        <p className="text-[16px] mb-[20px]">
          {welcomeMsg}
        </p> : undefined}

      <TextButton
        onClick={handleClickTextButton}
        disabled={disableLogin}
      >
        <img src="/triangle_pixel.svg" alt="Insert Coin" className="mr-[16px]" />
        <p className="text-white font-bold sm:text-[22px]">{msg}</p>
      </TextButton>

      <small className="text-[#FBB042] text-[10px] mt-2 mb-[60px]">
        {
          userInfo ?
            "Your league awaits - keep trading!" :
            "Entry Fee: 0.1 SOL"
        }
      </small>

      {
        !isMobile && (
          <>
            <img src="/pepe-box.gif" alt="pepe-box" className="w-[180px] absolute top-[196px] left-[calc(50%-606px)]" />
            <img src="/pepe-punch.gif" alt="pepe-punch" className="w-[180px] absolute top-[240px] right-[calc(50%-606px)] transform -scale-x-100" />
            <img src="/pepe-dance.gif" alt="pepe-dance" className="w-[215px] absolute top-[410px] left-[calc(50%-380px)]" />
            <img src="/sonic-dancing.gif" alt="sonic-dancing" className="w-[113px] absolute top-[480px] right-[calc(50%-280px)]" />
          </>
        )
      }
      {
        userInfo && <Profile user={userInfo} />
      }
      <InsertCoinModal
        isOpen={isInsertCoinModalOpen}
        onClose={() => setIsInsertCoinModalOpen(false)}
        onConfirm={handleInsertCoin} />
      <LoadingModal
        isOpen={isLoadingModalOpen}
        onClose={() => setIsLoadingModalOpen(false)} />
    </div>
  );
}
