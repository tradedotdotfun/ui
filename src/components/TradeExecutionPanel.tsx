import { useState } from "react";
import NESButton from "./Button"
import ArrowButtonIcon from "./ArrowButton";
import ProgressBar from "./ProgressBar";
import RetroBox from "./RetroBox";

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

function AmountPanel() {
  const totalBalance = 38123.12;
  const [percentage, setPercentage] = useState(0);
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const formattedBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalBalance);

  const setPercentageWithAmount = (amount: number) => {
    if (amount === 0) {
      setPercentage(0);
      setAmount(undefined);
      return;
    }
    const amountIsValid = amount > 0 && amount <= totalBalance;
    if (amountIsValid) {
      const percentage = (amount / totalBalance) * 100
      setPercentage(percentage);
      setAmount(amount);
    } else {
      setPercentage(100);
      setAmount(totalBalance);
    }
  }

  const setAmountWithPercentage = (percentage: number) => {
    const amount = Number(((percentage / 100) * totalBalance).toFixed(2));
    setPercentage(percentage);
    setAmount(amount);
  }

  return (
    <div className="flex-1/2 flex flex-col text-left sm:pl-7 gap-7 overflow-x-hidden">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12px] sm:text-[24px] text-white">Amount</p>
        <p className="text-[10px] sm:text-[16px] text-white">{formattedBalance}</p>
      </div>
      <RetroBox className="w-full">
        <div className="flex h-16 px-5 py-3 items-center justify-between gap-3 border-4 border-white">
        <input
          type="number"
          value={ amount }
          className="w-full h-full bg-transparent text-white text-[20px]"
          placeholder="0.0"
          onChange={(e) => {setPercentageWithAmount(Number(e.target.value))}}
        />
        <p className="text-[20px] text-white">runUSD</p>
        </div>
      </RetroBox>
      <div className="w-full mb-7">
        <ProgressBar
          min={0}
          max={100}
          value={percentage}
          steps={[0, 25, 50, 75, 100]}
          suffix="%"
          onChange={setAmountWithPercentage}
        />
      </div>
    </div>
  );
}

export default function TradeExecutionPanel() {
  return (
    <div className="w-full border-[4px] border-white p-5 sm:p-8
    flex flex-col sm:flex-row flex-wrap">
      <LeveragePanel />
      <AmountPanel />
      <div className="flex-1/2 flex flex-col text-left sm:pr-7">
        <NESButton variant="green">Buy</NESButton>
      </div>
      <div className="flex-1/2 flex flex-col text-left sm:pl-7">
        <NESButton variant="red">Sell</NESButton>
      </div>
    </div>
  )
}
