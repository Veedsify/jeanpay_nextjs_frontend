

// import { useState, useRef } from "react";
// import { Edit } from "lucide-react";
// import Image from "next/image";

// interface ProfileData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   profileImage?: string;
// };

// interface ProfileSectionProps {
//   profileData: ProfileData;
//   onProfileUpdate: (updatedData: ProfileData) => void;
// }

// export const ProfileSection = ({
//   profileData,
//   onProfileUpdate,
// }: ProfileSectionProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [isEditingImage, setIsEditingImage] = useState(false);
//   const [localProfileData, setLocalProfileData] = useState(profileData);
//   const [previewImage, setPreviewImage] = useState(
//     profileData.profileImage || ""
//   );
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setLocalProfileData({ ...localProfileData, [name]: value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//         setLocalProfileData({
//           ...localProfileData,
//           profileImage: reader.result as string,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onProfileUpdate(localProfileData);
//     setIsEditing(false);
//     setIsEditingImage(false);
//   };

//   return (
//     <div className="border border-black/30 p-4 md:p-6 lg:p-8">
//       <div className="mb-6 md:mb-8">
//         <h1 className="text-xl md:text-2xl font-semibold text-[var(--jean-gray-900)] mb-1 md:mb-2">
//           Manage Your Profile
//         </h1>
//         <p className="text-sm md:text-base text-[var(--jean-gray-600)]">
//           Update your profile information
//         </p>
//       </div>

//       {/* Profile Header with Image */}
//       <div className="bg-white rounded-xl md:rounded-2xl border border-black/30 p-4 md:p-6 mb-6 md:mb-8">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-3 md:gap-4">
//             <div className="relative">
//               <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--jean-gray-300)] rounded-full flex items-center justify-center overflow-hidden">
//                 {previewImage ? (
//                   <Image
//                     width={64}
//                     height={64}
//                     src={previewImage}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-[var(--jean-pink-200)] to-[var(--jean-pink-300)] flex items-center justify-center">
//                     <span className="text-lg md:text-2xl text-[var(--jean-pink-800)]">
//                       {localProfileData.firstName.charAt(0)}
//                     </span>
//                   </div>
//                 )}
//               </div>
//               {isEditingImage && (
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="hidden"
//                 />
//               )}
//             </div>
//             <div>
//               <h2 className="text-base md:text-xl font-semibold text-[var(--jean-gray-900)]">
//                 {localProfileData.firstName} {localProfileData.lastName}
//               </h2>
//               <p className="text-sm md:text-base text-[var(--jean-gray-600)]">Nigeria</p>
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               setIsEditingImage(!isEditingImage);
//               if (!isEditingImage && !isEditing) setIsEditing(true);
//             }}
//             className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-sm md:text-base"
//           >
//             <Edit size={14} className="md:size-4" />
//             <span>{isEditingImage ? "Cancel" : "Edit"}</span>
//           </button>
//         </div>
//         {isEditingImage && (
//           <div className="mt-3 md:mt-4">
//             <button
//               onClick={triggerFileInput}
//               className="w-full sm:w-auto px-3 py-1.5 md:px-4 md:py-2 bg-[var(--jean-green-600)] text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-green-700)] text-sm md:text-base"
//             >
//               Upload New Image
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Personal Information Section */}
//       <div className="bg-white border border-black/30 rounded-xl md:rounded-2xl p-4 md:p-6">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
//           <h3 className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//             Personal Information
//           </h3>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-sm md:text-base"
//           >
//             <Edit size={14} className="md:size-4" />
//             <span>{isEditing ? "Cancel" : "Edit"}</span>
//           </button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
//         >
//           {/* First Name */}
//           <div>
//             <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
//               First name
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="firstName"
//                 value={localProfileData.firstName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
//               />
//             ) : (
//               <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//                 {localProfileData.firstName}
//               </div>
//             )}
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
//               Last name
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="lastName"
//                 value={localProfileData.lastName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
//               />
//             ) : (
//               <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//                 {localProfileData.lastName}
//               </div>
//             )}
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
//               Phone
//             </label>
//             {isEditing ? (
//               <input
//                 type="tel"
//                 name="phone"
//                 value={localProfileData.phone}
//                 onChange={handleChange}
//                 className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
//               />
//             ) : (
//               <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//                 {localProfileData.phone}
//               </div>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
//               Email Address
//             </label>
//             {isEditing ? (
//               <input
//                 type="email"
//                 name="email"
//                 value={localProfileData.email}
//                 onChange={handleChange}
//                 className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
//               />
//             ) : (
//               <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//                 {localProfileData.email}
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           {(isEditing || isEditingImage) && (
//             <div className="md:col-span-2 mt-4 md:mt-6 flex flex-col sm:flex-row justify-end gap-2 md:gap-4">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsEditing(false);
//                   setIsEditingImage(false);
//                   setLocalProfileData(profileData);
//                   setPreviewImage(profileData.profileImage || "");
//                 }}
//                 className="px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg text-[var(--jean-gray-700)] hover:bg-[var(--jean-gray-100)] text-sm md:text-base"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-cyan-900 cursor-pointer text-sm md:text-base"
//               >
//                 Save Changes
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };


// import { useState, useRef } from "react";
// import { Edit, Camera } from "lucide-react";
// import Image from "next/image";

// interface ProfileData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   profileImage?: string;
// };

// interface ProfileSectionProps {
//   profileData: ProfileData;
//   onProfileUpdate: (updatedData: ProfileData) => void;
// }

// export const ProfileSection = ({
//   profileData,
//   onProfileUpdate,
// }: ProfileSectionProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [isEditingImage, setIsEditingImage] = useState(false);
//   const [localProfileData, setLocalProfileData] = useState(profileData);
//   const [previewImage, setPreviewImage] = useState(
//     profileData.profileImage || ""
//   );
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setLocalProfileData({ ...localProfileData, [name]: value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//         setLocalProfileData({
//           ...localProfileData,
//           profileImage: reader.result as string,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onProfileUpdate(localProfileData);
//     setIsEditing(false);
//     setIsEditingImage(false);
//   };

//   return (
//     <div className="border border-black/30 p-4 md:p-6 lg:p-8">
//       <div className="mb-6 md:mb-8">
//         <h1 className="text-xl md:text-2xl font-semibold text-[var(--jean-gray-900)] mb-1 md:mb-2">
//           Manage Your Profile
//         </h1>
//         <p className="text-sm md:text-base text-[var(--jean-gray-600)]">
//           Update your profile information
//         </p>
//       </div>

//       {/* Profile Header with Image */}
//       <div className="bg-white rounded-xl md:rounded-2xl border border-black/30 p-4 md:p-6 mb-6 md:mb-8">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-3 md:gap-4">
//             <div className="relative">
//               <div 
//                 className={`w-12 h-12 md:w-16 md:h-16 bg-[var(--jean-gray-300)] rounded-full flex items-center justify-center overflow-hidden ${
//                   isEditingImage ? 'cursor-pointer hover:bg-[var(--jean-gray-400)] transition-colors' : ''
//                 }`}
//                 onClick={isEditingImage ? triggerFileInput : undefined}
//               >
//                 {previewImage ? (
//                   <Image
//                     width={64}
//                     height={64}
//                     src={previewImage}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-[var(--jean-pink-200)] to-[var(--jean-pink-300)] flex items-center justify-center">
//                     {isEditingImage ? (
//                       <Camera size={20} className="md:size-6 text-[var(--jean-gray-600)]" />
//                     ) : (
//                       <span className="text-lg md:text-2xl text-[var(--jean-pink-800)]">
//                         {localProfileData.firstName.charAt(0)}
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </div>
//               {isEditingImage && (
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="hidden"
//                 />
//               )}
//             </div>
//             <div>
//               <h2 className="text-base md:text-xl font-semibold text-[var(--jean-gray-900)]">
//                 {localProfileData.firstName} {localProfileData.lastName}
//               </h2>
//               <p className="text-sm md:text-base text-[var(--jean-gray-600)]">Nigeria</p>
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               setIsEditingImage(!isEditingImage);
//               if (!isEditingImage && !isEditing) setIsEditing(true);
//             }}
//             className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-sm md:text-base"
//           >
//             <Edit size={14} className="md:size-4" />
//             <span>{isEditingImage ? "Cancel" : "Edit"}</span>
//           </button>
//         </div>
//       </div>

//       {/* Personal Information Section */}
//       <div className="bg-white border border-black/30 rounded-xl md:rounded-2xl p-4 md:p-6">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
//           <h3 className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//             Personal Information
//           </h3>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-sm md:text-base"
//           >
//             <Edit size={14} className="md:size-4" />
//             <span>{isEditing ? "Cancel" : "Edit"}</span>
//           </button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
//         >
//           {/* First Name */}
//           <div>
//             <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
//               First name
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="firstName"
//                 value={localProfileData.firstName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
//               />
//             ) : (
//               <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//                 {localProfileData.firstName}
//               </div>
//             )}
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
//               Last name
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="lastName"
//                 value={localProfileData.lastName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
//               />
//             ) : (
//               <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//                 {localProfileData.lastName}
//               </div>
//             )}
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
//               Phone
//             </label>
//             {isEditing ? (
//               <input
//                 type="tel"
//                 name="phone"
//                 value={localProfileData.phone}
//                 onChange={handleChange}
//                 className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
//               />
//             ) : (
//               <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//                 {localProfileData.phone}
//               </div>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
//               Email Address
//             </label>
//             {isEditing ? (
//               <input
//                 type="email"
//                 name="email"
//                 value={localProfileData.email}
//                 onChange={handleChange}
//                 className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
//               />
//             ) : (
//               <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
//                 {localProfileData.email}
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           {(isEditing || isEditingImage) && (
//             <div className="md:col-span-2 mt-4 md:mt-6 flex flex-col sm:flex-row justify-end gap-2 md:gap-4">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsEditing(false);
//                   setIsEditingImage(false);
//                   setLocalProfileData(profileData);
//                   setPreviewImage(profileData.profileImage || "");
//                 }}
//                 className="px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg text-[var(--jean-gray-700)] hover:bg-[var(--jean-gray-100)] text-sm md:text-base"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-cyan-900 cursor-pointer text-sm md:text-base"
//               >
//                 Save Changes
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };



import { useState, useRef } from "react";
import { Edit, Camera } from "lucide-react";
import Image from "next/image";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
};

interface ProfileSectionProps {
  profileData: ProfileData;
  onProfileUpdate: (updatedData: ProfileData) => void;
}

export const ProfileSection = ({
  profileData,
  onProfileUpdate,
}: ProfileSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [localProfileData, setLocalProfileData] = useState(profileData);
  const [previewImage, setPreviewImage] = useState(
    profileData.profileImage || ""
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalProfileData({ ...localProfileData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageData = reader.result as string;
        setPreviewImage(newImageData);
        const updatedProfileData = {
          ...localProfileData,
          profileImage: newImageData,
        };
        setLocalProfileData(updatedProfileData);
        // Auto-save the image
        onProfileUpdate(updatedProfileData);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProfileUpdate(localProfileData);
    setIsEditing(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-semibold text-[var(--jean-gray-900)] mb-1 md:mb-2">
          Manage Your Profile
        </h1>
        <p className="text-sm md:text-base text-[var(--jean-gray-600)]">
          Update your profile information
        </p>
      </div>

      {/* Profile Header with Image */}
      <div className="bg-white rounded-xl md:rounded-2xl border border-black/30 p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative">
              <div 
                className="w-12 h-12 md:w-16 md:h-16 bg-[var(--jean-gray-300)] rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:bg-[var(--jean-gray-400)] transition-colors"
                onClick={triggerFileInput}
              >
                {previewImage ? (
                  <Image
                    width={64}
                    height={64}
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--jean-pink-200)] to-[var(--jean-pink-300)] flex items-center justify-center">
                    <Camera size={20} className="md:size-6 text-[var(--jean-gray-600)]" />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <h2 className="text-base md:text-xl font-semibold text-[var(--jean-gray-900)]">
                {localProfileData.firstName} {localProfileData.lastName}
              </h2>
              <p className="text-sm md:text-base text-[var(--jean-gray-600)]">Nigeria</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white border border-black/30 rounded-xl md:rounded-2xl p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
            Personal Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors text-sm md:text-base"
          >
            <Edit size={14} className="md:size-4" />
            <span>{isEditing ? "Cancel" : "Edit"}</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
        >
          {/* First Name */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
              First name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={localProfileData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
              />
            ) : (
              <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
                {localProfileData.firstName}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
              Last name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={localProfileData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
              />
            ) : (
              <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
                {localProfileData.lastName}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={localProfileData.phone}
                onChange={handleChange}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
              />
            ) : (
              <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
                {localProfileData.phone}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-[var(--jean-gray-700)] mb-1 md:mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={localProfileData.email}
                onChange={handleChange}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)] text-sm md:text-base"
              />
            ) : (
              <div className="text-base md:text-lg font-semibold text-[var(--jean-gray-900)]">
                {localProfileData.email}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="md:col-span-2 mt-4 md:mt-6 flex flex-col sm:flex-row justify-end gap-2 md:gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setLocalProfileData(profileData);
                  setPreviewImage(profileData.profileImage || "");
                }}
                className="px-3 py-1.5 md:px-4 md:py-2 border border-[var(--jean-gray-300)] rounded-lg text-[var(--jean-gray-700)] hover:bg-[var(--jean-gray-100)] text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 md:px-4 md:py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-cyan-900 cursor-pointer text-sm md:text-base"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};