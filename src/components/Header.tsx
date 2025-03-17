import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Header() {
  const audioRef = useRef(new Audio("/click.mp3")); 
  const handleClick = () => {
    audioRef.current.currentTime = 0; // 클릭할 때마다 처음부터 재생
    audioRef.current.play();
  };

  return (
    <header className="w-full h-[60px] flex justify-between items-center px-7">
      <Link to="/" onClick={handleClick} className="flex items-center gap-1">
        <img src="/fire.gif" alt="fire" className="w-6" />
        <p className="text-white text-[16px]">TRADE DOT. FUN</p>
      </Link>
    </header>
  );
}
