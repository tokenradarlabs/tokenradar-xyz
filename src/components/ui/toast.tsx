"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onDismiss: (id: string) => void;
}

const toastVariants = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-black",
  info: "bg-blue-500 text-white",
};

const Toast: React.FC<ToastProps> = ({ id, message, type, onDismiss }) => {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      className={cn(
        "relative flex items-center justify-between p-4 rounded-md shadow-lg mb-2 w-full max-w-sm",
        toastVariants[type]
      )}
    >
      <span>{message}</span>
      <button
        onClick={() => onDismiss(id)}
        className="ml-4 p-1 rounded-full hover:bg-opacity-80 transition-opacity"
        aria-label={`Dismiss notification: ${message}`}
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export default Toast;
