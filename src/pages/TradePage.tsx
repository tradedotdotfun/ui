import Chart from "../components/Chart";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Ticker from "../components/Ticker";

export default function TradePage() {
  return (
    <div className="min-h-screen bg-black text-white font-retro flex flex-col items-center">
      <Header />
      <Ticker />
      <div 
      className="w-full p-5 sm:px-10 sm:py-20 
      flex flex-col justify-center items-center gap-5">
        <Chart />
      </div>
      <Footer />
    </div>
  );
}
