import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { useIsMobile } from "../hooks/useIsMobile";
import { useUserInfo } from "../hooks/useUser";
import { useDepositSol } from "../hooks/useDepositSol";

import TextButton from "./TextButton";
import InsertCoinModal from "./InsertCoinModal";
import LoadingModal from "./LoadingModal";
import Profile from "./Profile";

export default function MainLogo() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { connected } = useWallet();
  const { data: userInfo, refetch: refetchUser } = useUserInfo();
  const { setVisible: setWalletModalVisible } = useWalletModal();
  const { depositSol } = useDepositSol();

  const [msg, setMsg] = useState<string>("INSERT COIN");
  const [isInsertCoinModalOpen, setIsInsertCoinModalOpen] = useState<boolean>(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickTextButton = () => {
    if (isLoading) {
      return setIsLoadingModalOpen(true);
    }
    if (!connected) {
      return setWalletModalVisible(true);
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
      console.log("✅ Success", signature);
    } catch (error) {
      console.error("❌ Error", error);
    } finally {
      setIsLoading(false);
      setIsLoadingModalOpen(false);
    }
  }

  useEffect(() => {
    if (connected) {
      refetchUser();
    }
  }, [connected, isLoading]);

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
          : (<img src="/tradedotfun_logo.png" alt="Main Logo" className="w-[894px] mt-[120px]" />)
      }

      <div className="mt-[44px] text-[28px] text-[#FFFF00]">
        Are You the Next{" "}
        <span className="font-bold animate-pulse text-[#FFFF00]">
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

      <TextButton
        onClick={handleClickTextButton}>
        <img src="/triangle_pixel.svg" alt="Insert Coin" className="mr-[16px]" />
        <p className="text-white font-bold sm:text-[22px]">{msg}</p>
      </TextButton>

      <small className="text-[#FFF828] text-[10px] mt-2 mb-[60px]">
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
            <img src="/happycat.gif" alt="happycat" className="w-[113px] absolute top-[480px] right-[calc(50%-280px)]" />
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
