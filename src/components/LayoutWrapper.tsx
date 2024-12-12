"use client";

import { useState, ReactNode } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { name: "About", href: "/about" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div
      className="min-h-screen px-[5%] py-[0%]"
      style={{ backgroundColor: "var(--background)", color: "var(--text)" }}
    >
      {/* Header Section */}
      <header
        className="w-full flex justify-between items-center px-4 py-4"
        style={{ backgroundColor: "var(--background)", color: "var(--text)" }}
      >
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Social Media for Humanists Logo"
            width={80}
            height={80}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-16">
          {menuItems.map((item) => (
            <span
              key={item.href}
              className={`text-xl font-bold transition-transform duration-150 ease-out ${
                isActive(item.href)
                  ? "cursor-default"
                  : "hover:scale-105 cursor-pointer"
              }`}
              style={{
                color: isActive(item.href) ? "var(--primary)" : "var(--text)",
              }}
            >
              {isActive(item.href) ? (
                item.name
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </span>
          ))}
        </nav>

        {/* Theme Toggle */}
        <ThemeToggle />
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          className="flex flex-col items-center md:hidden py-4 space-y-2"
          style={{ backgroundColor: "var(--background)", color: "var(--text)" }}
        >
          {menuItems.map((item) => (
            <span
              key={item.href}
              className={`text-lg font-bold transition-transform duration-150 ease-out ${
                isActive(item.href)
                  ? "cursor-default"
                  : "hover:scale-105 cursor-pointer"
              }`}
              style={{
                color: isActive(item.href) ? "var(--primary)" : "var(--text)",
              }}
              onClick={() => !isActive(item.href) && setMenuOpen(false)}
            >
              {isActive(item.href) ? (
                item.name
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Main Content */}
      <main className="px-[2.5%] py-[2.5%]">{children}</main>
    </div>
  );
};

export default LayoutWrapper;
