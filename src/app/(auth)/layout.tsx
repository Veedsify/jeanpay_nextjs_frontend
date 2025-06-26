import { ReactNode } from "react";
import { Instrument_Sans } from "next/font/google";
import "../globals.css";

const font = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});
export default function LayoutPage({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>{children}</body>
    </html>
  );
}
