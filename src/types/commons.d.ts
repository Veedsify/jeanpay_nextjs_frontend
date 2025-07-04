
export interface QuickAction {
    title: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ size: number; className?: string }>;
  }