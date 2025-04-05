import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const { status, address, userInfo, login, chipBalance, solStaked } =
    useUser();

  const { depositSol, isLoading, isFinished } = useDepositSol();

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

  const handleInsertCoin = () => {
    setIsInsertCoinModalOpen(false);
    try {
      depositSol();
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  // Open loading modal when isLoading value changed to true
  useEffect(() => {
    if (isLoading) {
      setIsLoadingModalOpen(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isFinished) {
      setIsLoadingModalOpen(false);
    }
  }, [isFinished]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center sm:p-4 text-center overflow-x-hidden overflow-y-hidden">
      <LogoSection className="sm:mt-[120px] sm:mb-[80px]" isMobile={isMobile} />
      <CTA
        status={isLoading ? "loading" : status}
        onClickTextButton={handleClickTextButton}
      />
      {address != "" && (
        <MyProfile
          address={address}
          user={userInfo}
          chipBalance={chipBalance}
          solStaked={solStaked}
        />
      )}

      {!isMobile && <BackgroundGIFs />}

      <InsertCoinModal
        isOpen={isInsertCoinModalOpen}
        onClose={() => setIsInsertCoinModalOpen(false)}
        onConfirm={handleInsertCoin}
      />
      <LoadingModal
        isOpen={isLoadingModalOpen}
        onClose={() => setIsLoadingModalOpen(false)}
      />
    </div>
  );
}
