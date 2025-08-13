import React from "react";
import { MoreHorizontal } from "lucide-react";

interface ActivityItem {
  user: string;
  action: string;
  time: string;
  avatar: string;
}

interface ActivityGroup {
  id: number;
  day: string;
  items: ActivityItem[];
}

interface RecentActivityStatProps {
  className?: string;
  activities?: ActivityGroup[];
  isLoading?: boolean;
}

const RecentActivityStat: React.FC<RecentActivityStatProps> = ({
  className,
  activities = [
    {
      id: 1,
      day: "Today",
      items: [
        {
          user: "Tim",
          action: "funded 10,000 naira to Naira Wallet",
          time: "16:05",
          avatar: "T",
        },
        {
          user: "Alex Johnson",
          action: "logged in",
          time: "13:05",
          avatar: "A",
        },
        {
          user: "Morgan Lee",
          action: "added a new savings goal for vacation",
          time: "02:08",
          avatar: "M",
        },
      ],
    },
    {
      id: 2,
      day: "Yesterday",
      items: [
        {
          user: "Taylor Green",
          action: "reviewed recent transactions",
          time: "21:05",
          avatar: "T",
        },
        {
          user: "Wilson Baptista",
          action: "transferred funds to emergency fund",
          time: "09:05",
          avatar: "W",
        },
      ],
    },
  ],
  isLoading = false,
}) => {
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
                      activity.avatar,
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
