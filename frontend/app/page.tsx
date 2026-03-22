import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      minHeight: "calc(100vh - 60px)",
      display: "flex",
      alignItems: "center",
      padding: "48px 24px",
    }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}>

        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "var(--accent-dim)",
          border: "1px solid var(--accent-border)",
          borderRadius: "99px",
          padding: "5px 14px",
          marginBottom: "36px",
        }}>
          <span style={{
            width: "6px", height: "6px",
            borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
          }} />
          <span style={{
            fontSize: "11px",
            color: "var(--accent)",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Powered by GPT-4o mini
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(44px, 8vw, 72px)",
          fontWeight: 800,
          lineHeight: 1.06,
          marginBottom: "24px",
          letterSpacing: "-0.03em",
          color: "white",
        }}>
          Your CV,<br />
          <span style={{ color: "var(--accent)" }}>reimagined</span><br />
          by AI.
        </h1>

        <p style={{
          fontSize: "16px",
          color: "var(--text-muted)",
          lineHeight: 1.75,
          marginBottom: "44px",
          maxWidth: "420px",
          fontWeight: 300,
        }}>
          Generate a professional CV from scratch or get instant AI feedback on your existing one.
        </p>

        {/* CTA */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link href="/builder" style={{
            background: "var(--accent)",
            color: "#080b12",
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            padding: "14px 32px",
            borderRadius: "10px",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}>
            Generate CV →
          </Link>
          <Link href="/analyzer" style={{
            background: "var(--surface)",
            color: "var(--text-muted)",
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            padding: "14px 32px",
            borderRadius: "10px",
            textDecoration: "none",
            border: "1px solid var(--border)",
            transition: "border-color 0.2s",
          }}>
            Analyze CV
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex",
          gap: "48px",
          marginTop: "72px",
          paddingTop: "40px",
          borderTop: "1px solid var(--border)",
          flexWrap: "wrap",
        }}>
          {[
            { value: "< 10s", label: "Generation time" },
            { value: "GPT-4o", label: "AI model" },
            { value: "3", label: "CV templates" },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "26px",
                color: "white",
                letterSpacing: "-0.02em",
              }}>{stat.value}</div>
              <div style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                marginTop: "3px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}