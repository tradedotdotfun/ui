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

  return (
    <>
      <RetroBox className="w-full">
        <div className="w-full border-4 border-white p-[6px]">
          <div
            className="bg-white h-11"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </RetroBox>

      <div className="flex justify-between text-[12px] text-white mt-3 select-none">
        {steps.map((step) => (
          <span
            key={step}
            className={`cursor-pointer ${step === value ? 'font-bold' : ''}`}
            onClick={() => onChange && onChange(step)}
          >
            {`${prefix}${step}${suffix}`}
          </span>
        ))}
      </div>
    </>
  );
}
