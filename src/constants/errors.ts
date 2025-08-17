export const commonErrors = [
  {
    code: "INSUFFICIENT_FUNDS",
    title: "Insufficient Funds",
    description: "Your account balance is not sufficient for this transfer.",
    action: "Add funds to your account and try again.",
  },
  {
    code: "INVALID_ACCOUNT",
    title: "Invalid Account Details",
    description: "The recipient account details could not be verified.",
    action: "Please check the account details and try again.",
  },
  {
    code: "NETWORK_ERROR",
    title: "Network Connection Error",
    description: "There was a problem connecting to our payment network.",
    action: "Check your internet connection and try again.",
  },
  {
    code: "RATE_LIMIT",
    title: "Too Many Attempts",
    description: "You have exceeded the maximum number of transfer attempts.",
    action: "Please wait a few minutes before trying again.",
  },
  {
    code: "MAINTENANCE",
    title: "Service Temporarily Unavailable",
    description: "Our payment service is currently under maintenance.",
    action: "Please try again in a few minutes.",
  },
];
