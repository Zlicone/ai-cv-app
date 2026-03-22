"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      background: "rgba(8,11,18,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "0 32px",
      height: "60px",
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
        fontSize: "17px",
        color: "white",
        textDecoration: "none",
        letterSpacing: "-0.01em",
      }}>
        <span style={{ color: "var(--accent)" }}>AI</span> CV Builder
      </Link>

      <div style={{ display: "flex", gap: "6px" }}>
        {[
          { href: "/builder", label: "Generator" },
          { href: "/analyzer", label: "Analyzer" },
        ].map((link) => {
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              padding: "7px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "all 0.2s",
              background: active ? "var(--accent-dim)" : "transparent",
              color: active ? "var(--accent)" : "var(--text-muted)",
              border: active ? "1px solid var(--accent-border)" : "1px solid transparent",
            }}>
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}