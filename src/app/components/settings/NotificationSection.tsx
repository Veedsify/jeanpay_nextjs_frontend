'use client';

import { useState } from 'react';

interface NotificationState {
  emailNotifications: boolean;
  pushNotifications: boolean;
  promotionalNotifications: boolean;
}

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

export const NotificationsSection = () => {
  const [notifications, setNotifications] = useState<NotificationState>({
    emailNotifications: true,
    pushNotifications: false,
    promotionalNotifications: true,
  });

  const handleToggle = (key: keyof NotificationState) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className={`w-12 h-7 rounded-full peer transition-colors duration-200 ease-in-out ${
        checked 
          ? 'bg-green-400' 
          : 'bg-gray-200'
      }`}>
        <div className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}></div>
      </div>
    </label>
  );

  return (
    <div className="w-full bg-white px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">Modify how we send you notifications</p>
        </div>

        {/* Platform Notifications Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Platform Notifications</h2>
          
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="flex items-start justify-between py-4">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Email Notifications</h3>
                <p className="text-sm text-gray-600">
                  You will be able to receive email notifications for actions taken on your account
                </p>
              </div>
              <div className="ml-4">
                <Toggle 
                  checked={notifications.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
              </div>
            </div>

            {/* Push Notifications */}
            <div className="flex items-start justify-between py-4">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Push Notifications</h3>
                <p className="text-sm text-gray-600">
                  We'll send you push notification on the app
                </p>
              </div>
              <div className="ml-4">
                <Toggle 
                  checked={notifications.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter & Promotional Notifications Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Newsletter & Promotional Notifications</h2>
          
          <div className="space-y-6">
            {/* Send Me Promotional Notifications */}
            <div className="flex items-start justify-between py-4">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Send Me Promotional Notifications</h3>
                <p className="text-sm text-gray-600">
                  You'll receive updates, price and rate updates and more notifications in your inbox
                </p>
              </div>
              <div className="ml-4">
                <Toggle 
                  checked={notifications.promotionalNotifications}
                  onChange={() => handleToggle('promotionalNotifications')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};