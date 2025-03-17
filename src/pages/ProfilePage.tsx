import NESButton from "../components/Button";
import Header from "../components/Header";
import RetroBox from "../components/RetroBox";

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
  pln,
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
  pln: number;
  sns: Social[];
  follower: number;
  points: number;
  tier: string;
  daoLink: string;
  referralLink: string;
  profileImage: string;
  description: string;
}) => {
  const isProfit = pln > 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <RetroBox className="flex flex-col items-center justify-center mt-[80px] mb-[120px]">
        <div className="w-[680px] h-[782px] border-[4px] border-[#EEEEE] flex flex-col items-start p-[24px] text-[16px] gap-y-[36px]">
          <div>player</div>
          <div className="w-full h-full border-[4px] border-[#EEEEE] flex flex-col p-[28px] items-start">
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
                <p className="text-white text-sm">Rank: {formatRank(rank)}</p>
                <p
                  className={`text-white text-sm ${
                    isProfit ? "text-[#59D6BF]" : "text-[#E12400]"
                  }`}
                >
                  PNL:
                  <span
                    className={isProfit ? "text-[#00C950]" : "text-[#F6455D]"}
                  >
                    {isProfit ? "+" : "-"}
                    {formatNumber(pln)}%
                  </span>
                </p>
              </div>
            </div>
            <p className="text-white text-[20px] mt-[28px] font-bold">
              @{name}
            </p>
            <div className="flex gap-y-[12px] gap-x-[20px]">
              {sns.map((s) => (
                <div
                  className="flex items-center gap-x-[8px] mt-[32px] text-[16px]"
                  key={s.type}
                >
                  <img src={SOCIAL_LOGO_MAP[s.type]} alt={s.type} />
                  <p>@{s.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-[36px] text-[24px] w-full text-[#FBB042]">
              ^^^^^^^^^^^^^^^^^
            </div>
            <div className="flex gap-x-[48px] mt-[36px] w-full justify-center items-center text-[12px]">
              <div className="flex flex-col items-center gap-x-[8px] gap-y-[20px]">
                <p className="text-[20px]">{follower}</p>
                <p>follower</p>
              </div>
              <div className="flex flex-col items-center gap-x-[8px] gap-y-[20px]">
                <p className="text-[20px]">{points}</p>
                <p>points(rings)</p>
              </div>
              <div className="flex flex-col items-center gap-x-[8px] gap-y-[20px]">
                <p className="text-[20px]">{tier}</p>
                <p>tier</p>
              </div>
            </div>
            <div className="mt-[36px] flex text-left">
              <p
                className="text-[16px] leading-[100%] tracking-[0%]"
                style={{
                  fontFamily: "Press Start 2P",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                {description}
              </p>
            </div>
            <div className="mt-[36px] flex gap-x-[36px] w-full justify-center">
              <NESButton
                variant="default"
                className="w-fit h-[36px]"
                fontSize="small"
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                }}
              >
                SHARE LINK
              </NESButton>
              <NESButton
                variant="blue"
                className="w-fit h-[36px]"
                fontSize="small"
                onClick={() => {
                  navigator.clipboard.writeText(daoLink);
                }}
              >
                JOIN {name}'s DAO
              </NESButton>
            </div>

            <div className="mt-[36px] text-[24px] w-full text-[#FBB042]">
              ^^^^^^^^^^^^^^^^^
            </div>
          </div>
        </div>
      </RetroBox>
    </div>
  );
};

export default function ProfilePage() {
  return (
    <div>
      <Header />
      <ProfileBox
        name="John Doe"
        rank={3}
        pln={10.3544}
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
