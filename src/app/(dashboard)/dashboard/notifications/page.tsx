"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { RotateCcw, MoreVertical, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  selected: boolean;
}

// Mock data generator for infinite scroll
const generateNotifications = (
  startIndex: number,
  count: number,
): Notification[] => {
  const notifications = [
    {
      title: "Account Security Update",
      message: "Your password was successfully updated.",
      timestamp: "03:45 PM",
      type: "success" as const,
    },
    {
      title: "Successful Transfer Completed",
      message: "Your transfer of $1,000 to Sarah Connor is complete.",
      timestamp: "08:00 AM",
      type: "success" as const,
    },
    {
      title: "Payment Received",
      message: "You've received a payment of $750 from Mike Johnson.",
      timestamp: "Sep 21",
      type: "info" as const,
    },
    {
      title: "Investment Alert: Tech Stocks Surge",
      message: "Check out the latest surge in tech stocks today!",
      timestamp: "Sep 19",
      type: "warning" as const,
    },
    {
      title: "Monthly Account Summary",
      message: "Your monthly account summary is ready to view.",
      timestamp: "Sep 17",
      type: "info" as const,
    },
    {
      title: "Budget Close to Limit",
      message:
        "You are nearing your set budget limit for groceries this month.",
      timestamp: "Sep 17",
      type: "warning" as const,
    },
    {
      title: "Scheduled Maintenance Reminder",
      message:
        "We will undergo scheduled maintenance from 12 AM to 3 AM tonight.",
      timestamp: "Sep 14",
      type: "info" as const,
    },
    {
      title: "New Feature: Advanced Budgeting Tools",
      message:
        "Explore our new advanced budgeting tools to better manage your finances.",
      timestamp: "Sep 14",
      type: "success" as const,
    },
    {
      title: "Annual Account Review Ready",
      message:
        "Your yearly financial review is now available. Discover insights and trends based on your last year's activity!",
      timestamp: "Sep 13",
      type: "info" as const,
    },
    {
      title: "Credit Score Update",
      message:
        "Your latest credit score has been updated. Check your dashboard to see how your credit has improved!",
      timestamp: "Sep 12",
      type: "success" as const,
    },
  ];

  return Array.from({ length: count }, (_, i) => {
    const template = notifications[i % notifications.length];
    return {
      id: `${startIndex + i}`,
      ...template,
      read: Math.random() > 0.3, // 70% chance of being read
      starred: Math.random() > 0.8, // 20% chance of being starred
      selected: false,
    };
  });
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observer = useRef<IntersectionObserver>(null);

  // Load initial notifications
  useEffect(() => {
    const initialNotifications = generateNotifications(0, 10);
    setNotifications(initialNotifications);
    setPage(1);
  }, []);

  // Load more notifications
  const loadMoreNotifications = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newNotifications = generateNotifications(page * 10, 10);

    if (newNotifications.length === 0) {
      setHasMore(false);
    } else {
      setNotifications((prev) => [...prev, ...newNotifications]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  }, [loading, hasMore, page]);

  // Intersection observer for infinite scroll
  const lastNotificationElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreNotifications();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreNotifications],
  );

  // Toggle checkbox
  const toggleCheckbox = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, selected: !n.selected } : n,
      ),
    );
  };

  // Refresh notifications
  const refreshNotifications = () => {
    setNotifications([]);
    setPage(0);
    setHasMore(true);
    const initialNotifications = generateNotifications(0, 10);
    setNotifications(initialNotifications);
    setPage(1);
  };

  // Select all notifications
  const toggleSelectAll = () => {
    const filteredIds = notifications.map((n) => n.id);
    const allSelected = filteredIds.every(
      (id) => notifications.find((n) => n.id === id)?.selected,
    );

    setNotifications(
      notifications.map((n) =>
        filteredIds.includes(n.id) ? { ...n, selected: !allSelected } : n,
      ),
    );
  };

  // Check if all visible notifications are selected
  const allVisibleSelected =
    notifications.length > 0 && notifications.every((n) => n.selected);

  // Check if some visible notifications are selected
  const someVisibleSelected = notifications.some((n) => n.selected);

  return (
    <div className="lg:w-full rounded-xl border shadow-md border-black/90 mt-6 mx-auto overflow-hidden">
      {/* Header */}

      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Select All Section */}
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={allVisibleSelected}
              ref={(el) => {
                if (el)
                  el.indeterminate = someVisibleSelected && !allVisibleSelected;
              }}
              onChange={toggleSelectAll}
              className="w-4 h-4 accent-cyan-dark bg-gray-100 border-gray-300 rounded-xl"
            />
            <span className="text-sm text-gray-700">
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refreshNotifications}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              aria-label="Refresh notifications"
            >
              <RotateCcw size={20} />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              aria-label="More options"
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications
              </h3>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={notification.id}
                ref={
                  index === notifications.length - 1
                    ? lastNotificationElementRef
                    : undefined
                }
                className={`bg-white border-b py-4 hover:shadow-sm transition-shadow ${
                  !notification.read ? "bg-green-bg" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Checkbox positioned with content */}
                    <div className="flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={notification.selected}
                        onChange={() => toggleCheckbox(notification.id)}
                        className="w-4 h-4 accent-cyan-dark text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-1"
                      />
                    </div>
                    <Link
                      href={`/dashboard/notifications/${notification.id}`}
                      className="flex flex-col min-w-0 flex-1"
                    >
                      <h3 className="font-medium text-gray-900 text-xs md:text-sm mb-0.5">
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm leading-tight">
                        {notification.message}
                      </p>
                    </Link>
                  </div>

                  <div className="flex flex-col items-end gap-1 ml-2 flex-shrink-0">
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {notification.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Loading indicator */}
          {loading && (
            <div className="bg-white rounded-lg border p-4 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-500"></div>
                Loading more notifications...
              </div>
            </div>
          )}

          {/* End of notifications message */}
          {!hasMore && notifications.length > 0 && (
            <div className="bg-white rounded-lg border p-4 text-center text-sm text-gray-500">
              You&apos;ve reached the end of your notifications
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
