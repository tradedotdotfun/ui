import apiClient from "./index.ts";

export type MarketPrices = {
  "SOLUSDT": number;
  "BTCUSDT": number;
  "ETHUSDT": number;
}

export const fetchPrices: () => Promise<MarketPrices | undefined> = async () => {
  const response = await apiClient.get("/price/all");

  return response.data;
};
