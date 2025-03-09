import apiClient from "./index.ts";
import { UserInfo, UserRequest } from "../types/users.ts";
import { Position } from "../types/positions.ts";
import { coinIdToMarket } from "../utils/prices.ts";

export const fetchUser: (request: UserRequest) => Promise<UserInfo | undefined> = async ({
  round = 0,
  address,
}) => {
  const response = await apiClient.get(`/account?round=${round}&address=${"7ENEt33c362bZVcxdgR4A1wNnffwSWHawan935Qw9Vya"}`);
  // const response = await apiClient.get(`/account?round=${round}&address=${address}`);

  if (response.data.length === 0) {
    return undefined;
  }

  return {
    address,
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
export const fetchPositions: (request: UserRequest) => Promise<Position[]> = async ({
  round = 0,
  address,
}) => {
  const response = await apiClient.get(`/position?round=${round}&address=${"7ENEt33c362bZVcxdgR4A1wNnffwSWHawan935Qw9Vya"}`);
  // const response = await apiClient.get(`/position?round=${round}&address=${address}`);

  if (response.data.length === 0) {
    return [];
  }

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
}
