"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  PlusSquareIcon,
  History,
  CreditCard,
  Send,
  Download,
  Share2,
  Home,
  Settings,
  HelpCircle,
  Bell,
} from "lucide-react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: {
    bg: string;
    icon: string;
    hover: string;
  };
  featured?: boolean;
}

interface QuickActionsProps {
  variant?: "default" | "post-transfer" | "compact";
  className?: string;
  maxActions?: number;
}

const allQuickActions: QuickAction[] = [
  {
    id: "convert",
    title: "Convert Currency",
    description: "Exchange between NGN and GHS",
    href: "/dashboard/payment/convert",
    icon: ArrowRightLeft,
    color: {
      bg: "bg-cyan-50",
      icon: "text-cyan-600",
      hover: "hover:bg-cyan-100",
    },
    featured: true,
  },
  {
    id: "topup",
    title: "Top Up Wallet",
    description: "Add money via Bank/Card or Momo",
    href: "/dashboard/payment/topup",
    icon: PlusSquareIcon,
    color: {
      bg: "bg-green-50",
      icon: "text-green-600",
      hover: "hover:bg-green-100",
    },
    featured: true,
  },
  {
    id: "send",
    title: "Send Money",
    description: "Transfer to friends and family",
    href: "/dashboard/payment/send",
    icon: Send,
    color: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      hover: "hover:bg-purple-100",
    },
    featured: true,
  },
  {
    id: "cards",
    title: "Virtual Cards",
    description: "Create and manage virtual cards",
    href: "/dashboard/cards",
    icon: CreditCard,
    color: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      hover: "hover:bg-blue-100",
    },
  },
  {
    id: "history",
    title: "Transaction History",
    description: "View all your transactions",
    href: "/dashboard/transactions",
    icon: History,
    color: {
      bg: "bg-gray-50",
      icon: "text-gray-600",
      hover: "hover:bg-gray-100",
    },
  },
  {
    id: "download",
    title: "Download Receipt",
    description: "Get receipt for your transfer",
    href: "#",
    icon: Download,
    color: {
      bg: "bg-indigo-50",
      icon: "text-indigo-600",
      hover: "hover:bg-indigo-100",
    },
  },
  {
    id: "share",
    title: "Share Receipt",
    description: "Share transfer confirmation",
    href: "#",
    icon: Share2,
    color: {
      bg: "bg-pink-50",
      icon: "text-pink-600",
      hover: "hover:bg-pink-100",
    },
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Back to main dashboard",
    href: "/dashboard",
    icon: Home,
    color: {
      bg: "bg-amber-50",
      icon: "text-amber-600",
      hover: "hover:bg-amber-100",
    },
  },
  {
    id: "settings",
    title: "Settings",
    description: "Manage your account settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: {
      bg: "bg-slate-50",
      icon: "text-slate-600",
      hover: "hover:bg-slate-100",
    },
  },
  {
    id: "help",
    title: "Help & Support",
    description: "Get help with your account",
    href: "/dashboard/help",
    icon: HelpCircle,
    color: {
      bg: "bg-orange-50",
      icon: "text-orange-600",
      hover: "hover:bg-orange-100",
    },
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "View your notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    color: {
      bg: "bg-red-50",
      icon: "text-red-600",
      hover: "hover:bg-red-100",
    },
  },
];

const getActionsForVariant = (
  variant: string,
  maxActions?: number,
): QuickAction[] => {
  let actions: QuickAction[];

  switch (variant) {
    case "post-transfer":
      actions = allQuickActions.filter((action) =>
        [
          "convert",
          "download",
          "share",
          "dashboard",
          "history",
          "topup",
        ].includes(action.id),
      );
      break;
    case "compact":
      actions = allQuickActions.filter((action) => action.featured);
      break;
    default:
      actions = allQuickActions.filter((action) =>
        ["convert", "topup", "send", "cards", "history", "settings"].includes(
          action.id,
        ),
      );
  }

  return maxActions ? actions.slice(0, maxActions) : actions;
};

export default function QuickActions({
  variant = "default",
  className = "",
  maxActions,
}: QuickActionsProps) {
  const actions = getActionsForVariant(variant, maxActions);

  const getGridCols = () => {
    const count = actions.length;
    if (variant === "compact") return "grid-cols-2 md:grid-cols-3";
    if (count <= 2) return "grid-cols-1 md:grid-cols-2";
    if (count <= 4) return "grid-cols-2 md:grid-cols-2";
    if (count <= 6) return "grid-cols-2 md:grid-cols-2";
    return "grid-cols-2 md:grid-cols-2 lg:grid-cols-2";
  };

  const handleAction = (action: QuickAction, e: React.MouseEvent) => {
    if (action.id === "download") {
      e.preventDefault();
      // Handle download logic
      console.log("Download receipt");
    } else if (action.id === "share") {
      e.preventDefault();
      // Handle share logic
      if (navigator.share) {
        navigator.share({
          title: "Transfer Receipt",
          text: "Transfer completed successfully",
        });
      } else {
        console.log("Share receipt");
      }
    }
  };

  return (
    <div className={`${className}`}>
      {variant !== "compact" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {variant === "post-transfer" ? "What's Next?" : "Quick Actions"}
          </h3>
          <p className="text-gray-600 text-sm">
            {variant === "post-transfer"
              ? "Continue with these popular actions"
              : "Frequently used features for quick access"}
          </p>
        </div>
      )}

      <div className={`grid gap-4 ${getGridCols()}`}>
        {actions.map((action, index) => {
          const isLink = action.href !== "#";
          const content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border border-gray-200 transition-all cursor-pointer ${action.color.hover} group`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${action.color.bg} group-hover:scale-110 transition-transform`}
                >
                  <action.icon className={`w-5 h-5 ${action.color.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                    {action.title}
                  </h4>
                  {variant !== "compact" && (
                    <p className="text-sm text-gray-600 mt-1 leading-snug">
                      {action.description}
                    </p>
                  )}
                </div>
              </div>

              {action.featured && variant === "default" && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                    Popular
                  </span>
                </div>
              )}
            </motion.div>
          );

          return isLink ? (
            <Link key={action.id} href={action.href}>
              {content}
            </Link>
          ) : (
            <div key={action.id} onClick={(e) => handleAction(action, e)}>
              {content}
            </div>
          );
        })}
      </div>

      {variant === "post-transfer" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-green-bg rounded-lg border border-cyan-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-jean-orange rounded-lg">
              <ArrowRightLeft className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-cyan-900">Transfer Again?</h4>
              <p className="text-sm text-cyan-700 mt-1">
                Your transfer details have been saved for quick access next
                time.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/payment/convert"
            className="inline-block mt-3 px-4 py-2 bg-cyan-dark text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Make Another Transfer
          </Link>
        </motion.div>
      )}
    </div>
  );
}

// Export action configurations for use in other components
export { allQuickActions, getActionsForVariant };
export type { QuickAction };
