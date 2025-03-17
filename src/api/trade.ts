import { CandlestickData, Time } from "lightweight-charts";
import apiClient from "./index.ts";

export type MarketPrices = {
  "SONICUSDT": number;
  "SOLUSDT": number;
  "BTCUSDT": number;
  "ETHUSDT": number;
}

export const fetchPrices: () => Promise<MarketPrices | undefined> = async () => {
  const response = await apiClient.get("/price/all");

  return response.data;
};

// Response
// [{
//   "open_time": "2025-03-09T10:00:00Z",
//   "close_time": "2025-03-09T10:59:59.999Z",
//   "open": 85564,
//   "high": 85599.66,
//   "low": 85363.13,
//   "close": 85514.42,
//   "volume": 104.47534
// },
// ...
// ]
export const fetchChartData: (market: string) => Promise<CandlestickData[]> = async (market) => {
  const response = await apiClient.get(`/chart?coin_id=${market}`);
  const chartData = response.data.reverse().map((d: any) => {
    return {
      time: new Date(d["close_time"]).getTime() / 1000 as Time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    };
  });

  return chartData;
}

export const createPosition = async (
  type: "long" | "short",
  leverage: number,
  amountInUsd: number,
  coinId: string,
  pubkey: string,
  msg: string,
  signature: string,
) => {
  apiClient.defaults.headers.common["X-Auth-Pubkey"] = pubkey;
  apiClient.defaults.headers.common["X-Auth-Message"] = msg;
  apiClient.defaults.headers.common["X-Auth-Signature"] = signature;

  console.log("createPosition", type, leverage, amountInUsd, coinId, pubkey, msg, signature);

  const response = await apiClient.post("/position", {
    type,
    leverage,
    amount: amountInUsd,
    token: coinId,
  });

  console.log("createPosition response", response.data);

  return response.data;
}

export const closePosition = async (
  positionId: string,
  percentage: number,
  pubkey: string,
  msg: string,
  signature: string,
) => {
  apiClient.defaults.headers.common["X-Auth-Pubkey"] = pubkey;
  apiClient.defaults.headers.common["X-Auth-Message"] = msg;
  apiClient.defaults.headers.common["X-Auth-Signature"] = signature;

  const response = await apiClient.post(`/position/${positionId}/close`, {
    percentage,
  });

  return response.data;
}
