import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";

const font = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});
export default function LayoutPage({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
