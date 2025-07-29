import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuthContext } from "../contexts/UserAuthContext";
import { Settings, RefreshCcw, LucideLogOut } from "lucide-react";

export default function HeaderNameTag() {
  const { user, logout } = useAuthContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={"flex gap-5 items-center"}>
      <h1 className="text-2xl font-bold text-cyan-dark">
        {user?.first_name || ""} {user?.last_name || ""}
      </h1>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="focus:outline-none focus:ring-2 focus:ring-cyan-dark focus:ring-offset-1 rounded-full"
        >
          <Image
            src={user?.profile_picture || "/images/defaults/user.jpg"}
            alt={"profile picture"}
            width={50}
            height={50}
            className={
              "rounded-full aspect-square border object-cover border-cyan-dark hover:border-cyan-600 transition-colors cursor-pointer"
            }
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-1">
              <Link
                href="/dashboard/payment/transfer"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <RefreshCcw size={16} className="text-gray-500" />
                Exchange
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings size={16} className="text-gray-500" />
                Settings
              </Link>

              <hr className="my-1 border-gray-100" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LucideLogOut size={16} className="text-red-500" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
