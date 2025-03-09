import { MarketType } from "./markets";

export type Position = {
  id: string;
  market: MarketType;
  side: "long" | "short";
  leverage: number;
  size: number; // In coin
  entryPrice: number;
  pnl: number;
  roi: number;
  liquidationPrice: number;
  openAt: string;
  closeAt?: string;
  status: "open" | "closed";
}
