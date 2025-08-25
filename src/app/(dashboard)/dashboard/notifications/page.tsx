"use client";
import {
  RotateCcw,
  MoreVertical,
  LucideBookMarked,
  LucideTrash,
} from "lucide-react";
import useNotificationHook from "@/hooks/NotificationsHook";
import { useInView } from "react-intersection-observer";
import { Notification } from "@/types/notification";
import React, { useEffect } from "react";
import _ from "lodash";
import { formatDateTime } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import {
  deleteMarkedNotifcation,
  markNotificationAsRead,
} from "@/funcs/notifications/NotificationsFunc";
import toast from "react-hot-toast";

interface PageNotification extends Notification {
  selected?: boolean;
}

export default function NotificationsPage() {
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const { useGetAllNotification } = useNotificationHook();
  const [notifications, setNotifications] = React.useState<PageNotification[]>(
    [],
  );
  const { data, isLoading, isError, refetch, hasNextPage, fetchNextPage } =
    useGetAllNotification();

  const markAsRead = useMutation({
    mutationKey: ["mark-notification-read"],
    mutationFn: async ({ selectedIds }: { selectedIds: string[] }) =>
      markNotificationAsRead(selectedIds),
  });

  const deleteNotification = useMutation({
    mutationKey: ["delete-marked-notification"],
    mutationFn: async ({ selectedIds }: { selectedIds: string[] }) =>
      deleteMarkedNotifcation(selectedIds),
  });

  useEffect(() => {
    if (data?.pages && !isError) {
      const newNotifications = data.pages
        .flatMap((page) => page.data.notifications)
        .map((notification) => ({
          ...notification,
          selected: false,
        }));
      setNotifications((prev) =>
        _.uniqBy([...prev, ...newNotifications], "id"),
      );
    }
  }, [data?.pages, isError]);

  const { inView, ref } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Select all notifications
  const toggleSelectAll = () => {
    const filteredIds = notifications?.map((n) => n.id);
    const allSelected = filteredIds.every(
      (id) => notifications.find((n) => n.id === id)?.selected,
    );

    setNotifications(
      notifications.map((n) =>
        filteredIds.includes(n.id) ? { ...n, selected: !allSelected } : n,
      ),
    );
  };

  const toggleCheckbox = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, selected: !n.selected } : n)),
    );
  };

  // Check if all visible notifications are selected
  const allVisibleSelected = React.useMemo(() => {
    return notifications?.length > 0 && notifications.every((n) => n.selected);
  }, [notifications]);

  // Check if some visible notifications are selected
  const someVisibleSelected = React.useMemo(() => {
    return notifications.length && notifications?.some((n) => n.selected);
  }, [notifications]);

  const markSelectedNotification = () => {
    const selectedIds = notifications
      .filter((n) => n.selected && !n.read)
      .map((n) => n.id);
    if (selectedIds.length === 0) return;

    markAsRead.mutate(
      { selectedIds },
      {
        onSuccess: () => {
          toast.success("Notifications marked as read");
          setNotifications((prev) =>
            prev.map((n) =>
              selectedIds.includes(n.id)
                ? { ...n, read: "false", selected: false }
                : n,
            ),
          );
        },
        onError: () => {
          toast.error(
            "Failed to mark notifications as read. Please try again.",
          );
          // Revert optimistic update on error
          setNotifications((prev) =>
            prev.map((n) =>
              selectedIds.includes(n.id)
                ? { ...n, read: "true", selected: false }
                : n,
            ),
          );
        },
      },
    );
  };

  const deleteSelectedNotification = () => {
    const selectedIds = notifications
      .filter((n) => n.selected)
      .map((n) => n.id);
    if (selectedIds.length === 0) return;

    // Optimistically update the UI
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));

    deleteNotification.mutate(
      { selectedIds },
      {
        onSuccess: () => {
          toast.success("Notifications deleted successfully");
          setNotifications((prev) =>
            prev.map((n) =>
              selectedIds.includes(n.id)
                ? { ...n, read: "false", selected: false }
                : n,
            ),
          );
        },
        onError: () => {
          toast.error("Failed to delete notifications. Please try again.");
          setNotifications((prev) =>
            prev.map((n) =>
              selectedIds.includes(n.id)
                ? { ...n, read: "true", selected: false }
                : n,
            ),
          );
        },
      },
    );
  };

  return (
    <div className="lg:w-full rounded-xl border shadow-md border-black/30 mt-6 mx-auto overflow-hidden">
      {/* Header */}

      <div className="bg-white border-b border-black/30 px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Select All Section */}
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={allVisibleSelected}
              ref={(el) => {
                if (el)
                  el.indeterminate = Boolean(
                    someVisibleSelected && !allVisibleSelected,
                  );
              }}
              onChange={toggleSelectAll}
              className="w-4 h-4 accent-cyan-dark bg-gray-100 border-gray-300 rounded-xl"
            />
            <span className="text-sm text-gray-700">
              {notifications.filter((n) => n.selected).length} selected
            </span>
          </div>
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => refetch()}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              aria-label="Refresh notifications"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={() => setDropDownOpen(!dropDownOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              aria-label="More options"
            >
              <MoreVertical size={20} />
            </button>
            <AnimatePresence>
              {dropDownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -left-full top-12 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <button
                    onClick={markSelectedNotification}
                    className="flex items-center gap-2 px-4 py-2 text-sm w-full cursor-pointer text-gray-700 hover:bg-gray-100"
                  >
                    <LucideBookMarked />
                    Mark as read
                  </button>
                  <button
                    onClick={deleteSelectedNotification}
                    className="flex items-center gap-2 px-4 text-red-500 w-full cursor-pointer py-2 text-sm hover:bg-red-100"
                  >
                    <LucideTrash />
                    Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        {/* Notifications List */}
        <div className="">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications
              </h3>
            </div>
          ) : (
            notifications?.map((notification, index) => (
              <div
                key={index}
                ref={index == notifications.length - 1 ? ref : undefined}
                className={`border-b p-4 py-6 hover:shadow-sm transition-shadow ${
                  !notification.read ? "bg-green-bg" : "bg-white"
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
                    <div className="flex flex-col min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 text-xs md:text-sm mb-0.5">
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm leading-tight">
                        {notification.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 ml-2 flex-shrink-0">
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDateTime(notification.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="bg-white rounded-lg border p-4 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-500"></div>
                Loading more notifications...
              </div>
            </div>
          )}

          {/* End of notifications message */}
          {!hasNextPage && notifications.length > 0 && (
            <div className="bg-white rounded-lg border p-4 text-center text-sm text-gray-500">
              You&apos;ve reached the end of your notifications
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
