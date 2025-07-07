// import { Edit, Save } from "lucide-react";
// import { useState } from "react";

// export const AccountSection = () => {
//   const [editingSection, setEditingSection] = useState(null);

//   // State for wallet info
//   const [walletData, setWalletData] = useState({
//     currency: 'NGN',
//     ngnWallet: '0292909089',
//     username: '@andrew22',
//     ghsWallet: '0122893487'
//   });

//   // State for withdrawal info
//   const [withdrawalData, setWithdrawalData] = useState({
//     ngnAccount: 'Opay',
//     ngnDetails: 'Andrew Forbist ( 8028289900 )',
//     ghsAccount: 'Momo',
//     ghsDetails: 'Andrew Forbist ( 8028289900 )'
//   });

//   const handleEdit = (section) => {
//     setEditingSection(editingSection === section ? null : section);
//   };

//   const handleSave = (section) => {
//     // Here you would typically send data to your backend
//     console.log(`Saving ${section} data...`);
//     setEditingSection(null);
//     // Show success message (you can add toast notifications here)
//   };

//   return (
//     <div className="w-full bg-white p-6">

//       {/* Wallet Info Section */}
//       <div className="border border-gray-200 rounded-lg p-6 mb-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-semibold text-gray-900">Wallet Info</h2>
//           {editingSection === 'wallet' ? (
//             <button
//               onClick={() => handleSave('wallet')}
//               className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
//             >
//               <Save size={14} />
//               Save
//             </button>
//           ) : (
//             <button
//               onClick={() => handleEdit('wallet')}
//               className="flex items-center gap-2 px-3 py-1.5 bg-teal-700 text-white text-sm rounded hover:bg-teal-800"
//             >
//               <Edit size={14} />
//               Edit
//             </button>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <div className="mb-6">
//               <p className="text-sm text-gray-600 mb-1">Default Currency</p>
//               {editingSection === 'wallet' ? (
//                 <select
//                   value={walletData.currency}
//                   onChange={(e) => setWalletData({...walletData, currency: e.target.value})}
//                   className="text-lg font-semibold text-gray-900 border border-gray-300 rounded-xl px-3 py-2"
//                 >
//                   <option value="NGN">NGN</option>
//                   <option value="USD">USD</option>
//                   <option value="GHS">GHS</option>
//                 </select>
//               ) : (
//                 <p className="text-lg font-semibold text-gray-900">{walletData.currency}</p>
//               )}
//             </div>
//             <div>
//               <p className="text-sm text-gray-600 mb-1">NGN Wallet Number</p>
//               {editingSection === 'wallet' ? (
//                 <input
//                   type="text"
//                   value={walletData.ngnWallet}
//                   onChange={(e) => setWalletData({...walletData, ngnWallet: e.target.value})}
//                   className="text-lg font-semibold text-gray-900 border border-gray-300 rounded-xl px-3 py-2 w-full"
//                 />
//               ) : (
//                 <p className="text-lg font-semibold text-gray-900">{walletData.ngnWallet}</p>
//               )}
//             </div>
//           </div>

//           <div>
//             <div className="mb-6">
//               <p className="text-sm text-gray-600 mb-1">Username</p>
//               {editingSection === 'wallet' ? (
//                 <input
//                   type="text"
//                   value={walletData.username}
//                   onChange={(e) => setWalletData({...walletData, username: e.target.value})}
//                   className="text-lg font-semibold text-gray-900 border border-gray-300 rounded-xl px-3 py-2 w-full"
//                 />
//               ) : (
//                 <p className="text-lg font-semibold text-gray-900">{walletData.username}</p>
//               )}
//             </div>
//             <div>
//               <p className="text-sm text-gray-600 mb-1">GHS Wallet Number</p>
//               {editingSection === 'wallet' ? (
//                 <input
//                   type="text"
//                   defaultValue="0122893487"
//                   className="text-lg font-semibold text-gray-900 border border-gray-300 rounded-xl px-3 py-2 w-full"
//                 />
//               ) : (
//                 <p className="text-lg font-semibold text-gray-900">0122893487</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Account Verification & KYC Section */}
//       <div className="border border-gray-200 rounded-lg p-6 mb-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-semibold text-gray-900">Account Verification & KYC</h2>
//           <button
//             onClick={() => handleEdit('verification')}
//             className="flex items-center gap-2 px-3 py-1.5 bg-teal-700 text-white text-sm rounded hover:bg-teal-800"
//           >
//             <Edit size={14} />
//             Edit
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <p className="text-sm text-gray-600 mb-1">Email Verification Status</p>
//             <p className="text-lg font-semibold text-gray-900">Verified</p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-600 mb-1">Phone Number Verification</p>
//             <p className="text-lg font-semibold text-gray-900">Verified</p>
//           </div>
//         </div>
//       </div>

//       {/* Default Withdrawal Method Section */}
//       <div className="border border-gray-200 rounded-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-semibold text-gray-900">Default Withdrawal Method</h2>
//           <button
//             onClick={() => handleEdit('withdrawal')}
//             className="flex items-center gap-2 px-3 py-1.5 bg-teal-700 text-white text-sm rounded hover:bg-teal-800"
//           >
//             <Edit size={14} />
//             Edit
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <div className="mb-4">
//               <p className="text-sm text-gray-600 mb-1">NGN Payout Account</p>
//               {editingSection === 'withdrawal' ? (
//                 <select className="text-lg font-semibold text-gray-900 border border-gray-300 rounded-xl px-3 py-2 mb-2">
//                   <option value="Opay">Opay</option>
//                   <option value="Kuda">Kuda</option>
//                   <option value="GTB">GTB</option>
//                 </select>
//               ) : (
//                 <p className="text-lg font-semibold text-gray-900">Opay</p>
//               )}
//             </div>
//             {editingSection === 'withdrawal' ? (
//               <input
//                 type="text"
//                 defaultValue="Andrew Forbist ( 8028289900 )"
//                 className="text-gray-900 border border-gray-300 rounded-xl px-3 py-2 w-full"
//               />
//             ) : (
//               <p className="text-gray-900">Andrew Forbist ( 8028289900 )</p>
//             )}
//           </div>

//           <div>
//             <div className="mb-4">
//               <p className="text-sm text-gray-600 mb-1">GHS Payout Account</p>
//               {editingSection === 'withdrawal' ? (
//                 <select className="text-lg font-semibold text-gray-900 border border-gray-300 rounded-xl px-3 py-2 mb-2">
//                   <option value="Momo">Momo</option>
//                   <option value="AirtelTigo">AirtelTigo</option>
//                   <option value="Vodafone">Vodafone</option>
//                 </select>
//               ) : (
//                 <p className="text-lg font-semibold text-gray-900">Momo</p>
//               )}
//             </div>
//             {editingSection === 'withdrawal' ? (
//               <input
//                 type="text"
//                 defaultValue="Andrew Forbist ( 8028289900 )"
//                 className="text-gray-900 border border-gray-300 rounded-xl px-3 py-2 w-full"
//               />
//             ) : (
//               <p className="text-gray-900">Andrew Forbist ( 8028289900 )</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { Edit, Save } from "lucide-react";
import { MouseEvent, useState } from "react";

export const AccountSection = () => {
  const [editingSection, setEditingSection] = useState({
    wallet: false,
    verification: false,
    withdraw: false,
  });

  const [walletData, setWalletData] = useState({
    currency: "NGN",
    ngnWallet: "0292909089",
    username: "@andrew22",
    ghsWallet: "0122893487",
  });

  const [withdrawalData, setWithdrawalData] = useState({
    ngnAccount: "Opay",
    ngnDetails: "Andrew Forbist ( 8028289900 )",
    ghsAccount: "Momo",
    ghsDetails: "Andrew Forbist ( 8028289900 )",
  });

  const handleEdit = (state: string, section: boolean) => {
    setEditingSection((prev) => ({
      ...prev,
      [state]: section,
    }));
  };

  const handleSave = (state: string, section: boolean) => {
    console.log(`Saving ${section} data...`);
    setEditingSection((prev) => ({
      ...prev,
      [state]: false,
    }));
  };

  return (
    <div
      className="w-full p-4 md:p-6"
      style={{ backgroundColor: "var(--jean-white)" }}
    >
      {/* Wallet Info Section */}
      <div
        className="rounded-lg p-4 md:p-6 mb-6"
        style={{ border: "1px solid var(--jean-gray-200)" }}
      >
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2
            className="text-base md:text-lg font-semibold"
            style={{ color: "var(--jean-gray-900)" }}
          >
            Wallet Info
          </h2>
          {editingSection.wallet ? (
            <button
              onClick={() => handleSave("wallet", false)}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded"
              style={{
                backgroundColor: "var(--jean-green-600)",
                color: "var(--jean-white)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--jean-green-700)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--jean-green-600)")
              }
            >
              <Save size={12} className="md:size-[14px]" />
              <span className="hidden sm:inline">Save</span>
            </button>
          ) : (
            <button
              onClick={() => handleEdit("wallet", true)}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded"
              style={{
                backgroundColor: "var(--jean-teal-700)",
                color: "var(--jean-white)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--jean-teal-800)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--jean-teal-700)")
              }
            >
              <Edit size={12} className="md:size-[14px]" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <div>
            <div className="mb-4 md:mb-6">
              <p
                className="text-xs md:text-sm mb-1"
                style={{ color: "var(--jean-gray-600)" }}
              >
                Default Currency
              </p>
              {editingSection.wallet ? (
                <select
                  value={walletData.currency}
                  onChange={(e) =>
                    setWalletData({ ...walletData, currency: e.target.value })
                  }
                  className="text-base md:text-lg font-semibold border rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full"
                  style={{
                    color: "var(--jean-gray-900)",
                    borderColor: "var(--jean-gray-300)",
                  }}
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                  <option value="GHS">GHS</option>
                </select>
              ) : (
                <p
                  className="text-base md:text-lg font-semibold"
                  style={{ color: "var(--jean-gray-900)" }}
                >
                  {walletData.currency}
                </p>
              )}
            </div>
            <div>
              <p
                className="text-xs md:text-sm mb-1"
                style={{ color: "var(--jean-gray-600)" }}
              >
                NGN Wallet Number
              </p>
              {editingSection.wallet ? (
                <input
                  type="text"
                  value={walletData.ngnWallet}
                  onChange={(e) =>
                    setWalletData({ ...walletData, ngnWallet: e.target.value })
                  }
                  className="text-base md:text-lg font-semibold border rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full"
                  style={{
                    color: "var(--jean-gray-900)",
                    borderColor: "var(--jean-gray-300)",
                  }}
                />
              ) : (
                <p
                  className="text-base md:text-lg font-semibold"
                  style={{ color: "var(--jean-gray-900)" }}
                >
                  {walletData.ngnWallet}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="mb-4 md:mb-6">
              <p
                className="text-xs md:text-sm mb-1"
                style={{ color: "var(--jean-gray-600)" }}
              >
                Username
              </p>
              {editingSection.wallet ? (
                <input
                  type="text"
                  value={walletData.username}
                  onChange={(e) =>
                    setWalletData({ ...walletData, username: e.target.value })
                  }
                  className="text-base md:text-lg font-semibold border rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full"
                  style={{
                    color: "var(--jean-gray-900)",
                    borderColor: "var(--jean-gray-300)",
                  }}
                />
              ) : (
                <p
                  className="text-base md:text-lg font-semibold"
                  style={{ color: "var(--jean-gray-900)" }}
                >
                  {walletData.username}
                </p>
              )}
            </div>
            <div>
              <p
                className="text-xs md:text-sm mb-1"
                style={{ color: "var(--jean-gray-600)" }}
              >
                GHS Wallet Number
              </p>
              {editingSection.wallet ? (
                <input
                  type="text"
                  value={walletData.ghsWallet}
                  onChange={(e) =>
                    setWalletData({ ...walletData, ghsWallet: e.target.value })
                  }
                  className="text-base md:text-lg font-semibold border rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full"
                  style={{
                    color: "var(--jean-gray-900)",
                    borderColor: "var(--jean-gray-300)",
                  }}
                />
              ) : (
                <p
                  className="text-base md:text-lg font-semibold"
                  style={{ color: "var(--jean-gray-900)" }}
                >
                  {walletData.ghsWallet}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KYC Section */}
      <div
        className="rounded-lg p-4 md:p-6 mb-6"
        style={{ border: "1px solid var(--jean-gray-200)" }}
      >
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2
            className="text-base md:text-lg font-semibold"
            style={{ color: "var(--jean-gray-900)" }}
          >
            Account Verification & KYC
          </h2>
          <button
            onClick={() => handleEdit("verification", true)}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded"
            style={{
              backgroundColor: "var(--jean-teal-700)",
              color: "var(--jean-white)",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--jean-teal-800)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--jean-teal-700)")
            }
          >
            <Edit size={12} className="md:size-[14px]" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <div>
            <p
              className="text-xs md:text-sm mb-1"
              style={{ color: "var(--jean-gray-600)" }}
            >
              Email Verification Status
            </p>
            <p
              className="text-base md:text-lg font-semibold"
              style={{ color: "var(--jean-gray-900)" }}
            >
              Verified
            </p>
          </div>
          <div>
            <p
              className="text-xs md:text-sm mb-1"
              style={{ color: "var(--jean-gray-600)" }}
            >
              Phone Number Verification
            </p>
            <p
              className="text-base md:text-lg font-semibold"
              style={{ color: "var(--jean-gray-900)" }}
            >
              Verified
            </p>
          </div>
        </div>
      </div>

      {/* Withdrawal Section */}
      <div
        className="rounded-lg p-4 md:p-6"
        style={{ border: "1px solid var(--jean-gray-200)" }}
      >
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2
            className="text-base md:text-lg font-semibold"
            style={{ color: "var(--jean-gray-900)" }}
          >
            Default Withdrawal Method
          </h2>
          {editingSection.withdraw ? (
            <button
              onClick={() => handleSave("withdraw", false)}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded"
              style={{
                backgroundColor: "var(--jean-green-600)",
                color: "var(--jean-white)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--jean-green-700)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--jean-green-600)")
              }
            >
              <Save size={12} className="md:size-[14px]" />
              <span className="hidden sm:inline">Save</span>
            </button>
          ) : (
            <button
              onClick={() => handleEdit("withdraw", true)}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded"
              style={{
                backgroundColor: "var(--jean-teal-700)",
                color: "var(--jean-white)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--jean-teal-800)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--jean-teal-700)")
              }
            >
              <Edit size={12} className="md:size-[14px]" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <div>
            <div className="mb-3 md:mb-4">
              <p
                className="text-xs md:text-sm mb-1"
                style={{ color: "var(--jean-gray-600)" }}
              >
                NGN Payout Account
              </p>
              {editingSection.withdraw ? (
                <select
                  value={withdrawalData.ngnAccount}
                  onChange={(e) =>
                    setWithdrawalData({
                      ...withdrawalData,
                      ngnAccount: e.target.value,
                    })
                  }
                  className="text-base md:text-lg font-semibold border rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 mb-1 md:mb-2 w-full"
                  style={{
                    color: "var(--jean-gray-900)",
                    borderColor: "var(--jean-gray-300)",
                  }}
                >
                  <option value="Opay">Opay</option>
                  <option value="Kuda">Kuda</option>
                  <option value="GTB">GTB</option>
                </select>
              ) : (
                <p
                  className="text-base md:text-lg font-semibold"
                  style={{ color: "var(--jean-gray-900)" }}
                >
                  {withdrawalData.ngnAccount}
                </p>
              )}
            </div>
            {editingSection.withdraw ? (
              <input
                type="text"
                value={withdrawalData.ngnDetails}
                onChange={(e) =>
                  setWithdrawalData({
                    ...withdrawalData,
                    ngnDetails: e.target.value,
                  })
                }
                className="border rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full"
                style={{
                  color: "var(--jean-gray-900)",
                  borderColor: "var(--jean-gray-300)",
                }}
              />
            ) : (
              <p className="text-sm md:text-base" style={{ color: "var(--jean-gray-900)" }}>
                {withdrawalData.ngnDetails}
              </p>
            )}
          </div>

          <div>
            <div className="mb-3 md:mb-4">
              <p
                className="text-xs md:text-sm mb-1"
                style={{ color: "var(--jean-gray-600)" }}
              >
                GHS Payout Account
              </p>
              {editingSection.withdraw ? (
                <select
                  value={withdrawalData.ghsAccount}
                  onChange={(e) =>
                    setWithdrawalData({
                      ...withdrawalData,
                      ghsAccount: e.target.value,
                    })
                  }
                  className="text-base md:text-lg font-semibold border rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 mb-1 md:mb-2 w-full"
                  style={{
                    color: "var(--jean-gray-900)",
                    borderColor: "var(--jean-gray-300)",
                  }}
                >
                  <option value="Momo">Momo</option>
                  <option value="AirtelTigo">AirtelTigo</option>
                  <option value="Vodafone">Vodafone</option>
                </select>
              ) : (
                <p
                  className="text-base md:text-lg font-semibold"
                  style={{ color: "var(--jean-gray-900)" }}
                >
                  {withdrawalData.ghsAccount}
                </p>
              )}
            </div>
            {editingSection.withdraw ? (
              <input
                type="text"
                value={withdrawalData.ghsDetails}
                onChange={(e) =>
                  setWithdrawalData({
                    ...withdrawalData,
                    ghsDetails: e.target.value,
                  })
                }
                className="border rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full"
                style={{
                  color: "var(--jean-gray-900)",
                  borderColor: "var(--jean-gray-300)",
                }}
              />
            ) : (
              <p className="text-sm md:text-base" style={{ color: "var(--jean-gray-900)" }}>
                {withdrawalData.ghsDetails}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};