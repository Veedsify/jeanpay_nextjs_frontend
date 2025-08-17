import { axiosClient } from "@/lib/axios";
import {
  ProfileUpdateData,
  ChangePasswordData,
  SecuritySettingsData,
  PreferencesData,
  NotificationSettingsData,
  UserSettings,
  SettingsApiResponse,
  UpdateSettingsResponse,
  TwoFactorSetup,
  WalletData,
  WithdrawalData,
} from "@/types/settings";

const path = {
  SettingsBase: "/protected/settings",
  SettingsUpdate: "/update",
  SettingsChangePassword: "/change-password",
  SettingsPreferences: "/preferences",
  SettingsProfile: "/profile",
  SettingsProfilePicture: "/profile-picture",
  SettingsSecurity: "/security",
  SettingsNotifications: "/notifications",
  SettingsTwoFactorQR: "/security/two-factor/qr",
  SettingsTwoFactorEnable: "/security/two-factor/enable",
  SettingsTwoFactorDisable: "/security/two-factor/disable",
  SettingsWallet: "/wallet",
  SettingsWithdrawal: "/withdrawal",
};

// Get user settings
async function getUserSettings(): Promise<SettingsApiResponse<UserSettings>> {
  const response = await axiosClient.get(path.SettingsBase + "/");
  return response.data;
}

async function updateProfilePicture(
  file: File,
): Promise<SettingsApiResponse<UpdateSettingsResponse>> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosClient.post(
    path.SettingsBase + path.SettingsProfilePicture,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}

// Update general user settings
async function updateUserSettings(
  settings: Partial<UserSettings>,
): Promise<SettingsApiResponse<UpdateSettingsResponse>> {
  const response = await axiosClient.put(
    path.SettingsBase + path.SettingsUpdate,
    settings,
  );
  return response.data;
}

// Profile Section Functions
async function updateProfile(
  profileData: ProfileUpdateData,
): Promise<SettingsApiResponse<UpdateSettingsResponse>> {
  const response = await axiosClient.put(
    path.SettingsBase + path.SettingsProfile,
    profileData,
  );
  return response.data;
}

// Security Section Functions
async function changePassword(
  passwordData: ChangePasswordData,
): Promise<SettingsApiResponse<UpdateSettingsResponse>> {
  const response = await axiosClient.put(
    path.SettingsBase + path.SettingsChangePassword,
    passwordData,
  );
  return response.data;
}

async function updateSecuritySettings(
  securityData: SecuritySettingsData,
): Promise<SettingsApiResponse<UpdateSettingsResponse>> {
  const response = await axiosClient.put(
    path.SettingsBase + path.SettingsSecurity,
    securityData,
  );
  return response.data;
}

// Two-Factor Authentication Functions
async function generateTwoFactorQR(): Promise<
  SettingsApiResponse<TwoFactorSetup>
> {
  const response = await axiosClient.get(
    path.SettingsBase + path.SettingsTwoFactorQR,
  );
  return response.data;
}

async function enableTwoFactor(
  code: string,
): Promise<SettingsApiResponse<UpdateSettingsResponse>> {
  const response = await axiosClient.post(
    path.SettingsBase + path.SettingsTwoFactorEnable,
    { code },
  );
  return response.data;
}

async function disableTwoFactor(
  code: string,
): Promise<SettingsApiResponse<UpdateSettingsResponse>> {
  const response = await axiosClient.post(
    path.SettingsBase + path.SettingsTwoFactorDisable,
    { code },
  );
  return response.data;
}

// Preferences Section Functions
async function updatePreferences(
  preferencesData: PreferencesData,
): Promise<SettingsApiResponse<UpdateSettingsResponse>> {
  const response = await axiosClient.put(
    path.SettingsBase + path.SettingsPreferences,
    preferencesData,
  );
  return response.data;
}

// Notifications Section Functions
async function updateNotificationSettings(
  notificationData: NotificationSettingsData,
): Promise<SettingsApiResponse<UpdateSettingsResponse>> {
  const response = await axiosClient.put(
    path.SettingsBase + path.SettingsNotifications,
    notificationData,
  );
  return response.data;
}

// Wallet Section Functions
async function updateWalletInfo(
  walletData: WalletData,
): Promise<SettingsApiResponse<UpdateSettingsResponse>> {
  const response = await axiosClient.put(
    path.SettingsBase + path.SettingsWallet,
    walletData,
  );
  return response.data;
}

// Withdrawal Methods Section Functions
async function updateWithdrawalMethods(
  withdrawalData: WithdrawalData,
): Promise<SettingsApiResponse<UpdateSettingsResponse>> {
  const response = await axiosClient.put(
    path.SettingsBase + path.SettingsWithdrawal,
    withdrawalData,
  );
  return response.data;
}

export {
  getUserSettings,
  updateUserSettings,
  updateProfile,
  changePassword,
  updateSecuritySettings,
  generateTwoFactorQR,
  enableTwoFactor,
  updateProfilePicture,
  disableTwoFactor,
  updatePreferences,
  updateNotificationSettings,
  updateWalletInfo,
  updateWithdrawalMethods,
  path as SettingsPath,
};
