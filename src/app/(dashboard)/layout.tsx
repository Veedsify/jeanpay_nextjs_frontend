import { ReactNode } from "react";
import { Instrument_Sans } from "next/font/google";
import "../globals.css";
import SideBar from "../components/main-components/SideBar";
import DashboardHeader from "../components/main-components/DashboardHeader";

const font = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});
export default function LayoutPage({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <div className="mx-auto  flex">
          <div className="hidden lg:block">
            <SideBar />
          </div>
          <div className="2xl:flex-1 px-7 py-4 w-full border-2 border-black">
            <DashboardHeader />
            
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
