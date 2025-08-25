"use client";

import { BellIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function HeaderNotification() {
  return (
    <Link
      href="/dashboard/notifications"
      className="rounded-full aspect-square p-4 bg-green-bg cursor-pointer"
    >
      <BellIcon size={18} />
    </Link>
  );
}
