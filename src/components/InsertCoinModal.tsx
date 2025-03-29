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
    <ModalBase isOpen={isOpen} onClose={onClose} title="INSERT COIN TO JOIN!">
      <img
        src="/sonic-ring.gif"
        alt="sonic-ring"
        className="w-auto h-24 mx-auto"
      />
      <p className="text-white text-[16px] text-center">0.1 SOL TO JOIN</p>
      <p className="text-[#FF0000] text-[16px] text-center">USE DEV NET ONLY</p>

      <div className="flex justify-center gap-3 sm:gap-6">
        <NESButton fontSize="small" audio="cancel" onClick={onClose}>
          Cancel
        </NESButton>
        <NESButton
          variant="primary"
          fontSize="small"
          onClick={() => onConfirm()}
        >
          Confirm
        </NESButton>
      </div>
    </ModalBase>
  );
}
