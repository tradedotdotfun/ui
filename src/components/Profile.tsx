import { useLogout, useSolanaWallets } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";

import { UserInfo } from "../types/users";
import { formatRank } from "../utils/rank";

import NESButton from "./Button";
import Divider from "./Divider";
import RetroBox from "./RetroBox";

type ProfileProps = {
  user: UserInfo;
};

export default function Profile({ user }: ProfileProps) {
  const { logout } = useLogout();
  const { wallets } = useSolanaWallets();
  const navigate = useNavigate();

  const INITIAL_BALANCE = 10000;

  const address = user.address;
  const balance = user.totalEstimatedUSD;
  const rank = user.rank;
  const formattedBalance = balance.toLocaleString();
  const pnl = user.totalEstimatedUSD - INITIAL_BALANCE;
  const pnlPercentage = (pnl / INITIAL_BALANCE) * 100;

  return (
    <div className="border-4 border-white p-[6px]">
      <RetroBox className="w-full">
        <div
          className="border-4 p-5 sm:px-10 sm:py-8 w-80 sm:w-120
          flex flex-col gap-3"
        >
          <div className="flex flex-row justify-between items-center mb-6">
            <p className="text-lg text-left">My Profile</p>
            <NESButton
              onClick={() => {
                if (wallets.length > 0) {
                  if (wallets[0].walletClientType !== "privy") {
                    wallets[0].disconnect();
                  }
                  logout();
                }
              }}
              className="relative w-[38px] h-[38px] px-0 py-0 text-[14px]"
            >
              <p className="absolute top-[8px] left-[10px] text-[14px]">
                {"X"}
              </p>
            </NESButton>
          </div>
          <div className="flex gap-5 items-center justify-center">
            <img
              src="/popcat.gif"
              alt="profile"
              className="w-[30px] h-[30px] rounded-[15px]"
            />
            <p>{address.slice(0, 4) + "..." + address.slice(-4)}</p>
          </div>
          <div className="flex gap-5 items-center justify-center">
            <img src="/sonic-ring.gif" alt="sonic-ring" className="h-[30px]" />
            <p>{`${formattedBalance} funUSD`}</p>
          </div>

          <Divider char="^" color="text-[#FBB042]" />

          <img src="/trophy.gif" alt="coin" className="self-center h-[30px]" />
          <div className="flex px-4 sm:px-8 justify-between">
            <p>{`RANK: `}</p>
            <p>{formatRank(rank)}</p>
          </div>
          <div className="flex px-4 sm:px-8 justify-between">
            <p>PNL: </p>
            {pnl > 0 ? (
              <p className="text-green-500">{`+${pnlPercentage.toFixed(
                2
              )}%`}</p>
            ) : pnl < 0 ? (
              <p className="text-red-500">{`${pnlPercentage.toFixed(2)}%`}</p>
            ) : (
              <p>{`${pnlPercentage.toFixed(2)}%`}</p>
            )}
          </div>

          <div className="mt-4">
            <NESButton
              onClick={() => navigate(`/profile/${address}`)}
              className="w-full"
              variant="default"
              fontSize="small"
            >
              VIEW PROFILE
            </NESButton>
          </div>
        </div>
      </RetroBox>
    </div>
  );
}
