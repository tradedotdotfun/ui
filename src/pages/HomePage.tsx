import CurrentStats from "../components/CurrentStats";
import Hero from "../components/Hero";
import LeaderBoard from "../components/LeaderBoard";

import PageLayout from "./PageLayout";

function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <CurrentStats />
      <LeaderBoard />
    </PageLayout>
  );
}

export default HomePage;
