'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const SecuritySection = () => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [accountDeactivated, setAccountDeactivated] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    // Here you would typically call your API to update the password
    console.log('Password updated successfully');
    alert('Password updated successfully!');
    
    // Reset form and hide it
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswordForm(false);
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Here you would typically call your API to delete the account
      console.log('Account deletion requested');
      alert('Account deletion request submitted. Please check your email for confirmation.');
    }
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className={`w-12 h-7 rounded-full peer transition-colors duration-200 ease-in-out ${
        checked ? 'bg-green-400' : 'bg-gray-200'
      }`}>
        <div className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}></div>
      </div>
    </label>
  );

  return (
    <div className="w-full h-auto bg-white px-6 pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Security</h1>
        <p className="text-gray-600">Manage Your Security Settings</p>
      </div>

      {/* Password Section */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Password</h2>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm"
          >
            <span className="text-xs">📝</span>
            Change Password
          </button>
        </div>

        {showPasswordForm && (
          <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handlePasswordSave}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowPasswordForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Devices & Authentication Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Devices & Authentication</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Last Login Time</h3>
            <p className="text-lg font-semibold text-gray-900">May 12, 2003 | 12:55 PM</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Trusted Devices</h3>
            <p className="text-lg font-semibold text-gray-900">Chrome On Linux @ Google (This Device)</p>
          </div>
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Two Factor Authentication</h3>
            <p className="text-sm text-gray-600">Enable Two Factor Authentication For your Account</p>
          </div>
          <Toggle 
            checked={twoFactorEnabled}
            onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
        <h2 className="text-lg font-semibold text-red-600 mb-6">Danger Zone</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Deactivate Account</h3>
              <p className="text-sm text-gray-600">
                Deactivate Your Account To Prevent Unwanted Access, You'll need to contact Support To re-enable account
              </p>
            </div>
            <Toggle 
              checked={accountDeactivated}
              onChange={() => setAccountDeactivated(!accountDeactivated)}
            />
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Delete Account</h3>
              <p className="text-sm text-gray-600">Request Account Deletion</p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              🗑️ Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};