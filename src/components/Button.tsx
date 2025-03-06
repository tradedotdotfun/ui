import { ButtonHTMLAttributes } from 'react';

type NESButtonProps = {
  variant?: 'default' | 'primary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles = `
  font-retro
  py-2 px-4
  border-r-4 border-b-4
`;

const variantStyles = {
  default: `
    bg-white
    text-black
    border-[#ADAFBC]
    hover:bg-[#DCDCDC]
    active:border-r-0
    active:border-b-0
    active:border-l-4
    active:border-t-4
  `,
  primary: `
    bg-[#1F9CEC]
    text-white
    border-[#006CB2]
    hover:bg-[#0F8DE0]
    active:border-r-0
    active:border-b-0
    active:border-l-4
    active:border-t-4
  `,
};

export default function NESButton({
  variant = 'default',
  className = '',
  children,
  ...props
}: NESButtonProps) {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}