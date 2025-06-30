"use client";
import { useState } from "react";
import { CheckCircle, XCircle, Clock, Info, X } from "@phosphor-icons/react";

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Conversion Completed",
      message:
        "Your NGN 5,000 to GHS conversion has been completed successfully.",
      timestamp: "2025-06-29 10:30 AM",
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "Payment Received",
      message: "You received GHS 100 from Jane Smith.",
      timestamp: "2025-06-28 2:15 PM",
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Withdrawal Pending",
      message: "Your GHS 50 withdrawal to Momo is being processed.",
      timestamp: "2025-06-28 11:45 AM",
      read: true,
    },
    {
      id: "4",
      type: "success",
      title: "Account Funded",
      message: "Your account has been funded with NGN 10,000 via Paystack.",
      timestamp: "2025-06-27 4:20 PM",
      read: true,
    },
    {
      id: "5",
      type: "error",
      title: "Conversion Failed",
      message: "Your NGN 15,000 to GHS conversion failed. Please try again.",
      timestamp: "2025-06-25 3:30 PM",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-600" size={24} />;
      case "error":
        return <XCircle className="text-red-600" size={24} />;
      case "warning":
        return <Clock className="text-yellow-600" size={24} />;
      case "info":
        return <Info className="text-blue-600" size={24} />;
      default:
        return <Info className="text-gray-600" size={24} />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((notif) => !notif.read);

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <div className="space-y-6 mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cyan-dark">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              You have {unreadCount} unread notification
              {unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-cyan-dark text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "unread"
                  ? "bg-cyan-dark text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-cyan-dark border border-cyan-dark rounded-lg hover:bg-green-bg font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm border text-center">
            <div className="text-gray-400 mb-4">
              <Info size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-600">
              {filter === "unread"
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 rounded-2xl border transition-all ${
                notification.read
                  ? "bg-white"
                  : getNotificationBg(notification.type)
              } ${!notification.read ? "shadow-sm" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 inline-block w-2 h-2 bg-cyan-dark rounded-full"></span>
                        )}
                      </h3>
                      <p className="text-gray-700 mb-2">
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500">
                        {notification.timestamp}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-cyan-dark hover:underline font-medium"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
