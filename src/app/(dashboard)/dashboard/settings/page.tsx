// "use client";
// import { useState } from "react";
// import {
//   User,
//   Lock,
//   Bell,
//   CreditCard,
//   Eye,
//   EyeSlash,
// } from "@phosphor-icons/react";

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [profileData, setProfileData] = useState({
//     firstName: "Andrew",
//     lastName: "Garfield",
//     email: "andrew.garfield@example.com",
//     phone: "+234 901 234 5678",
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [notifications, setNotifications] = useState({
//     emailNotifications: true,
//     smsNotifications: false,
//     pushNotifications: true,
//     transactionAlerts: true,
//     marketingEmails: false,
//   });

//   const tabs = [
//     { id: "profile", label: "Profile", icon: User },
//     { id: "security", label: "Security", icon: Lock },
//     { id: "notifications", label: "Notifications", icon: Bell },
//     { id: "payment", label: "Payment Methods", icon: CreditCard },
//   ];

//   const handleProfileUpdate = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Profile updated successfully!");
//   };

//   const handlePasswordUpdate = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert("New passwords don't match!");
//       return;
//     }
//     alert("Password updated successfully!");
//     setPasswordData({
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     });
//   };

//   const handleNotificationUpdate = (key: string, value: boolean) => {
//     setNotifications({ ...notifications, [key]: value });
//   };

//   return (
//     <div className="space-y-6 mt-6">
//       <h1 className="text-2xl font-bold text-cyan-dark">Settings</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-2xl p-4 shadow-sm border">
//             <nav className="space-y-2">
//               {tabs.map((tab) => {
//                 const IconComponent = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${
//                       activeTab === tab.id
//                         ? "bg-cyan-dark text-white"
//                         : "text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     <IconComponent size={20} />
//                     {tab.label}
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-2xl p-6 shadow-sm border">
//             {/* Profile Tab */}
//             {activeTab === "profile" && (
//               <div>
//                 <h2 className="text-xl font-semibold text-cyan-dark mb-6">
//                   Profile Information
//                 </h2>
//                 <form onSubmit={handleProfileUpdate} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         First Name
//                       </label>
//                       <input
//                         type="text"
//                         value={profileData.firstName}
//                         onChange={(e) =>
//                           setProfileData({
//                             ...profileData,
//                             firstName: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Last Name
//                       </label>
//                       <input
//                         type="text"
//                         value={profileData.lastName}
//                         onChange={(e) =>
//                           setProfileData({
//                             ...profileData,
//                             lastName: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       value={profileData.email}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           email: e.target.value,
//                         })
//                       }
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       value={profileData.phone}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           phone: e.target.value,
//                         })
//                       }
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="bg-cyan-dark text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90"
//                   >
//                     Update Profile
//                   </button>
//                 </form>
//               </div>
//             )}

//             {/* Security Tab */}
//             {activeTab === "security" && (
//               <div>
//                 <h2 className="text-xl font-semibold text-cyan-dark mb-6">
//                   Security Settings
//                 </h2>
//                 <form onSubmit={handlePasswordUpdate} className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Current Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showCurrentPassword ? "text" : "password"}
//                         value={passwordData.currentPassword}
//                         onChange={(e) =>
//                           setPasswordData({
//                             ...passwordData,
//                             currentPassword: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark pr-12"
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShowCurrentPassword(!showCurrentPassword)
//                         }
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                       >
//                         {showCurrentPassword ? (
//                           <EyeSlash size={20} />
//                         ) : (
//                           <Eye size={20} />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       New Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showNewPassword ? "text" : "password"}
//                         value={passwordData.newPassword}
//                         onChange={(e) =>
//                           setPasswordData({
//                             ...passwordData,
//                             newPassword: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark pr-12"
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowNewPassword(!showNewPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                       >
//                         {showNewPassword ? (
//                           <EyeSlash size={20} />
//                         ) : (
//                           <Eye size={20} />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Confirm New Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         value={passwordData.confirmPassword}
//                         onChange={(e) =>
//                           setPasswordData({
//                             ...passwordData,
//                             confirmPassword: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark pr-12"
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShowConfirmPassword(!showConfirmPassword)
//                         }
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                       >
//                         {showConfirmPassword ? (
//                           <EyeSlash size={20} />
//                         ) : (
//                           <Eye size={20} />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className="bg-cyan-dark text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90"
//                   >
//                     Update Password
//                   </button>
//                 </form>

//                 <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <h3 className="font-medium text-yellow-800 mb-2">
//                     Two-Factor Authentication
//                   </h3>
//                   <p className="text-yellow-700 text-sm mb-3">
//                     Add an extra layer of security to your account.
//                   </p>
//                   <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-700">
//                     Enable 2FA
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Notifications Tab */}
//             {activeTab === "notifications" && (
//               <div>
//                 <h2 className="text-xl font-semibold text-cyan-dark mb-6">
//                   Notification Preferences
//                 </h2>
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between py-4 border-b">
//                     <div>
//                       <h3 className="font-medium text-gray-900">
//                         Email Notifications
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         Receive notifications via email
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={notifications.emailNotifications}
//                         onChange={(e) =>
//                           handleNotificationUpdate(
//                             "emailNotifications",
//                             e.target.checked
//                           )
//                         }
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-dark"></div>
//                     </label>
//                   </div>

//                   <div className="flex items-center justify-between py-4 border-b">
//                     <div>
//                       <h3 className="font-medium text-gray-900">
//                         SMS Notifications
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         Receive notifications via SMS
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={notifications.smsNotifications}
//                         onChange={(e) =>
//                           handleNotificationUpdate(
//                             "smsNotifications",
//                             e.target.checked
//                           )
//                         }
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-dark"></div>
//                     </label>
//                   </div>

//                   <div className="flex items-center justify-between py-4 border-b">
//                     <div>
//                       <h3 className="font-medium text-gray-900">
//                         Push Notifications
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         Receive push notifications in your browser
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={notifications.pushNotifications}
//                         onChange={(e) =>
//                           handleNotificationUpdate(
//                             "pushNotifications",
//                             e.target.checked
//                           )
//                         }
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-dark"></div>
//                     </label>
//                   </div>

//                   <div className="flex items-center justify-between py-4 border-b">
//                     <div>
//                       <h3 className="font-medium text-gray-900">
//                         Transaction Alerts
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         Get notified about transaction status changes
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={notifications.transactionAlerts}
//                         onChange={(e) =>
//                           handleNotificationUpdate(
//                             "transactionAlerts",
//                             e.target.checked
//                           )
//                         }
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-dark"></div>
//                     </label>
//                   </div>

//                   <div className="flex items-center justify-between py-4">
//                     <div>
//                       <h3 className="font-medium text-gray-900">
//                         Marketing Emails
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         Receive promotional emails and updates
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={notifications.marketingEmails}
//                         onChange={(e) =>
//                           handleNotificationUpdate(
//                             "marketingEmails",
//                             e.target.checked
//                           )
//                         }
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-dark"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Payment Methods Tab */}
//             {activeTab === "payment" && (
//               <div>
//                 <h2 className="text-xl font-semibold text-cyan-dark mb-6">
//                   Payment Methods
//                 </h2>
//                 <div className="space-y-6">
//                   <div className="border border-gray-200 rounded-lg p-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
//                           <span className="text-white text-xs font-bold">
//                             CARD
//                           </span>
//                         </div>
//                         <div>
//                           <p className="font-medium">**** **** **** 1234</p>
//                           <p className="text-sm text-gray-600">Expires 12/25</p>
//                         </div>
//                       </div>
//                       <button className="text-red-600 hover:text-red-700 text-sm font-medium">
//                         Remove
//                       </button>
//                     </div>
//                   </div>

//                   <div className="border border-gray-200 rounded-lg p-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center">
//                           <span className="text-white text-xs font-bold">
//                             MOMO
//                           </span>
//                         </div>
//                         <div>
//                           <p className="font-medium">+233 24 123 4567</p>
//                           <p className="text-sm text-gray-600">
//                             MTN Mobile Money
//                           </p>
//                         </div>
//                       </div>
//                       <button className="text-red-600 hover:text-red-700 text-sm font-medium">
//                         Remove
//                       </button>
//                     </div>
//                   </div>

//                   <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-dark hover:text-cyan-dark transition-colors">
//                     <span className="text-lg">+ Add New Payment Method</span>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useState } from "react";
// import {
//   User,
//   Lock,
//   Bell,
//   CreditCard,
//   Eye,
//   EyeOff,
//   Edit,
// } from "lucide-react";

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [profileData, setProfileData] = useState({
//     firstName: "Andrew",
//     lastName: "Forbeist",
//     email: "andrewforbeist@gmail.com",
//     phone: "+234 802 345 8890",
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [notifications, setNotifications] = useState({
//     emailNotifications: true,
//     smsNotifications: false,
//     pushNotifications: true,
//     transactionAlerts: true,
//     marketingEmails: false,
//   });

//   const tabs = [
//     { id: "profile", label: "Profile", icon: User },
//     { id: "account", label: "Account", icon: User },
//     { id: "preferences", label: "Preferences", icon: Bell },
//     { id: "notifications", label: "Notifications", icon: Bell },
//     { id: "security", label: "Security", icon: Lock },
//   ];

//   const handleProfileUpdate = (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (!profileData) {
//         throw new Error("Profile data is not available.");
//       }
//       // Add logic to update profile data here
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("An error occurred while updating the profile.");
//     }
//   };

//   const handlePasswordUpdate = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (passwordData == null) {
//       throw new Error("Password data is not available.");
//     }
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert("New passwords don't match!");
//       return;
//     }

//     try {
//       // Add logic to update password data here
//       alert("Password updated successfully!");
//     } catch (error) {
//       console.error("Error updating password:", error);
//       alert("An error occurred while updating the password.");
//     } finally {
//       setPasswordData({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     }
//   };

//   const handleNotificationUpdate = (key: string, value: boolean) => {
//     if (notifications == null) {
//       throw new Error("Notifications data is not available.");
//     }
//     setNotifications((prevState) => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
//       {/* Header Navigation */}
//       <div className="mb-8">
//         <nav className="flex space-x-8 border-b border-gray-200">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === tab.id
//                   ? "border-orange-500 text-orange-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="bg-white rounded-lg shadow-sm">
//         {/* Profile Tab */}
//         {activeTab === "profile" && (
//           <div className="p-8">
//             <div className="mb-8">
//               <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//                 Manage Your Profile
//               </h1>
//               <p className="text-gray-600">Update your profile information</p>
//             </div>

//             {/* Profile Header */}
//             <div className="bg-gray-50 rounded-lg p-6 mb-8">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
//                     <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
//                       <span className="text-2xl text-pink-800">A</span>
//                     </div>
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {profileData.firstName} {profileData.lastName}
//                     </h2>
//                     <p className="text-gray-600">Nigeria</p>
//                   </div>
//                 </div>
//                 <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
//                   <Edit size={16} />
//                   <span>Edit</span>
//                 </button>
//               </div>
//             </div>

//             {/* Personal Information */}
//             <div className="bg-gray-50 rounded-lg p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Personal Information
//                 </h3>
//                 <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
//                   <Edit size={16} />
//                   <span>Edit</span>
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full name
//                   </label>
//                   <div className="text-lg font-semibold text-gray-900">
//                     {profileData.firstName}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Last name
//                   </label>
//                   <div className="text-lg font-semibold text-gray-900">
//                     {profileData.lastName}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone
//                   </label>
//                   <div className="text-lg font-semibold text-gray-900">
//                     {profileData.phone}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <div className="text-lg font-semibold text-gray-900">
//                     {profileData.email}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Account Tab */}
//         {activeTab === "account" && (
//           <div className="p-8">
//             <div className="mb-8">
//               <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//                 Account Settings
//               </h1>
//               <p className="text-gray-600">Manage your account preferences</p>
//             </div>

//             <div className="space-y-6">
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Account Status
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium text-gray-900">Account Type</p>
//                     <p className="text-sm text-gray-600">Premium Account</p>
//                   </div>
//                   <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                     Active
//                   </span>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Danger Zone
//                 </h3>
//                 <div className="space-y-4">
//                   <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
//                     <div className="font-medium text-red-600">
//                       Deactivate Account
//                     </div>
//                     <div className="text-sm text-red-500">
//                       Temporarily disable your account
//                     </div>
//                   </button>
//                   <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
//                     <div className="font-medium text-red-600">Delete Account</div>
//                     <div className="text-sm text-red-500">
//                       Permanently delete your account and all data
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Preferences Tab */}
//         {activeTab === "preferences" && (
//           <div className="p-8">
//             <div className="mb-8">
//               <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//                 Preferences
//               </h1>
//               <p className="text-gray-600">Customize your experience</p>
//             </div>

//             <div className="space-y-6">
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Display Settings
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="font-medium text-gray-900">Dark Mode</p>
//                       <p className="text-sm text-gray-600">
//                         Switch to dark theme
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input type="checkbox" className="sr-only peer" />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="font-medium text-gray-900">Compact View</p>
//                       <p className="text-sm text-gray-600">
//                         Show more content in less space
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input type="checkbox" className="sr-only peer" />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Language & Region
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Language
//                     </label>
//                     <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                       <option>English (US)</option>
//                       <option>English (UK)</option>
//                       <option>French</option>
//                       <option>Spanish</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Timezone
//                     </label>
//                     <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                       <option>West Africa Time (WAT)</option>
//                       <option>GMT</option>
//                       <option>EST</option>
//                       <option>PST</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Notifications Tab */}
//         {activeTab === "notifications" && (
//           <div className="p-8">
//             <div className="mb-8">
//               <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//                 Notification Preferences
//               </h1>
//               <p className="text-gray-600">Choose how you want to be notified</p>
//             </div>

//             <div className="space-y-6">
//               <div className="flex items-center justify-between py-4 border-b">
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     Email Notifications
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Receive notifications via email
//                   </p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={notifications.emailNotifications}
//                     onChange={(e) =>
//                       handleNotificationUpdate(
//                         "emailNotifications",
//                         e.target.checked
//                       )
//                     }
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>

//               <div className="flex items-center justify-between py-4 border-b">
//                 <div>
//                   <h3 className="font-medium text-gray-900">SMS Notifications</h3>
//                   <p className="text-sm text-gray-600">
//                     Receive notifications via SMS
//                   </p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={notifications.smsNotifications}
//                     onChange={(e) =>
//                       handleNotificationUpdate(
//                         "smsNotifications",
//                         e.target.checked
//                       )
//                     }
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>

//               <div className="flex items-center justify-between py-4 border-b">
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     Push Notifications
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Receive push notifications in your browser
//                   </p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={notifications.pushNotifications}
//                     onChange={(e) =>
//                       handleNotificationUpdate(
//                         "pushNotifications",
//                         e.target.checked
//                       )
//                     }
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>

//               <div className="flex items-center justify-between py-4 border-b">
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     Transaction Alerts
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Get notified about transaction status changes
//                   </p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={notifications.transactionAlerts}
//                     onChange={(e) =>
//                       handleNotificationUpdate(
//                         "transactionAlerts",
//                         e.target.checked
//                       )
//                     }
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>

//               <div className="flex items-center justify-between py-4">
//                 <div>
//                   <h3 className="font-medium text-gray-900">Marketing Emails</h3>
//                   <p className="text-sm text-gray-600">
//                     Receive promotional emails and updates
//                   </p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={notifications.marketingEmails}
//                     onChange={(e) =>
//                       handleNotificationUpdate(
//                         "marketingEmails",
//                         e.target.checked
//                       )
//                     }
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Security Tab */}
//         {activeTab === "security" && (
//           <div className="p-8">
//             <div className="mb-8">
//               <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//                 Security Settings
//               </h1>
//               <p className="text-gray-600">Manage your account security</p>
//             </div>

//             <div className="space-y-8">
//               {/* Change Password */}
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Change Password
//                 </h3>
//                 <div onSubmit={handlePasswordUpdate} className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Current Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showCurrentPassword ? "text" : "password"}
//                         value={passwordData.currentPassword}
//                         onChange={(e) =>
//                           setPasswordData({
//                             ...passwordData,
//                             currentPassword: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShowCurrentPassword(!showCurrentPassword)
//                         }
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                       >
//                         {showCurrentPassword ? (
//                           <EyeOff size={20} />
//                         ) : (
//                           <Eye size={20} />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       New Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showNewPassword ? "text" : "password"}
//                         value={passwordData.newPassword}
//                         onChange={(e) =>
//                           setPasswordData({
//                             ...passwordData,
//                             newPassword: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowNewPassword(!showNewPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                       >
//                         {showNewPassword ? (
//                           <EyeOff size={20} />
//                         ) : (
//                           <Eye size={20} />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Confirm New Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         value={passwordData.confirmPassword}
//                         onChange={(e) =>
//                           setPasswordData({
//                             ...passwordData,
//                             confirmPassword: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShowConfirmPassword(!showConfirmPassword)
//                         }
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                       >
//                         {showConfirmPassword ? (
//                           <EyeOff size={20} />
//                         ) : (
//                           <Eye size={20} />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handlePasswordUpdate}
//                     className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                   >
//                     Update Password
//                   </button>
//                 </div>
//               </div>

//               {/* Two Factor Authentication */}
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Two-Factor Authentication
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium text-gray-900">
//                       Authentication App
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Use an authenticator app to generate codes
//                     </p>
//                   </div>
//                   <button className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
//                     Enable 2FA
//                   </button>
//                 </div>
//               </div>

//               {/* Active Sessions */}
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Active Sessions
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between p-4 bg-white rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         Current Session
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Lagos, Nigeria • Chrome on Windows
//                       </p>
//                     </div>
//                     <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                       Active
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between p-4 bg-white rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">Mobile App</p>
//                       <p className="text-sm text-gray-600">
//                         Lagos, Nigeria • iOS App
//                       </p>
//                     </div>
//                     <button className="text-red-600 hover:text-red-700 text-sm font-medium">
//                       Revoke
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { User, Lock, Bell } from "lucide-react";
import { SettingsHeader } from "@/app/components/settings/SettingsHeader";
import { ProfileSection } from "@/app/components/settings/ProfileSection";
import { AccountSection } from "@/app/components/settings/AccountSection";
import { PreferencesSection } from "@/app/components/settings/PreferenceSection";
import { NotificationsSection } from "@/app/components/settings/NotificationSection";
import { SecuritySection } from "@/app/components/settings/SecuritySection";

type Tab = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "Andrew",
    lastName: "Forbeist",
    email: "andrewforbeist@gmail.com",
    phone: "+234 802 345 8890",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    transactionAlerts: true,
    marketingEmails: false,
  });

  const tabs: Tab[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: User },
    { id: "preferences", label: "Preferences", icon: Bell },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ];

  const handleProfileUpdate = (updatedData: typeof profileData) => {
    setProfileData(updatedData);
    alert("Profile updated successfully!");
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
        {activeTab === "notifications" && (
          <NotificationsSection
            notifications={notifications}
            onNotificationChange={setNotifications}
          />
        )}
        {activeTab === "security" && (
          <SecuritySection
            passwordData={passwordData}
            onPasswordChange={setPasswordData}
          />
        )}
      </div>
    </div>
  );
}