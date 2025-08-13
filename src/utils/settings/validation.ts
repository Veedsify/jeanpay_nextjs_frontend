import { SettingsFormErrors } from "@/types/settings";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (basic international format)
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

// Password validation regex (minimum 8 characters, at least one uppercase, one lowercase, one number)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Name validation regex (letters, spaces, hyphens, apostrophes)
const NAME_REGEX = /^[a-zA-Z\s\-']{2,50}$/;

export interface ProfileValidationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio?: string;
}

export interface PasswordValidationData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PreferencesValidationData {
  language?: string;
  timezone?: string;
  currency?: string;
  theme?: "light" | "dark" | "system";
  dateFormat?: string;
  numberFormat?: string;
}

// Validate profile form data
export function validateProfileForm(data: ProfileValidationData): SettingsFormErrors {
  const errors: SettingsFormErrors = {};

  // Validate first name
  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (!NAME_REGEX.test(data.firstName.trim())) {
    errors.firstName = "First name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes";
  }

  // Validate last name
  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (!NAME_REGEX.test(data.lastName.trim())) {
    errors.lastName = "Last name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes";
  }

  // Validate email
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  // Validate phone
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!PHONE_REGEX.test(data.phone.trim().replace(/[\s\-\(\)]/g, ""))) {
    errors.phone = "Please enter a valid phone number";
  }

  // Validate bio (optional)
  if (data.bio && data.bio.length > 500) {
    errors.bio = "Bio must be less than 500 characters";
  }

  return errors;
}

// Validate password change form data
export function validatePasswordForm(data: PasswordValidationData): SettingsFormErrors {
  const errors: SettingsFormErrors = {};

  // Validate current password
  if (!data.currentPassword) {
    errors.currentPassword = "Current password is required";
  }

  // Validate new password
  if (!data.newPassword) {
    errors.newPassword = "New password is required";
  } else if (!PASSWORD_REGEX.test(data.newPassword)) {
    errors.newPassword = "Password must be at least 8 characters with uppercase, lowercase, and number";
  }

  // Validate confirm password
  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your new password";
  } else if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Check if new password is different from current
  if (data.currentPassword && data.newPassword && data.currentPassword === data.newPassword) {
    errors.newPassword = "New password must be different from current password";
  }

  return errors;
}

// Validate preferences form data
export function validatePreferencesForm(data: PreferencesValidationData): SettingsFormErrors {
  const errors: SettingsFormErrors = {};

  // Validate language (if provided)
  if (data.language && data.language.length < 2) {
    errors.language = "Please select a valid language";
  }

  // Validate timezone (if provided)
  if (data.timezone && data.timezone.length < 3) {
    errors.timezone = "Please select a valid timezone";
  }

  // Validate currency (if provided)
  if (data.currency && data.currency.length !== 3) {
    errors.currency = "Please select a valid currency";
  }

  // Validate theme (if provided)
  if (data.theme && !["light", "dark", "system"].includes(data.theme)) {
    errors.theme = "Please select a valid theme";
  }

  return errors;
}

// Validate two-factor authentication code
export function validateTwoFactorCode(code: string): string | null {
  if (!code.trim()) {
    return "Authentication code is required";
  }

  if (!/^\d{6}$/.test(code.trim())) {
    return "Authentication code must be 6 digits";
  }

  return null;
}

// Check if form has any errors
export function hasFormErrors(errors: SettingsFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

// Get first error message from errors object
export function getFirstError(errors: SettingsFormErrors): string | null {
  const errorKeys = Object.keys(errors);
  if (errorKeys.length === 0) return null;

  const firstKey = errorKeys[0];
  return errors[firstKey] || null;
}

// Validate file upload (for profile image)
export function validateProfileImage(file: File): string | null {
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return "Image size must be less than 5MB";
  }

  // Check file type
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return "Image must be JPEG, PNG, or WebP format";
  }

  return null;
}

// Sanitize input data
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Basic formatting for common formats
  if (cleaned.startsWith("+")) {
    return cleaned;
  }

  return cleaned;
}

// Validate session timeout value
export function validateSessionTimeout(timeout: number): string | null {
  if (timeout < 5) {
    return "Session timeout must be at least 5 minutes";
  }

  if (timeout > 1440) { // 24 hours
    return "Session timeout cannot exceed 24 hours";
  }

  return null;
}

// Password strength checker
export function getPasswordStrength(password: string): {
  score: number;
  feedback: string;
  color: string;
} {
  let score = 0;
  let feedback = "Very Weak";
  let color = "#ef4444"; // red

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z\d]/.test(password)) score++;

  switch (score) {
    case 0:
    case 1:
      feedback = "Very Weak";
      color = "#ef4444";
      break;
    case 2:
    case 3:
      feedback = "Weak";
      color = "#f97316";
      break;
    case 4:
      feedback = "Medium";
      color = "#eab308";
      break;
    case 5:
      feedback = "Strong";
      color = "#22c55e";
      break;
    case 6:
      feedback = "Very Strong";
      color = "#16a34a";
      break;
  }

  return { score, feedback, color };
}
