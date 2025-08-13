// User Settings Types
export interface UserSettings {
  id: string;
  userId: string;
  profile: ProfileSettings;
  security: SecuritySettings;
  preferences: PreferencesSettings;
  notifications: NotificationSettings;
  createdAt: string;
  updatedAt: string;
}

// Profile Settings Types
export interface ProfileSettings {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
  bio?: string;
  dateOfBirth?: string;
  address?: Address;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface ProfileUpdateData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
  bio?: string;
  dateOfBirth?: string;
  address?: Address;
}

// Security Settings Types
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: number; // in minutes
  lastPasswordChange?: string;
  trustedDevices?: TrustedDevice[];
  loginHistory?: LoginHistory[];
}

export interface TrustedDevice {
  id: string;
  deviceName: string;
  deviceType: string;
  ipAddress: string;
  userAgent: string;
  addedAt: string;
  lastUsed: string;
}

export interface LoginHistory {
  id: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  loginAt: string;
  success: boolean;
}

export interface SecuritySettingsData {
  twoFactorEnabled?: boolean;
  loginNotifications?: boolean;
  sessionTimeout?: number;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface TwoFactorSetup {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

// Preferences Settings Types
export interface PreferencesSettings {
  language: string;
  timezone: string;
  currency: string;
  theme: "light" | "dark" | "system";
  dateFormat: string;
  numberFormat: string;
  defaultWalletCurrency?: string;
  autoLogoutTime?: number; // in minutes
}

export interface PreferencesData {
  language?: string;
  timezone?: string;
  currency?: string;
  theme?: "light" | "dark" | "system";
  dateFormat?: string;
  numberFormat?: string;
  defaultWalletCurrency?: string;
  autoLogoutTime?: number;
}

// Notification Settings Types
export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  transactionAlerts: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
  weeklyReports: boolean;
  monthlyStatements: boolean;
  lowBalanceAlerts: boolean;
  largeTransactionAlerts: boolean;
  newDeviceLogin: boolean;
  passwordChangeAlerts: boolean;
}

export interface NotificationSettingsData {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  transactionAlerts?: boolean;
  securityAlerts?: boolean;
  marketingEmails?: boolean;
  weeklyReports?: boolean;
  monthlyStatements?: boolean;
  lowBalanceAlerts?: boolean;
  largeTransactionAlerts?: boolean;
  newDeviceLogin?: boolean;
  passwordChangeAlerts?: boolean;
}

// API Response Types
export interface SettingsApiResponse<T = unknown> {
  error: boolean;
  message: string;
  data: T;
}

export interface UpdateSettingsResponse {
  success: boolean;
  message: string;
  updatedAt: string;
}

// Account Settings Types (for account tab)
export interface AccountSettings {
  accountStatus: "active" | "suspended" | "pending";
  accountType: "personal" | "business";
  verificationLevel: "basic" | "intermediate" | "advanced";
  kycStatus: "pending" | "approved" | "rejected";
  accountLimits: AccountLimits;
  connectedAccounts: ConnectedAccount[];
}

export interface AccountLimits {
  dailyTransactionLimit: number;
  monthlyTransactionLimit: number;
  singleTransactionLimit: number;
  walletBalanceLimit: number;
}

export interface ConnectedAccount {
  id: string;
  provider: "paystack" | "momo" | "bank";
  accountName: string;
  accountNumber: string;
  isDefault: boolean;
  isVerified: boolean;
  addedAt: string;
}

// Form validation types
export interface SettingsFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

// Settings tabs type
export interface SettingsTab {
  id: "profile" | "account" | "preferences" | "notifications" | "security";
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}
