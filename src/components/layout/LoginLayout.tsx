import { ReactNode } from "react";
import { AuthProvider } from "../contexts/UserAuthContext";

export default function LoginProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
