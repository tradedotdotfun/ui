import { useRef, useState, useEffect } from "react";
import RetroBox from "./RetroBox";

type ProgressBarProps = {
  min?: number;
  max?: number;
  value: number;
  steps?: number[];  // 표시 목적으로만 사용하고 값 제한에는 사용하지 않음
  prefix?: string;
  suffix?: string;
  onChange?: (value: number) => void;
  precision?: number;  // 소수점 자릿수 정밀도 (기본값: 1)
};

export default function ProgressBar({
  min = 0,
  max = 100,
  value,
  steps = [0, 25, 50, 75, 100],
  prefix = "",
  suffix = "%",
  onChange,
  precision = 0,  // 기본 정밀도 0자리
}: ProgressBarProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const barRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef(new Audio("/sonic-ring-sound-1.mp3"));
  const [isDragging, setIsDragging] = useState(false);

  const handleClickSound = () => {
    audioRef.current.currentTime = 0; // 클릭할 때마다 처음부터 재생
    audioRef.current.play();
  };

  const updateValueFromPosition = (clientX: number) => {
    if (!barRef.current || !onChange) return;

    const rect = barRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width)); // 범위 제한
    const newPercentage = clickX / rect.width; // 클릭한 위치를 백분율로 변환
    const newValue = min + newPercentage * (max - min);
    
    // 연속적인 값 사용, 정밀도에 따라 반올림
    const factor = Math.pow(10, precision);
    const roundedValue = Math.round(newValue * factor) / factor;
    
    // 최소/최대 범위 내로 제한
    const clampedValue = Math.max(min, Math.min(max, roundedValue));
    
    onChange(clampedValue);
  };

  const handleClickBar = (e: React.MouseEvent<HTMLDivElement>) => {
    handleClickSound();
    updateValueFromPosition(e.clientX);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    // 초기 드래그 시작할 때 값 업데이트
    updateValueFromPosition(e.clientX);
  };

  // 전역 이벤트 리스너 설정
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValueFromPosition(e.clientX);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        handleClickSound(); // 드래그 완료 시 사운드 재생
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      <RetroBox className="w-full">
        <div
          ref={barRef}
          onClick={handleClickBar}
          onMouseDown={handleMouseDown}
          className="w-full border-4 border-white p-[6px] cursor-pointer">
          <div
            className="bg-white h-7 sm:h-11 relative"
            style={{ width: `${percentage}%` }}
          >
            {/* 드래그 핸들 (옵션) */}
            <div 
              className={`absolute right-0 top-0 bottom-0 w-4 bg-white 
                          border-r-4 border-white cursor-ew-resize
                          flex items-center justify-center ${isDragging ? 'opacity-100' : 'opacity-0'} 
                          transition-opacity duration-200 hover:opacity-100`}
              style={{ right: -2 }}
            />
          </div>
        </div>
      </RetroBox>

      <div className="flex justify-between text-[10px] sm:text-[12px] text-white mt-3 select-none">
        {/* 스텝은 표시용으로만 사용 */}
        {steps.map((step) => (
          <span
            key={`Progressbar-${step}`}
            className={`cursor-pointer`}
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
