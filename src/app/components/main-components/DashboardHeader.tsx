// "use client";
// import HeaderNotification from "../commons/HeaderNotification";
// import Input from "../ui/Input";
// import HeaderNameTag from "@/app/components/commons/HeaderNameTag";

// export default function DashboardHeader() {
//   return (
//     <div className="flex items-center mt-2">
//       <h1 className="text-2xl font-bold text-cyan-dark">Dashboard</h1>
//       <div className="ml-auto flex gap-5 items-center">
//         <div className="lg:block hidden">
//         <Input placeholder="Search" searchCallback={() => {}} />
//         </div>
//         <HeaderNotification />
//         <HeaderNameTag />
//       </div>
//     </div>
//   );
// }


"use client";

import { usePathname } from "next/navigation";
import HeaderNotification from "../commons/HeaderNotification";
import Input from "../ui/Input";
import HeaderNameTag from "@/app/components/commons/HeaderNameTag";

function formatTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "Dashboard";
  return last.charAt(0).toUpperCase() + last.slice(1); // Capitalize
}

export default function DashboardHeader() {
  const pathname = usePathname();
  const title = formatTitle(pathname);

  return (
    <div className="flex items-center mt-2">
      <h1 className="text-2xl font-bold text-cyan-dark">{title}</h1>
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
