# Authentication System Documentation

## Overview

This document describes the improved authentication system for the JeanPay web application. The system uses cookie-based authentication with automatic token refresh and centralized error handling.

## Architecture

### Components

1. **Axios Client with Interceptors** (`/lib/axios.ts`)
2. **Authentication Context** (`/components/contexts/UserAuthContext.tsx`)
3. **Auth Initialization Provider** (`/components/providers/InitializeAuth.tsx`)
4. **Authentication Functions** (`/funcs/auth/AuthFuncs.ts`)

### Key Features

- **Cookie-based Authentication**: Uses `withCredentials: true` for automatic cookie handling
- **Automatic Token Refresh**: Seamless token refresh on 401 errors
- **Request Queuing**: Handles concurrent requests during token refresh
- **Centralized Error Handling**: Consistent auth error handling across the app
- **Route Protection**: Automatic redirection for protected routes

## How It Works

### 1. Axios Client Setup

The axios client is configured with:
- Base URL pointing to the API
- Credentials included in requests
- Request/response interceptors for auth handling

```typescript
const axiosClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

### 2. Token Refresh Flow

When a request receives a 401 response:

1. **Check if refresh is needed**: Verify it's not already refreshing and not a refresh endpoint
2. **Queue concurrent requests**: Store any concurrent requests in a queue
3. **Attempt token refresh**: Call the refresh token endpoint
4. **Process queue**: Either retry all queued requests or reject them
5. **Handle failure**: Emit logout event if refresh fails

### 3. Authentication Context

Manages global authentication state:

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

Key methods:
- `initializeAuth()`: Initialize auth state on app startup
- `logout()`: Clear auth state and redirect to login
- `updateUser()`: Update user information
- `refreshUser()`: Refresh user data from server

### 4. Event-Driven Communication

The system uses custom events for communication between axios interceptors and the auth context:

```typescript
// Axios interceptor emits logout event
window.dispatchEvent(new CustomEvent("auth:logout"));

// Auth context listens for the event
window.addEventListener("auth:logout", handleAuthLogout);
```

## Usage

### Setup in App Layout

```tsx
export default function Layout({ children }) {
  return (
    <AuthProvider>
      <InitializeAuthProvider>
        {children}
      </InitializeAuthProvider>
    </AuthProvider>
  );
}
```

### Using Auth Context

```tsx
import { useAuthContext } from "@/components/contexts/UserAuthContext";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuthContext();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.first_name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Making API Calls

```typescript
import { axiosClient } from "@/lib/axios";

// The axios client automatically handles auth headers and token refresh
const response = await axiosClient.get("/protected/endpoint");
```

## Route Protection

### Public Routes

Routes that don't require authentication:
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/verify`

### Protected Routes

All other routes require authentication. Users will be automatically redirected to `/login` if not authenticated.

### Route Handling Logic

1. **InitializeAuthProvider** checks route type and auth status
2. **AuthContext** handles redirects for unauthenticated users
3. **Login page** redirects authenticated users to dashboard

## Error Handling

### Authentication Errors

- **401 Unauthorized**: Automatically triggers token refresh
- **Token refresh failure**: Logs out user and redirects to login
- **Network errors**: Preserves error for component handling

### Error Flow

1. API request fails with 401
2. Axios interceptor catches error
3. Attempts token refresh
4. On success: retries original request
5. On failure: emits logout event
6. Auth context handles logout and redirect

## Security Considerations

### Cookie Security

- Cookies are HTTP-only and secure
- `withCredentials: true` ensures cookies are sent with requests
- Automatic cookie handling prevents XSS token theft

### Request Security

- No tokens stored in localStorage or sessionStorage
- Automatic token refresh prevents expired token issues
- Request queuing prevents race conditions

### Error Information

- Minimal error information exposed to client
- Sensitive auth failures handled server-side
- Consistent error responses across endpoints

## Best Practices

### Making API Calls

✅ **Do:**
```typescript
// Use the configured axios client
import { axiosClient } from "@/lib/axios";
const response = await axiosClient.get("/api/data");
```

❌ **Don't:**
```typescript
// Don't use fetch or other HTTP clients for authenticated requests
const response = await fetch("/api/data");
```

### Error Handling

✅ **Do:**
```typescript
try {
  const response = await axiosClient.get("/api/data");
  return response.data;
} catch (error) {
  // Handle specific business logic errors
  if (error.response?.status === 404) {
    // Handle not found
  }
  throw error; // Let auth errors be handled by interceptor
}
```

❌ **Don't:**
```typescript
// Don't handle 401 errors manually
if (error.response?.status === 401) {
  // This will conflict with the interceptor
  window.location.href = "/login";
}
```

### Auth State Management

✅ **Do:**
```typescript
// Use the auth context for auth state
const { isAuthenticated, user } = useAuthContext();
```

❌ **Don't:**
```typescript
// Don't manage auth state separately
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

## Troubleshooting

### Common Issues

1. **Infinite redirect loops**: Check public route configuration
2. **Token not refreshing**: Verify cookie configuration and API endpoints
3. **Concurrent request failures**: Check request queuing implementation
4. **User data not updating**: Use `refreshUser()` method

### Debugging

Enable debug logging:
```typescript
// Add to axios interceptor for debugging
console.log("Request config:", config);
console.log("Response:", response);
console.log("Auth error:", error);
```

### Testing Auth Flow

1. **Login**: Verify user state updates and redirect works
2. **Token refresh**: Wait for token expiry and verify automatic refresh
3. **Logout**: Verify state cleanup and redirect to login
4. **Route protection**: Try accessing protected routes without auth

## Migration Guide

### From Previous Implementation

If migrating from the previous auth system:

1. **Remove localStorage token handling**:
   ```typescript
   // Remove these lines
   localStorage.getItem("authToken");
   localStorage.setItem("authToken", token);
   ```

2. **Update API calls to use axiosClient**:
   ```typescript
   // Replace fetch calls
   const response = await axiosClient.get("/api/endpoint");
   ```

3. **Remove manual token refresh logic**:
   ```typescript
   // Remove manual refresh calls
   await refreshToken();
   ```

4. **Update error handling**:
   ```typescript
   // Let axios interceptor handle 401 errors
   // Remove manual 401 handling
   ```

## API Endpoints

The auth system expects these API endpoints:

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout  
- `POST /auth/register` - User registration
- `POST /auth/refresh-token` - Token refresh
- `POST /protected/user/retrieve` - Get current user

## Configuration

### Environment Variables

```env
NEXT_PUBLIC_API_BASE=https://api.jeanpay.com
```

### Constants

```typescript
// /constants/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
```

## Performance Considerations

- **Request queuing** prevents multiple refresh attempts
- **Event-driven communication** reduces coupling
- **Cookie-based auth** reduces client-side storage overhead
- **Automatic retry** improves user experience

## Security Compliance

- ✅ **OWASP**: Follows secure authentication practices
- ✅ **CSRF Protection**: Cookie-based auth with proper headers
- ✅ **XSS Prevention**: No token storage in localStorage
- ✅ **Session Management**: Automatic token refresh and logout