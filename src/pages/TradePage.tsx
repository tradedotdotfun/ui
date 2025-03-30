import { useEffect, useState } from "react";

import Chart from "../components/Chart";
import RoundInfo from "../components/LeagueInfo";
import MyPosition from "../components/MyPosition";
import TradeExecutionPanel from "../components/TradeExecutionPanel";
import { MarketType } from "../types/markets";

import PageLayout from "./PageLayout";

export default function TradePage() {
  const [market, setMarket] = useState<MarketType>("SONIC");

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
        <MyPosition />
      </div>
    </PageLayout>
  );
}
