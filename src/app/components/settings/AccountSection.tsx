import { Edit, Save, Info } from "lucide-react";
import { useState } from "react";

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

  // Toast state
  const [toast, setToast] = useState<{
    type: "success" | "error" | "info" | "warning";
    message: string;
  } | null>();

  const showToast = (
    type: "success" | "error" | "info" | "warning",
    message: string,
  ): void => {
    setToast({ type, message });
  };

  const hideToast = (): void => {
    setToast(null);
  };

  const handleEdit = (
    state: keyof typeof editingSection,
    section: boolean,
  ): void => {
    setEditingSection((prev) => ({
      ...prev,
      [state]: section,
    }));
  };

  const handleSave = (
    state: keyof typeof editingSection,
    section: boolean,
  ): void => {
    console.log(`Saving ${state} data...`, section);

    // Simulate save operation
    setTimeout(() => {
      setEditingSection((prev) => ({
        ...prev,
        [state]: false,
      }));

      // Show success toast based on section
      let message = "";
      switch (state) {
        case "wallet":
          message = "Wallet information saved successfully!";
          break;
        case "withdraw":
          message = "Withdrawal methods updated successfully!";
          break;
        default:
          message = "Settings saved successfully!";
      }

      showToast("success", message);
    }, 500); // Small delay to simulate API call
  };

  return (
    <>
      <div className="w-full md:p-6 ">
        {/* Toast Container */}
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={hideToast}
          />
        )}

        {/* Wallet Info Section */}
        <div className="rounded-lg p-4 md:p-6 mb-6 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              Wallet Info
            </h2>
            {editingSection.wallet ? (
              <button
                onClick={() => handleSave("wallet", false)}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded text-white transition-colors"
                style={{
                  backgroundColor: "var(--color-green-save)",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-green-save-hover)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-green-save)")
                }
              >
                <Save size={12} className="md:size-[14px]" />
                <span className="hidden sm:inline">Save</span>
              </button>
            ) : (
              <button
                onClick={() => handleEdit("wallet", true)}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded text-white transition-colors"
                style={{
                  backgroundColor: "var(--color-teal-edit)",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-teal-edit-hover)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-teal-edit)")
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
                <p className="text-xs md:text-sm mb-1 text-gray-600">
                  Default Currency
                </p>
                {editingSection.wallet ? (
                  <select
                    value={walletData.currency}
                    onChange={(e) =>
                      setWalletData({ ...walletData, currency: e.target.value })
                    }
                    className="text-base md:text-lg font-semibold border border-gray-300 rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full text-gray-900 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                    <option value="GHS">GHS</option>
                  </select>
                ) : (
                  <p className="text-base md:text-lg font-semibold text-gray-900">
                    {walletData.currency}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs md:text-sm mb-1 text-gray-600">
                  NGN Wallet Number
                </p>
                {editingSection.wallet ? (
                  <input
                    type="text"
                    value={walletData.ngnWallet}
                    onChange={(e) =>
                      setWalletData({
                        ...walletData,
                        ngnWallet: e.target.value,
                      })
                    }
                    className="text-base md:text-lg font-semibold border border-gray-300 rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full text-gray-900 focus:border-teal-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-base md:text-lg font-semibold text-gray-900">
                    {walletData.ngnWallet}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="mb-4 md:mb-6">
                <p className="text-xs md:text-sm mb-1 text-gray-600">
                  Username
                </p>
                {editingSection.wallet ? (
                  <input
                    type="text"
                    value={walletData.username}
                    onChange={(e) =>
                      setWalletData({ ...walletData, username: e.target.value })
                    }
                    className="text-base md:text-lg font-semibold border border-gray-300 rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full text-gray-900 focus:border-teal-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-base md:text-lg font-semibold text-gray-900">
                    {walletData.username}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs md:text-sm mb-1 text-gray-600">
                  GHS Wallet Number
                </p>
                {editingSection.wallet ? (
                  <input
                    type="text"
                    value={walletData.ghsWallet}
                    onChange={(e) =>
                      setWalletData({
                        ...walletData,
                        ghsWallet: e.target.value,
                      })
                    }
                    className="text-base md:text-lg font-semibold border border-gray-300 rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full text-gray-900 focus:border-teal-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-base md:text-lg font-semibold text-gray-900">
                    {walletData.ghsWallet}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* KYC Section */}
        <div className="rounded-lg p-4 md:p-6 mb-6 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              Account Verification & KYC
            </h2>
            <button
              onClick={() =>
                showToast("info", "KYC verification is already complete!")
              }
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded text-white transition-colors"
              style={{
                backgroundColor: "var(--color-teal-edit)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-teal-edit-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-teal-edit)")
              }
            >
              <Info size={12} className="md:size-[14px]" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            <div>
              <p className="text-xs md:text-sm mb-1 text-gray-600">
                Email Verification Status
              </p>
              <p className="text-base md:text-lg font-semibold text-gray-900">
                Verified
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm mb-1 text-gray-600">
                Phone Number Verification
              </p>
              <p className="text-base md:text-lg font-semibold text-gray-900">
                Verified
              </p>
            </div>
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="rounded-lg p-4 md:p-6 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              Default Withdrawal Method
            </h2>
            {editingSection.withdraw ? (
              <button
                onClick={() => handleSave("withdraw", false)}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded text-white transition-colors"
                style={{
                  backgroundColor: "var(--color-green-save)",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-green-save-hover)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-green-save)")
                }
              >
                <Save size={12} className="md:size-[14px]" />
                <span className="hidden sm:inline">Save</span>
              </button>
            ) : (
              <button
                onClick={() => handleEdit("withdraw", true)}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded text-white transition-colors"
                style={{
                  backgroundColor: "var(--color-teal-edit)",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-teal-edit-hover)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-teal-edit)")
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
                <p className="text-xs md:text-sm mb-1 text-gray-600">
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
                    className="text-base md:text-lg font-semibold border border-gray-300 rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 mb-1 md:mb-2 w-full text-gray-900 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="Opay">Opay</option>
                    <option value="Kuda">Kuda</option>
                    <option value="GTB">GTB</option>
                  </select>
                ) : (
                  <p className="text-base md:text-lg font-semibold text-gray-900">
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
                  className="border border-gray-300 rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full text-gray-900 focus:border-teal-500 focus:outline-none"
                  placeholder="Enter account details"
                />
              ) : (
                <p className="text-sm md:text-base text-gray-700">
                  {withdrawalData.ngnDetails}
                </p>
              )}
            </div>

            <div>
              <div className="mb-3 md:mb-4">
                <p className="text-xs md:text-sm mb-1 text-gray-600">
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
                    className="text-base md:text-lg font-semibold border border-gray-300 rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 mb-1 md:mb-2 w-full text-gray-900 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="Momo">Momo</option>
                    <option value="AirtelTigo">AirtelTigo</option>
                    <option value="Vodafone">Vodafone</option>
                  </select>
                ) : (
                  <p className="text-base md:text-lg font-semibold text-gray-900">
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
                  className="border border-gray-300 rounded-lg md:rounded-xl px-2 py-1 md:px-3 md:py-2 w-full text-gray-900 focus:border-teal-500 focus:outline-none"
                  placeholder="Enter account details"
                />
              ) : (
                <p className="text-sm md:text-base text-gray-700">
                  {withdrawalData.ghsDetails}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
