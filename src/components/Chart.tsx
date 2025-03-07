import { useEffect, useRef, useState } from "react";
import { CandlestickSeries, createChart, IChartApi } from "lightweight-charts";
import RetroBox from "./RetroBox";
import ArrowButtonIcon from "./ArrowButton";
import { MarketType } from "../types/markets";
import MarketSelectionModal from "./MarketSelectionModal";
import { useIsMobile } from "../hooks/useIsMobile";
import CoinIcon from "./CoinIcon";

export default function Chart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const isMobile = useIsMobile();

  const [market, setMarket] = useState<MarketType>('SOL');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeries.setData([
      { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
      { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
      { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
      { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
      { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
      { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
      { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
      { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
      { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
      { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
    ]);

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
  }, []);

  return (
    <div className="w-full border-[4px] border-white p-1 sm:p-[6px]">
      <RetroBox
        className="w-full">
        <div
          className="border-[4px] border-white p-5 sm:px-13 sm:py-7
          flex flex-col gap-6">
          <div className="w-full flex">
            <div className="flex-1 flex flex-col text-left">
              <p className="text-[12px] sm:text-[24px] text-white">CURRENT PRICE</p>
              <p className="text-[12px] sm:text-[24px] text-white">$145.2</p>
            </div>
            <div
              className="flex gap-2 sm:gap-5 items-center cursor-pointer arrow-container"
              onClick={() => setIsModalOpen(true)}>
              <div className="flex flex-col text-right">
                <p className="text-[12px] sm:text-[24px] text-white">{`${market}`}</p>
                <p className="text-[12px] sm:text-[24px] text-white">TRADE</p>
              </div>
              <CoinIcon symbol={market} className="w-8 h-8 sm:w-16 sm:h-16" />
              {
                isMobile ?
                  <img src="/selected_market_arrow.svg" alt="selected_market_arrow" /> :
                  <div className="arrow-button">
                    <ArrowButtonIcon />
                  </div>
              }
            </div>
          </div>
          <div ref={chartContainerRef} className="w-full h-[320px] sm:h-[400px]"></div>
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