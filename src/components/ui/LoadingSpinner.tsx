"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
  variant?: "spinner" | "dots" | "pulse";
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12"
};

const SpinnerVariant = ({ size, className }: { size: string; className?: string }) => (
  <motion.div
    className={`border-2 border-gray-200 border-t-orange-500 rounded-full ${size} ${className}`}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

const DotsVariant = ({ size, className }: { size: string; className?: string }) => {
  const dotSize = size === "w-4 h-4" ? "w-1 h-1" : size === "w-6 h-6" ? "w-1.5 h-1.5" : "w-2 h-2";

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${dotSize} bg-orange-500 rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );
};

const PulseVariant = ({ size, className }: { size: string; className?: string }) => (
  <motion.div
    className={`bg-orange-500 rounded-full ${size} ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

export const LoadingSpinner = memo(({
  size = "md",
  className = "",
  text,
  variant = "spinner"
}: LoadingSpinnerProps) => {
  const sizeClass = sizeClasses[size];

  const renderSpinner = () => {
    switch (variant) {
      case "dots":
        return <DotsVariant size={sizeClass} className={className} />;
      case "pulse":
        return <PulseVariant size={sizeClass} className={className} />;
      default:
        return <SpinnerVariant size={sizeClass} className={className} />;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-8"
      role="status"
      aria-label={text || "Loading content"}
    >
      {renderSpinner()}
      {text && (
        <motion.p
          className="mt-3 text-sm text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";

// Preset loading spinner for common use cases
export const PageLoadingSpinner = () => (
  <LoadingSpinner
    size="lg"
    text="Loading page..."
    className="text-orange-500"
    variant="spinner"
  />
);

export const SectionLoadingSpinner = () => (
  <LoadingSpinner
    size="md"
    text="Loading content..."
    variant="dots"
  />
);

export const InlineLoadingSpinner = () => (
  <LoadingSpinner
    size="sm"
    variant="pulse"
    className="inline-block"
  />
);
