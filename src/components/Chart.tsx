import { CandlestickSeries, createChart, IChartApi } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

import { useChartData } from "../hooks/useChartData";
import { useIsMobile } from "../hooks/useIsMobile";
import { usePrices } from "../hooks/usePrices";
import { MarketType } from "../types/markets";
import { formatCurrency } from "../utils/formatCurrency";
import { priceOfMarket } from "../utils/prices";

import ArrowButtonIcon from "./ArrowButton";
import CoinIcon from "./CoinIcon";
import MarketSelectionModal from "./MarketSelectionModal";
import RetroBox from "./RetroBox";

type ChartProps = {
  market: MarketType;
  setMarket: (market: MarketType) => void;
};

export default function Chart({ market, setMarket }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const isMobile = useIsMobile();
  const { data: prices } = usePrices();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: chartData, refetch: refetchChartData } = useChartData(market);

  useEffect(() => {
    refetchChartData();
  }, [market]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#000000" },
        textColor: "#FFFFFF",
      },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    if (chartData) {
      candlestickSeries.setData(chartData);
    }

    chart.timeScale().fitContent();

    // 리사이즈 옵저버 설정
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.applyOptions({ width, height });
      chart.timeScale().fitContent();
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect(); // 옵저버 정리
      chart.remove();
    };
  }, [chartData]);

  return (
    <div className="w-full border-[4px] border-white p-1 sm:p-[6px]">
      <RetroBox className="w-full">
        <div
          className="border-[4px] border-white p-5 sm:px-13 sm:py-7
          flex flex-col gap-6"
        >
          <div className="w-full flex">
            <div className="flex-1 flex flex-col text-left">
              <p className="text-[12px] sm:text-[24px] text-white">
                CURRENT PRICE
              </p>
              <p className="text-[12px] sm:text-[24px] text-white">
                {prices
                  ? `${formatCurrency(priceOfMarket(market, prices))}`
                  : "-"}
              </p>
            </div>
            <div
              className="flex gap-2 sm:gap-5 items-center cursor-pointer arrow-container"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="flex flex-col text-right">
                <p className="text-[12px] sm:text-[24px] text-white">{`${market}`}</p>
                <p className="text-[12px] sm:text-[24px] text-white">TRADE</p>
              </div>
              <CoinIcon symbol={market} className="w-8 h-8 sm:w-16 sm:h-16" />
              {isMobile ? (
                <img
                  src="/selected_market_arrow.svg"
                  alt="selected_market_arrow"
                />
              ) : (
                <div className="arrow-button">
                  <ArrowButtonIcon />
                </div>
              )}
            </div>
          </div>
          <div
            ref={chartContainerRef}
            className="w-full h-[320px] sm:h-[400px]"
          ></div>
        </div>
      </RetroBox>
      <MarketSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(market) => {
          setMarket(market);
          setIsModalOpen(false);
        }}
        currentMarket={market}
      />
    </div>
  );
}
