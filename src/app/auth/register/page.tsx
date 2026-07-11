"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePictureUrl: "",
    role: "supporter",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.profilePictureUrl || undefined,
        callbackURL: "/dashboard",
        fetchOptions: {
          body: {
            role: formData.role,
          },
        },
      });

      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
            Create Account
          </h2>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

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
                <span className="label-text">
                  Profile Picture URL (Optional)
                </span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/profile.jpg"
                className="input input-bordered w-full"
                value={formData.profilePictureUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    profilePictureUrl: e.target.value,
                  })
                }
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="supporter">Supporter</option>
                <option value="creator">Creator</option>
              </select>
              {formData.role === "supporter" && (
                <p
                  className="text-sm mt-2 font-semibold"
                  style={{ color: "var(--color-success)" }}
                >
                  New supporters will get free 50 credits
                </p>
              )}
              {formData.role === "creator" && (
                <p
                  className="text-sm mt-2 font-semibold"
                  style={{ color: "var(--color-accent)" }}
                >
                  New creators will get free 20 credits
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
              disabled={loading}
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="divider">Or</div>

          <button
            className="btn btn-outline w-full"
            onClick={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
              })
            }
          >
            Sign up with Google
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="link link-primary"
              style={{ color: "var(--color-primary)" }}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
