"use client";
import Logo from "@/app/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Wallet,
  ArrowsClockwise,
  ClockCounterClockwise,
  Bell,
  Gear,
} from "@phosphor-icons/react";
import { ArrowRightLeft } from "lucide-react";


const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: House },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Convert", href: "/dashboard/convert", icon: ArrowsClockwise },
  { name: "Transcations", href: "/dashboard/transactions", icon: ArrowRightLeft},
  { name: "Settings", href: "/dashboard/settings", icon: ArrowRightLeft},
  { name: "History", href: "/dashboard/history", icon: ClockCounterClockwise },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Gear },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-green-bg min-h-dvh h-full p-2 md:py-6 md:px-4 flex flex-col">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                isActive
                  ? "bg-cyan-dark text-white rounded-full"
                  : "text-cyan-dark hover:bg-gray-10 rounded-full"
              }`}
            >
              <IconComponent size={20} />

              <span className="font-medium md:block block">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
