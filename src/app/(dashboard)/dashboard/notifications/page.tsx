// "use client";
// import { useState } from "react";
// import { CheckCircle, XCircle, Clock, Info, X } from "@phosphor-icons/react";

// interface Notification {
//   id: string;
//   type: "success" | "error" | "warning" | "info";
//   title: string;
//   message: string;
//   timestamp: string;
//   read: boolean;
// }

// export default function NotificationsPage() {
//   const [notifications, setNotifications] = useState<Notification[]>([
//     {
//       id: "1",
//       type: "success",
//       title: "Account Security Update",
//       message: "Your password was successfully updated.",
//       timestamp: "Just now",
//       read: false,
//     },
//     {
//       id: "2",
//       type: "success",
//       title: "Successful Transfer Completed",
//       message: "Your transfer of $1000 to Sarah Connors is complete.",
//       timestamp: "10 min ago",
//       read: false,
//     },
//     {
//       id: "3",
//       type: "info",
//       title: "Payment Received",
//       message: "You've received a payment of $750 from Mike Johnson.",
//       timestamp: "30 min ago",
//       read: false,
//     },
//     {
//       id: "4",
//       type: "info",
//       title: "Investment Alert: Tech Stocks Surge",
//       message: "Check out the latest surge in tech stocks today!",
//       timestamp: "1 hour ago",
//       read: true,
//     },
//     {
//       id: "5",
//       type: "info",
//       title: "Monthly Account Summary",
//       message: "Your monthly account summary is ready to view.",
//       timestamp: "2 hours ago",
//       read: true,
//     },
//     {
//       id: "6",
//       type: "warning",
//       title: "Budget Close to Limit",
//       message: "You are nearing your set budget limit for groceries this month.",
//       timestamp: "5 hours ago",
//       read: true,
//     },
//     {
//       id: "7",
//       type: "info",
//       title: "Scheduled Maintenance Reminder",
//       message: "We will undergo scheduled maintenance from 12 AM to 3 AM tonight.",
//       timestamp: "Yesterday",
//       read: true,
//     },
//     {
//       id: "8",
//       type: "info",
//       title: "New Feature: Advanced Budgeting Tools",
//       message: "Explore our new advanced budgeting tools to better manage your finances.",
//       timestamp: "Yesterday",
//       read: true,
//     },
//     {
//       id: "9",
//       type: "info",
//       title: "Annual Account Review Ready",
//       message: "Your yearly financial review is now available. Discover insights and trends based on your last year's activity!",
//       timestamp: "2 days ago",
//       read: true,
//     },
//     {
//       id: "10",
//       type: "info",
//       title: "Credit Score Update",
//       message: "Your latest credit score has been updated. Check your dashboard to see how your credit has improved!",
//       timestamp: "1 week ago",
//       read: true,
//     },
//   ]);

//   const [filter, setFilter] = useState<"all" | "unread">("all");

//   const markAsRead = (id: string) => {
//     setNotifications(
//       notifications.map((notif) =>
//         notif.id === id ? { ...notif, read: true } : notif
//       )
//     );
//   };

//   const markAllAsRead = () => {
//     setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
//   };

//   const deleteNotification = (id: string) => {
//     setNotifications(notifications.filter((notif) => notif.id !== id));
//   };

//   const filteredNotifications =
//     filter === "all"
//       ? notifications
//       : notifications.filter((notif) => !notif.read);

//   const unreadCount = notifications.filter((notif) => !notif.read).length;

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
//           {unreadCount > 0 && (
//             <p className="text-sm text-gray-500 mt-1">
//               {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
//             <button
//               onClick={() => setFilter("all")}
//               className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                 filter === "all" ? "bg-white shadow-sm text-gray-900" : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               All
//             </button>
//             <button
//               onClick={() => setFilter("unread")}
//               className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                 filter === "unread" ? "bg-white shadow-sm text-gray-900" : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               Unread
//             </button>
//           </div>

//           {unreadCount > 0 && (
//             <button
//               onClick={markAllAsRead}
//               className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
//             >
//               Mark all as read
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Notifications List */}
//       <div className="space-y-3">
//         {filteredNotifications.length === 0 ? (
//           <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
//             <div className="text-gray-400 mb-4">
//               <Info size={48} className="mx-auto" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No notifications
//             </h3>
//             <p className="text-gray-500">
//               {filter === "unread"
//                 ? "You're all caught up! No unread notifications."
//                 : "You don't have any notifications yet."}
//             </p>
//           </div>
//         ) : (
//           filteredNotifications.map((notification) => (
//             <div
//               key={notification.id}
//               className={`p-4 rounded-lg transition-all ${
//                 notification.read ? "bg-white" : "bg-gray-50"
//               } border shadow-sm`}
//             >
//               <div className="flex items-start gap-4">
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2">
//                         <h3 className="font-medium text-gray-900">
//                           {notification.title}
//                         </h3>
//                         {!notification.read && (
//                           <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
//                         )}
//                       </div>
//                       <p className="text-gray-700 mt-1 text-sm">
//                         {notification.message}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <p className="text-xs text-gray-500 whitespace-nowrap">
//                         {notification.timestamp}
//                       </p>
//                       <button
//                         onClick={() => deleteNotification(notification.id)}
//                         className="text-gray-400 hover:text-gray-600 transition-colors p-1"
//                       >
//                         <X size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Star, RotateCcw, MoreVertical, ChevronDown } from "lucide-react";

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
const generateNotifications = (startIndex: number, count: number): Notification[] => {
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
      message: "You are nearing your set budget limit for groceries this month.",
      timestamp: "Sep 17",
      type: "warning" as const,
    },
    {
      title: "Scheduled Maintenance Reminder",
      message: "We will undergo scheduled maintenance from 12 AM to 3 AM tonight.",
      timestamp: "Sep 14",
      type: "info" as const,
    },
    {
      title: "New Feature: Advanced Budgeting Tools",
      message: "Explore our new advanced budgeting tools to better manage your finances.",
      timestamp: "Sep 14",
      type: "success" as const,
    },
    {
      title: "Annual Account Review Ready",
      message: "Your yearly financial review is now available. Discover insights and trends based on your last year's activity!",
      timestamp: "Sep 13",
      type: "info" as const,
    },
    {
      title: "Credit Score Update",
      message: "Your latest credit score has been updated. Check your dashboard to see how your credit has improved!",
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
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observer = useRef<IntersectionObserver>();

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
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newNotifications = generateNotifications(page * 10, 10);
    
    if (newNotifications.length === 0) {
      setHasMore(false);
    } else {
      setNotifications(prev => [...prev, ...newNotifications]);
      setPage(prev => prev + 1);
    }
    
    setLoading(false);
  }, [loading, hasMore, page]);

  // Intersection observer for infinite scroll
  const lastNotificationElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreNotifications();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMoreNotifications]);

  // Toggle checkbox
  const toggleCheckbox = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, selected: !n.selected} : n
    ));
  };

  // Toggle star status
  const toggleStar = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, starred: !n.starred} : n
    ));
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

  // Filter notifications based on current filter
  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.read;
    if (filter === "starred") return n.starred;
    return true;
  });

  // Select all notifications
  const toggleSelectAll = () => {
    const filteredIds = filteredNotifications.map(n => n.id);
    const allSelected = filteredIds.every(id => 
      notifications.find(n => n.id === id)?.selected
    );
    
    setNotifications(notifications.map(n => 
      filteredIds.includes(n.id) ? {...n, selected: !allSelected} : n
    ));
  };

  // Check if all visible notifications are selected
  const allVisibleSelected = filteredNotifications.length > 0 && 
    filteredNotifications.every(n => n.selected);
  
  // Check if some visible notifications are selected
  const someVisibleSelected = filteredNotifications.some(n => n.selected);

  return (
    <div className="w-[90%] lg:w-full rounded-lg border shadow-md border-black/90 mx-auto bg-gray-50">
      {/* Header */}

      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          {/* <h1 className="text-xl font-semibold text-gray-900">Notifications</h1> */}
                    {/* <input
            type="checkbox"
            checked={allVisibleSelected}
            ref={(el) => {
              if (el) el.indeterminate = someVisibleSelected && !allVisibleSelected;
            }}
            onChange={toggleSelectAll}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <ChevronDown className="h-5 w-5 text-gray-500" /> */}
            {/* Select All Section */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={allVisibleSelected}
            ref={(el) => {
              if (el) el.indeterminate = someVisibleSelected && !allVisibleSelected;
            }}
            onChange={toggleSelectAll}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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
        {/* Filter tabs */}
        <div className="flex gap-8 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`pb-2 text-sm font-medium border-b-2 ${
              filter === "all" 
                ? "border-blue-500 text-blue-600" 
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`pb-2 text-sm font-medium border-b-2 ${
              filter === "unread" 
                ? "border-blue-500 text-blue-600" 
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("starred")}
            className={`pb-2 text-sm font-medium border-b-2 ${
              filter === "starred" 
                ? "border-blue-500 text-blue-600" 
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Starred
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications
              </h3>
              <p className="text-gray-500">
                {filter === "unread"
                  ? "You're all caught up! No unread notifications."
                  : filter === "starred"
                  ? "You don't have any starred notifications."
                  : "You don't have any notifications yet."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                ref={index === filteredNotifications.length - 1 ? lastNotificationElementRef : undefined}
                className={`bg-white  border-t border-b p-4 hover:shadow-sm transition-shadow ${
                  !notification.read ? "border-l-4 border-l-cyan-dark" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className=" bg-red-400 flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {/* Checkbox positioned with content */}
                        <div className="flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={notification.selected}
                            onChange={() => toggleCheckbox(notification.id)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h3 className="font-medium text-[8px] text-gray-900 md:text-sm mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {notification.timestamp}
                        </span>
                        <button 
                          onClick={() => toggleStar(notification.id)}
                          className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                          aria-label={notification.starred ? "Unstar notification" : "Star notification"}
                        >
                          <Star 
                            size={16} 
                            className={notification.starred ? "text-yellow-500 fill-current" : ""} 
                          />
                        </button>
                      </div>
                    </div>
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
          {!hasMore && filteredNotifications.length > 0 && (
            <div className="bg-white rounded-lg border p-4 text-center text-sm text-gray-500">
              You've reached the end of your notifications
            </div>
          )}
        </div>
      </div>
    </div>
  );
}