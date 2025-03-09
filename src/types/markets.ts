export type MarketType = "SOL" | "BTC" | "ETH";

export const marketToCoinId = {
  SOL: "solana",
  BTC: "bitcoin",
  ETH: "ethereum",
};

export type Market = {
  id: string;
  type: MarketType;
  name: string;
  price: number;
  change: number;
}
