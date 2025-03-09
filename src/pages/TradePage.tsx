import { useEffect } from "react";
import Chart from "../components/Chart";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RoundInfo from "../components/LeagueInfo";
import MyPosition from "../components/MyPosition";
import Ticker from "../components/Ticker";
import TradeExecutionPanel from "../components/TradeExecutionPanel";

export default function TradePage() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-retro flex flex-col items-center">
      <Header />
      <Ticker />
      <div 
      className="w-full max-w-[1280px] p-5 sm:px-10 sm:py-20 
      flex flex-col justify-center items-center gap-5">
        <RoundInfo />
        <Chart />
        <TradeExecutionPanel />
        <MyPosition />
      </div>
      <Footer />
    </div>
  );
}
