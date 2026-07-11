"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePictureUrl: "",
    role: "supporter",
  });
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);

    try {
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formDataImg,
        },
      );

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          profilePictureUrl: data.data.url,
        }));
        toast.success("Profile picture uploaded successfully");
      } else {
        toast.error("Failed to upload image");
      }
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      setLoading(false);
      toast.error("Please fill in all required fields");
      return;
    }

    if (!validateEmail(formData.email)) {
      setLoading(false);
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(formData.password)) {
      setLoading(false);
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.profilePictureUrl || undefined,
        callbackURL: "/dashboard",
        fetchOptions: {
          body: {
            role: formData.role,
            credits: formData.role === "creator" ? 20 : 50,
          },
        },
      });
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      toast.error(errorMessage);
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
                <span className="label-text">Profile Picture (Optional)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={handleImageUpload}
                disabled={imageUploading}
              />
              {imageUploading && (
                <span className="loading loading-spinner loading-sm mt-2"></span>
              )}
              {formData.profilePictureUrl && (
                <div className="mt-3">
                  <p className="text-sm mb-2">Preview:</p>
                  <p className="text-xs text-base-content/60 mb-2">
                    {formData.profilePictureUrl}
                  </p>
                  <Image
                    src={formData.profilePictureUrl}
                    alt="Profile preview"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-2 border-base-300"
                  />
                </div>
              )}
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
              signIn.social({
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
