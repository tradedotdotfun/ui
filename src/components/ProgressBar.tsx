import { useRef } from "react";
import RetroBox from "./RetroBox";

type ProgressBarProps = {
  min?: number;
  max?: number;
  value: number;
  steps?: number[];
  prefix?: string;
  suffix?: string;
  onChange?: (value: number) => void;
};

export default function ProgressBar({
  min = 0,
  max = 100,
  value,
  steps = [0, 25, 50, 75, 100],
  prefix = "",
  suffix = "%",
  onChange,
}: ProgressBarProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const barRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef(new Audio("/sonic-ring-sound-1.mp3"));

  const handleClickSound = () => {
    audioRef.current.currentTime = 0; // 클릭할 때마다 처음부터 재생
    audioRef.current.play();
  }

  const handleClickBar = (e: React.MouseEvent<HTMLDivElement>) => {
    handleClickSound();
    if (!barRef.current || !onChange) return;

    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // 클릭한 위치의 X좌표 (픽셀)
    const newPercentage = clickX / rect.width; // 클릭한 위치를 백분율로 변환
    const newValue = min + newPercentage * (max - min);

    onChange(Math.round(newValue)); // 정수값으로 반올림
  };

  return (
    <>
      <RetroBox className="w-full">
        <div
          ref={barRef}
          onClick={handleClickBar}
          className="w-full border-4 border-white p-[6px] cursor-pointer">
          <div
            className="bg-white h-7 sm:h-11"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </RetroBox>

      <div className="flex justify-between text-[10px] sm:text-[12px] text-white mt-3 select-none">
        {steps.map((step) => (
          <span
            key={`Progressbar-${step}`}
            className={`cursor-pointer ${step === value ? 'font-bold' : ''}`}
            onClick={() => {
              handleClickSound();
              onChange && onChange(step);
            }}
          >
            {`${prefix}${step}${suffix}`}
          </span>
        ))}
      </div>
    </>
  );
}
