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
        <div className="max-w-[1440px] mx-auto grid grid-cols-8">
          <div className="col-span-1">
            <SideBar />
          </div>
          <div className="col-span-7 px-7 py-4">
            <DashboardHeader />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
