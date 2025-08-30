import { ReactNode, Suspense } from "react";
import "../globals.css";
import SideBar from "@/components/main-components/SideBar";
import DashboardHeader from "@/components/main-components/DashboardHeader";
import MobileHeader from "@/components/main-components/MobileHeader";
import DashboardFooter from "@/components/main-components/DashboardFooter";
import { Metadata } from "next";
import { Geist } from "next/font/google";
import { Hydration } from "@/components/providers/Hydration";
import { AuthProvider } from "@/components/contexts/UserAuthContext";
import FullLoader from "@/components/ui/FullLoader";
import { Toaster } from "react-hot-toast";
import InitilizeAuthProvider from "@/components/providers/InitializeAuth";
import { PlatformSettingsProvider } from "@/components/contexts/PlatformSettingContext";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default async function LayoutPage({
  children,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <body className={` ${geist.className} bg-green-bg`}>
        <Hydration>
          <Toaster position="top-center" containerClassName="text-center" />
          <Suspense fallback={<FullLoader shouldClose duration={1000} />}>
            <PlatformSettingsProvider>
              <AuthProvider>
                <InitilizeAuthProvider>
                  <div className="mx-auto min-h-screen lg:grid grid-cols-7">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block col-span-2 xl:col-span-1">
                      <SideBar />
                    </div>

                    {/* Mobile Header - Full width on mobile */}
                    <div className="lg:hidden fixed top-0 left-0 right-0 z-30">
                      <MobileHeader />
                    </div>

                    {/* Main Content */}
                    <div className="2xl:flex-1 lg:px-7 py-4 w-full flex flex-col bg-white rounded-tl-2xl lg:rounded-tl-2xl lg:col-span-5 xl:col-span-6">
                      {/* Desktop Header */}
                      <div className="hidden lg:block border-b border-cyan-dark/30 pb-6">
                        <DashboardHeader />
                      </div>

                      {/* Content with mobile header spacing */}
                      <div className="flex-1 mt-2 lg:mt-2 pt-8 lg:pt-0 border-b border-cyan-dark/30">
                        <div className="max-w-[1920px] mx-auto p-2">
                          {children}
                        </div>
                      </div>

                      <DashboardFooter />
                    </div>
                  </div>
                </InitilizeAuthProvider>
              </AuthProvider>
            </PlatformSettingsProvider>
          </Suspense>
        </Hydration>
      </body>
    </html>
  );
}
