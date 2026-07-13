"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

interface UserWithCustomFields {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role?: string;
  credits?: number;
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1
              className="card-title text-3xl mb-6"
              style={{ color: "var(--color-primary)" }}
            >
              Dashboard
            </h1>

            <div className="flex items-center gap-4 mb-6">
              {session.user?.image && (
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </div>
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold">{session.user?.name}</h2>
                <p className="text-sm opacity-70">{session.user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-title">Role</div>
                <div
                  className="stat-value text-2xl capitalize"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {(session.user as UserWithCustomFields)?.role || "N/A"}
                </div>
              </div>

              <div className="stat bg-base-200 rounded-box">
                <div className="stat-title">Credits</div>
                <div
                  className="stat-value text-2xl"
                  style={{ color: "var(--color-accent)" }}
                >
                  {(session.user as UserWithCustomFields)?.credits || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
