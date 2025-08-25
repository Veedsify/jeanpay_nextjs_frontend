import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
}: ButtonProps) {
  const baseClasses = [
    "inline-flex items-center justify-center",
    "font-medium transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "border border-transparent",
    "rounded-md", // consistent border radius
    fullWidth && "w-full",
  ];

  const variantClasses = {
    primary: [
      "bg-primary-500 text-white",
      "hover:bg-primary-600 active:bg-primary-700",
      "focus:ring-primary-500",
      "shadow-sm",
    ],
    secondary: [
      "bg-white text-gray-700",
      "border-gray-300 hover:bg-gray-50",
      "focus:ring-primary-500",
      "shadow-sm",
    ],
    tertiary: [
      "bg-transparent text-primary-500",
      "hover:bg-primary-50",
      "focus:ring-primary-500",
    ],
    danger: [
      "bg-red-600 text-white",
      "hover:bg-red-700 active:bg-red-800",
      "focus:ring-red-500",
      "shadow-sm",
    ],
    success: [
      "bg-green-600 text-white",
      "hover:bg-green-700 active:bg-green-800",
      "focus:ring-green-500",
      "shadow-sm",
    ],
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const iconClasses = cn(
    "flex-shrink-0",
    size === "sm" && "w-4 h-4",
    size === "md" && "w-5 h-5",
    size === "lg" && "w-6 h-6",
  );

  const renderIcon = () => {
    if (loading) {
      return (
        <svg
          className={cn(iconClasses, "animate-spin")}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      );
    }

    if (icon) {
      return <div className={iconClasses}>{icon}</div>;
    }

    return null;
  };

  const iconElement = renderIcon();

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {iconElement && iconPosition === "left" && (
        <span className={cn(children && "mr-2")}>{iconElement}</span>
      )}
      {children}
      {iconElement && iconPosition === "right" && (
        <span className={cn(children && "ml-2")}>{iconElement}</span>
      )}
    </button>
  );
}

// Button group component for consistent spacing
export function ButtonGroup({
  children,
  className = "",
  orientation = "horizontal",
}: {
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  const groupClasses = cn(
    "flex",
    orientation === "horizontal" ? "space-x-2" : "flex-col space-y-2",
    className,
  );

  return <div className={groupClasses}>{children}</div>;
}

// Icon button component for consistent icon-only buttons
export function IconButton({
  children,
  variant = "secondary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  loading = false,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  "aria-label": string;
}) {
  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(sizeClasses[size], className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
      loading={loading}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
}
