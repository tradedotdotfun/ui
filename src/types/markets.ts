export type MarketType = "SOL" | "BTC" | "ETH";

export type Market = {
  id: string;
  type: MarketType;
  name: string;
  price: number;
  change: number;
}
