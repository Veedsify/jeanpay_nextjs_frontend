// Application constants for JeanPay

import type {
  Currency,
  MarqueeItem,
  Testimonial,
  MoneyDestination,
  FAQ,
  Partner,
  FeatureCard,
  TrustMetric,
  SavingsProduct,
  TransferMethod,
  NavItem,
  SocialLink,
  ThemeColors,
} from "@/types";

// Brand constants
export const BRAND = {
  name: "JeanPay",
  tagline: "Send and receive money across Africa and the US",
  description:
    "Fast, secure, and affordable money transfers across Africa.  and instant transfers.",
  email: "jeanpayafrica@gmail.com",
  phone: "+233538994763",
  address: "City Galleria mall, Spintex Rd, Accra, Ghana.",
  website: "https://jeanpay.africa",
  social: {
    twitter: "@jeanpay",
    instagram: "@jeanpay",
    linkedin: "jeanpay",
    tiktok: "@jeanpay",
  },
} as const;

// Supported currencies
export const CURRENCIES: Currency[] = [
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬", symbol: "₦" },
  { code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭", symbol: "₵" },
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪", symbol: "KSh" },
  {
    code: "XAF",
    name: "Central African CFA Franc",
    flag: "🇨🇲",
    symbol: "FCFA",
  },
  { code: "UGX", name: "Ugandan Shilling", flag: "🇺🇬", symbol: "USh" },
  { code: "XOF", name: "West African CFA Franc", flag: "🇨🇮", symbol: "CFA" },
  { code: "TZS", name: "Tanzanian Shilling", flag: "🇹🇿", symbol: "TSh" },
  { code: "ZMW", name: "Zambian Kwacha", flag: "🇿🇲", symbol: "ZK" },
  { code: "MWK", name: "Malawian Kwacha", flag: "🇲🇼", symbol: "MK" },
];

// Marquee items for the hero section
export const MARQUEE_ITEMS: MarqueeItem[] = [
  { text: "School fees in Accra", flag: "🇬🇭", id: "marquee-1" },
  { text: "A supplier in Lagos", flag: "🇳🇬", id: "marquee-2" },
  { text: "Your family in Kumasi", flag: "🇬🇭", id: "marquee-3" },
  { text: "A friend in Abuja", flag: "🇳🇬", id: "marquee-4" },
  { text: "Your parents in Takoradi", flag: "🇬🇭", id: "marquee-5" },
  { text: "A business in Port Harcourt", flag: "🇳🇬", id: "marquee-6" },
  { text: "Your sibling in Tema", flag: "🇬🇭", id: "marquee-7" },
  { text: "A gift to Ibadan", flag: "🇳🇬", id: "marquee-8" },
  { text: "Rent in Cape Coast", flag: "🇬🇭", id: "marquee-9" },
  { text: "Your cousin in Kano", flag: "🇳🇬", id: "marquee-10" },
];

// Customer testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    user: "AJ Summa",
    handle: "aj_summa1",
    text: "I love JeanPay. Very fast and reliable for sending money to my family in Ghana.",
    avatar:
      "https://pbs.twimg.com/profile_images/1505596499874451458/tq4ebWNw_400x400.jpg",
    rating: 5,
    verified: true,
  },
  {
    id: "testimonial-2",
    user: "Afro Haze",
    handle: "afrohaze",
    text: "Visiting some African countries next week, and I am excited that I can spend locally with my @jeanpay card.",
    avatar:
      "https://pbs.twimg.com/profile_images/1545084992497647616/tHw_fN4U_400x400.jpg",
    rating: 5,
    verified: true,
  },
  {
    id: "testimonial-3",
    user: "OlaOfPh01",
    handle: "olaofph01",
    text: "I just used my @jeanpay virtual card to purchase a domain. Thank you @jeanpay ❤️ You are a gift.",
    avatar:
      "https://pbs.twimg.com/profile_images/1549415496412061696/F00IuD71_400x400.jpg",
    rating: 5,
    verified: true,
  },
  {
    id: "testimonial-4",
    user: "Faroukian Oxide",
    handle: "faroukianoxide",
    text: "Okay I was sleeping on JeanPay. This app is incredible 😍😍😍",
    avatar:
      "https://pbs.twimg.com/profile_images/1498967922244235264/3G3c8s-F_400x400.jpg",
    rating: 5,
    verified: false,
  },
  {
    id: "testimonial-5",
    user: "Sarah Chen",
    handle: "sarahc_tech",
    text: "Best rates I've found for sending money to Nigeria. No hidden fees!",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b9f3c98a?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    verified: true,
  },
  {
    id: "testimonial-6",
    user: "Michael Osei",
    handle: "mikeosei",
    text: "The virtual card feature is a game-changer. Shopping online has never been easier.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    verified: true,
  },
];

// Money transfer destinations
export const MONEY_DESTINATIONS: MoneyDestination[] = [
  {
    flag: "🇬🇭",
    country: "Ghana",
    code: "GH",
    available: true,
    processingTime: "5 minutes",
  },
  {
    flag: "🇳🇬",
    country: "Nigeria",
    code: "NG",
    available: true,
    processingTime: "5 minutes",
  },
  {
    country: "Togo",
    flag: "🇹🇬",
    code: "TG",
    available: false,
    processingTime: "Coming soon",
  },
  {
    country: "Ivory Coast",
    flag: "🇨🇮",
    code: "CI",
    available: false,
    processingTime: "Coming soon",
  },
];

// Partner companies
export const PARTNERS: Partner[] = [
  {
    name: "LATTICE",
    logo: "/partners/lattice.png",
    website: "https://lattice.fund",
  },
  {
    name: "MAVEN11",
    logo: "/partners/maven11.png",
    website: "https://maven11.com",
  },
];

// FAQ data
export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "What can I do with JeanPay?",
    answer:
      "With JeanPay, you can send and receive money across Africa and the US, get a virtual USD card for online shopping, save money with high-yield accounts, and manage your finances with our intuitive mobile app.",
    category: "general",
  },
  {
    id: "faq-2",
    question: "How long does it take to send money?",
    answer:
      "Most transfers are completed within 5-30 minutes depending on the destination country. We offer some of the fastest processing times in the industry.",
    category: "transfers",
  },
  {
    id: "faq-3",
    question: "How many countries can I send money to?",
    answer:
      "We currently support money transfers to 11+ African countries and the United States, with more countries being added regularly.",
    category: "availability",
  },
  {
    id: "faq-4",
    question: "What are your fees?",
    answer:
      "We offer transparent, low fees with no hidden charges. Fees vary by destination and transfer method, but we always show you the exact cost upfront.",
    category: "fees",
  },
  {
    id: "faq-5",
    question: "Is my money safe with JeanPay?",
    answer:
      "Yes! We use bank-level security, encryption, and are fully licensed and regulated. Your funds are protected by industry-leading security measures.",
    category: "security",
  },
  {
    id: "faq-6",
    question: "How do I get a virtual USD card?",
    answer:
      "Simply sign up for a JeanPay account and you can request your virtual USD card instantly through our mobile app. It's ready to use in minutes!",
    category: "cards",
  },
];

// Feature cards for hero section
export const FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Send money to nigeria and ghana.",
    subtitle: "Simple",
    icon: "👇",
    bgColor: "bg-[#F7F4B8]",
    position: { top: "0", left: "4" },
    delay: 0.4,
  },
  {
    title: "Payout in under 5 mins to any bank or MoMo.",
    subtitle: "Fast",
    icon: "⚡️",
    bgColor: "bg-[#FAC2D5]",
    position: { top: "48", right: "4" },
    delay: 0.6,
  },
  {
    title: "Enjoy the best rates and lowest fees.",
    subtitle: "Affordable",
    icon: "🛡️",
    bgColor: "bg-[#B6CCF0]",
    position: { top: "96", left: "48" },
    delay: 0.8,
  },
];

// Trust metrics
export const TRUST_METRICS: TrustMetric[] = [
  {
    title: "4.8-star rating",
    content: "and thousands of glowing reviews.",
    bgColor: "bg-[#FAC2D5]",
    metric: "4.8",
  },
  {
    title: "Around-the-clock support",
    content: "here for you anytime.",
    bgColor: "bg-[#F7F4B8]",
    metric: "24/7",
  },
  {
    title: "Trusted and loved by users",
    content: "across the continent.",
    bgColor: "bg-[#B6CCF0]",
    metric: "200k+",
  },
];

// Savings products
export const SAVINGS_PRODUCTS: SavingsProduct[] = [
  {
    title: "Savings Pocket",
    description: "Earn interest on a daily basis. No fees or lock-up.",
    rate: "5.5% p.a.",
    bgColor: "bg-[#F7F4B8]",
    icon: "💰",
    features: ["Daily interest", "No minimum balance", "Instant withdrawals"],
    minAmount: 0,
  },
  {
    title: "Goals",
    description: "Save towards a goal and earn interest day-in-day-out.",
    rate: "6.0% p.a.",
    bgColor: "bg-[#FAC2D5]",
    icon: "🎯",
    features: ["Goal tracking", "Auto-save", "Visual progress"],
    minAmount: 10,
  },
  {
    title: "Challenges",
    description: "Have fun saving towards shared goals with your crew.",
    rate: "6.5% p.a.",
    bgColor: "bg-[#ECF3E9]",
    icon: "👥",
    features: ["Group savings", "Social features", "Friendly competition"],
    minAmount: 5,
  },
  {
    title: "Vault",
    description: "Fixed-term savings. Up to 7% annual interest.",
    rate: "7.0% p.a.",
    bgColor: "bg-[#B6CCF0]",
    icon: "🔒",
    features: ["Highest rates", "Fixed terms", "Guaranteed returns"],
    minAmount: 100,
    lockPeriod: "6-12 months",
  },
];

// Transfer methods
export const TRANSFER_METHODS: TransferMethod[] = [
  {
    title: "Jeantag",
    description:
      "Send money to your friend's JeanPay account instantly and for free!",
    icon: "👥",
    features: ["Instant transfers", "JeanPay to JeanPay", "Coming soon"],
    processingTime: "Instant",
    fee: "Free",
  },
  {
    title: "Direct Bank Transfer",
    description:
      "Send money directly to any bank account in supported countries quickly and securely.",
    icon: "🔗",
    features: [
      "Ghana to Nigeria payments",
      "Easy sharing",
      "QR codes - coming soon",
    ],
    processingTime: "5 minutes",
    fee: "Low fees",
  },
];

// Navigation items
export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Contact", href: "/contact" },
];

// Social media links
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Instagram", url: "https://instagram.com/jeanpay" },
  { platform: "Twitter", url: "https://twitter.com/jeanpay" },
  { platform: "LinkedIn", url: "https://linkedin.com/company/jeanpay" },
  { platform: "TikTok", url: "https://tiktok.com/@jeanpay" },
  { platform: "YouTube", url: "https://youtube.com/c/jeanpay" },
];

// Theme colors
export const THEME_COLORS: ThemeColors = {
  primary: "#FB923C", // orange-400
  secondary: "#FBBF24", // yellow-400
  accent: "#10B981", // green-500
  background: "#FCFBF7", // custom cream
  surface: "#FFFFFF",
  text: "#1F2937", // gray-800
  muted: "#6B7280", // gray-500
};

// Animation durations and easings
export const ANIMATIONS = {
  durations: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
    slower: 1.0,
  },
  easings: {
    easeOut: [0.4, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
} as const;

// Breakpoints (matches Tailwind CSS)
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Default exchange rates (these would normally come from an API)
export const DEFAULT_CONVERSION = {
  fromCurrency: "GHS",
  toCurrency: "NGN",
  amount: "100.00",
  convertedAmount: "77,000.00",
  exchangeRate: "1 GHS = 145.00 NGN",
  fee: "2.99",
  total: "102.99",
};

// Contact information
export const CONTACT_INFO = {
  email: BRAND.email,
  phone: BRAND.phone,
  address: BRAND.address,
  support: {
    email: "jeanpayafrica@gmail.com",
    phone: "+233538994763",
    hours: "24/7",
  },
  business: {
    email: "jeanpayafrica@gmail.com",
    phone: "+233538994763",
  },
} as const;

// Legal links
export const LEGAL_LINKS = {
  privacy: "/privacy-policy",
  terms: "/terms-conditions",
} as const;

// Feature flags (for A/B testing and gradual rollouts)
export const FEATURE_FLAGS = {
  newDashboard: true,
  enhancedSecurity: true,
  betaFeatures: false,
  socialLogin: true,
  biometricAuth: true,
  realTimeRates: true,
} as const;
