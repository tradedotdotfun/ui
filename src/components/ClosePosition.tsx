import { useLocation, useNavigate } from "react-router-dom";
import { Position } from "../types/positions";
import RetroBox from "./RetroBox";
import { Market } from "../types/markets";
import NESButton from "./Button";
import Divider from "./Divider";
import AmountPanel from "./AmountPanel";
import { useEffect, useState } from "react";


type ClosePositionBoxProps = {
  position: Position;
  market?: Market;
  onClickCancel?: () => void;
  onClickConfirm?: (percentage: number) => void;
};

function ClosePositionBox({ position, market, onClickCancel, onClickConfirm }: ClosePositionBoxProps) {
  const [closingAmount, setClosingAmount] = useState<number | undefined>(undefined);
  const [formattedEstimatedPnL, setFormattedEstimatedPnL] = useState<string>("");
  const pnlPercentage = position.pnl * 100;
  const formattedEntryPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(position.entryPrice);
  const formattedMarkPrice = market ?
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(market.price) :
    "N/A";

  useEffect(() => {
    scroll(0, 0);
  }, []);

  useEffect(() => {
    if (closingAmount === undefined) {
      return;
    }

    const amount = closingAmount || 0;
    setFormattedEstimatedPnL(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(position.pnl * amount));
  }, [closingAmount]);

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-9">
      <div className="flex items-center">
        <img src={`${position.market}.png`} alt={position.market} className="w-5 h-5 sm:w-10 sm:h-10" />
        <p className="text-white text-[12px] sm:text-[32px] ml-2 sm:ml-5">{position.market}</p>
        {
          position.side === "long" ?
            <p className="text-[#2DBD85] text-[10px] sm:text-[24px] ml-3 sm:ml-10 capitalize-first">{`${position.side} ${position.leverage}x`}</p> :
            <p className="text-[#F6455D] text-[10px] sm:text-[24px] ml-3 sm:ml-10 capitalize-first">{`${position.side} ${position.leverage}x`}</p>
        }
      </div>

      <div className="flex justify-between items-start 
      text-white text-[10px] sm:text-[16px] lg:text-[24px]">
        <p>Entry Price</p>
        <p>{formattedEntryPrice}</p>
      </div>
      <div className="flex justify-between items-start 
      text-white text-[10px] sm:text-[16px] lg:text-[24px]">
        <p>Mark Price</p>
        <p>{formattedMarkPrice}</p>
      </div>

      <Divider char="-" />

      <AmountPanel
        totalAmount={position.size}
        amount={closingAmount}
        setAmount={setClosingAmount}
      />

      <Divider char="-" />

      <div className="flex flex-row justify-between items-start">
        <p className="text-[#FFF828] text-[10px] sm:text-[24px]">{"Estimated PNL"}</p>

        <div className="self-end flex flex-col text-right gap-1 sm:gap-5">
          {
            position.pnl > 0 ?
              <>
                <p className="text-[#2DBD85] text-[10px] sm:text-[24px]">{`${formattedEstimatedPnL === "" ? "-" : "+"}${formattedEstimatedPnL}`}</p>
                <p className="text-[#2DBD85] text-[8px] sm:text-[16px]">{`+${pnlPercentage.toFixed(2)}%`}</p>
              </> :
              position.pnl < 0 ?
                <>
                  <p className="text-[#F6455D] text-[10px] sm:text-[24px]">{`${formattedEstimatedPnL === "" ? "-" : ""}${formattedEstimatedPnL}`}</p>
                  <p className="text-[#F6455D] text-[8px] sm:text-[16px]">{`${pnlPercentage.toFixed(2)}%`}</p>
                </> :
                <>
                  <p className="text-white text-[10px] sm:text-[24px]">{`+$0.00`}</p>
                  <p className="text-white text-[8px] sm:text-[16px]">{`+0.00%`}</p>
                </>
          }
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-5 items-start">
        <NESButton
          className="self-start w-full sm:flex-1/3"
          onClick={onClickCancel}>Cancel</NESButton>
        <NESButton
          variant="green"
          className="self-end w-full sm:flex-2/3"
          onClick={() => {
            if (closingAmount === undefined) {
              return;
            }
            onClickConfirm?.(Math.round(closingAmount / position.size * 10000)/100);
          }}>Confirm</NESButton>
      </div>
    </div>
  )
}

export default function ClosePosition() {
  const location = useLocation();
  const navigate = useNavigate();

  const { position, market } = (location.state as { position?: Position, market?: Market }) || {};

  const handleClickCancel = () => {
    navigate(-1);
  }
  const handleClickConfirm = (percentage: number) => {
    console.log(position?.id);
    console.log(percentage);
  }

  if (!position) {
    window.location.href = '/';
    return null;
  }

  return (
    <div
      className="w-full p-5 sm:px-10 sm:py-20">
      <div className="w-full border-[4px] border-white p-1 sm:p-[6px]">
        <RetroBox
          className="w-full">
          <div
            className="border-[4px] border-white p-5 sm:px-13 sm:py-11
              flex flex-col gap-6">
            <div className="flex flex-col text-left sm:pl-7 overflow-x-hidden">
              <div className="flex items-center justify-center">
                <p className="text-[10px] sm:text-[18px] lg:text-[24px] text-white">
                  CLOSE POSITION
                </p>
              </div>
            </div>
            <ClosePositionBox 
              position={position} 
              market={market}
              onClickCancel={handleClickCancel}
              onClickConfirm={handleClickConfirm}
            />
          </div>
        </RetroBox>
      </div>
    </div>
  );
}
