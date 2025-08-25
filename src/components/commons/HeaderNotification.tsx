"use client";

import { BellIcon } from "@phosphor-icons/react";

export default function HeaderNotification() {
  return (
    <button className="rounded-full aspect-square p-4 bg-green-bg cursor-pointer">
      <BellIcon size={18}/>
    </button>
  );
}
