import { useState } from "react";
import NESButton from "./Button"
import ArrowButtonIcon from "./ArrowButton";
import ProgressBar from "./ProgressBar";
import AmountPanel from "./AmountPanel";

function LeveragePanel() {
  const MAX_LEVERAGE = 50;
  const [leverage, setLeverage] = useState(1);

  const increaseLeverage = () => {
    if (leverage < MAX_LEVERAGE) {
      setLeverage(leverage + 1);
    }
  }

  const decreaseLeverage = () => {
    if (leverage > 1) {
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
  const [totalBalance, setTotalBalance] = useState<number | undefined>(undefined);

  return (
    <div className="w-full border-[4px] border-white p-5 sm:p-8
    flex flex-col sm:flex-row flex-wrap">
      <LeveragePanel />
      <div className="flex-1/2 flex flex-col text-left sm:pl-7 gap-7 overflow-x-hidden">
        <AmountPanel
          totalAmount={38123.12}
          amount={totalBalance}
          setAmount={setTotalBalance} />
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
