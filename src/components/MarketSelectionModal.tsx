import { useState } from "react";
import { MarketType } from "../types/markets";
import NESButton from "./Button";

type MarketSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (market: MarketType) => void;
  currentMarket: MarketType;
};

export default function MarketSelectionModal({ isOpen, onClose, onConfirm, currentMarket }: MarketSelectionModalProps) {
  if (!isOpen) return null;
  const [selectedMarket, setSelectedMarket] = useState<MarketType>(currentMarket);

  const markets = ["SOL", "BTC", "ETH"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000080] z-50">
      <div className="
      bg-[#212529] border-4 border-white p-5 sm:px-10 sm:py-8 w-80 sm:w-120
      flex flex-col gap-9">
        <p className="text-white text-[16px] text-left">Choose a market to compete in!</p>
        <div className="flex justify-center items-end gap-8 mb-4">
          {markets.map((market) => (
            <div
              key={market}
              className="flex flex-col items-center gap-3 cursor-pointer"
              onClick={() => setSelectedMarket(market as MarketType)}>
              {
                selectedMarket === market && (<img src="/selected_market_arrow.svg" alt="selected_market_arrow" />)
              }
              <img
                src={`${market}.png`}
                alt={market}
                className={`w-16 h-16`}
              />
              <p className="text-white text-[12px]">{market}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-3 sm:gap-6">
          <NESButton onClick={onClose}>
            Cancel
          </NESButton>
          <NESButton variant="primary" onClick={() => onConfirm(selectedMarket)}>
            Confirm
          </NESButton>
        </div>
      </div>
    </div>
  );
}
