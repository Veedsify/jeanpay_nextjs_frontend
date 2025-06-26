"use client";
import HeaderNotification from "../commons/HeaderNotification";
import Input from "../ui/Input";

export default function DashboardHeader() {
  return (
    <div className="flex items-center">
      <h1 className="text-2xl font-bold text-cyan-dark">Dashboard</h1>
      <div className="ml-auto flex gap-5 items-center">
        <Input placeholder="Search" searchCallback={() => {}} />
        <HeaderNotification />
      </div>
    </div>
  );
}
