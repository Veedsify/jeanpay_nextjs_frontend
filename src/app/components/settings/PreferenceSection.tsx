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
      <div className={`w-11 h-6 rounded-full peer transition-colors ${
        enabled 
          ? 'bg-green-400' 
          : 'bg-gray-300'
      } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300`}>
        <div 
          className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${
            enabled ? 'translate-x-full' : ''
          }`}
        />
      </div>
    </label>
  );

  return (
    <div className="w-full bg-white p-6">

      {/* Recipients Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recipients</h2>
        
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">Fees Breakdown</h3>
              <p className="text-sm text-gray-600">Show detailed breakdowns of fees and charges when making a transfer to a recipient</p>
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
              <h3 className="font-medium text-gray-900 mb-1">Save Recipients</h3>
              <p className="text-sm text-gray-600">Save my recipients bank accounts details for easy access</p>
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
      <div className="border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">UI & Display</h2>
        
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">Theme</h3>
              <p className="text-sm text-gray-600">Toggle between light and dark mode on the platform</p>
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
              <h3 className="font-medium text-gray-900 mb-1">Grayscale</h3>
              <p className="text-sm text-gray-600">Toggle a black and white only version of the web app</p>
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