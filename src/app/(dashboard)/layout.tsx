import { ReactNode } from "react";
import { Instrument_Sans } from "next/font/google";
import "../globals.css";
import SideBar from "../components/main-components/SideBar";
import DashboardHeader from "../components/main-components/DashboardHeader";
import MobileHeader from "../components/main-components/MobileHeader";
import DashboardFooter from "../components/main-components/DashboardFooter";

const font = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export default function LayoutPage({
  children,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-green-bg`}>
        <div className="mx-auto flex min-h-screen">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <SideBar />
          </div>

          {/* Mobile Header - Full width on mobile */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-30">
            <MobileHeader />
          </div>

          {/* Main Content */}
          <div className="2xl:flex-1 lg:px-7 py-4 w-full flex flex-col bg-white rounded-tl-2xl lg:rounded-tl-2xl rounded-tl-none">
            {/* Desktop Header */}
            <div className="hidden lg:block">
              <DashboardHeader />
            </div>

            {/* Content with mobile header spacing */}
            <div className="flex-1 mt-2 lg:mt-2 pt-16 lg:pt-0">
              {children}
            </div>
            
            <DashboardFooter />
          </div>
        </div>
      </body>
    </html>
  );
}