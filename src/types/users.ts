export type UserRequest = {
  round?: number;
  address: string;
}

export type UserInfo = {
  address: string;
  availableUSD: number;
  totalEstimatedUSD: number;
}
