"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Dropdown from "rc-dropdown";
import "rc-dropdown/assets/index.css";
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface SubMenuItem {
  name: string;
  href: string;
}

interface MenuItemBase {
  name: string;
}

interface MenuItemWithLink extends MenuItemBase {
  href: string;
  hasSubMenu?: false;
}

interface MenuItemWithSubMenu extends MenuItemBase {
  hasSubMenu: true;
  subItems: SubMenuItem[];
}

type MenuItem = MenuItemWithLink | MenuItemWithSubMenu;

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const isActive = (path: string): boolean => pathname === path;

  const menuItems: MenuItem[] = [
    { name: "About", href: "/about" },
    {
      name: "Tutorials",
      hasSubMenu: true,
      subItems: [
        { name: "Overview", href: "/tutorials" },
        { name: "List of Tutorials", href: "/tutorials/list" },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const renderDropdownMenu = (subItems: SubMenuItem[]) => (
    <ul
      className="py-2"
      style={{
        backgroundColor: "var(--background)",
        boxShadow: "0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2)", // Prominent shadow
        width: "12rem",
      }}
    >
      {subItems.map((subItem) => (
        <li key={subItem.href}>
          <Link
            href={subItem.href}
            className={`block px-4 py-2 text-lg font-bold transition-colors duration-200 ${isActive(subItem.href) ? "text-primary" : "text-text"
              }`}
            onClick={() => setIsDropdownOpen(false)} // Ensure arrow resets on click
            style={{fontFamily: 'var(--font-lora)'}}
          >
            {subItem.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="min-h-screen px-5 py-0"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text)",
      }}
    >
      {/* Header Section */}
      <header
        className="w-full flex justify-between items-center px-4 py-4 md:justify-start"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text)",
        }}
      >
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/social-media-for-humanists/images/logo.svg"
              alt="Social Media for Humanists Logo"
              width={80}
              height={80}
              className="cursor-pointer"
            />
            <div
              className="ml-4 text-xl"
              style={{ fontFamily: 'var(--font-lora)', color: 'var(--primary)' }}
            >
              <p className="font-bold leading-tight">
                Social Media
              </p>
              <p className="font-bold leading-tight">
                for Humanists
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 mx-auto items-center" style={{fontFamily: 'var(--font-lora)'}}>
          {menuItems.map((item) =>
            "hasSubMenu" in item && item.hasSubMenu ? (
              <Dropdown
                key={item.name}
                trigger={["hover", "click"]} // Enable hover and click
                overlay={renderDropdownMenu(item.subItems)}
                animation="slide-up"
                onVisibleChange={(visible) => setIsDropdownOpen(visible)} // Track dropdown visibility
              >
                <span
                  className={`text-xl font-bold cursor-pointer flex items-center transition-transform duration-150 ease-out hover:scale-105 ${item.subItems.some((sub) => isActive(sub.href))
                    ? "text-primary"
                    : "text-text"
                    }`}
                >
                  {item.name}
                  <span className="ml-1">
                    {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </span>
              </Dropdown>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xl font-bold transition-transform duration-150 ease-out hover:scale-105 ${isActive(item.href)
                  ? "text-primary cursor-default"
                  : "text-text cursor-pointer"
                  }`}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          className="flex flex-col items-start md:hidden py-4 space-y-2"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--text)",
          }}
        >
          {menuItems.map((item) =>
            "hasSubMenu" in item && item.hasSubMenu ? (
              <div key={item.name} className="space-y-1">
                <span className="text-xl font-bold">{item.name}</span>
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={`block px-4 py-2 transition-colors duration-200 ${isActive(subItem.href)
                      ? "bg-gray-200 text-primary"
                      : "hover:bg-gray-100"
                      }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xl font-bold transition-transform duration-150 ease-out ${isActive(item.href)
                  ? "text-primary cursor-default"
                  : "text-text cursor-pointer"
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>
      )}

      {/* Main Content */}
      <main className="px-[4%] py-[2.5%]">{children}</main>
    </div>
  );
};

export default LayoutWrapper;