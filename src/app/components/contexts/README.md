# Transfer Store Documentation

The Transfer Store provides centralized state management for the currency conversion and transfer flow using Zustand. This replaces the previous URL search params approach with a more robust and type-safe solution.

## Overview

The transfer flow consists of several pages that share data:
1. **Convert Form** - Initial currency conversion setup
2. **Confirm Page** - Payment method and account details
3. **Verify Page** - Final verification before transfer
4. **Success Page** - Transfer completion confirmation
5. **Error Page** - Error handling and retry options

## Store Structure

### Types

```typescript
interface ConversionData {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  exchangeRate: number;
}

interface AccountDetails {
  type: "paystack" | "momo";
  accountNumber?: string;
  bankCode?: string;
  bankName?: string;
  phoneNumber?: string;
  network?: string;
  recipientName?: string;
}

interface TransferDetails extends ConversionData {
  method: "paystack" | "momo";
  recipientName: string;
  accountNumber?: string;
  bankName?: string;
  phoneNumber?: string;
  network?: string;
  transactionId?: string;
  completedAt?: string;
}
```

### State Properties

- `conversionData`: Currency conversion information
- `accountDetails`: Payment method and recipient details
- `transferDetails`: Combined data for final transfer
- `transferError`: Error information if transfer fails
- `isValidating`: Loading state for account validation
- `isProcessing`: Loading state for transfer processing
- `isFormValid`: Validation state for forms
- `validationError`: Current validation error message

## Usage

### Basic Usage

```typescript
import {
  useConversionData,
  useAccountDetails,
  useTransferActions,
} from "@/app/components/contexts/TransferStore";

function MyComponent() {
  const conversionData = useConversionData();
  const accountDetails = useAccountDetails();
  const { setConversionData, setAccountDetails } = useTransferActions();

  // Update conversion data
  setConversionData({
    fromCurrency: "NGN",
    toCurrency: "GHS",
    fromAmount: "1000",
    toAmount: "23",
    exchangeRate: 0.023,
  });
}
```

### Selector Hooks (Optimized)

Use these hooks for better performance by subscribing only to specific parts of the state:

```typescript
// Individual selectors
const conversionData = useConversionData();
const accountDetails = useAccountDetails();
const transferDetails = useTransferDetails();
const transferError = useTransferError();

// Loading states
const { isValidating, isProcessing } = useTransferLoading();

// Validation
const { isFormValid, validationError, validateForm } = useTransferValidation();

// Actions
const {
  setConversionData,
  setAccountDetails,
  setTransferDetails,
  // ... other actions
} = useTransferActions();
```

## Key Actions

### Data Management
- `setConversionData(data)` - Update conversion information
- `setAccountDetails(details)` - Update account/payment details
- `setTransferDetails(details)` - Update combined transfer data
- `generateTransferDetails()` - Combine conversion and account data

### Validation
- `validateForm()` - Validate current form state
- `setValidationError(error)` - Set validation error message
- `clearError()` - Clear all error states

### Loading States
- `setValidating(loading)` - Set account validation loading
- `setProcessing(processing)` - Set transfer processing loading

### Error Handling
- `setTransferError(error)` - Set transfer error information
- `clearError()` - Clear error states

### Cleanup
- `clearTransferData()` - Reset all data to initial state

## Persistence

The store uses Zustand's `persist` middleware to save important data to localStorage:

- `conversionData`
- `accountDetails` 
- `transferDetails`

Loading states and errors are not persisted and reset on page refresh.

## Migration from URL Params

### Before (URL Params)
```typescript
// Old approach
const router = useRouter();
const searchParams = useSearchParams();

const fromCurrency = searchParams.get("fromCurrency");
const toAmount = searchParams.get("toAmount");

// Navigate with params
router.push(`/next-page?fromCurrency=${fromCurrency}&toAmount=${toAmount}`);
```

### After (Zustand Store)
```typescript
// New approach
const { setConversionData } = useTransferActions();
const conversionData = useConversionData();

// Update store
setConversionData({ fromCurrency: "NGN", toAmount: "23" });

// Navigate without params
router.push("/next-page");
```

## Best Practices

1. **Use Selector Hooks**: Use specific selector hooks instead of the main store hook for better performance
2. **Clear Errors**: Always clear errors when updating related data
3. **Validate Early**: Use `validateForm()` before proceeding to next steps
4. **Handle Loading**: Use loading states to provide user feedback
5. **Error Recovery**: Implement proper error handling and retry mechanisms

## Page-Specific Usage

### Convert Form (`/convert`)
- Updates `conversionData` as user changes amounts/currencies
- Calls `setConversionData()` before navigation

### Confirm Page (`/convert/confirm`)
- Reads `conversionData` from store
- Updates `accountDetails` with payment method selection
- Uses `validateForm()` for form validation
- Calls `generateTransferDetails()` after successful verification

### Verify Page (`/convert/confirm/verify`)
- Reads `transferDetails` from store
- Uses `setProcessing()` during transfer simulation
- Navigates to success/error based on result

### Success Page (`/convert/confirm/success`)
- Reads `transferDetails` from store
- Adds `transactionId` and `completedAt` if missing

### Error Page (`/convert/confirm/error`)
- Reads `transferDetails` and `transferError` from store
- Provides retry functionality
- Can clear errors and redirect back to verify

## Error Handling

The store provides comprehensive error handling:

```typescript
// Set specific transfer error
setTransferError({
  code: "INSUFFICIENT_FUNDS",
  title: "Insufficient Funds",
  description: "Your account balance is not sufficient for this transfer.",
  action: "Add funds to your account and try again.",
});

// Clear all errors
clearError();

// Check for errors
const transferError = useTransferError();
if (transferError) {
  // Handle error display
}
```

## Infinite Loop Prevention

The store includes built-in protection against infinite update loops:

### 1. **Deep Equality Checks**
- `setConversionData` and `setAccountDetails` perform deep equality checks
- Updates are skipped if the new data is identical to current state
- Prevents unnecessary re-renders and infinite loops

### 2. **Stable Action References**
- Zustand actions are already stable and don't need memoization
- Direct selector usage instead of complex memoization patterns
- Avoids reference instability that can cause infinite useEffect loops

### 3. **Best Practices for useEffect**

```typescript
// ❌ WRONG - Can cause infinite loops
useEffect(() => {
  if (accountDetails.type) {
    setSelectedMethod(accountDetails.type);
  }
}, [accountDetails, setAccountDetails]); // setAccountDetails changes every render

// ✅ CORRECT - Stable dependencies
useEffect(() => {
  if (accountDetails.type && !selectedMethod) {
    setSelectedMethod(accountDetails.type);
  }
}, [accountDetails.type, selectedMethod]); // Only specific fields as dependencies
```

### 4. **Avoiding setState During Render**

```typescript
// ❌ WRONG - setState during render
const MyComponent = () => {
  const { setAccountDetails } = useTransferActions();
  
  if (someCondition) {
    setAccountDetails({}); // This will cause infinite loops
  }
  
  return <div>Content</div>;
};

// ✅ CORRECT - setState in useEffect
const MyComponent = () => {
  const { setAccountDetails } = useTransferActions();
  
  useEffect(() => {
    if (someCondition) {
      setAccountDetails({});
    }
  }, [someCondition, setAccountDetails]);
  
  return <div>Content</div>;
};
```

## Common Pitfalls to Avoid

1. **Destructuring store in useEffect dependencies**
2. **Calling state setters during component render**
3. **Over-memoizing Zustand actions (they're already stable)**
4. **Including entire objects as useEffect dependencies instead of specific fields**

This new state management approach provides better type safety, persistence, and user experience compared to the previous URL params method, with built-in protection against common React anti-patterns.