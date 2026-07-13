"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
];

const linkVariants = {
  closed: { x: 50, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            ref={sidebarRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-base-100 z-50 shadow-2xl lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-primary">Menu</h2>
                <button
                  onClick={onClose}
                  className="btn btn-ghost btn-circle"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {publicLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    custom={index}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-base-200 transition-colors font-medium text-lg"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {session && (
                  <>
                    <motion.div
                      custom={publicLinks.length}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href="/dashboard"
                        onClick={onClose}
                        className="block p-4 rounded-xl hover:bg-base-200 transition-colors font-medium text-lg"
                      >
                        Dashboard
                      </Link>
                    </motion.div>

                    <motion.div
                      custom={publicLinks.length + 1}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                    >
                      <a
                        href="https://github.com/HassanMahdee"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-xl bg-primary text-primary-content text-center font-bold text-lg hover:opacity-90 transition-opacity"
                      >
                        Join Developer
                      </a>
                    </motion.div>
                  </>
                )}
              </nav>

              <div className="mt-8 pt-8 border-t border-base-300">
                {session ? (
                  <motion.div
                    custom={publicLinks.length + 2}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                  >
                    <div className="mb-4">
                      <p className="font-semibold">{session.user?.name}</p>
                      <p className="text-sm text-base-content/60">
                        {session.user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline w-full"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    custom={publicLinks.length}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    className="flex flex-col gap-3"
                  >
                    <Link
                      href="/auth/login"
                      onClick={onClose}
                      className="btn btn-primary w-full"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={onClose}
                      className="btn btn-outline w-full"
                    >
                      Register
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
