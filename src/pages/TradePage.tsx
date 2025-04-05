import { useEffect, useState } from "react";

import Chart from "../components/Chart";
import RoundInfo from "../components/LeagueInfo";
import MyPosition from "../components/MyPosition";
import TradeExecutionPanel from "../components/TradeExecutionPanel";
import { MarketType } from "../types/markets";

import PageLayout from "./PageLayout";

const mockPositionList = [
  {
    id: "1",
    market: "SOL" as MarketType,
    side: "long",
    leverage: 10,
    size: 5.5, // size in SOL
    entryPrice: 145.32,
    pnl: 234.56,
    roi: 0.15,
    liquidationPrice: 130.45,
    openAt: "2024-03-07 06:42:40",
    status: "open",
  },
  {
    id: "2",
    market: "ETH" as MarketType,
    side: "short",
    leverage: 20,
    size: 0.92, // size in ETH
    entryPrice: 2171.48,
    pnl: -59.18,
    roi: -0.029,
    liquidationPrice: 2280.05,
    openAt: "2024-03-07 06:42:40",
    status: "open",
  },
  {
    id: "3",
    market: "BTC" as MarketType,
    side: "long",
    leverage: 15,
    size: 0.15, // size in BTC
    entryPrice: 67234.12,
    pnl: 1205.34,
    roi: 0.089,
    liquidationPrice: 63450.21,
    openAt: "2024-03-07 06:42:40",
    status: "open",
  },
];

export default function TradePage() {
  const [market, setMarket] = useState<MarketType>("SOL");

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <div
        className="w-full max-w-[1280px] p-5 sm:px-10 sm:py-20 
      flex flex-col justify-center items-center gap-5"
      >
        <RoundInfo />
        <Chart market={market} setMarket={setMarket} />
        <TradeExecutionPanel market={market} />
        {/* @ts-ignore */}
        <MyPosition positionList={mockPositionList} />
      </div>
    </PageLayout>
  );
}
