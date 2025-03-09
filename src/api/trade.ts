import apiClient from "./index.ts";

export type PriceResponse = {
  "solana": number;
  "bitcoin": number;
  "ethereum": number;
}

export const fetchPrices: () => Promise<PriceResponse | undefined> = async () => {
  const response = await apiClient.get("/price/all");
  return response.data;
};
