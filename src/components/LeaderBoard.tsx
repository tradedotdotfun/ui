import { useIsMobile } from "../hooks/useIsMobile";
import RetroBox from "./RetroBox";

export default function LeaderBoard() {
  const isMobile = useIsMobile();

  const ranks = [
    { rank: 1, name: "@solana", profit: "+10,000%" },
    { rank: 2, name: "@seoulana_kr", profit: "+9,500%" },
    { rank: 3, name: "@toly", profit: "+8,000%" },
    { rank: 4, name: "@jito", profit: "+7,500%" },
    { rank: 5, name: "@bonk", profit: "+7,000%" },
    { rank: 6, name: "@happycat", profit: "+6,600%" },
    { rank: 7, name: "@chillguy", profit: "+6,000%" },
    { rank: 8, name: "@ai16z", profit: "+5,500%" },
    { rank: 9, name: "@pumpdotfun", profit: "+5,200%" },
    { rank: 10, name: "@ironman", profit: "+5,000%" },
  ];

  const formatRank = (rank: number) => {
    if (rank === 1) return "1st";
    if (rank === 2) return "2nd";
    if (rank === 3) return "3rd";
    return `${rank}th`;
  };

  return (
    <div className="w-full relative flex flex-col items-center pt-[40px] pb-[80px] px-4 overflow-x-hidden">
      <RetroBox className="w-full max-w-[600px]">
        <div className="border-[4px] border-[#777176] flex flex-col items-center justify-center text-left px-6 sm:px-14 pt-8 pb-14">
          <img src="/trophy.gif" alt="trophy" className="w-10 h-10 mb-3" />
          <p className="text-[#59D6BF] text-[10px] sm:text-[16px]">High Scores</p>
          <div className="mt-9 flex justify-between w-full">
            <div className="flex items-center gap-5">
              <p className="text-[#E9FA0E] text-[10px] sm:text-[16px]">RANK</p>
              <p className="text-[#E9FA0E] text-[10px] sm:text-[16px]">NAME</p>
            </div>
            <p className="text-[#E9FA0E]  text-[10px] sm:text-[16px]">PNL</p>
          </div>
          <div className="w-full flex flex-col gap-7 mt-7 mb-9">
            {ranks.map(({ rank, name, profit }) => {
              const rankStyle =
                rank === 1
                  ? 'text-[#D2180B]'
                  : rank === 2
                    ? 'text-[#F76B3E]'
                    : rank === 3
                      ? 'text-[#3112D8]'
                      : 'text-white';
              return (
                <div key={rank} className={`flex items-center justify-between w-full ${rank === 1 ? 'bg-[#FFFF00]' : ''}`}>
                  <div className="flex items-center gap-5">
                    <p
                      className={`w-10 sm:w-20 ${rankStyle} text-[10px] sm:text-[16px]`}
                    >
                      {formatRank(rank)}
                    </p>
                    <p className={`text-[10px] sm:text-[16px] ${rankStyle}`}>{name}</p>
                  </div>
                  <p className={`${rankStyle} text-[10px] sm:text-[16px]`}>{profit}</p>
                </div>
              )
            })}
          </div>
          <div className="w-full text-white text-[10px] sm:text-[16px] text-left">
            <span>Only the strongest survive.</span>
            <br />
            <span>Will it be you?</span>
            <img src="/sword.gif" alt="sword" className="w-6 h-6 inline-block ml-1" />
          </div>
          {/* <NESButton className="mt-11 text-[14px] sm:text-[16px]">View all</NESButton> */}
        </div>
      </RetroBox>
      {
        !isMobile ?
          <>
            <img src="/fighter_game.gif" alt="fighter_game" className="absolute left-[calc(50%-720px)] top-[104px] w-[400px]" />
            <img src="/racing_game.gif" alt="racing_game" className="absolute right-[calc(50%-720px)] top-[77px] w-[400px]" />
          </> :
          undefined
      }
    </div>
  );
}
