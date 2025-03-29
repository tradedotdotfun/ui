import React, { useState } from 'react';

import NESButton from './Button';

export type ToastType = 'success' | 'error';

interface ToastProps {
  type: ToastType;
  message: string;
  subMessages: string[];
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  subMessages,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      className={`fixed top-5 right-5 z-50 w-[500px] border-[4px] border-white px-7 py-5 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        } bg-black`}
    >
      <div className="flex justify-between items-start">
        <div className="w-full">
          <h3 className={`mb-1 text-[16px] text-left font-bold ${type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </h3>
          {subMessages.map((msg, idx) => {
            return <p key={`toast-sub-${idx}`} className="text-white text-[16px] text-left">{msg}</p>
          })}
        </div>
        <NESButton
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="relative w-[38px] h-[38px] px-0 py-0 text-[14px]"
        >
          <p className="absolute top-[8px] left-[10px] text-[14px]">{"X"}</p>
        </NESButton>
      </div>
    </div>
  );
};

export default Toast; 