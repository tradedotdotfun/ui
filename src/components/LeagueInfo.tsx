import { useEffect, useState } from "react";
import { League } from "../types/arena";
import RetroBox from "./RetroBox";

export default function LeagueInfo() {
  const league: League = {
    startAt: "2025-03-07T00:00:00Z",
    endAt: "2025-03-07T23:59:59Z",
    numOfParticipants: 100,
    totalPrize: 1000,
  };

  const calculateRemainingTime = () => {
    const now = new Date();
    const endAt = new Date(league.endAt);
    const diff = endAt.getTime() - now.getTime();

    if (diff <= 0) return "00 : 00 : 00";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <RetroBox className="w-fit self-start">
      <div className="flex flex-col p-4 border-4 border-white gap-5">
        <p className="text-white text-[14px] sm:text-[24px]">LEAGUE TIME</p>
        <p className="text-white text-[16px] sm:text-[32px]">{remainingTime}</p>
      </div>
    </RetroBox>
  );
}
