import { ButtonHTMLAttributes } from 'react';

type NESButtonProps = {
  variant?: 'default' | 'primary' | 'green' | 'red';
  fontSize?: 'default' | 'small';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles = `
  font-retro
  py-2 px-4
  border-r-4 border-b-4
  active:border-r-0
  active:border-b-0
  active:border-l-4
  active:border-t-4
`;

const variantStyles = {
  default: `
    text-black
    bg-white
    border-[#ADAFBC]
    hover:bg-[#DCDCDC]
    hover:border-[#ADAFBC]
    active:bg-[#DCDCDC]
    active:border-[#ADAFBC]
  `,
  primary: `
    text-white
    bg-[#1F9CEC]
    border-[#006CB2]
    hover:bg-[#0F8DE0]
    hover:border-[#006CB2]
    active:bg-[#0F8DE0]
    active:border-[#006CB2]
  `,
  green: `
    text-white
    bg-[#2DBD85]
    border-[#1B704F]
    hover:bg-[#29AB78]
    hover:border-[#15573D]
    active:bg-[#29AB78]
    active:border-[#15573D]
  `,
  red: `
    text-white
    bg-[#F6455D]
    border-[#8F2836]
    hover:bg-[#E84158]
    hover:border-[#75212C]
    active:bg-[#E84158]
    active:border-[#75212C]
  `
};

export default function NESButton({
  variant = 'default',
  fontSize = 'default',
  className = '',
  children,
  ...props
}: NESButtonProps) {
  const fontStyle = fontSize === 'default' ? 
  "text-[16px] sm:text-[22px]" : 
  "text-[10px] sm:text-[14px]";
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${fontStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}