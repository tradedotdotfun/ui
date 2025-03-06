import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import TextButton from "./TextButton";

export default function MainLogo() {
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full flex flex-col items-center p-4 text-center overflow-x-hidden">
      {
        isMobile
          ? (<img src='/pepe-punch.gif' alt="pepe-punch" className="w-[128px]" />)
          : (<img src="/tradedotfun_logo.png" alt="Main Logo" className="w-[894px] mt-[120px]" />)
      }

      <div className="mt-[44px] text-[28px] text-[#FFF828]">
        Are You the Next{" "}
        <span className="font-bold animate-pulse text-[#FFF828]">
          100x
        </span>{" "}
        Trader?
      </div>

      <p className="text-[12px] mt-[20px] mb-[60px]">
        Enter with just{" "}
        <span className="font-bold animate-pulse bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          0.1 SOL
        </span>{" "}
        and prove your trading skills.
      </p>

      <Link to="/trade">
        <TextButton>
          <img src="/triangle_pixel.svg" alt="Insert Coin" className="mr-[16px]" />
          <p className="text-white font-bold sm:text-[22px]">INSERT COIN</p>
        </TextButton>
      </Link>

      <small className="text-[#FFF828] text-[10px] mt-2 mb-[60px]">Entry Fee: 0.1 SOL</small>

      {
        !isMobile && (
          <>
            <img src="/pepe-box.gif" alt="pepe-box" className="w-[180px] absolute top-[196px] left-[calc(50%-606px)]" />
            <img src="/pepe-punch.gif" alt="pepe-punch" className="w-[180px] absolute top-[240px] right-[calc(50%-606px)] transform -scale-x-100" />
            <img src="/pepe-dance.gif" alt="pepe-dance" className="w-[215px] absolute top-[410px] left-[calc(50%-380px)]" />
            <img src="/happycat.gif" alt="happycat" className="w-[113px] absolute top-[480px] right-[calc(50%-280px)]" />
          </>
        )
      }
    </div>
  );
}
