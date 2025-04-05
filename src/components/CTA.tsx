import { UserStatus } from "../types/users";

import TextButton from "./TextButton";

interface CTAProps {
  className?: string;
  status: UserStatus;
  onClickTextButton?: (status: UserStatus) => void;
}

export default function CTA({
  className,
  status,
  onClickTextButton,
}: CTAProps) {
  let statusToMsg = "";
  let statusToSubMsg = "";
  switch (status) {
    case "loading":
      statusToMsg = "LOADING";
      break;
    case "not_connected":
      statusToMsg = "CONNECT WALLET";
      break;
    case "connected":
      statusToMsg = "STAKE & GET CHIPS";
      statusToSubMsg = "Stake 0.001 SOL → 1 CHIP";
      break;
    case "staked":
      statusToMsg = "BUY IN YOUR CHIP!";
      break;
    case "participated":
      statusToMsg = "ENTER THE LEAGUE";
      statusToSubMsg = "Your league awaits - keep trading!";
      break;
    case "error":
      statusToMsg = "ERROR";
      break;
  }

  return (
    <div className="mb-[60px]">
      <TextButton
        className={`flex items-center ${className}`}
        onClick={() => onClickTextButton && onClickTextButton(status)}
      >
        <img
          src="/triangle_pixel.svg"
          alt="Insert Coin"
          className="mr-[16px]"
        />
        <p className="text-white font-bold text-sm sm:text-[22px]">
          {statusToMsg}
        </p>
      </TextButton>
      {statusToSubMsg !== "" && (
        <small className="text-[#C3F92B] text-[10px] mt-2">
          {statusToSubMsg}
        </small>
      )}
    </div>
  );
}
