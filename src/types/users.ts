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
