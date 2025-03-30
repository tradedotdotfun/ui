interface LogoSectionProps {
  className?: string;
  isMobile?: boolean;
}

const LogoSection = ({ className = "", isMobile }: LogoSectionProps) => {
  return (
    <div className={`flex flex-col justify-center ${className}`}>
      {isMobile ? (
        <img src="/pepe-punch.gif" alt="pepe-punch" className="w-[128px]" />
      ) : (
        <img src="/logo.png" alt="logo" />
      )}

      <div className="mt-[44px] text-[28px] text-[#FFF828]">
        STAKE YOUR{" "}
        <span className="font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          SOL
        </span>{" "}
        <br />
        WHERE YOUR{" "}
        <span className="font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
          CROWN
        </span>{" "}
        IS!
      </div>
    </div>
  );
};

export default LogoSection;
