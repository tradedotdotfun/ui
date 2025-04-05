import { Position } from "../types/positions.ts";
import { UserInfo, UserRequest } from "../types/users.ts";
import { coinIdToMarket } from "../utils/prices.ts";

import apiClient from "./index.ts";

export const updateName = async (
  name: string,
  pubkey: string,
  msg: string,
  signature: string
) => {
  // X-Auth-Pubkey: {pubkey}
  // X-Auth-Message: {msg}
  // X-Auth-Signature: {signature}
  apiClient.defaults.headers.common["X-Auth-Pubkey"] = pubkey;
  apiClient.defaults.headers.common["X-Auth-Message"] = msg;
  apiClient.defaults.headers.common["X-Auth-Signature"] = signature;

  await apiClient.post("/account/name", { name });
};

export const fetchUser: (
  request: UserRequest
) => Promise<UserInfo | undefined> = async ({ round = 0, address }) => {
  // const response = await apiClient.get(`/account?round=${round}&address=${"7ENEt33c362bZVcxdgR4A1wNnffwSWHawan935Qw9Vya"}`);
  const response = await apiClient.get(
    `/account?round=${round}&address=${address}`
  );

  console.log("response", response);

  if (response.data.length === 0) {
    return undefined;
  }

  return {
    address,
    rank: response.data["rank"],
    availableUSD: response.data["usd_amount"],
    totalEstimatedUSD: response.data["estimated_total_amount"],
  };
};

// "id": 1,
// "type": "short",
// "leverage": 20,
// "amount": 100,
// "token": "ethereum",
// "entry_price": 2171.48,
// "position_size": 0.9210308176911599,
// "liquidation_price": 2280.054,
// "pnl": -59.18544034483375,
// "percent": -2.9592720172416875,
// "created_dt": "2025-03-07 06:42:40"
export const fetchPositions: (
  request: UserRequest
) => Promise<Position[]> = async ({ round = 0, address }) => {
  // const response = await apiClient.get(`/position?round=${round}&address=${"7ENEt33c362bZVcxdgR4A1wNnffwSWHawan935Qw9Vya"}`);
  const response = await apiClient.get(
    `/position?round=${round}&address=${address}`
  );

  if (!response.data || response.data.length === 0) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.data.map((position: any) => ({
    id: position["id"],
    market: coinIdToMarket(position["token"]),
    side: position["type"],
    leverage: position["leverage"],
    size: position["position_size"], // size in coin
    // margin: position["leverage"] * position["amount"], // initial margin in USD
    entryPrice: position["entry_price"],
    pnl: position["pnl"],
    roi: position["roi"],
    liquidationPrice: position["liquidation_price"],
    openAt: position["created_dt"],
    status: "open",
  }));
};
