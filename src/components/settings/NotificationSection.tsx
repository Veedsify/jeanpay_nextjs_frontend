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
      <div
        className="w-10 h-6 md:w-12 md:h-7 rounded-full peer transition-colors duration-200 ease-in-out relative"
        style={{
          backgroundColor: checked
            ? 'var(--color-jean-green-400)'
            : 'var(--jean-gray-200)'
        }}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 md:w-6 md:h-6 rounded-full transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-4 md:translate-x-5' : 'translate-x-0'
          }`}
          style={{ backgroundColor: 'var(--jean-white)' }}
        />
      </div>
    </label>
  );

  return (
    <div className="w-full px-4 md:px-6 py-4" style={{ backgroundColor: 'var(--jean-white)' }}>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2" style={{ color: 'var(--jean-gray-900)' }}>
          Notifications
        </h1>
        <p className="text-sm md:text-base" style={{ color: 'var(--jean-gray-600)' }}>
          Modify how we send you notifications
        </p>
      </div>

      {/* Platform Notifications Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6" style={{ color: 'var(--jean-gray-900)' }}>
          Platform Notifications
        </h2>

        <div className="space-y-4 md:space-y-6">
          {/* Email Notifications */}
          <div className="flex items-start justify-between py-3 md:py-4">
            <div className="flex-1 mr-2 md:mr-0">
              <h3 className="text-sm md:text-base font-medium mb-1" style={{ color: 'var(--jean-gray-900)' }}>
                Email Notifications
              </h3>
              <p className="text-xs md:text-sm" style={{ color: 'var(--jean-gray-600)' }}>
                You will be able to receive email notifications for actions taken on your account
              </p>
            </div>
            <div className="ml-2 md:ml-4">
              <Toggle
                checked={notifications.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
            </div>
          </div>

          {/* Push Notifications */}
          <div className="flex items-start justify-between py-3 md:py-4">
            <div className="flex-1 mr-2 md:mr-0">
              <h3 className="text-sm md:text-base font-medium mb-1" style={{ color: 'var(--jean-gray-900)' }}>
                Push Notifications
              </h3>
              <p className="text-xs md:text-sm" style={{ color: 'var(--jean-gray-600)' }}>
                We&apos;ll send you push notification on the app
              </p>
            </div>
            <div className="ml-2 md:ml-4">
              <Toggle
                checked={notifications.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter & Promotional Notifications Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6" style={{ color: 'var(--jean-gray-900)' }}>
          Newsletter & Promotional Notifications
        </h2>

        <div className="space-y-4 md:space-y-6">
          {/* Send Me Promotional Notifications */}
          <div className="flex items-start justify-between py-3 md:py-4">
            <div className="flex-1 mr-2 md:mr-0">
              <h3 className="text-sm md:text-base font-medium mb-1" style={{ color: 'var(--jean-gray-900)' }}>
                Send Me Promotional Notifications
              </h3>
              <p className="text-xs md:text-sm" style={{ color: 'var(--jean-gray-600)' }}>
                You&apos;ll receive updates, price and rate updates and more notifications in your inbox
              </p>
            </div>
            <div className="ml-2 md:ml-4">
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