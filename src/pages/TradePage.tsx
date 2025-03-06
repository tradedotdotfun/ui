import Footer from "../components/Footer";
import Header from "../components/Header";
import Ticker from "../components/Ticker";

export default function TradePage() {
  return (
    <div className="min-h-screen bg-black text-white font-retro flex flex-col items-center">
      <Header />
      <Ticker />
      <Footer />
    </div>
  );
}
