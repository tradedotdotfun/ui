import NESButton from "./Button";
import ModalBase from "./ModalBase";

type ExchangeChipModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  stakingAmount: number;
  chipAmount: number;
};

export default function ExchangeChipModal({
  isOpen,
  onClose,
  onConfirm,
  stakingAmount,
  chipAmount,
}: ExchangeChipModalProps) {
  if (!isOpen) return null;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="CONFIRM YOUR EXCHANGE!">
      <img src="/chip.gif" alt="chip" className="w-auto h-24 mx-auto" />

      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="text-white text-[14px]">You're staking</span>
          <span className="text-white text-[14px]">{`${stakingAmount} SOL`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white text-[14px]">You'll get</span>
          <span className="text-white text-[14px]">{`${chipAmount} CHIP${
            chipAmount > 1 ? "S" : ""
          }`}</span>
        </div>
      </div>

      <div className="flex justify-center gap-3 sm:gap-6">
        <NESButton fontSize="small" audio="cancel" onClick={onClose}>
          Cancel
        </NESButton>
        <NESButton
          variant="primary"
          fontSize="small"
          onClick={() => onConfirm()}
          className="!text-[12px] w-fit whitespace-nowrap"
        >
          CONFIRM & GET CHIPS
        </NESButton>
      </div>
    </ModalBase>
  );
}
