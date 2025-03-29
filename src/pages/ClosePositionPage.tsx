import { useEffect } from "react";

import ClosePosition from "../components/ClosePosition";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Ticker from "../components/Ticker";

export default function ClosePositionPage() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-retro flex flex-col items-center">
      <Header />
      <Ticker />
      <ClosePosition />
      <Footer />
    </div>
  );
}
