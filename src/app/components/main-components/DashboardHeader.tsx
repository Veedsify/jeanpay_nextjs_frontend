"use client";
import HeaderNotification from "../commons/HeaderNotification";
import Input from "../ui/Input";
import HeaderNameTag from "@/app/components/commons/HeaderNameTag";

export default function DashboardHeader() {
  return (
    <div className="flex items-center mt-2">
      <h1 className="text-2xl font-bold text-cyan-dark">Dashboard</h1>
      <div className="ml-auto flex gap-5 items-center">
        <div className="lg:block hidden">
        <Input placeholder="Search" searchCallback={() => {}} />
        </div>
        <HeaderNotification />
        <HeaderNameTag />
      </div>
    </div>
  );
}
