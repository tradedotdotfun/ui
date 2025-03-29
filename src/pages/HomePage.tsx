import CurrentStats from "../components/CurrentStats";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import LeaderBoard from "../components/LeaderBoard";
import Ticker from "../components/Ticker";

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white font-retro flex flex-col items-center">
      <Header />
      <Ticker />
      <Hero />
      <CurrentStats />
      <LeaderBoard />
      <Footer />
    </div>
  );
}

export default HomePage;
