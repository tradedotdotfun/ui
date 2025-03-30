import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useConfirmTx } from "../hooks/useConfirmTx";
import { useDepositSol } from "../hooks/useDepositSol";
import { useIsMobile } from "../hooks/useIsMobile";
import { useUser } from "../hooks/useUser";
import { UserStatus } from "../types/users";

import BackgroundGIFs from "./BackgroundGIFs";
import CTA from "./CTA";
import InsertCoinModal from "./InsertCoinModal";
import LoadingModal from "./LoadingModal";
import LogoSection from "./LogoSection";
import MyProfile from "./MyProfile";

export default function Hero() {
  const { status, address, userInfo, login, refetchUserInfo } = useUser();

  const { depositSol } = useDepositSol();
  const {
    confirmTx,
    isLoading: isTxLoading,
    isSuccess,
    isError,
    error,
  } = useConfirmTx();

  const [, setIsLoadingEnterGame] = useState(false);

  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Modals
  const [isInsertCoinModalOpen, setIsInsertCoinModalOpen] =
    useState<boolean>(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState<boolean>(false);

  const handleClickTextButton = (status: UserStatus) => {
    if (status === "loading") {
      setIsLoadingModalOpen(true);
      return;
    }
    if (status === "not_connected") {
      login();
      return;
    }
    if (status === "connected") {
      navigate("/exchange");
      return;
    }
    if (status === "staked") {
      setIsInsertCoinModalOpen(true);
      return;
    }
    if (status === "participated") {
      navigate("/trade");
      return;
    }
    return;
  };

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
        refetchUserInfo();
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
  };

  // Deals with transaction & backend response
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
      refetchUserInfo();
    }
  }, [isSuccess, refetchUserInfo]);

  // 트랜잭션 에러시 처리
  useEffect(() => {
    if (isError) {
      console.error("❌ Transaction Error:", error);
    }
  }, [isError, error]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center sm:p-4 text-center overflow-x-hidden overflow-y-hidden">
      <LogoSection className="sm:mt-[120px] sm:mb-[80px]" isMobile={isMobile} />
      <CTA status={status} onClickTextButton={handleClickTextButton} />
      {address != "" && <MyProfile address={address} user={userInfo} />}

      {!isMobile && <BackgroundGIFs />}

      <InsertCoinModal
        isOpen={isInsertCoinModalOpen}
        onClose={() => setIsInsertCoinModalOpen(false)}
        onConfirm={handleInsertCoin}
      />
      <LoadingModal
        isOpen={isLoadingModalOpen}
        onClose={() => {
          if (!isTxLoading) setIsLoadingModalOpen(false);
        }}
      />
    </div>
  );
}
