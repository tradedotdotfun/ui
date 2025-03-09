import Header from '../components/Header';
import Ticker from '../components/Ticker';
import MainLogo from '../components/MainLogo';
import CurrentStats from '../components/CurrentStats';
import LeaderBoard from '../components/LeaderBoard';
import Footer from '../components/Footer';


function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white font-retro flex flex-col items-center">
      <Header />
      <Ticker />
      <MainLogo />
      <CurrentStats />
      <LeaderBoard /> 
      <Footer />
    </div>
  );
};

export default HomePage;
