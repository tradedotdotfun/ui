import { MarketPrices } from "../api/trade";
import { MarketType } from "../types/markets";

export const priceOfMarket = (market: MarketType, prices: MarketPrices) => {
  if (market === "SONIC") {
    return prices.SONICUSDT;
  }
  if (market === "SOL") {
    return prices.SOLUSDT;
  }
  if (market === "BTC") {
    return prices.BTCUSDT;
  }
  if (market === "ETH") {
    return prices.ETHUSDT;
  }
  return 0;
};

export const coinIdToMarket = (coinId: string): MarketType => {
  if (coinId === "SONICUSDT") {
    return "SONIC";
  }
  if (coinId === "SOLUSDT") {
    return "SOL";
  }
  if (coinId === "BTCUSDT") {
    return "BTC";
  }
  if (coinId === "ETHUSDT") {
    return "ETH";
  }
  return "SOL";
}
