"use client";

import { IoMenu, IoClose } from "react-icons/io5";

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function HamburgerMenu({ isOpen, onToggle }: HamburgerMenuProps) {
  return (
    <button
      onClick={onToggle}
      className="btn btn-ghost btn-circle lg:hidden"
      aria-label="Toggle menu"
    >
      {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
    </button>
  );
}
