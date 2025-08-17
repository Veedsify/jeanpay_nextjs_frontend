import { Edit, Save } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSettings from "@/hooks/SettingsHook";
import useWallet from "@/hooks/WalletHook";
import { formatIntoSpace } from "@/lib/textformat";
import { useAuthContext } from "../contexts/UserAuthContext";
import { cn } from "@/lib/utils";

export const AccountSection = () => {
  const { updateWalletInfo, useUserSettings } = useSettings();
  const { data, isError, isLoading } = useUserSettings();
  const { user } = useAuthContext();
  const { useWalletBalance } = useWallet();
  const {
    data: wallet,
    isError: isWalletError,
    isLoading: isWalletLoading,
  } = useWalletBalance();

  const [editingSection, setEditingSection] = useState({
    wallet: false,
    verification: false,
    withdraw: false,
  });

  const [walletData, setWalletData] = useState({
    currency: "",
    username: "",
    ngnWallet: "",
    ghsWallet: "",
  });

  // const [withdrawalData, setWithdrawalData] = useState({
  //   ngnAccount: "Opay",
  //   ngnDetails: "Andrew Forbist ( 8028289900 )",
  //   ghsAccount: "Momo",
  //   ghsDetails: "Andrew Forbist ( 8028289900 )",
  // });

  useEffect(() => {
    if (data) {
      setWalletData((prev) => {
        return {
          ...prev,
          currency: data.data.setting.default_currency,
          username: data.data.setting.username,
        };
      });
    }
    if (wallet) {
      setWalletData((prev) => ({
        ...prev,
        ngnWallet:
          wallet.data.find((w) => w.currency === "NGN")?.walletId || "",
        ghsWallet:
          wallet.data.find((w) => w.currency === "GHS")?.walletId || "",
      }));
    }
  }, [data, wallet]);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletData((prev) => ({
      ...prev,
      username: e.target.value,
    }));
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

    if (state === "wallet") {
      updateWalletInfo.mutate(walletData, {
        onSuccess: () => {
          setEditingSection((prev) => ({
            ...prev,
            wallet: false,
          }));
          toast.success("Wallet information saved successfully!");
        },
        onError: (error) => {
          console.error("Failed to save wallet info:", error);
          toast.error("Failed to save wallet information. Please try again.");
        },
      });
    } else {
      // Fallback for other sections
      setEditingSection((prev) => ({
        ...prev,
        [state]: false,
      }));
      toast.success("Settings saved successfully!");
    }
  };

  if (isError || isWalletError) {
    return <div className="p-6">Error loading settings or wallet data.</div>;
  }

  return (
    <>
      <div className="w-full md:p-6 ">
        {/* Toast Container */}

        {/* Wallet Info Section */}
        <div className="rounded-lg p-4 md:p-6 mb-6 bg-white border border-gray-200">
          {isLoading && isWalletLoading && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Loading...</span>
            </div>
          )}
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              Wallet Info
            </h2>
            {editingSection.wallet ? (
              <button
                onClick={() => handleSave("wallet", false)}
                disabled={updateWalletInfo.isPending}
                className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-sm md:text-base"
              >
                <Save size={12} className="md:size-[14px]" />
                <span className="hidden sm:inline">
                  {updateWalletInfo.isPending ? "Saving..." : "Save"}
                </span>
              </button>
            ) : (
              <button
                onClick={() => handleEdit("wallet", true)}
                className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-sm md:text-base"
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
                <p className="text-base md:text-lg font-semibold text-gray-900">
                  {walletData.ngnWallet
                    ? formatIntoSpace(walletData.ngnWallet, 4, " ")
                    : "(Not Assigned)"}
                </p>
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
                    onChange={handleUserNameChange}
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
                <p className="text-base md:text-lg font-semibold text-gray-900">
                  {walletData.ghsWallet
                    ? formatIntoSpace(walletData.ghsWallet, 4, " ")
                    : "(Not Assigned)"}
                </p>
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
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            <div>
              <p className="md:text-base text-gray-600 mb-3">
                Email Verification Status
              </p>
              <p
                className={cn(
                  ` font-semibold text-gray-900 p-2 rounded-full inline-block text-xs px-4`,
                  user?.is_verified
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800",
                )}
              >
                {user?.is_verified ? "Verified" : "Not Verified"}
              </p>
            </div>
          </div>
        </div>

        {/* Withdrawal Section */}
        {/*<div className="rounded-lg p-4 md:p-6 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              Default Withdrawal Method
            </h2>
            {editingSection.withdraw ? (
              <button
                onClick={() => handleSave("withdraw", false)}
                disabled={updateWithdrawalMethods.isPending}
                className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-sm md:text-base"
              >
                <Save size={12} className="md:size-[14px]" />
                <span className="hidden sm:inline">
                  {updateWithdrawalMethods.isPending ? "Saving..." : "Save"}
                </span>
              </button>
            ) : (
              <button
                onClick={() => handleEdit("withdraw", true)}
                className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-sm md:text-base"
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
        </div>*/}
      </div>
    </>
  );
};
