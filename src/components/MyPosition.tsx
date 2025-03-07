import { useNavigate } from "react-router-dom";
import { Market } from "../types/markets";
import { Position } from "../types/positions";
import NESButton from "./Button";
import Divider from "./Divider";
import RetroBox from "./RetroBox";
import CoinIcon from "./CoinIcon";

type TotalPnLProps = {
  pnl: number;
}

function TotalPnLSection({ pnl }: TotalPnLProps) {
  const formattedPnL = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pnl);

  return (
    <div className="flex justify-between items-start">
      <p className="text-[#FFF828] text-[10px] sm:text-[24px]">{"Total PNL(runUSD)"}</p>
      <div className="self-end flex flex-col text-right gap-1 sm:gap-5">
        {
          pnl > 0 ?
            <div className="flex flex-col items-end text-right gap-1 sm:gap-5">
              <p className="text-[#2DBD85] text-[10px] sm:text-[24px]">{`+${formattedPnL}`}</p>
              <img src="/gain.gif" alt="gain" className="h-15" />
            </div> :
            pnl < 0 ?
              <div className="flex flex-col items-end text-right gap-1 sm:gap-5">
                <p className="text-[#F6455D] text-[10px] sm:text-[24px]">{`${formattedPnL}`}</p>
                <img src="/pain.gif" alt="gain" className="h-15" />
              </div> :
              <div className="flex flex-col items-end text-right gap-1 sm:gap-5">
                <p className="text-white text-[10px] sm:text-[24px]">{`+$0.00`}</p>
              </div>
        }
      </div>
    </div>
  )
}

type PositionBoxProps = {
  position: Position;
  market?: Market;
  onClickClosePosition: () => void;
};

function PositionBox({ position, market, onClickClosePosition }: PositionBoxProps) {
  const formattedPnL = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(position.pnl * position.size);
  const pnlPercentage = position.pnl * 100;
  const formattedSize = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(position.size);
  const formattedEntryPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(position.entryPrice);
  const formattedMarkPrice = market ?
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(market.price) :
    "N/A";
  const formattedLiqPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(position.liquidationPrice);

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-9">
      <div className="flex items-center">
        <CoinIcon symbol={position.market} className="w-5 h-5 sm:w-10 sm:h-10" />
        <p className="text-white text-[12px] sm:text-[32px] ml-2 sm:ml-5">{position.market}</p>
        {
          position.side === "long" ?
            <p className="text-[#2DBD85] text-[10px] sm:text-[24px] ml-3 sm:ml-10 capitalize-first">{`${position.side} ${position.leverage}x`}</p> :
            <p className="text-[#F6455D] text-[10px] sm:text-[24px] ml-3 sm:ml-10 capitalize-first">{`${position.side} ${position.leverage}x`}</p>
        }
      </div>
      <div className="flex flex-row justify-between items-start">
        <p className="text-[#FFF828] text-[10px] sm:text-[24px]">{"PNL(runUSD)"}</p>

        <div className="self-end flex flex-col text-right gap-1 sm:gap-5">
          {
            position.pnl > 0 ?
              <>
                <p className="text-[#2DBD85] text-[10px] sm:text-[24px]">{`+${formattedPnL}`}</p>
                <p className="text-[#2DBD85] text-[8px] sm:text-[16px]">{`+${pnlPercentage.toFixed(2)}%`}</p>
              </> :
              position.pnl < 0 ?
                <>
                  <p className="text-[#F6455D] text-[10px] sm:text-[24px]">{`${formattedPnL}`}</p>
                  <p className="text-[#F6455D] text-[8px] sm:text-[16px]">{`${pnlPercentage.toFixed(2)}%`}</p>
                </> :
                <>
                  <p className="text-white text-[10px] sm:text-[24px]">{`+$0.00`}</p>
                  <p className="text-white text-[8px] sm:text-[16px]">{`+0.00%`}</p>
                </>
          }
        </div>
      </div>

      <div className="flex justify-between items-start 
      text-white text-[10px] sm:text-[16px] lg:text-[24px]">
        <p>Size</p>
        <p>{formattedSize}</p>
      </div>
      <div className="flex justify-between items-start 
      text-white text-[10px] sm:text-[16px] lg:text-[24px]">
        <p>Entry Price</p>
        <p>{formattedEntryPrice}</p>
      </div>
      <div className="flex justify-between items-start 
      text-white text-[10px] sm:text-[16px] lg:text-[24px]">
        <p>Mark Price</p>
        <p>{formattedMarkPrice}</p>
      </div>
      <div className="flex justify-between items-start 
      text-white text-[10px] sm:text-[16px] lg:text-[24px]">
        <p>Liq. Price</p>
        <p>{formattedLiqPrice}</p>
      </div>

      <NESButton
        className="self-end"
        fontSize="small"
        onClick={onClickClosePosition}>Close Position</NESButton>
    </div>
  )
}

export default function MyPosition() {
  const navigate = useNavigate();

  const myPostionList: Position[] = [
    {
      id: "1",
      market: "SOL",
      side: "long",
      leverage: 10,
      size: 10930.37,
      entryPrice: 140.00,
      pnl: 0.0197,
      liquidationPrice: 130.00,
      openAt: "2025-01-01T12:00:00Z",
      status: "open",
    },
    {
      id: "2",
      market: "BTC",
      side: "short",
      leverage: 8,
      size: 10930.37,
      entryPrice: 87230.00,
      pnl: -0.08,
      liquidationPrice: 95023.00,
      openAt: "2025-01-02T12:00:00Z",
      status: "open",
    },
    {
      id: "3",
      market: "ETH",
      side: "long",
      leverage: 50,
      size: 10930.37,
      entryPrice: 2100.00,
      pnl: 0,
      liquidationPrice: 2000.00,
      openAt: "2025-01-04T12:00:00Z",
      status: "open",
    },
  ];
  const marketList: Market[] = [
    {
      id: "1",
      type: "SOL",
      name: "SOL",
      price: 142.00,
      change: 0.0197,
    },
    {
      id: "2",
      type: "BTC",
      name: "BTC",
      price: 92230.00,
      change: 0.08,
    },
    {
      id: "3",
      type: "ETH",
      name: "ETH",
      price: 2100.00,
      change: 0,
    }
  ];

  const handleClickClosePosition = (position: Position, market?: Market) => {
    navigate("/close", { state: { position, market } });
  };

  return (
    <div className="w-full border-[4px] border-white p-1 sm:p-[6px]">
      <RetroBox
        className="w-full">
        <div
          className="border-[4px] border-white p-5 sm:px-13 sm:py-11
          flex flex-col gap-6">
          <div className="flex-1/2 flex flex-col text-left sm:pl-7 overflow-x-hidden">
            <div className="flex items-center justify-center">
              <p className="text-[10px] sm:text-[18px] lg:text-[24px] text-white">
                {`==== MY POSTION${myPostionList.length > 1 ? "S" : ""} (${myPostionList.length}) ====`}
              </p>
            </div>
            <div className="w-full">
              <div className="w-full mt-6 sm:mt-11">
                <TotalPnLSection pnl={myPostionList.reduce((acc, cur) => acc + cur.pnl * cur.size, 0)} />
              </div>
              {myPostionList.map((position) => (
                <div key={position.id} className="w-full mt-6 sm:mt-11">
                  <div className="mb-6 sm:mb-11">
                    <Divider char="^" color="text-white" width="100%" />
                  </div>
                  <PositionBox
                    position={position}
                    market={marketList.find(m => m.type === position.market)}
                    onClickClosePosition={() => handleClickClosePosition(position, marketList.find(m => m.type === position.market))} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </RetroBox>
    </div>
  );
}