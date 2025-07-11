// "use client";

// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { CheckCircle, XCircle, Info, Warning, X } from "@phosphor-icons/react";

// interface PasswordData {
//   currentPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }

// interface ToastProps {
//   type: "success" | "error" | "info" | "warning";
//   message: string;
//   duration?: number;
//   onClose: () => void;
// }

// function Toast({ type, message, duration = 5000, onClose }: ToastProps) {
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setVisible(false);
//       setTimeout(onClose, 300);
//     }, duration);

//     return () => clearTimeout(timer);
//   }, [duration, onClose]);

//   const getIcon = () => {
//     switch (type) {
//       case "success":
//         return <CheckCircle className="text-[var(--color-jean-green-400)]" size={20} />;
//       case "error":
//         return <XCircle className="text-[var(--jean-red-600)]" size={20} />;
//       case "warning":
//         return <Warning className="text-[var(--jean-yellow-600)]" size={20} />;
//       case "info":
//         return <Info className="text-[var(--jean-blue-600)]" size={20} />;
//     }
//   };

//   const getBgColor = () => {
//     switch (type) {
//       case "success":
//         return "bg-[var(--jean-green-50)] border-[var(--jean-green-200)]";
//       case "error":
//         return "bg-[var(--jean-red-50)] border-[var(--jean-red-200)]";
//       case "warning":
//         return "bg-[var(--jean-yellow-50)] border-[var(--jean-yellow-200)]";
//       case "info":
//         return "bg-[var(--jean-blue-50)] border-[var(--jean-blue-200)]";
//     }
//   };

//   return (
//     <div
//       className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
//         visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
//       }`}
//     >
//       <div
//         className={`flex items-center gap-3 p-3 md:p-4 rounded-lg border shadow-lg ${getBgColor()} w-full max-w-xs md:max-w-md`}
//       >
//         {getIcon()}
//         <p className="flex-1 text-sm md:text-base text-[var(--jean-gray-800)]">
//           {message}
//         </p>
//         <button
//           onClick={() => {
//             setVisible(false);
//             setTimeout(onClose, 300);
//           }}
//           className="text-[var(--jean-gray-500)] hover:text-[var(--color-jean-green-400)] transition-colors"
//         >
//           <X size={16} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export const SecuritySection = () => {
//   const [passwordData, setPasswordData] = useState<PasswordData>({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showPasswordForm, setShowPasswordForm] = useState(false);
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
//   const [accountDeactivated, setAccountDeactivated] = useState(false);
//   const [toast, setToast] = useState<{
//     show: boolean;
//     type: "success" | "error" | "info" | "warning";
//     message: string;
//   }>({ show: false, type: "info", message: "" });

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPasswordData((prev) => ({ ...prev, [name]: value }));
//   };

//   const showToast = (type: "success" | "error" | "info" | "warning", message: string) => {
//     setToast({ show: true, type, message });
//   };

//   const handlePasswordSave = () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       showToast("error", "New passwords do not match!");
//       return;
//     }

//     if (passwordData.newPassword.length < 6) {
//       showToast("error", "Password must be at least 6 characters long!");
//       return;
//     }

//     showToast("success", "Password updated successfully!");
//     setPasswordData({
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     });
//     setShowPasswordForm(false);
//   };

//   const handleDeleteAccount = () => {
//     if (
//       confirm(
//         "Are you sure you want to delete your account? This action cannot be undone."
//       )
//     ) {
//       showToast(
//         "info",
//         "Account deletion request submitted. Please check your email for confirmation."
//       );
//     }
//   };

//   const Toggle = ({
//     checked,
//     onChange,
//   }: {
//     checked: boolean;
//     onChange: () => void;
//   }) => (
//     <label className="relative inline-flex items-center cursor-pointer">
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={onChange}
//         className="sr-only peer"
//       />
//       <div
//         className={`w-10 h-6 md:w-12 md:h-7 rounded-full peer transition-colors duration-200 ease-in-out ${
//           checked ? "bg-[var(--color-jean-green-400)]" : "bg-[var(--jean-gray-200)]"
//         }`}
//       >
//         <div
//           className={`absolute top-0.5 left-0.5 bg-[var(--jean-white)] w-5 h-5 md:w-6 md:h-6 rounded-full transition-transform duration-200 ease-in-out ${
//             checked ? "translate-x-4 md:translate-x-5" : "translate-x-0"
//           }`}
//         ></div>
//       </div>
//     </label>
//   );

//   return (
//     <div className="w-full bg-[var(--jean-white)]  md:px-6 pb-8 md:pb-16 relative">
//       {toast.show && (
//         <Toast
//           type={toast.type}
//           message={toast.message}
//           onClose={() => setToast({ ...toast, show: false })}
//         />
//       )}

//       {/* Header */}
//       <div className="mb-6 md:mb-8">
//         <h1 className="text-xl md:text-2xl font-semibold text-[var(--jean-gray-900)] mb-1 md:mb-2">
//           Security
//         </h1>
//         <p className="text-sm md:text-base text-[var(--jean-gray-600)]">
//           Manage Your Security Settings
//         </p>
//       </div>

//       {/* Password Section */}
//       <div className="mb-6 md:mb-8 p-4 md:p-6 border border-[var(--jean-gray-200)] rounded-lg">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 mb-4">
//           <h2 className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//             Password
//           </h2>
//           <button
//             onClick={() => setShowPasswordForm(!showPasswordForm)}
//             className="flex items-center gap-2 bg-cyan-dark text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-xs md:text-sm"
//           >
//             <span>📝</span>
//             Change Password
//           </button>
//         </div>

//         {showPasswordForm && (
//           <div className="mt-4 md:mt-6 space-y-3 md:space-y-4 bg-[var(--jean-gray-50)] p-3 md:p-4 rounded-lg">
//             {["currentPassword", "newPassword", "confirmPassword"].map(
//               (field) => {
//                 const isShown =
//                   field === "currentPassword"
//                     ? showCurrentPassword
//                     : field === "newPassword"
//                     ? showNewPassword
//                     : showConfirmPassword;

//                 const setShown =
//                   field === "currentPassword"
//                     ? setShowCurrentPassword
//                     : field === "newPassword"
//                     ? setShowNewPassword
//                     : setShowConfirmPassword;

//                 const labelText =
//                   field === "currentPassword"
//                     ? "Current Password"
//                     : field === "newPassword"
//                     ? "New Password"
//                     : "Confirm New Password";

//                 return (
//                   <div key={field}>
//                     <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
//                       {labelText}
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={isShown ? "text" : "password"}
//                         name={field}
//                         value={passwordData[field as keyof PasswordData]}
//                         onChange={handlePasswordChange}
//                         placeholder={labelText}
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-teal-700)] pr-10 md:pr-12 text-sm md:text-base"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShown((prev) => !prev)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--jean-gray-500)] hover:text-[var(--color-jean-green-400)] transition-colors"
//                       >
//                         {isShown ? <EyeOff size={18} /> : <Eye size={18} />}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               }
//             )}

//             <div className="flex gap-2 md:gap-3 pt-3 md:pt-4">
//               <button
//                 onClick={handlePasswordSave}
//                 className="bg-cyan-dark text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-sm"
//               >
//                 Save Changes
//               </button>
//               <button
//                 onClick={() => setShowPasswordForm(false)}
//                 className="bg-[var(--jean-gray-300)] text-[var(--jean-gray-700)] px-4 md:px-6 py-1.5 md:py-2 rounded-lg hover:bg-red-500 transition-colors text-sm"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Devices & Authentication Section */}
//       <div className="mb-6 md:mb-8">
//         <h2 className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)] mb-4 md:mb-6">
//           Devices & Authentication
//         </h2>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 mb-4 md:mb-6">
//           <div>
//             <h3 className="text-sm md:text-base font-medium text-[var(--jean-gray-900)] mb-1">
//               Last Login Time
//             </h3>
//             <p className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//               May 12, 2003 | 12:55 PM
//             </p>
//           </div>
//           <div>
//             <h3 className="text-sm md:text-base font-medium text-[var(--jean-gray-900)] mb-1">
//               Trusted Devices
//             </h3>
//             <p className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//               Chrome On Linux @ Google (This Device)
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center justify-between py-3 md:py-4">
//           <div className="mr-2">
//             <h3 className="text-sm md:text-base font-medium text-[var(--jean-gray-900)] mb-1">
//               Two Factor Authentication
//             </h3>
//             <p className="text-xs md:text-sm text-[var(--jean-gray-600)]">
//               Enable Two Factor Authentication For your Account
//             </p>
//           </div>
//           <Toggle
//             checked={twoFactorEnabled}
//             onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
//           />
//         </div>
//       </div>

//       {/* Danger Zone */}
//       <div className="border-2 border-red-200 rounded-lg p-4 md:p-6 bg-red-50">
//         <h2 className="text-base md:text-lg font-semibold text-red-600 mb-4 md:mb-6">
//           Danger Zone
//         </h2>

//         <div className="space-y-4 md:space-y-6">
//           <div className="flex items-center justify-between py-3 md:py-4">
//             <div className="mr-2">
//               <h3 className="text-sm md:text-base font-medium text-[var(--jean-gray-900)] mb-1">
//                 Deactivate Account
//               </h3>
//               <p className="text-xs md:text-sm text-[var(--jean-gray-600)]">
//                 Deactivate Your Account To Prevent Unwanted Access. You'll need
//                 to contact Support To re-enable account
//               </p>
//             </div>
//             <Toggle
//               checked={accountDeactivated}
//               onChange={() => setAccountDeactivated(!accountDeactivated)}
//             />
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-3 md:py-4">
//             <div>
//               <h3 className="text-sm md:text-base font-medium text-[var(--jean-gray-900)] mb-1">
//                 Delete Account
//               </h3>
//               <p className="text-xs md:text-sm text-[var(--jean-gray-600)]">
//                 Request Account Deletion
//               </p>
//             </div>
//             <button
//               onClick={handleDeleteAccount}
//               className="bg-red-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-red-700 transition-colors text-xs md:text-sm"
//             >
//               🗑️ Delete Account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



















"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Toast from "../ui/Toast";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const SecuritySection = () => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [accountDeactivated, setAccountDeactivated] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    type: "success" | "error" | "info" | "warning";
    message: string;
  }>({ show: false, type: "info", message: "" });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (type: "success" | "error" | "info" | "warning", message: string) => {
    setToast({ show: true, type, message });
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast("error", "New passwords do not match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showToast("error", "Password must be at least 6 characters long!");
      return;
    }

    showToast("success", "Password updated successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordForm(false);
  };

  const handleDeleteAccount = () => {
    showToast(
      "warning",
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    // Instead of using confirm(), show a toast and handle the confirmation logic
    // You might want to show a modal or additional confirmation step here
    setTimeout(() => {
      showToast(
        "info",
        "Account deletion request submitted. Please check your email for confirmation."
      );
    }, 3000);
  };

  const Toggle = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className={`w-10 h-6 md:w-12 md:h-7 rounded-full peer transition-colors duration-200 ease-in-out ${
          checked ? "bg-[var(--color-jean-green-400)]" : "bg-[var(--jean-gray-200)]"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 bg-[var(--jean-white)] w-5 h-5 md:w-6 md:h-6 rounded-full transition-transform duration-200 ease-in-out ${
            checked ? "translate-x-4 md:translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );

  return (
    <div className="w-full bg-[var(--jean-white)]  md:px-6 pb-8 md:pb-16 relative">
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-semibold text-[var(--jean-gray-900)] mb-1 md:mb-2">
          Security
        </h1>
        <p className="text-sm md:text-base text-[var(--jean-gray-600)]">
          Manage Your Security Settings
        </p>
      </div>

      {/* Password Section */}
      <div className="mb-6 md:mb-8 p-4 md:p-6 border border-[var(--jean-gray-200)] rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 mb-4">
          <h2 className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
            Password
          </h2>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="flex items-center gap-2 bg-cyan-dark text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-xs md:text-sm"
          >
            <span>📝</span>
            Change Password
          </button>
        </div>

        {showPasswordForm && (
          <div className="mt-4 md:mt-6 space-y-3 md:space-y-4 bg-[var(--jean-gray-50)] p-3 md:p-4 rounded-lg">
            {["currentPassword", "newPassword", "confirmPassword"].map(
              (field) => {
                const isShown =
                  field === "currentPassword"
                    ? showCurrentPassword
                    : field === "newPassword"
                    ? showNewPassword
                    : showConfirmPassword;

                const setShown =
                  field === "currentPassword"
                    ? setShowCurrentPassword
                    : field === "newPassword"
                    ? setShowNewPassword
                    : setShowConfirmPassword;

                const labelText =
                  field === "currentPassword"
                    ? "Current Password"
                    : field === "newPassword"
                    ? "New Password"
                    : "Confirm New Password";

                return (
                  <div key={field}>
                    <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
                      {labelText}
                    </label>
                    <div className="relative">
                      <input
                        type={isShown ? "text" : "password"}
                        name={field}
                        value={passwordData[field as keyof PasswordData]}
                        onChange={handlePasswordChange}
                        placeholder={labelText}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-teal-700)] pr-10 md:pr-12 text-sm md:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShown((prev) => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--jean-gray-500)] hover:text-[var(--color-jean-green-400)] transition-colors"
                      >
                        {isShown ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                );
              }
            )}

            <div className="flex gap-2 md:gap-3 pt-3 md:pt-4">
              <button
                onClick={handlePasswordSave}
                className="bg-cyan-dark text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-sm"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowPasswordForm(false)}
                className="bg-[var(--jean-gray-300)] text-[var(--jean-gray-700)] px-4 md:px-6 py-1.5 md:py-2 rounded-lg hover:bg-red-500 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Devices & Authentication Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)] mb-4 md:mb-6">
          Devices & Authentication
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 mb-4 md:mb-6">
          <div>
            <h3 className="text-sm md:text-base font-medium text-[var(--jean-gray-900)] mb-1">
              Last Login Time
            </h3>
            <p className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
              May 12, 2003 | 12:55 PM
            </p>
          </div>
          <div>
            <h3 className="text-sm md:text-base font-medium text-[var(--jean-gray-900)] mb-1">
              Trusted Devices
            </h3>
            <p className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
              Chrome On Linux @ Google (This Device)
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 md:py-4">
          <div className="mr-2">
            <h3 className="text-sm md:text-base font-medium text-[var(--jean-gray-900)] mb-1">
              Two Factor Authentication
            </h3>
            <p className="text-xs md:text-sm text-[var(--jean-gray-600)]">
              Enable Two Factor Authentication For your Account
            </p>
          </div>
          <Toggle
            checked={twoFactorEnabled}
            onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-2 border-red-200 rounded-lg p-4 md:p-6 bg-red-50">
        <h2 className="text-base md:text-lg font-semibold text-red-600 mb-4 md:mb-6">
          Danger Zone
        </h2>

        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between py-3 md:py-4">
            <div className="mr-2">
              <h3 className="text-sm md:text-base font-medium text-[var(--jean-gray-900)] mb-1">
                Deactivate Account
              </h3>
              <p className="text-xs md:text-sm text-[var(--jean-gray-600)]">
                Deactivate Your Account To Prevent Unwanted Access. You'll need
                to contact Support To re-enable account
              </p>
            </div>
            <Toggle
              checked={accountDeactivated}
              onChange={() => setAccountDeactivated(!accountDeactivated)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-3 md:py-4">
            <div>
              <h3 className="text-sm md:text-base font-medium text-[var(--jean-gray-900)] mb-1">
                Delete Account
              </h3>
              <p className="text-xs md:text-sm text-[var(--jean-gray-600)]">
                Request Account Deletion
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-red-700 transition-colors text-xs md:text-sm"
            >
              🗑️ Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
