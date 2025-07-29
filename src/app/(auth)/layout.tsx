import { ReactNode } from "react";
import "../globals.css";
import { Toaster } from "react-hot-toast";
// Supports weights 300-800
import "@fontsource-variable/host-grotesk";
import { Hydration } from "../components/providers/Hydration";

export default function LayoutPage({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={``} style={{ fontFamily: "Host Grotesk Variable" }}>
        <Hydration>
          <Toaster position="top-center" />
          {children}
        </Hydration>
      </body>
    </html>
  );
}
