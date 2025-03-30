import BigNumber from "bignumber.js";
import { useCallback, useState } from "react";

import { formatCurrency } from "../utils/formatCurrency";
import { formatBalance } from "../utils/numbers";

import ProgressBar from "./ProgressBar";
import RetroBox from "./RetroBox";

type AmountPanelProps = {
  title?: string;
  currency?: string;
  totalAmount: number;
  amount: number | undefined;
  setAmount: (amount: number | undefined) => void;
};

export default function AmountPanel({
  title,
  currency,
  totalAmount,
  amount,
  setAmount,
}: AmountPanelProps) {
  const [percentage, setPercentage] = useState(0);

  let formattedBalance = "";
  if (currency === undefined) {
    formattedBalance = formatCurrency(totalAmount);
  } else {
    formattedBalance = `${formatBalance(totalAmount, 4)} ${currency}`;
  }

  const handleAmountInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setPercentage(0);
        setAmount(undefined);
        return;
      }
      const amount = Number(e.target.value);
      const percentage = BigNumber(amount)
        .div(totalAmount)
        .multipliedBy(100)
        .toNumber();
      setPercentage(Math.min(percentage, 100));
      setAmount(amount);
    },
    [setAmount, totalAmount]
  );

  const handleProgressInteraction = useCallback(
    (value: number) => {
      const amount = BigNumber(totalAmount)
        .multipliedBy(value)
        .div(100)
        .toNumber();
      setAmount(amount);
      setPercentage(value);
    },
    [setAmount, totalAmount]
  );

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12px] sm:text-[24px] text-white">
          {title ? title : "Amount"}
        </p>
        <p
          className="text-[10px] sm:text-[16px] text-white cursor-pointer"
          onClick={() => {
            setAmount(totalAmount);
            setPercentage(100);
          }}
        >
          {formattedBalance}
        </p>
      </div>
      <RetroBox className="w-full">
        <div className="flex h-16 px-5 py-3 items-center justify-between gap-3 border-4 border-white">
          <input
            type="number"
            value={amount}
            className="w-full h-full bg-transparent text-white text-[12px] sm:text-[20px]"
            placeholder="0.0"
            onChange={handleAmountInput}
          />
          <p className="text-[12px] sm:text-[20px] text-white">
            {currency ? currency : "funUSD"}
          </p>
        </div>
      </RetroBox>
      <div className="w-full mb-7">
        <ProgressBar
          min={0}
          max={100}
          value={percentage}
          steps={[0, 25, 50, 75, 100]}
          suffix="%"
          onChange={handleProgressInteraction}
        />
      </div>
    </div>
  );
}
