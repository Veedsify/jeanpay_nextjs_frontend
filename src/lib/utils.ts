import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge class names with Tailwind CSS class deduplication
 * @param inputs - Class names to merge
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to conditionally apply classes
 * @param condition - Boolean condition
 * @param trueClasses - Classes to apply when condition is true
 * @param falseClasses - Classes to apply when condition is false
 * @returns Conditional class names
 */
export function conditionalClass(
  condition: boolean,
  trueClasses: string,
  falseClasses: string = "",
) {
  return condition ? trueClasses : falseClasses;
}

/**
 * Utility function to format currency
 * @param amount - Amount to format
 * @param currency - Currency code (NGN, GHS, etc.)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = "NGN") {
  const symbols = {
    NGN: "₦",
    GHS: "GH₵",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const symbol = symbols[currency as keyof typeof symbols] || currency;
  return `${symbol}${amount.toLocaleString()}`;
}

/**
 * Utility function to truncate text
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

/**
 * Utility function to generate consistent spacing classes
 * @param size - Spacing size (xs, sm, md, lg, xl, 2xl, 3xl)
 * @returns Tailwind spacing class
 */
export function getSpacing(size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl") {
  const spacingMap = {
    xs: "1",
    sm: "2",
    md: "4",
    lg: "6",
    xl: "8",
    "2xl": "10",
    "3xl": "12",
  };

  return spacingMap[size];
}

/**
 * Utility function to generate consistent border radius classes
 * @param size - Border radius size (sm, md, lg, xl, full)
 * @returns Tailwind border radius class
 */
export function getBorderRadius(size: "sm" | "md" | "lg" | "xl" | "full") {
  const radiusMap = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  return radiusMap[size];
}

/**
 * Utility function to generate consistent shadow classes
 * @param size - Shadow size (sm, md, lg)
 * @returns Tailwind shadow class
 */
export function getShadow(size: "sm" | "md" | "lg") {
  const shadowMap = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return shadowMap[size];
}

/**
 * Utility function to debounce function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Utility function to copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when text is copied
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
    // Fallback for browsers that don't support clipboard API
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }
}

/**
 * Utility function to generate initials from name
 * @param name - Full name
 * @returns Initials (max 2 characters)
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Utility function to validate email format
 * @param email - Email to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Utility function to generate random ID
 * @param length - Length of ID
 * @returns Random ID string
 */
export function generateId(length: number = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Utility function to format date
 * @param date - Date to format
 * @param format - Format type
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  format: "short" | "medium" | "long" | "time" = "medium",
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const options: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: "short", day: "numeric" },
    medium: { month: "short", day: "numeric", year: "numeric" },
    long: { weekday: "long", month: "long", day: "numeric", year: "numeric" },
    time: { hour: "2-digit", minute: "2-digit" },
  };

  return dateObj.toLocaleDateString("en-US", options[format]);
}
