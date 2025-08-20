"use state";
import useSettings from "@/hooks/SettingsHook";
import { useEffect, useState } from "react";
import { ToggleSwitch } from "./ToggleSwitch";

export const PreferencesSection = () => {
  const { useUserSettings } = useSettings();
  const { data, isLoading } = useUserSettings();
  const [feesBreakdown, setFeesBreakdown] = useState(false);
  const [saveRecipients, setSaveRecipients] = useState(false);
  const [theme, setTheme] = useState(true);
  const { updateUserSettings } = useSettings();

  useEffect(() => {
    setFeesBreakdown(data?.data.setting.fees_breakdown ?? false);
    setSaveRecipients(data?.data.setting.save_recipient ?? false);
  }, [data]);

  const toggleFeesBreakdown = (checked: boolean) => {
    setFeesBreakdown(checked);
    updateUserSettings.mutate(
      {
        setting: {
          fees_breakdown: checked,
        },
      },
      {
        onSuccess: () => {
          console.log("Fees breakdown updated successfully");
        },
        onError: (error) => {
          console.error("Error updating fees breakdown:", error);
        },
      }
    );
  };

  const toggleSaveRecipient = (checked: boolean) => {
    setSaveRecipients(checked);
    updateUserSettings.mutate(
      {
        setting: {
          save_recipient: checked,
        },
      },
      {
        onSuccess: () => {
          console.log("Fees breakdown updated successfully");
        },
        onError: (error) => {
          console.error("Error updating fees breakdown:", error);
        },
      }
    );
  };

  useEffect(() => {
    if (data?.data.setting) {
      setFeesBreakdown(data.data.setting.fees_breakdown ?? true);
      setSaveRecipients(data.data.setting.save_recipient ?? false);
    }
  }, [data]);

  return (
    <div className="w-full p-4 md:p-6 bg-white">
      {/* Recipients Section */}
      {data?.data.setting && !isLoading ? (
        <div className="rounded-lg p-4 md:p-6 mb-4 md:mb-6 border border-gray-200">
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">
            Recipients
          </h2>

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="text-sm md:text-base font-medium mb-1">
                  Fees Breakdown
                </h3>
                <p className="text-xs md:text-sm">
                  Show detailed breakdowns of fees and charges when making a
                  transfer to a recipient
                </p>
              </div>
              <div className="ml-2 md:ml-4">
                <ToggleSwitch
                  enabled={feesBreakdown}
                  onChange={toggleFeesBreakdown}
                />
              </div>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="text-sm md:text-base font-medium mb-1">
                  Save Recipients
                </h3>
                <p className="text-xs md:text-sm">
                  Save my recipients bank accounts details for easy access
                </p>
              </div>
              <div className="ml-2 md:ml-4">
                <ToggleSwitch
                  enabled={saveRecipients}
                  onChange={toggleSaveRecipient}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg p-4 md:p-6 mb-4 md:mb-6 border border-gray-200">
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">
            Recipients
          </h2>
          <p className="text-sm md:text-base">Loading recipients settings...</p>
        </div>
      )}

      {/* UI & Display Section */}
      <div className="rounded-lg p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">
          UI & Display
        </h2>

        <div className="space-y-4 md:space-y-6">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-sm md:text-base font-medium mb-1">Theme</h3>
              <p className="text-xs md:text-sm">
                Toggle between light and dark mode on the platform
              </p>
            </div>
            <div className="ml-2 md:ml-4">
              <ToggleSwitch enabled={theme} onChange={setTheme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
