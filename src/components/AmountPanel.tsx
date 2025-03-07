import { useState } from "react";
import RetroBox from "./RetroBox";
import ProgressBar from "./ProgressBar";

type AmountPanelProps = {
  totalAmount: number;
  amount: number | undefined;
  setAmount: (amount: number | undefined) => void;
};

export default function AmountPanel({ totalAmount, amount, setAmount }: AmountPanelProps) {
  const [percentage, setPercentage] = useState(0);

  const formattedBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalAmount);

  const setPercentageWithAmount = (amount: number) => {
    if (amount === 0) {
      setPercentage(0);
      setAmount(undefined);
      return;
    }
    const amountIsValid = amount > 0 && amount <= totalAmount;
    if (amountIsValid) {
      const percentage = (amount / totalAmount) * 100
      setPercentage(percentage);
      setAmount(amount);
    } else {
      setPercentage(100);
      setAmount(totalAmount);
    }
  }

  const setAmountWithPercentage = (percentage: number) => {
    const amount = Number(((percentage / 100) * totalAmount).toFixed(2));
    setPercentage(percentage);
    setAmount(amount);
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12px] sm:text-[24px] text-white">Amount</p>
        <p className="text-[10px] sm:text-[16px] text-white">{formattedBalance}</p>
      </div>
      <RetroBox className="w-full">
        <div className="flex h-16 px-5 py-3 items-center justify-between gap-3 border-4 border-white">
          <input
            type="number"
            value={amount}
            className="w-full h-full bg-transparent text-white text-[12px] sm:text-[20px]"
            placeholder="0.0"
            onChange={(e) => { setPercentageWithAmount(Number(e.target.value)) }}
          />
          <p className="text-[12px] sm:text-[20px] text-white">runUSD</p>
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
    </>
  );
}
