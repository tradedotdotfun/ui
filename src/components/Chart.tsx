import { useEffect, useRef, useState } from "react";
import { CandlestickSeries, createChart } from "lightweight-charts";
import RetroBox from "./RetroBox";
import ArrowButtonIcon from "./ArrowButton";

export default function Chart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [coin, setCoin] = useState('SOL');

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#000000" },
        textColor: "#FFFFFF",
      },
      // grid: {
      //   vertLines: { color: "rgba(255, 255, 255, 0.1)" },
      //   horzLines: { color: "rgba(255, 255, 255, 0.1)" },
      // },
      // crosshair: {
      //   mode: 1, // Normal mode
      // },
      // rightPriceScale: {
      //   borderColor: "rgba(255, 255, 255, 0.5)",
      // },
      // timeScale: {
      //   borderColor: "rgba(255, 255, 255, 0.5)",
      // },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
      wickUpColor: '#26a69a', wickDownColor: '#ef5350',
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
    
    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div className="w-full border-[4px] border-white p-3">
      <RetroBox className="w-full border-[4px] border-white px-14 py-8 flex flex-col gap-6">
        <div className="w-full flex">
          <div className="flex-1 flex flex-col text-left">
            <p className="text-[24px] text-white">CURRENT PRICE</p>
            <p className="text-[24px] text-white">$145.2</p>
          </div>
          <div className="flex flex gap-5 items-center arrow-container">
            <div className="flex flex-col text-right">
              <p className="text-[24px] text-white">SOL</p>
              <p className="text-[24px] text-white">TRADE</p>
            </div>
            <img src={`${coin}.png`} alt="coin" className="w-16 h-16" />
            <div className="arrow-button">
            <ArrowButtonIcon />
            </div>
          </div>
        </div>
        <div ref={chartContainerRef} className="w-full h-[400px]"></div>
      </RetroBox>
    </div>
  );
}