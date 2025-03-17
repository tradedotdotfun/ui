import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NESButton from "../components/Button";
import Header from "../components/Header";
import RetroBox from "../components/RetroBox";
import { useUserInfo } from '../hooks/useUser';

const formatRank = (rank: number): string => {
  if (rank === 1) return "1st";
  if (rank === 2) return "2nd";
  if (rank === 3) return "3rd";
  return `${rank}th`;
};

const formatNumber = (n: number): string => {
  const fixed = n.toFixed(2);
  return fixed.endsWith(".00") ? Math.floor(n).toString() : fixed;
};

type SocialTick = "x" | "tickTock";

type Social = {
  type: SocialTick;
  name: string;
};

const SOCIAL_LOGO_MAP = {
  x: "/x.png",
  tickTock: "/tickTock.png",
};

const ProfileBox = ({
  name,
  rank,
  pnl,
  sns,
  follower,
  points,
  tier,
  daoLink,
  referralLink,
  profileImage,
  description,
}: {
  name: string;
  rank: number;
  pnl: number;
  sns: Social[];
  follower: number;
  points: number;
  tier: string;
  daoLink: string;
  referralLink: string;
  profileImage: string;
  description: string;
}) => {
  const isProfit = pnl > 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <RetroBox className="flex flex-col items-center justify-center mt-[80px] mb-[120px]">
        <div className="w-[342px] md:w-[680px] border-[4px] border-[#EEEEE] flex flex-col items-start p-[24px] text-[16px] gap-y-[36px]">
          <div>player</div>
          <div className="w-full h-full border-[4px] border-[#EEEEE] flex flex-col md:p-[28px] p-[16px] items-start">
            <div className="flex justify-between w-full">
              <div>
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-[96px] h-[96px] rounded-full"
                />
              </div>
              <div className="flex flex-col items-end">
                <img
                  src="/trophy.gif"
                  alt="trophy"
                  className="w-[25.5px] h-[25.5px] mb-3"
                />
                <p className="text-white text-[12px] md:text-sm">
                  Rank: {formatRank(rank)}
                </p>
                <p
                  className={`text-white text-[12px] md:text-sm ${
                    isProfit ? "text-[#59D6BF]" : "text-[#E12400]"
                  }`}
                >
                  PNL:
                  <span
                    className={isProfit ? "text-[#00C950]" : "text-[#F6455D]"}
                  >
                    {isProfit ? "+" : "-"}
                    {formatNumber(pnl)}%
                  </span>
                </p>
              </div>
            </div>
            <p className="text-white text-[16px] md:text-[20px]   mt-[20px] md:mt-[28px] font-bold">
              @{name}
            </p>
            <div className="flex md:gap-y-[12px] md:gap-x-[20px] md:flex-row flex-col justify-start mt-[12px]">
              {sns.map((s) => (
                <div
                  className="flex items-center md:gap-x-[8px] md:mt-[32px] md:text-[16px] text-[12px]"
                  key={s.type}
                >
                  <img src={SOCIAL_LOGO_MAP[s.type]} alt={s.type} />
                  <p>@{s.name}</p>
                </div>
              ))}
            </div>
            <div className="hidden md:block mt-[36px] text-[24px] w-full text-[#FBB042]">
              ^^^^^^^^^^^^^^^^^
            </div>
            <div className="block md:hidden mt-[36px] text-center text-[20px] w-full text-[#FBB042]">
              ^^^^^^^^^^^
            </div>
            <div className="flex md:gap-x-[48px] gap-x-[24px] mt-[36px] w-full justify-center items-center md:text-[12px] text-[8px]">
              <div className="flex flex-col items-center gap-x-[8px] gap-y-[20px]">
                <p className="md:text-[20px] text-[16px]">{follower}</p>
                <p>follower</p>
              </div>
              <div className="flex flex-col items-center gap-x-[8px] gap-y-[20px]">
                <p className="md:text-[20px] text-[16px]">{points}</p>
                <p>points(rings)</p>
              </div>
              <div className="flex flex-col items-center gap-x-[8px] gap-y-[20px]">
                <p className="md:text-[20px] text-[16px]">{tier}</p>
                <p>tier</p>
              </div>
            </div>
            <div className="mt-[36px] flex text-left">
              <p
                className="text-[12px] md:text-[16px]"
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
              <NESButton
                variant="default"
                className="w-full md:w-fit h-[36px]"
                fontSize="small"
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                }}
              >
                SHARE LINK
              </NESButton>
              <NESButton
                variant="blue"
                className="w-full md:w-fit h-[36px] whitespace-nowrap"
                fontSize="small"
                onClick={() => {
                  navigator.clipboard.writeText(daoLink);
                }}
              >
                JOIN {name}'s DAO
              </NESButton>
            </div>

            <div className="hidden md:block mt-[36px] text-[24px] w-full text-[#FBB042]">
              ^^^^^^^^^^^^^^^^^
            </div>
            <div className="block md:hidden mt-[36px] text-center text-[20px] w-full text-[#FBB042]">
              ^^^^^^^^^^^
            </div>
          </div>
        </div>
      </RetroBox>
    </div>
  );
};

export default function ProfilePage() {
  const { address } = useParams<{ address: string }>();

  const { data: user, isLoading } = useUserInfo(address ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }


  const INITIAL_BALANCE = 10000;

  const rank = user.rank;
  const pnl = user.totalEstimatedUSD - INITIAL_BALANCE;
  const pnlPercentage = pnl / INITIAL_BALANCE * 100;
  console.log(pnlPercentage);
  
  return (
    <div>
      <Header />
      <ProfileBox
        name="John Doe"
        rank={rank}
        pnl={pnlPercentage}
        sns={[
          { type: "x", name: "John Doe223" },
          { type: "tickTock", name: "John Doe333" },
        ]}
        follower={100}
        points={100}
        tier="S"
        daoLink="https://www.google.com"
        referralLink="https://www.google.com"
        profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrUfiySJr8Org5W-oE2v3_i7VqufglYtSdqw&s"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      />
    </div>
  );
}
