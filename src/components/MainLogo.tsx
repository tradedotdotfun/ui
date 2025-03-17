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
import { useConfirmTx } from "../hooks/useConfirmTx";
import AddressCopy from "./AddressCopy";

export default function MainLogo() {
  const { ready, authenticated, login, user } = usePrivy();
  const { wallets, createWallet } = useSolanaWallets();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready;
  const { confirmTx, isLoading: isTxLoading, isSuccess, isError, error } = useConfirmTx();

  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { data: userInfo, refetch: refetchUser } = useUserInfo(wallets.length > 0 ? wallets[0].address : '');

  const { depositSol } = useDepositSol();

  const [isLoadingEnterGame, setIsLoadingEnterGame] = useState(false);
  const [msg, setMsg] = useState<string>("INSERT COIN");
  const [isInsertCoinModalOpen, setIsInsertCoinModalOpen] = useState<boolean>(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState<boolean>(false);

  // 트랜잭션 상태에 따라 로딩 모달 표시
  useEffect(() => {
    if (isTxLoading) {
      setIsLoadingModalOpen(true);
    } else {
      setIsLoadingModalOpen(false);
    }
  }, [isTxLoading]);

  // 트랜잭션 성공시 처리
  useEffect(() => {
    if (isSuccess) {
      refetchUser();
    }
  }, [isSuccess, refetchUser]);

  // 트랜잭션 에러시 처리
  useEffect(() => {
    if (isError) {
      console.error("❌ Transaction Error:", error);
    }
  }, [isError, error]);

  const handleClickTextButton = () => {
    if (isTxLoading || isLoadingEnterGame) {
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
    setIsInsertCoinModalOpen(false);
    setIsLoadingEnterGame(true);
    try {
      const signature = await depositSol();
      if (!signature) {
        throw new Error("Transaction creation failed");
      }

      // hook 내부에서 상태 관리와 재시도 처리
      confirmTx(signature);

      // Check backend if user info is created, max 5 times
      let count = 0;
      const interval = setInterval(() => {
        refetchUser();
        count++;
        if (count >= 20) {
          clearInterval(interval);
          setIsLoadingEnterGame(false);
        }
      }, 1000);
    } catch (error) {
      setIsLoadingEnterGame(false);
      console.error("❌ Error:", error);
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
    if (authenticated) {
      refetchUser();
      if (wallets.length === 0) {
        createWallet();
      }
    }
  }, [authenticated, user, wallets, createWallet, refetchUser]);

  useEffect(() => {
    if (userInfo && authenticated) {
      setIsLoadingEnterGame(false);
      return setMsg("TRADE NOW!");
    }
    return setMsg("INSERT COIN");
  }, [userInfo, authenticated]);

  return (
    <div className="relative w-full flex flex-col items-center p-4 text-center overflow-x-hidden overflow-y-hidden">
      {
        isMobile
          ? (<img src='/pepe-punch.gif' alt="pepe-punch" className="w-[128px]" />)
          : (<div className="text-[40px] lg:text-[80px] text-[#0000FE] mt-[120px] whitespace-nowrap">
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

      {authenticated && wallets.length > 0?
        <div className="flex flex-row justify-between gap-2 items-center mb-[20px] text-[16px]">
          <p>Welcome</p>
          <AddressCopy address={wallets[0].address} />
        </div> : undefined}

      <TextButton
        onClick={handleClickTextButton}
        disabled={disableLogin || isTxLoading}
      >
        <img src="/triangle_pixel.svg" alt="Insert Coin" className="mr-[16px]" />
        <p className="text-white font-bold sm:text-[22px]">{isTxLoading ? "PROCESSING..." : msg}</p>
      </TextButton>

      <small className="text-[#FBB042] text-[10px] mt-2 mb-[60px]">
        {
          userInfo && authenticated ?
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
        userInfo && authenticated && <Profile user={userInfo} />
      }
      <InsertCoinModal
        isOpen={isInsertCoinModalOpen}
        onClose={() => setIsInsertCoinModalOpen(false)}
        onConfirm={handleInsertCoin} />
      <LoadingModal
        isOpen={isLoadingModalOpen}
        onClose={() => {
          if (!isTxLoading) setIsLoadingModalOpen(false);
        }} />
    </div>
  );
}
