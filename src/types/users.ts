export type UserStatus = "loading" | "not_connected" | "connected" | "staked" | "participated" | "error";

export type UserRequest = {
  round?: number;
  address: string;
}

export type UserInfo = {
  address: string;
  rank: number;
  availableUSD: number;
  totalEstimatedUSD: number;
}
