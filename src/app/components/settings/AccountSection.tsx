import { Edit, Save } from "lucide-react";
import { useState } from "react";

export const AccountSection = () => {
  const [editingSection, setEditingSection] = useState(null);
  
  // State for wallet info
  const [walletData, setWalletData] = useState({
    currency: 'NGN',
    ngnWallet: '0292909089',
    username: '@andrew22',
    ghsWallet: '0122893487'
  });

  // State for withdrawal info
  const [withdrawalData, setWithdrawalData] = useState({
    ngnAccount: 'Opay',
    ngnDetails: 'Andrew Forbist ( 8028289900 )',
    ghsAccount: 'Momo',
    ghsDetails: 'Andrew Forbist ( 8028289900 )'
  });

  const handleEdit = (section) => {
    setEditingSection(editingSection === section ? null : section);
  };

  const handleSave = (section) => {
    // Here you would typically send data to your backend
    console.log(`Saving ${section} data...`);
    setEditingSection(null);
    // Show success message (you can add toast notifications here)
  };

  return (
    <div className="w-full bg-white p-6">

      {/* Wallet Info Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Wallet Info</h2>
          {editingSection === 'wallet' ? (
            <button 
              onClick={() => handleSave('wallet')}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              <Save size={14} />
              Save
            </button>
          ) : (
            <button 
              onClick={() => handleEdit('wallet')}
              className="flex items-center gap-2 px-3 py-1.5 bg-teal-700 text-white text-sm rounded hover:bg-teal-800"
            >
              <Edit size={14} />
              Edit
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1">Default Currency</p>
              {editingSection === 'wallet' ? (
                <select 
                  value={walletData.currency}
                  onChange={(e) => setWalletData({...walletData, currency: e.target.value})}
                  className="text-lg font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1"
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                  <option value="GHS">GHS</option>
                </select>
              ) : (
                <p className="text-lg font-semibold text-gray-900">{walletData.currency}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">NGN Wallet Number</p>
              {editingSection === 'wallet' ? (
                <input 
                  type="text" 
                  value={walletData.ngnWallet}
                  onChange={(e) => setWalletData({...walletData, ngnWallet: e.target.value})}
                  className="text-lg font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900">{walletData.ngnWallet}</p>
              )}
            </div>
          </div>
          
          <div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1">Username</p>
              {editingSection === 'wallet' ? (
                <input 
                  type="text" 
                  value={walletData.username}
                  onChange={(e) => setWalletData({...walletData, username: e.target.value})}
                  className="text-lg font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900">{walletData.username}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">GHS Wallet Number</p>
              {editingSection === 'wallet' ? (
                <input 
                  type="text" 
                  defaultValue="0122893487"
                  className="text-lg font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900">0122893487</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account Verification & KYC Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Account Verification & KYC</h2>
          <button 
            onClick={() => handleEdit('verification')}
            className="flex items-center gap-2 px-3 py-1.5 bg-teal-700 text-white text-sm rounded hover:bg-teal-800"
          >
            <Edit size={14} />
            Edit
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-600 mb-1">Email Verification Status</p>
            <p className="text-lg font-semibold text-gray-900">Verified</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-1">Phone Number Verification</p>
            <p className="text-lg font-semibold text-gray-900">Verified</p>
          </div>
        </div>
      </div>

      {/* Default Withdrawal Method Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Default Withdrawal Method</h2>
          <button 
            onClick={() => handleEdit('withdrawal')}
            className="flex items-center gap-2 px-3 py-1.5 bg-teal-700 text-white text-sm rounded hover:bg-teal-800"
          >
            <Edit size={14} />
            Edit
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">NGN Payout Account</p>
              {editingSection === 'withdrawal' ? (
                <select className="text-lg font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 mb-2">
                  <option value="Opay">Opay</option>
                  <option value="Kuda">Kuda</option>
                  <option value="GTB">GTB</option>
                </select>
              ) : (
                <p className="text-lg font-semibold text-gray-900">Opay</p>
              )}
            </div>
            {editingSection === 'withdrawal' ? (
              <input 
                type="text" 
                defaultValue="Andrew Forbist ( 8028289900 )"
                className="text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-gray-900">Andrew Forbist ( 8028289900 )</p>
            )}
          </div>
          
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">GHS Payout Account</p>
              {editingSection === 'withdrawal' ? (
                <select className="text-lg font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 mb-2">
                  <option value="Momo">Momo</option>
                  <option value="AirtelTigo">AirtelTigo</option>
                  <option value="Vodafone">Vodafone</option>
                </select>
              ) : (
                <p className="text-lg font-semibold text-gray-900">Momo</p>
              )}
            </div>
            {editingSection === 'withdrawal' ? (
              <input 
                type="text" 
                defaultValue="Andrew Forbist ( 8028289900 )"
                className="text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-gray-900">Andrew Forbist ( 8028289900 )</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};