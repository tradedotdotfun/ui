import { useEffect, useRef, useState } from "react";
import NESButton from "./Button"
import ArrowButtonIcon from "./ArrowButton";
import ProgressBar from "./ProgressBar";
import AmountPanel from "./AmountPanel";

const MAX_LEVERAGE = 50;

function LeveragePanel({ leverage, setLeverage }: { leverage: number, setLeverage: (value: number) => void }) {
  const audioRef = useRef(new Audio('/click.mp3'));

  const increaseLeverage = () => {
    if (leverage < MAX_LEVERAGE) {
      audioRef.current.currentTime = 0; // 클릭할 때마다 처음부터 재생
      audioRef.current.play();
      setLeverage(leverage + 1);
    }
  }

  const decreaseLeverage = () => {
    if (leverage > 1) {
      audioRef.current.currentTime = 0; // 클릭할 때마다 처음부터 재생
      audioRef.current.play();
      setLeverage(leverage - 1);
    }
  }

  return (
    <div className="flex-1/2 flex flex-col text-left sm:pr-7 gap-7">
      <p className="text-[12px] sm:text-[24px] text-white">Leverage</p>
      <div className="h-16 flex items-center justify-between gap-3">
        <div
          className="flex items-center arrow-container cursor-pointer"
          onClick={decreaseLeverage}>
          <div className="left-arrow-button">
            <ArrowButtonIcon />
          </div>
        </div>
        <p className="text-[24px] text-white no-drag">{leverage}x</p>
        <div
          className="flex items-center arrow-container cursor-pointer"
          onClick={increaseLeverage}>
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
          steps={[1, 10, 20, 30, 40, 50]}
          suffix="x"
          onChange={setLeverage}
        />
      </div>
    </div>
  )
}

export default function TradeExecutionPanel() {
  const balance = 38123.12;
  const [leverage, setLeverage] = useState(1);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [maxBalance, setMaxBalance] = useState<number | undefined>(undefined);

  useEffect(() => {
    setMaxBalance(balance * leverage);
  }, [balance, leverage]);

  return (
    <div className="w-full border-[4px] border-white p-5 sm:p-8
    flex flex-col sm:flex-row flex-wrap">
      <LeveragePanel leverage={leverage} setLeverage={setLeverage} />
      <div className="flex-1/2 flex flex-col text-left sm:pl-7 gap-7 overflow-x-hidden">
        <AmountPanel
          totalAmount={maxBalance || 0}
          amount={amount}
          setAmount={setAmount} />
      </div>
      <div className="flex-1/2 flex flex-col text-left sm:pr-7">
        <NESButton variant="green">Buy</NESButton>
      </div>
      <div className="flex-1/2 flex flex-col text-left sm:pl-7">
        <NESButton variant="red">Sell</NESButton>
      </div>
    </div>
  )
}
