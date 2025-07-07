

import { Tab } from "@/app/(dashboard)/dashboard/settings/page";

interface SettingsHeaderProps {
  activeTab: string;
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
}

export const SettingsHeader = ({
  activeTab,
  tabs,
  onTabChange,
}: SettingsHeaderProps) => {
  return (
    <div className="mb-8">
      <nav className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-8 border-b border-gray-200 min-w-max px-4 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};