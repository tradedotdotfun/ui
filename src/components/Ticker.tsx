import { useLeaderBoard } from "../hooks/useLeaderBoard";
import { formatAddress } from "../utils/address";

export default function Ticker() {
  const { data: leaderboard } = useLeaderBoard();

  const items = leaderboard ?? [];

  const renderedItems = items.map((item) => (
    <span key={item.rank} className="mx-[6px] inline-block bg-black px-[10px] py-[7px] font-retro text-white text-[10px]">
      <span className="mr-2">#{item.rank}</span>
      <span className="mr-2">{item.name === "" ? formatAddress(item.address) : "@" + item.name}</span>
      <span className="text-green-500">{`${(item.roi*100).toFixed(2)}%`}</span>
    </span>
  ));

  return (
    <div className="flex justify-start py-[6px] overflow-hidden whitespace-nowrap bg-gradient-to-r from-[#0000FF] to-[#26A3ED] w-full">
      <div className="animate-marquee inline-flex">
        {renderedItems}
        {renderedItems} {/* 중복 렌더링하여 무한스크롤 효과 */}
      </div>
    </div>
  );
}