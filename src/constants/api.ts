// API Configuration and Constants

// Base API URL - should be configured based on environment
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/";

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    VERIFY_EMAIL: "/auth/verify-email",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  // User
  USER: {
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/update",
    CHANGE_PASSWORD: "/user/change-password",
    DELETE_ACCOUNT: "/user/delete",
  },

  // Wallet
  WALLET: {
    BALANCE: "/wallet/balance",
    TOP_UP: "/wallet/topup",
    TOP_UP_DETAILS: "/wallet/topup",
    WITHDRAW: "/wallet/withdraw",
    HISTORY: "/wallet/history",
    UPDATE_AFTER_PAYMENT: "/wallet/update-after-payment",
  },

  // Transactions
  TRANSACTIONS: {
    CREATE: "/transactions/new",
    ALL: "/transactions/all",
    HISTORY: "/transactions/history",
    DETAILS: "/transactions/details",
    UPDATE_STATUS: "/transactions/status",
    FILTER: "/transactions/filter",
    STATS: "/transactions/stats",
  },

  // Conversion
  CONVERSION: {
    RATES: "/convert/rates",
    CALCULATE: "/convert/calculate",
  },

  // Notifications
  NOTIFICATIONS: {
    ALL: "/notifications/all",
    MARK_READ: "/notifications/mark-read",
    MARK_ALL_READ: "/notifications/mark-all-read",
  },

  // Settings
  SETTINGS: {
    UPDATE: "/settings/update",
    CHANGE_PASSWORD: "/settings/change-password",
    PREFERENCES: "/settings/preferences",
  },

  // Dashboard
  DASHBOARD: {
    STATS: "/dashboard/stats",
  },

  // Webhooks
  WEBHOOKS: {
    PAYSTACK: "/webhooks/paystack",
    MOMO: "/webhooks/momo",
  },
} as const;

// HTTP Methods
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

// Request Headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
} as const;

// API Response Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// API Request Timeout (in milliseconds)
export const REQUEST_TIMEOUT = 30000; // 30 seconds

// Retry Configuration
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  BACKOFF_MULTIPLIER: 2,
} as const;

// Cache Configuration
export const CACHE_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  GC_TIME: 10 * 60 * 1000, // 10 minutes
  REFETCH_INTERVAL: 30 * 1000, // 30 seconds for real-time data
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  TIMEOUT_ERROR: "Request timeout. Please try again.",
  UNAUTHORIZED: "You are not authorized. Please login again.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNKNOWN_ERROR: "An unexpected error occurred.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Logged in successfully!",
  REGISTRATION_SUCCESS: "Account created successfully!",
  PROFILE_UPDATE_SUCCESS: "Profile updated successfully!",
  PASSWORD_CHANGE_SUCCESS: "Password changed successfully!",
  TOP_UP_SUCCESS: "Top-up request submitted successfully!",
  TRANSACTION_SUCCESS: "Transaction completed successfully!",
  WITHDRAWAL_SUCCESS: "Withdrawal request submitted successfully!",
} as const;

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
  PROFILE_PICTURE_MAX_SIZE: 2 * 1024 * 1024, // 2MB
} as const;

// Pagination Defaults
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// Query Keys for React Query
export const QUERY_KEYS = {
  USER_PROFILE: ["user", "profile"],
  WALLET_BALANCE: ["wallet", "balance"],
  TRANSACTION_HISTORY: ["transactions", "history"],
  CONVERSION_RATES: ["conversion", "rates"],
  NOTIFICATIONS: ["notifications"],
  DASHBOARD_STATS: ["dashboard", "stats"],
  TOP_UP_DETAILS: ["topup", "details"],
} as const;

// Mutation Keys for React Query
export const MUTATION_KEYS = {
  LOGIN: "login",
  REGISTER: "register",
  UPDATE_PROFILE: "updateProfile",
  CHANGE_PASSWORD: "changePassword",
  TOP_UP_WALLET: "topUpWallet",
  CREATE_TRANSACTION: "createTransaction",
  WITHDRAW: "withdraw",
} as const;

// WebSocket Events
export const WS_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  TRANSACTION_UPDATE: "transaction_update",
  BALANCE_UPDATE: "balance_update",
  NOTIFICATION: "notification",
  RATE_UPDATE: "rate_update",
} as const;

// Currency Configuration
export const CURRENCY_CONFIG = {
  DEFAULT_FROM: "USD",
  DEFAULT_TO: "NGN",
  SUPPORTED_CURRENCIES: ["USD", "NGN", "GHS", "KES", "ZAR"],
  DECIMAL_PLACES: {
    USD: 2,
    NGN: 2,
    GHS: 2,
    KES: 2,
    ZAR: 2,
  },
} as const;

// Feature Flags
export const API_FEATURE_FLAGS = {
  REAL_TIME_RATES: true,
  BIOMETRIC_AUTH: true,
  PUSH_NOTIFICATIONS: true,
  WEBHOOK_VALIDATION: true,
  RATE_LIMITING: true,
} as const;
