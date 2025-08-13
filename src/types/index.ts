// Core application types for JeanPay

export interface Currency {
  code: string;
  name: string;
  flag: string;
  symbol?: string;
}

export interface MarqueeItem {
  text: string;
  flag: string;
  id?: string;
}

export interface Testimonial {
  id: string;
  user: string;
  handle: string;
  text: string;
  avatar: string;
  rating?: number;
  verified?: boolean;
}

export interface MoneyDestination {
  flag: string;
  country: string;
  code: string;
  available: boolean;
  processingTime?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Partner {
  name: string;
  logo?: string;
  website?: string;
}

export interface FeatureCard {
  title: string;
  subtitle: string;
  description?: string;
  icon?: string;
  bgColor: string;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  delay?: number;
}

export interface TrustMetric {
  title: string;
  content: string;
  bgColor: string;
  icon?: React.ReactNode;
  metric?: string | number;
}

export interface SavingsProduct {
  title: string;
  description: string;
  rate: string;
  bgColor: string;
  icon?: string;
  features?: string[];
  minAmount?: number;
  lockPeriod?: string;
}

export interface TransferMethod {
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  processingTime?: string;
  fee?: string;
}

// Animation types
export interface AnimationProps {
  initial?: object;
  animate?: object;
  transition?: object;
  whileInView?: object;
  whileHover?: object;
  whileTap?: object;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export interface SectionProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  description?: string;
  bgColor?: string;
}

// API types
export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: Date;
  fee?: number;
}

export interface ConversionData {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  convertedAmount: string;
  exchangeRate: string;
  fee?: string;
  total?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: React.ReactNode;
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

// Error types
export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
}

// Responsive breakpoints
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

// Analytics types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

// Accessibility types
export interface A11yProps {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
  tabIndex?: number;
}

// Performance types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime?: number;
}

// Feature flags
export interface FeatureFlags {
  newDashboard: boolean;
  enhancedSecurity: boolean;
  betaFeatures: boolean;
}

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  currency: string;
  notifications: boolean;
  reducedMotion: boolean;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// Component variant types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type CardVariant = 'default' | 'bordered' | 'shadow' | 'elevated';

// Status types
export type Status = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// Generic API response type
export interface APIResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

// Configuration types
export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  features: FeatureFlags;
  analytics: {
    enabled: boolean;
    trackingId?: string;
  };
  support: {
    email: string;
    phone?: string;
    chatEnabled: boolean;
  };
}
