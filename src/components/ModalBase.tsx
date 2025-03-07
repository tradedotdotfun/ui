export type ModalBaseProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export default function ModalBase({ isOpen, onClose, title, children }: ModalBaseProps) {
  if (!isOpen) return null;

  const handleClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-[#00000080] z-50"
      onClick={handleClickBackground}>
      <div className="
      bg-[#212529] border-4 border-white p-5 sm:px-10 sm:py-8 w-80 sm:w-120
      flex flex-col gap-9">
        <p className="text-white text-[16px] text-left">{title}</p>
        {children}
      </div>
    </div>
  );
}
