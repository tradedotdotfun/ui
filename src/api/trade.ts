import { CandlestickData, Time } from "lightweight-charts";
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
