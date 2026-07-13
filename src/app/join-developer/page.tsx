"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JoinDeveloperPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("https://github.com/HassanMahdee");
  }, [router]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
