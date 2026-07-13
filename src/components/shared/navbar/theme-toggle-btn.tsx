"use client";

import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export function ThemeToggleBtn() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
      className="btn btn-ghost btn-circle"
      suppressHydrationWarning
    >
      {theme === "light" ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
    </button>
  );
}
