"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggleBtn } from "./theme-toggle-btn";
import { HamburgerMenu } from "./hamburger-menu";
import { MobileSidebar } from "./mobile-sidebar";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <nav className="navbar backdrop-blur-md bg-base-100/80 sticky top-0 z-50 border-b border-base-300 px-4 lg:px-10">
        <div className="navbar-start">
          <HamburgerMenu
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
          <Link href="/" className="flex items-center gap-2 ml-2">
            <Image
              src="/logo.png"
              alt="SparkLift Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-primary font-bold text-xl">SparkLift</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex gap-6">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-primary transition-colors font-medium ${
                pathname === link.href ? "text-primary" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          {session && (
            <>
              <Link
                href="/dashboard"
                className={`hover:text-primary transition-colors font-medium ${
                  pathname === "/dashboard" ? "text-primary" : ""
                }`}
              >
                Dashboard
              </Link>
              <a
                href="https://github.com/HassanMahdee"
                className="btn btn-primary btn-sm rounded-full animate-pulse hover:animate-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Developer
              </a>
            </>
          )}
        </div>
        <div className="navbar-end gap-2">
          <ThemeToggleBtn />
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-neutral text-neutral-content rounded-full w-full h-full flex items-center justify-center">
                      <span className="text-sm font-semibold">
                        {session.user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-200 rounded-2xl z-1 w-52 p-2 shadow mt-2"
              >
                <li className="px-3 py-2 text-sm font-semibold text-base-content/60">
                  {session.user?.name}
                </li>
                <li className="px-3 py-2 text-sm text-base-content/50">
                  {session.user?.email}
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-ghost btn-sm w-full justify-start"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link
                href="/auth/login"
                className="btn btn-primary btn-sm rounded-full"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="btn btn-outline btn-sm rounded-full"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
