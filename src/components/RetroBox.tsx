import { ReactNode } from "react";

interface RetroBoxProps {
  className?: string;
  children: ReactNode;
}

export default function RetroBox({ className, children }: RetroBoxProps) {
  return (
    <div className={`w-fit h-fit relative ${className}`}>
      {children}
      <div className="absolute top-[-1px] left-[-1px] w-[6px] h-[6px] bg-black"></div>
      <div className="absolute top-[-1px] right-[-1px] w-[6px] h-[6px] bg-black"></div>
      <div className="absolute bottom-[-1px] left-[-1px] w-[6px] h-[6px] bg-black"></div>
      <div className="absolute bottom-[-1px] right-[-1px] w-[6px] h-[6px] bg-black"></div>
    </div>
  );
}
