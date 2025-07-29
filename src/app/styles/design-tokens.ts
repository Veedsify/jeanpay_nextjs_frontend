// Design tokens for consistent flat design system
export const designTokens = {
  // Border radius - consistent rounded corners
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // Spacing - consistent padding and margins
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '48px',
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  // Colors
  colors: {
    // Primary brand colors
    primary: {
      50: '#ecf4e9',
      100: '#d4e7cd',
      500: '#004741',
      600: '#003d37',
      700: '#00332e',
    },

    // Accent colors
    accent: {
      orange: '#fd7d19',
      teal: '#00434c',
    },

    // Neutral colors
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },

    // White
    white: '#ffffff',

    // Surface colors
    surface: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      accent: '#ecf4e9',
    },

    // Status colors
    status: {
      success: '#16a34a',
      warning: '#f59e0b',
      error: '#dc2626',
      info: '#3b82f6',
    },
  },

  // Shadows - minimal flat design shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },

  // Borders
  borders: {
    width: {
      default: '1px',
      thick: '2px',
    },
    color: {
      default: '#e5e7eb',
      strong: '#d1d5db',
      accent: '#004741',
    },
  },

  // Component-specific tokens
  components: {
    card: {
      borderRadius: '8px',
      padding: '16px',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
    },
    button: {
      borderRadius: '8px',
      paddingX: '16px',
      paddingY: '12px',
      fontWeight: '500',
    },
    input: {
      borderRadius: '8px',
      padding: '12px',
      border: '1px solid #d1d5db',
    },
    dropdown: {
      borderRadius: '8px',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
    },
  },

  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 10,
    modal: 20,
    popover: 30,
    tooltip: 40,
    toast: 50,
  },
} as const;

// CSS custom properties for easy usage
export const cssVariables = `
  :root {
    /* Border radius */
    --border-radius-sm: ${designTokens.borderRadius.sm};
    --border-radius-md: ${designTokens.borderRadius.md};
    --border-radius-lg: ${designTokens.borderRadius.lg};
    --border-radius-xl: ${designTokens.borderRadius.xl};

    /* Spacing */
    --spacing-xs: ${designTokens.spacing.xs};
    --spacing-sm: ${designTokens.spacing.sm};
    --spacing-md: ${designTokens.spacing.md};
    --spacing-lg: ${designTokens.spacing.lg};
    --spacing-xl: ${designTokens.spacing.xl};
    --spacing-2xl: ${designTokens.spacing['2xl']};
    --spacing-3xl: ${designTokens.spacing['3xl']};

    /* Colors */
    --color-primary: ${designTokens.colors.primary[500]};
    --color-primary-hover: ${designTokens.colors.primary[600]};
    --color-surface: ${designTokens.colors.surface.primary};
    --color-surface-secondary: ${designTokens.colors.surface.secondary};
    --color-surface-accent: ${designTokens.colors.surface.accent};
    --color-text-primary: ${designTokens.colors.gray[900]};
    --color-text-secondary: ${designTokens.colors.gray[600]};
    --color-border: ${designTokens.borders.color.default};

    /* Shadows */
    --shadow-sm: ${designTokens.shadows.sm};
    --shadow-md: ${designTokens.shadows.md};
    --shadow-lg: ${designTokens.shadows.lg};

    /* Component tokens */
    --card-border-radius: ${designTokens.components.card.borderRadius};
    --card-padding: ${designTokens.components.card.padding};
    --button-border-radius: ${designTokens.components.button.borderRadius};
    --input-border-radius: ${designTokens.components.input.borderRadius};
  }
`;

// Utility classes for consistent styling
export const utilityClasses = {
  // Card styles
  card: 'bg-white border border-gray-200 rounded-lg p-4 shadow-sm',
  cardLarge: 'bg-white border border-gray-200 rounded-lg p-6 shadow-sm',

  // Button styles
  buttonPrimary: 'bg-primary-500 text-white rounded-lg px-4 py-3 font-medium hover:bg-primary-600 transition-colors',
  buttonSecondary: 'bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-3 font-medium hover:bg-gray-50 transition-colors',
  buttonDanger: 'bg-red-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-red-700 transition-colors',

  // Input styles
  input: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',

  // Text styles
  textPrimary: 'text-gray-900',
  textSecondary: 'text-gray-600',
  textMuted: 'text-gray-500',

  // Layout styles
  containerFluid: 'w-full px-4 mx-auto',
  containerFixed: 'max-w-7xl px-4 mx-auto',

  // Flex utilities
  flexBetween: 'flex items-center justify-between',
  flexCenter: 'flex items-center justify-center',
  flexStart: 'flex items-center justify-start',

  // Grid utilities
  gridCols2: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  gridCols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  gridCols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
};

// Type-safe design token access
export type DesignTokens = typeof designTokens;
export type BorderRadius = keyof typeof designTokens.borderRadius;
export type Spacing = keyof typeof designTokens.spacing;
export type Colors = keyof typeof designTokens.colors;
export type Shadows = keyof typeof designTokens.shadows;
