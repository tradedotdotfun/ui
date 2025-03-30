import BigNumber from "bignumber.js";
import { Link } from "react-router-dom";

import { useUserInfo } from "../hooks/useUser";
import { formatAddress } from "../utils/address";
import { formatBalance } from "../utils/numbers";
import { formatRank } from "../utils/rank";

import AddressCopy from "./AddressCopy";
import NESButton from "./Button";
import Divider from "./Divider";
import RetroBox from "./RetroBox";

type SocialTick = "x" | "tickTock";

type Social = {
  type: SocialTick;
  name: string;
};

const SOCIAL_LOGO_MAP = {
  x: "/x.png",
  tickTock: "/tickTock.png",
};

interface UserProfileProps {
  address: string;
}

export default function UserProfile({ address }: UserProfileProps) {
  const { data: userInfo } = useUserInfo(address);

  if (!userInfo) return null;
  const INITIAL_BALANCE = 10000;

  const rank = userInfo.rank;
  const pnl = userInfo.totalEstimatedUSD - INITIAL_BALANCE;
  const pnlPercentage = BigNumber(pnl)
    .div(INITIAL_BALANCE)
    .multipliedBy(100)
    .toNumber();

  // DummyData
  const sns: Social[] = [
    {
      type: "x",
      name: "fwogfun",
    },
    {
      type: "tickTock",
      name: "fwogfun",
    },
  ];
  const follower = "10k";
  const points = "19,390";
  const tier = "S";
  const description =
    "I don’t just trade—I dominate. Every liquidation I cause is just another step toward the throne. 👑 Watch me stack chips while others get rekt. Whether you’re here to compete or just to witness greatness, remember one thing: The crown isn’t given, it’s taken. And I’m here to take it. 💰🔥";

  // Share
  const shareUrl = encodeURIComponent(window.location.href);
  const xShare = `https://x.com/intent/tweet?url=${shareUrl}&text=Check out this user's trading profile at TradeDotFun!`;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <RetroBox className="flex flex-col items-center justify-center mt-[80px] mb-[120px]">
        <div className="w-[342px] md:w-[680px] border-[4px] border-[#EEEEE] flex flex-col items-start p-5 text-[16px] gap-y-[36px]">
          <div>Player</div>
          <div className="w-full border-[4px] border-[#EEEEE] flex flex-col gap-9 p-3 sm:p-6">
            <div className="flex flex-col items-start">
              <div className="flex justify-between w-full">
                <div>
                  <img
                    src="/default-profile.png"
                    alt="profile"
                    className="w-[96px] h-[96px] object-cover"
                  />
                </div>
                <div className="flex flex-col items-end">
                  <img
                    src="/trophy.gif"
                    alt="trophy"
                    className="w-[25.5px] h-[25.5px] mb-3"
                  />
                  <p className="text-white h-8 flex items-center text-[12px] md:text-sm">
                    Rank: {formatRank(rank)}
                  </p>
                  <p
                    className={`text-white h-8 flex items-center text-[12px] md:text-sm ${
                      pnl === 0
                        ? "text-white"
                        : pnl > 0
                        ? "text-[#59D6BF]"
                        : "text-[#E12400]"
                    }`}
                  >
                    PNL:
                    <span
                      className={
                        pnl === 0
                          ? "text-white"
                          : pnl > 0
                          ? "text-[#00C950]"
                          : "text-[#F6455D]"
                      }
                    >
                      {pnl > 0 ? "+" : ""}
                      {formatBalance(pnlPercentage, 2)}%
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-white text-sm sm:text-[20px] md:text-[20px] mt-[20px] md:mt-[28px] font-bold">
                <AddressCopy address={address} label="" shortenAddress={true} />
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-5 justify-start">
                {sns.map((s) => (
                  <div
                    className="flex items-center md:gap-x-[8px] md:text-[16px] text-[12px]"
                    key={s.type}
                  >
                    <img src={SOCIAL_LOGO_MAP[s.type]} alt={s.type} />
                    <p>@{s.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[80%] self-center">
              <Divider char="^" color="text-[#FBB042]" />
            </div>

            <div className=" w-full flex md:gap-x-[48px] gap-x-6 justify-center items-center md:text-[12px] text-[8px]">
              <div className="flex flex-col items-center gap-x-2 gap-y-5">
                <p className="md:text-[20px] text-[16px]">{follower}</p>
                <p>follower</p>
              </div>
              <div className="flex flex-col items-center gap-x-2 gap-y-5">
                <p className="md:text-[20px] text-[16px]">{points}</p>
                <p>points</p>
              </div>
              <div className="flex flex-col items-center gap-x-2 gap-y-5">
                <p className="md:text-[20px] text-[16px]">{tier}</p>
                <p>tier</p>
              </div>
            </div>
            <div className="flex text-left">
              <p
                className="text-[12px] sm:text-[16px]"
                style={{
                  fontFamily: "Press Start 2P",
                  fontWeight: "400",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                {description}
              </p>
            </div>
            <div
              className="mt-[36px] flex md:gap-x-[36px] gap-x-[24px] w-full justify-center
                flex-col md:flex-row gap-y-[12px]
            "
            >
              <Link to={xShare} target="_blank" rel="noopener noreferrer">
                <NESButton
                  variant="default"
                  className="w-full md:w-fit h-[36px]"
                  fontSize="small"
                >
                  SHARE LINK
                </NESButton>
              </Link>
              <NESButton
                variant="blue"
                className="w-full md:w-fit h-[36px] whitespace-nowrap"
                fontSize="small"
                disabled
              >
                {`JOIN ${formatAddress(address)}'s DAO`}
              </NESButton>
            </div>

            <div className="w-[80%] self-center">
              <Divider char="^" color="text-[#FBB042]" />
            </div>
          </div>
        </div>
      </RetroBox>
    </div>
  );
}
