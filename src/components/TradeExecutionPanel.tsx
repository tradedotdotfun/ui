import { useSolanaWallets } from "@privy-io/react-auth";
import { useEffect, useRef, useState } from "react";

import { useCreatePosition } from "../hooks/useCreatePosition";
import { useUserInfo } from "../hooks/useUser";
import { marketToCoinId, MarketType } from "../types/markets";

import AmountPanel from "./AmountPanel";
import ArrowButtonIcon from "./ArrowButton";
import NESButton from "./Button";
import ProgressBar from "./ProgressBar";

const MAX_LEVERAGE = 100;

function LeveragePanel({
  leverage,
  setLeverage,
}: {
  leverage: number;
  setLeverage: (value: number) => void;
}) {
  const audioRef = useRef(new Audio("/sonic-ring-sound-1.mp3"));

  const increaseLeverage = () => {
    if (leverage < MAX_LEVERAGE) {
      audioRef.current.currentTime = 0; // 클릭할 때마다 처음부터 재생
      audioRef.current.play();
      setLeverage(leverage + 1);
    }
  };

  const decreaseLeverage = () => {
    if (leverage > 1) {
      audioRef.current.currentTime = 0; // 클릭할 때마다 처음부터 재생
      audioRef.current.play();
      setLeverage(leverage - 1);
    }
  };

  return (
    <div className="flex-1/2 flex flex-col text-left sm:pr-7 gap-7">
      <p className="text-[12px] sm:text-[24px] text-white">Leverage</p>
      <div className="h-16 flex items-center justify-between gap-3">
        <div
          className="flex items-center arrow-container cursor-pointer"
          onClick={decreaseLeverage}
        >
          <div className="left-arrow-button">
            <ArrowButtonIcon />
          </div>
        </div>
        <p className="text-[24px] text-white no-drag">{leverage}x</p>
        <div
          className="flex items-center arrow-container cursor-pointer"
          onClick={increaseLeverage}
        >
          <div className="right-arrow-button">
            <ArrowButtonIcon />
          </div>
        </div>
      </div>
      <div className="w-full mb-7">
        <ProgressBar
          min={1}
          max={MAX_LEVERAGE}
          value={leverage}
          steps={[1, 25, 50, 75, 100]}
          suffix="x"
          onChange={setLeverage}
          precision={0}
        />
      </div>
    </div>
  );
}

export default function TradeExecutionPanel({
  market,
}: {
  market: MarketType;
}) {
  const { wallets } = useSolanaWallets();
  const { data: userInfo } = useUserInfo(
    wallets.length > 0 ? wallets[0].address : ""
  );
  const { createPosition } = useCreatePosition();
  const [leverage, setLeverage] = useState(1);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [maxBalance, setMaxBalance] = useState<number | undefined>(undefined);

  const balance = userInfo?.availableUSD || 0;
  useEffect(() => {
    setMaxBalance(balance * leverage);
  }, [balance, leverage]);

  const handleClickBuyOrSell = async (type: "long" | "short") => {
    if (!amount) return;

    try {
      await createPosition(
        type,
        leverage,
        amount / leverage,
        marketToCoinId[market]
      );
    } catch (e) {
      console.error(e);
    }
  };

  if (!userInfo) return null;

  return (
    <div
      className="w-full border-[4px] border-white p-5 sm:p-8
    flex flex-col sm:flex-row flex-wrap"
    >
      <LeveragePanel leverage={leverage} setLeverage={setLeverage} />
      <div className="flex-1/2 flex flex-col text-left sm:pl-7 gap-7 overflow-x-hidden">
        <AmountPanel
          totalAmount={maxBalance || 0}
          amount={amount}
          setAmount={setAmount}
        />
      </div>
      <div className="flex-1/2 flex flex-col text-left sm:pr-7">
        <NESButton variant="green" onClick={() => handleClickBuyOrSell("long")}>
          Long
        </NESButton>
      </div>
      <div className="flex-1/2 flex flex-col text-left sm:pl-7">
        <NESButton variant="red" onClick={() => handleClickBuyOrSell("short")}>
          Short
        </NESButton>
      </div>
    </div>
  );
}
