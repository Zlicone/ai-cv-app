import Link from "next/link";

export default function Home() {
  return (
    <main className="page" style={{ display: "flex", alignItems: "center" }}>
      <div className="glow" style={{ top: "-200px", left: "-200px" }} />

      <div className="container" style={{ width: "100%" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "var(--accent-dim)",
          border: "1px solid rgba(0,229,255,0.2)",
          borderRadius: "100px",
          padding: "6px 16px",
          marginBottom: "32px",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
          <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 500, letterSpacing: "0.05em" }}>
            Powered by GPT-4o mini
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(48px, 8vw, 80px)",
          fontWeight: 800,
          lineHeight: 1.05,
          marginBottom: "24px",
          letterSpacing: "-0.02em",
        }}>
          Your CV,<br />
          <span style={{ color: "var(--accent)" }}>reimagined</span><br />
          by AI.
        </h1>

        <p style={{
          fontSize: "18px",
          color: "rgba(255,255,255,0.45)",
          maxWidth: "480px",
          lineHeight: 1.7,
          marginBottom: "48px",
          fontWeight: 300,
        }}>
          Generate a professional CV from scratch or get instant AI feedback on your existing one.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/builder" style={{
            background: "var(--accent)",
            color: "#080b12",
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "0.05em",
            padding: "16px 36px",
            borderRadius: "10px",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}>
            Generate CV →
          </Link>
          <Link href="/analyzer" style={{
            background: "var(--surface)",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            padding: "16px 36px",
            borderRadius: "10px",
            textDecoration: "none",
            border: "1px solid var(--border)",
          }}>
            Analyze CV
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex",
          gap: "48px",
          marginTop: "80px",
          paddingTop: "48px",
          borderTop: "1px solid var(--border)",
        }}>
          {[
            { value: "< 10s", label: "Generation time" },
            { value: "GPT-4o", label: "AI Model" },
            { value: "Free", label: "To try" },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "28px",
                color: "white",
              }}>{stat.value}</div>
              <div style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.35)",
                marginTop: "4px",
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}