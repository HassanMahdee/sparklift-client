"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setLoading(false);
      return;
    }

    try {
      await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/dashboard",
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err: unknown) {
      console.error("Google sign-in error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2
            className="card-title text-2xl mb-6 text-center"
            style={{ color: "var(--color-primary)" }}
          >
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
              disabled={loading}
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <div className="divider">Or</div>

          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </button>

          <p className="text-center mt-4">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/register"
              className="link link-primary"
              style={{ color: "var(--color-primary)" }}
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
