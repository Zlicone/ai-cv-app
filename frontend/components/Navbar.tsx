"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/builder", label: "Generator" },
    { href: "/analyzer", label: "Analyzer" },
  ];

  return (
    <nav style={{
      background: "rgba(8, 11, 18, 0.8)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "0 32px",
      height: "65px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/" style={{
        fontFamily: "Syne, sans-serif",
        fontWeight: 800,
        fontSize: "18px",
        color: "white",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <span style={{ color: "var(--accent)" }}>AI</span> CV Builder
      </Link>

      <div style={{ display: "flex", gap: "8px" }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.05em",
              padding: "8px 18px",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "all 0.2s",
              background: pathname === link.href ? "var(--accent-dim)" : "transparent",
              color: pathname === link.href ? "var(--accent)" : "rgba(255,255,255,0.5)",
              border: pathname === link.href ? "1px solid rgba(0,229,255,0.2)" : "1px solid transparent",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}