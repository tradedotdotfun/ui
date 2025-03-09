import { useEffect, useState } from "react";
import { Round } from "../types/rounds";
import RetroBox from "./RetroBox";

export default function RoundInfo() {
  const league: Round = {
    startsAt: "2025-03-07T00:00:00Z",
    endsAt: "2025-03-12T23:59:59Z",
    numOfParticipants: 100,
    totalPrize: 1000,
  };

  const calculateRemainingTime = () => {
    const now = new Date();
    const endAt = new Date(league.endsAt);
    const diff = endAt.getTime() - now.getTime();

    if (diff <= 0) return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      hours,
      minutes,
      seconds,
    }
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
        <p className="text-white text-[16px] sm:text-[32px]">
          <span>{remainingTime.hours.toString().padStart(2, "0")}</span>
          <span className="retro-blink">{" : "}</span>
          <span>{remainingTime.minutes.toString().padStart(2, "0")}</span>
          <span className="retro-blink">{" : "}</span>
          <span>{remainingTime.seconds.toString().padStart(2, "0")}</span>
        </p>
      </div>
    </RetroBox>
  );
}
