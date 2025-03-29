import { createContext, useContext } from "react";

import { ToastType } from "../components/Toast";

interface ToastContextType {
  showToast: (type: ToastType, message: string, subMessages?: string[]) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
