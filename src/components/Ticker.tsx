export default function Ticker() {
  const items = [
    { rank: 1, name: "@elonmusk", profit: "+10,000%" },
    { rank: 2, name: "@satoshi", profit: "+9,500%" },
    { rank: 3, name: "@vitalik", profit: "+8,000%" },
    { rank: 4, name: "@solana", profit: "+7,500%" },
    { rank: 5, name: "@dogecoin", profit: "+7,000%" },
    { rank: 6, name: "@pepecoin", profit: "+6,600%" },
    { rank: 7, name: "@do_kwon", profit: "+6,000%" },
    { rank: 8, name: "@crypto_chan", profit: "+5,500%" },
    { rank: 9, name: "@nakamoto", profit: "+5,200%" },
    { rank: 10, name: "@pumpmaster", profit: "+5,000%" },
  ];

  const renderedItems = items.map((item) => (
    <span key={item.rank} className="mx-[6px] inline-block bg-black px-[10px] py-[7px] font-retro text-white text-[10px]">
      <span className="mr-2">#{item.rank}</span>
      <span className="mr-2">{item.name}</span>
      <span className="text-green-500">{item.profit}</span>
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