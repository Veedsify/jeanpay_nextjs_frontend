"use client";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Info, Warning, X } from "@phosphor-icons/react";

interface ToastProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  type,
  message,
  duration = 5000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-600" size={20} />;
      case "error":
        return <XCircle className="text-red-600" size={20} />;
      case "warning":
        return <Warning className="text-yellow-600" size={20} />;
      case "info":
        return <Info className="text-blue-600" size={20} />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <div
        className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${getBgColor()} min-w-80`}
      >
        {getIcon()}
        <p className="flex-1 text-gray-800">{message}</p>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
