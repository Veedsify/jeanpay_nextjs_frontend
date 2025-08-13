import React, { useMemo } from "react";
import { MoreHorizontal } from "lucide-react";

interface RecentActivityStatProps {
  className?: string;
  recentActivity:
    | {
        created_at: string;
        activity: string;
        id: number;
      }[]
    | undefined;
  isLoading?: boolean;
}

const RecentActivityStat: React.FC<RecentActivityStatProps> = ({
  className,
  recentActivity,
  isLoading = false,
}) => {
  const activities = useMemo(() => {
    if (!recentActivity) {
      return [];
    }

    // Sort activities by created_at in descending order (newest first)
    const sortedActivities = [...recentActivity].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayActivities = sortedActivities.filter((activity) => {
      const activityDate = new Date(activity.created_at);
      return activityDate.toDateString() === today.toDateString();
    });

    const yesterdayActivities = sortedActivities.filter((activity) => {
      const activityDate = new Date(activity.created_at);
      return activityDate.toDateString() === yesterday.toDateString();
    });

    return [
      {
        id: 1,
        day: "Today",
        items: todayActivities.slice(0, 3).map((activity) => ({
          user: activity.activity.split(" ")[0] || "User",
          action: activity.activity,
          time: new Date(activity.created_at).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          avatar: "A",
        })),
      },
      {
        id: 2,
        day: "Yesterday",
        items: yesterdayActivities.slice(0, 3).map((activity) => ({
          user: activity.activity.split(" ")[0] || "User",
          action: activity.activity,
          time: new Date(activity.created_at).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          avatar: "A",
        })),
      },
    ];
  }, [recentActivity]);

  const getAvatarColor = (letter: string) => {
    const colors: { [key: string]: string } = {
      T: "bg-green-400",
      A: "bg-green-400",
      M: "bg-green-400",
      W: "bg-green-400",
    };
    return colors[letter] || "bg-green-400";
  };

  if (isLoading) {
    return (
      <div
        className={`bg-white p-6 rounded-2xl border border-black/30 animate-pulse ${className}`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-6">
          {[1, 2].map((group) => (
            <div key={group}>
              <div className="h-6 w-20 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 w-3/4 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 w-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white p-6 rounded-2xl border border-black/30 ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
      </div>

      {/* Activity List */}
      <div className="space-y-6">
        {activities.map((dayGroup) => (
          <div key={dayGroup.id}>
            {/* Day Header */}
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {dayGroup.day}
            </h3>

            {/* Activity Items */}
            <div className="space-y-4">
              {dayGroup.items.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full ${getAvatarColor(
                      activity.avatar
                    )} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white text-sm font-medium">
                      {activity.avatar}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-600"> {activity.action}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityStat;
