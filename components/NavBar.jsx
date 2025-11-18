'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/thinking", label: "Thinking" },
];

const menuLinks = [
  { href: "/", label: "Home" },
  ...navLinks,
];

const normalizePath = (value) => {
  if (!value) return "/";
  if (value === "/") return "/";
  return value.endsWith("/") ? value.slice(0, -1) : value;
};

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = normalizePath(pathname);

  useEffect(() => {
    const handleResize = () => setIsMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className={styles.shell}>
      <div className={styles.navbar}>
        <div className={styles.brand} onClick={closeMenu}>
          <Link href="/" className={styles.brandName}>
            Justin Liao
          </Link>
          <span className={styles.tagline}>
            <span className={styles.taglineHighlight}>Tech</span> Designer | Philosopher
          </span>
        </div>
        <nav className={styles.links} aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = currentPath === normalizePath(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className={styles.logoMount} aria-hidden="true">
            <div className={styles.logoBackground} />
            <div className={styles.logoPlaceholder}>
              <Image src="/UI/R.svg" alt="Logo" fill sizes="48px" />
            </div>
          </div>
        </nav>
        <button
          type="button"
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonActive : ""}`}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={toggleMenu}
        >
          <Image
            src="/UI/Menu Icon.svg"
            alt=""
            width={32}
            height={32}
            aria-hidden="true"
            className={styles.menuIcon}
            priority
          />
        </button>
        {isMenuOpen && (
          <div className={styles.dropdown} role="dialog" aria-modal="true">
            <button
              type="button"
              className={styles.dropdownClose}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ×
            </button>
            <div className={styles.dropdownSection}>
              {menuLinks.map((link) => {
                const isActive = currentPath === normalizePath(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.dropdownLink} ${
                      isActive ? styles.dropdownLinkActive : ""
                    }`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <a
              className={styles.dropdownAction}
              href="https://reunifylabs.com"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/UI/R.svg"
                alt=""
                width={28}
                height={28}
                aria-hidden="true"
              />
              <span className={styles.dropdownActionLabel}>Reunify Labs</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
