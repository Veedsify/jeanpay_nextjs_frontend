import { useState } from "react";

export const PreferencesSection = () => {
  const [feesBreakdown, setFeesBreakdown] = useState(true);
  const [saveRecipients, setSaveRecipients] = useState(false);
  const [theme, setTheme] = useState(true);
  const [grayscale, setGrayscale] = useState(false);

  const ToggleSwitch = ({ enabled, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className="w-11 h-6 rounded-full peer transition-colors relative"
        style={{
          backgroundColor: enabled
            ? 'var(--jean-green-400)'
            : 'var(--jean-gray-300)',
          boxShadow: enabled ? '0 0 0 4px var(--jean-green-400)' : 'none',
        }}
      >
        <div
          className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full border transition-transform ${
            enabled ? 'translate-x-full' : ''
          }`}
          style={{
            backgroundColor: 'var(--jean-white)',
            borderColor: 'var(--jean-gray-300)',
          }}
        />
      </div>
    </label>
  );

  return (
    <div className="w-full p-6" style={{ backgroundColor: 'var(--jean-white)' }}>
      {/* Recipients Section */}
      <div className="rounded-lg p-6 mb-6" style={{ border: '1px solid var(--jean-gray-200)' }}>
        <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--jean-gray-900)' }}>
          Recipients
        </h2>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium mb-1" style={{ color: 'var(--jean-gray-900)' }}>
                Fees Breakdown
              </h3>
              <p className="text-sm" style={{ color: 'var(--jean-gray-600)' }}>
                Show detailed breakdowns of fees and charges when making a transfer to a recipient
              </p>
            </div>
            <div className="ml-4">
              <ToggleSwitch
                enabled={feesBreakdown}
                onChange={setFeesBreakdown}
              />
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium mb-1" style={{ color: 'var(--jean-gray-900)' }}>
                Save Recipients
              </h3>
              <p className="text-sm" style={{ color: 'var(--jean-gray-600)' }}>
                Save my recipients bank accounts details for easy access
              </p>
            </div>
            <div className="ml-4">
              <ToggleSwitch
                enabled={saveRecipients}
                onChange={setSaveRecipients}
              />
            </div>
          </div>
        </div>
      </div>

      {/* UI & Display Section */}
      <div className="rounded-lg p-6" style={{ border: '1px solid var(--jean-gray-200)' }}>
        <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--jean-gray-900)' }}>
          UI & Display
        </h2>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium mb-1" style={{ color: 'var(--jean-gray-900)' }}>
                Theme
              </h3>
              <p className="text-sm" style={{ color: 'var(--jean-gray-600)' }}>
                Toggle between light and dark mode on the platform
              </p>
            </div>
            <div className="ml-4">
              <ToggleSwitch
                enabled={theme}
                onChange={setTheme}
              />
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium mb-1" style={{ color: 'var(--jean-gray-900)' }}>
                Grayscale
              </h3>
              <p className="text-sm" style={{ color: 'var(--jean-gray-600)' }}>
                Toggle a black and white only version of the web app
              </p>
            </div>
            <div className="ml-4">
              <ToggleSwitch
                enabled={grayscale}
                onChange={setGrayscale}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
