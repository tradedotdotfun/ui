import { PriceResponse } from "../api/trade";
import { MarketType } from "../types/markets";

export const priceOfMarket = (market: MarketType, prices: PriceResponse) => {
  if (market === "SOL") {
    return prices.solana;
  }
  if (market === "BTC") {
    return prices.bitcoin;
  }
  if (market === "ETH") {
    return prices.ethereum;
  }
  return 0;
};
