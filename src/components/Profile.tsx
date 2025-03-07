import Divider from "./Divider";
import RetroBox from "./RetroBox";

export default function Profile({ address }: { address: string }) {
  const balance = 42123.45;
  const formattedBalance = balance.toLocaleString();
  const rank = 11;
  const pnl = balance - 10000;
  const pnlPercentage = pnl / 10000 * 100;

  const formatRank = (rank: number) => {
    if (rank >= 11 && rank <= 13) {
      return `${rank}th`;
    } else if (rank % 10 === 1) {
      return `${rank}st`;
    } else if (rank % 10 === 2) {
      return `${rank}nd`;
    } else if (rank % 10 === 3) {
      return `${rank}rd`;
    } else {
      return `${rank}th`;
    }
  };

  return (
    <div className="border-4 border-white p-[6px]">
      <RetroBox className="w-full">
        <div
          className="border-4 p-5 sm:px-10 sm:py-8 w-80 sm:w-120
          flex flex-col gap-3">
          <p className="text-lg text-left mb-6">My Profile</p>
          <div className="flex gap-5 items-center justify-center">
            <img src="/popcat.gif" alt="profile" className="w-[30px] h-[30px] rounded-[15px]" />
            <p>{address.slice(0, 4) + "..." + address.slice(-4)}</p>
          </div>
          <div className="flex gap-5 items-center justify-center">
            <img src="/coin.gif" alt="coin" className="h-[30px]" />
            <p>{`${formattedBalance} funUSD`}</p>
          </div>
          <div className="flex gap-5 justify-center">
            <img src="/trophy.gif" alt="coin" className="h-[30px]" />
            <p>{`RANK: ${formatRank(rank)}`}</p>
          </div>
          <Divider char="^" color="text-[#FFFF00]" />
          <div className="flex px-4 sm:px-8 justify-between">
            <p>PNL: </p>
            {
              pnl > 0
                ? <p className="text-green-500">{`+${pnlPercentage.toFixed(2)}%`}</p>
                : pnl < 0 ?
                  <p className="text-red-500">{`${pnlPercentage.toFixed(2)}%`}</p>
                  : <p>{`${pnlPercentage.toFixed(2)}%`}</p>
            }
          </div>
        </div>
      </RetroBox>
    </div >
  );
}
