

import { useState, useRef } from "react";
import { Edit } from "lucide-react";
import Image from "next/image";

interface ProfileSectionProps {
  profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage?: string;
  };
  onProfileUpdate: (updatedData: typeof profileData) => void;
}

export const ProfileSection = ({
  profileData,
  onProfileUpdate,
}: ProfileSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
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
        setPreviewImage(reader.result as string);
        setLocalProfileData({
          ...localProfileData,
          profileImage: reader.result as string,
        });
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
    setIsEditingImage(false);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[var(--jean-gray-900)] mb-2">
          Manage Your Profile
        </h1>
        <p className="text-[var(--jean-gray-600)]">
          Update your profile information
        </p>
      </div>

      {/* Profile Header with Image */}
      <div className="bg-[var(--jean-gray-50)] rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-[var(--jean-gray-300)] rounded-full flex items-center justify-center overflow-hidden">
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
                    <span className="text-2xl text-[var(--jean-pink-800)]">
                      {localProfileData.firstName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {isEditingImage && (
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--jean-gray-900)]">
                {localProfileData.firstName} {localProfileData.lastName}
              </h2>
              <p className="text-[var(--jean-gray-600)]">Nigeria</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsEditingImage(!isEditingImage);
              if (!isEditingImage && !isEditing) setIsEditing(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors"
          >
            <Edit size={16} />
            <span>{isEditingImage ? "Cancel" : "Edit"}</span>
          </button>
        </div>
        {isEditingImage && (
          <div className="mt-4">
            <button
              onClick={triggerFileInput}
              className="px-4 py-2 bg-[var(--jean-green-600)] text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-green-700)]"
            >
              Upload New Image
            </button>
          </div>
        )}
      </div>

      {/* Personal Information Section */}
      <div className="bg-[var(--jean-gray-50)] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[var(--jean-gray-900)]">
            Personal Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-dark text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-teal-800)] transition-colors"
          >
            <Edit size={16} />
            <span>{isEditing ? "Cancel" : "Edit"}</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--jean-gray-700)] mb-2">
              First name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={localProfileData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)]"
              />
            ) : (
              <div className="text-lg font-semibold text-[var(--jean-gray-900)]">
                {localProfileData.firstName}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--jean-gray-700)] mb-2">
              Last name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={localProfileData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)]"
              />
            ) : (
              <div className="text-lg font-semibold text-[var(--jean-gray-900)]">
                {localProfileData.lastName}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[var(--jean-gray-700)] mb-2">
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={localProfileData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)]"
              />
            ) : (
              <div className="text-lg font-semibold text-[var(--jean-gray-900)]">
                {localProfileData.phone}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[var(--jean-gray-700)] mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={localProfileData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--jean-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--jean-green-600)]"
              />
            ) : (
              <div className="text-lg font-semibold text-[var(--jean-gray-900)]">
                {localProfileData.email}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {(isEditing || isEditingImage) && (
            <div className="md:col-span-2 mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setIsEditingImage(false);
                  setLocalProfileData(profileData);
                  setPreviewImage(profileData.profileImage || "");
                }}
                className="px-4 py-2 border border-[var(--jean-gray-300)] rounded-lg text-[var(--jean-gray-700)] hover:bg-[var(--jean-gray-100)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--jean-green-600)] text-[var(--jean-white)] rounded-lg hover:bg-[var(--jean-green-700)]"
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
