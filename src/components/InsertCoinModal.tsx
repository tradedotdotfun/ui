import NESButton from "./Button";
import ModalBase from "./ModalBase";

type InsertCoinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function InsertCoinModal({
  isOpen,
  onClose,
  onConfirm,
}: InsertCoinModalProps) {
  if (!isOpen) return null;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <div className="text-white text-[16px] text-left flex flex-col gap-2">
        <div>DROP A CHIP,</div>
        <div>GET 10,000 funUSD,</div>
        <div>LET'S TRADE!</div>
      </div>

      <img src="/chip.gif" alt="chip" className="w-auto h-24 mx-auto" />

      <p className="text-white text-[16px] text-center">1 CHIP TO PLAY</p>

      <div className="flex justify-center gap-3 sm:gap-6">
        <NESButton fontSize="small" audio="cancel" onClick={onClose}>
          Cancel
        </NESButton>
        <NESButton
          variant="primary"
          fontSize="small"
          onClick={() => onConfirm()}
        >
          LET'S PLAY!
        </NESButton>
      </div>
    </ModalBase>
  );
}
