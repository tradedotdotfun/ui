import { useState } from "react";
import { MarketType } from "../types/markets";
import NESButton from "./Button";
import CoinIcon from "./CoinIcon";
import ModalBase from "./ModalBase";

type MarketSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (market: MarketType) => void;
  currentMarket: MarketType;
};

export default function MarketSelectionModal({ isOpen, onClose, onConfirm, currentMarket }: MarketSelectionModalProps) {
  if (!isOpen) return null;
  const [selectedMarket, setSelectedMarket] = useState<MarketType>(currentMarket);

  const markets = ["SONIC", "SOL", "BTC", "ETH"];

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Choose a market to compete in!">
      <div className="flex justify-center items-end gap-8 mb-4">
        {markets.map((market) => (
          <div
            key={market}
            className="flex flex-col items-center gap-3 cursor-pointer"
            onClick={() => setSelectedMarket(market as MarketType)}>
            {
              selectedMarket === market && (<img src="/selected_market_arrow.svg" alt="selected_market_arrow" />)
            }
            <CoinIcon symbol={market} className="w-16 h-16" />
            <p className="text-white text-[12px]">{market}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 sm:gap-6">
        <NESButton
          fontSize="small"
          audio="cancel"
          onClick={onClose}>
          Cancel
        </NESButton>
        <NESButton
          variant="primary"
          fontSize="small"
          onClick={() => onConfirm(selectedMarket)}>
          Confirm
        </NESButton>
      </div>
    </ModalBase>
  );
}
