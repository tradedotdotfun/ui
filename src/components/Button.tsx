import { ButtonHTMLAttributes, useRef } from "react";

type NESButtonProps = {
  variant?: "default" | "primary" | "green" | "red" | "blue";
  fontSize?: "default" | "small";
  audio?: "default" | "cancel";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles = `
  font-retro
  py-2 px-4
  border-r-4 border-b-4
  active:enabled:border-r-0
  active:enabled:border-b-0
  active:enabled:border-l-4
  active:enabled:border-t-4
  disabled:!cursor-not-allowed
`;

const variantStyles = {
  default: `
    text-black
    bg-white
    border-[#ADAFBC]
    hover:enabled:bg-[#DCDCDC]
    hover:enabled:border-[#ADAFBC]
    active:enabled:bg-[#DCDCDC]
    active:enabled:border-[#ADAFBC]
  `,
  primary: `
    text-white
    bg-[#1F9CEC]
    border-[#006CB2]
    hover:enabled:bg-[#0F8DE0]
    hover:enabled:border-[#006CB2]
    active:enabled:bg-[#0F8DE0]
    active:enabled:border-[#006CB2]
  `,
  green: `
    text-white
    bg-[#2DBD85]
    border-[#1B704F]
    hover:enabled:bg-[#29AB78]
    hover:enabled:border-[#15573D]
    active:enabled:bg-[#29AB78]
    active:enabled:border-[#15573D]
  `,
  red: `
    text-white
    bg-[#F6455D]
    border-[#8F2836]
    hover:enabled:bg-[#E84158]
    hover:enabled:border-[#75212C]
    active:enabled:bg-[#E84158]
    active:enabled:border-[#75212C]
  `,
  blue: `
    text-white
    bg-[#0077FF]
    border-[#003C80]
    hover:enabled:bg-[#005FCC]
    hover:enabled:border-[#003066]
    active:enabled:bg-[#005FCC]
    active:enabled:border-[#003066]
  `,
};

export default function NESButton({
  variant = "default",
  fontSize = "default",
  audio = "default",
  className = "",
  children,
  onClick,
  ...props
}: NESButtonProps) {
  const audioFileName =
    audio === "default" ? "/sonic-ring-sound-1.mp3" : "/sonic-ring-sound-2.mp3";
  const audioRef = useRef(new Audio(audioFileName));

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    audioRef.current.currentTime = 0; // 클릭할 때마다 처음부터 재생
    audioRef.current.play();

    if (onClick) {
      onClick(e);
    }
  };

  const fontStyle =
    fontSize === "default"
      ? "text-[16px] sm:text-[22px]"
      : "text-[10px] sm:text-[14px]";
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${fontStyle} ${className}`}
      {...props}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
