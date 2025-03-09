export type MarketType = "SOL" | "BTC" | "ETH";

export const marketToCoinId = {
  SOL: "solusdt",
  BTC: "btcusdt",
  ETH: "ethusdt",
};

export type Market = {
  id: string;
  type: MarketType;
  name: string;
  price: number;
  change: number;
}
