"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page on app load
    router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-green-bg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-dark mx-auto"></div>
        <p className="mt-4 text-cyan-dark">Redirecting to login...</p>
      </div>
    </div>
  );
}
