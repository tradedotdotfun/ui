import { useState } from 'react';

type TextButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

export default function TextButton({ onClick, children }: TextButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleMouseDown = () => setClicked(true);
  const handleMouseUp = () => setClicked(false);

  return (
    <button
      className={`
        font-retro text-xl text-white py-2 px-4 h-[46px]
        flex items-center gap-2
        transition-all duration-100 ease-in-out
        ${clicked ? 'scale-95' : 'scale-100'}
        animate-pulse
        hover:border-4 hover:border-white hover:animate-none
        hover:h-[46px]
      `}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setClicked(false)}
    >
      {children}
    </button>
  );
}
