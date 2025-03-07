import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import NESButton from "./Button";

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="w-full h-[60px] flex justify-between items-center px-7">
      <div className="flex items-center gap-1">
        <img src="/fire.gif" alt="fire" className="w-6" />
        <Link to="/" className="text-white text-[16px]">TRADE DOT. FUN</Link>
      </div>
      {!isMobile && <NESButton variant="primary" fontSize="small">Connect Wallet</NESButton>}
    </header>
  );
}
