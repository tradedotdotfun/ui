import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";

import { useUser } from "../hooks/useUser";

import AmountPanel from "./AmountPanel";
import NESButton from "./Button";
import ExchangeChipModal from "./ExchangeChipModal";

export default function Exchange() {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnMsg, setBtnMsg] = useState("ENTER AMOUNT!");
  const { solBalance } = useUser();

  const handleSetStakingAmount = (amount?: number) => {
    if (amount === undefined) {
      setAmount(undefined);
      return;
    }
    // Discrete amount round downed to 2 decimal places
    const descreteAmount = BigNumber(amount)
      .multipliedBy(100)
      .integerValue(BigNumber.ROUND_DOWN)
      .dividedBy(100)
      .toNumber();
    setAmount(descreteAmount);
  };

  const amountInChips = amount
    ? BigNumber(amount).multipliedBy(100).toNumber()
    : 0;

  useEffect(() => {
    if (amount === undefined || amount === 0) {
      setBtnMsg("ENTER AMOUNT!");
    } else if (amount > solBalance) {
      setBtnMsg("INSUFFICIENT SOL!");
    } else {
      setBtnMsg("EXCHANGE NOW!");
    }
  }, [amount, solBalance]);

  return (
    <div className="max-w-[700px] relative flex flex-col gap-8 mt-[40px] mb-[80px]">
      <img src="/exchange-sign.gif" alt="exchange-sign" className="mx-[75px]" />
      <img src="/exchange-image.png" alt="exchange-image" className="w-full" />
      <img
        src="blinking-neonsign.gif"
        alt="blinking-neonsign"
        className="absolute top-[160px] left-[-200px] w-[200px]"
      />
      <div className="flex flex-col gap-13 mx-[60px]">
        <AmountPanel
          title="Stake"
          currency="SOL"
          totalAmount={solBalance ?? 0}
          amount={amount}
          setAmount={handleSetStakingAmount}
        />
        <div className="flex items-center justify-between">
          <span className="text-[24px]">You get</span>
          <div className="flex items-center gap-5">
            <img src="/small-chip.gif" alt="small-chip" className="w-[30px]" />
            <span className="text-white text-[24px]">{`${amountInChips} CHIP${
              amountInChips > 1 ? "S" : ""
            }`}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <div className="flex flex-col text-[10px] text-[#FFFF00]">
          <span>Your SOL is securely staked while you play.</span>
          <span>
            At the end of the round, you can exchange your chips back to SOL.
          </span>
        </div>
        <NESButton
          variant={amount && amount > solBalance ? "red" : "blue"}
          className="w-fit"
          disabled={!amount || amount > solBalance}
          onClick={() => {
            if (amount === undefined || amount === 0) return;
            setIsModalOpen(true);
          }}
        >
          {btnMsg}
        </NESButton>
      </div>
      <ExchangeChipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)} // TODO: Implement exchange(staking) logic
        stakingAmount={amount ?? 0}
        chipAmount={amountInChips}
      />
    </div>
  );
}
