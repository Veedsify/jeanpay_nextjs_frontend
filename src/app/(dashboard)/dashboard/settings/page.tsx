"use client";
import { useState } from "react";
import { User, Lock, Bell } from "lucide-react";
import { SettingsHeader } from "@/app/components/settings/SettingsHeader";
import { ProfileSection } from "@/app/components/settings/ProfileSection";
import { AccountSection } from "@/app/components/settings/AccountSection";
import { PreferencesSection } from "@/app/components/settings/PreferenceSection";
import { NotificationsSection } from "@/app/components/settings/NotificationSection";
import { SecuritySection } from "@/app/components/settings/SecuritySection";
import { useAuthContext } from "@/app/components/contexts/UserAuthContext";
import useSettings from "@/hooks/SettingsHook";
import toast from "react-hot-toast";

type Tab = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuthContext();
  const { updateProfile } = useSettings();
  const [profileData] = useState({
    firstName: String(user?.first_name),
    lastName: String(user?.last_name),
    email: String(user?.email),
    phone: user?.phone_number ?? "",
    profileImage: String(user?.profile_picture || "/images/defaults/user.jpg"),
  });

  const tabs: Tab[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: User },
    { id: "preferences", label: "Preferences", icon: Bell },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ];

  const handleProfileUpdate = (updatedData: typeof profileData) => {
    updateProfile.mutate(
      {
        email: updatedData.email,
        phone: updatedData.phone,
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        profileImage: updatedData.profileImage,
      },
      {
        onError: (error) => {
          console.log(error);
          toast.error("Error updating profile:");
        },
        onSuccess: () => {
          toast.success("Profile updated successfully!");
        },
      },
    );
  };

  return (
    <div className=" mt-6 p-5 bg-white border border-black/30 rounded-xl lg:rounded-2xl ">
      <SettingsHeader
        activeTab={activeTab}
        tabs={tabs}
        onTabChange={setActiveTab}
      />

      <div className="bg-white">
        {activeTab === "profile" && (
          <ProfileSection
            profileData={profileData}
            onProfileUpdate={handleProfileUpdate}
          />
        )}
        {activeTab === "account" && <AccountSection />}
        {activeTab === "preferences" && <PreferencesSection />}
        {activeTab === "notifications" && <NotificationsSection />}
        {activeTab === "security" && <SecuritySection />}
      </div>
    </div>
  );
}
