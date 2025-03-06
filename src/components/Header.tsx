import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import NESButton from "./Button";

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="w-full flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-white text-[16px]">TRADE DOT. FUN</Link>
      </div>
      {!isMobile && <NESButton variant="primary">Connect Wallet</NESButton>}
    </header>
  );
}
