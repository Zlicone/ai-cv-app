"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = ["Personal info", "Summary", "Experience", "Education & skills", "Template"];

const TEMPLATES = [
  { id: "minimal", name: "Minimal", desc: "Clean, whitespace-first" },
  { id: "classic", name: "Classic", desc: "Traditional & formal" },
  { id: "creative", name: "Creative", desc: "Bold sidebar accent" },
];

export default function Builder() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState("minimal");
  const [formData, setFormData] = useState({
    full_name: "", email: "", phone: "", location: "",
    summary: "", experience: "", education: "", skills: "",
    language: "english",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-cv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      localStorage.setItem("generatedCV", data.cv);
      localStorage.setItem("cvFormData", JSON.stringify(formData));
      localStorage.setItem("cvTemplate", template);
      router.push("/result");
    } catch {
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  const card = (children: React.ReactNode, mb = "14px") => (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      padding: "24px",
      marginBottom: mb,
    }}>{children}</div>
  );

  const sectionLabel = (text: string) => (
    <p style={{
      fontSize: "10px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      fontWeight: 600,
      marginBottom: "18px",
    }}>{text}</p>
  );

  const field = (name: string, label: string, placeholder: string, rows?: number) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{
        fontSize: "11px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        fontWeight: 600,
      }}>{label}</label>
      {rows ? (
        <textarea
          name={name}
          value={formData[name as keyof typeof formData]}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          name={name}
          value={formData[name as keyof typeof formData]}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <main style={{ padding: "40px 24px", minHeight: "calc(100vh - 60px)" }}>
      <div style={{ maxWidth: "580px", margin: "0 auto" }}>

        {/* Header */}
        <p style={{
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: "6px",
        }}>Step {step + 1} of {STEPS.length}</p>
        <h1 style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "30px",
          letterSpacing: "-0.02em",
          marginBottom: "32px",
          color: "white",
        }}>{STEPS[step]}</h1>

        {/* Step indicators */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{
                width: "30px", height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                fontFamily: "Syne, sans-serif",
                flexShrink: 0,
                transition: "all 0.3s",
                background: i < step ? "var(--accent)" : i === step ? "var(--accent-dim)" : "var(--surface)",
                border: i === step ? "2px solid var(--accent)" : i < step ? "none" : "1px solid var(--border)",
                color: i < step ? "#080b12" : i === step ? "var(--accent)" : "var(--text-muted)",
              }}>
                {i < step ? "✓" : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  flex: 1,
                  height: "1px",
                  background: i < step ? "var(--accent)" : "var(--border)",
                  transition: "background 0.3s",
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div style={{ display: "flex", marginBottom: "32px" }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, textAlign: "center" }}>
              <span style={{
                fontSize: "9px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: i === step ? "var(--accent)" : "var(--text-muted)",
                fontWeight: 600,
              }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Step 0 */}
        {step === 0 && card(
          <>
            {sectionLabel("Your details")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {field("full_name", "Full name", "Ivan Horvat")}
              {field("email", "Email", "ivan@email.com")}
              {field("phone", "Phone", "+385 91 234 5678")}
              {field("location", "Location", "Zagreb, Croatia")}
            </div>

            <div style={{ marginTop: "20px" }}>
              <p style={{
                fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--text-muted)", fontWeight: 600, marginBottom: "12px",
              }}>CV Language</p>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { id: "english", label: "English" },
                  { id: "croatian", label: "Hrvatski" },
                ].map((lang) => (
                  <div
                    key={lang.id}
                    onClick={() => setFormData({ ...formData, language: lang.id })}
                    style={{
                      flex: 1, padding: "11px", borderRadius: "8px", cursor: "pointer",
                      textAlign: "center", transition: "all 0.2s",
                      border: formData.language === lang.id ? "1px solid var(--accent)" : "1px solid var(--border)",
                      background: formData.language === lang.id ? "var(--accent-dim)" : "transparent",
                      color: formData.language === lang.id ? "var(--accent)" : "var(--text-muted)",
                      fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "12px",
                      letterSpacing: "0.05em", textTransform: "uppercase",
                    }}
                  >
                    {lang.label}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Step 1 */}
        {step === 1 && card(
          <>
            {sectionLabel("Professional summary")}
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "14px", lineHeight: 1.6 }}>
              A short paragraph about who you are and what you're looking for. AI will refine your text.
            </p>
            {field("summary", "Summary", "Computer science student with experience in web development, passionate about building modern applications...", 7)}
          </>
        )}

        {/* Step 2 */}
        {step === 2 && card(
          <>
            {sectionLabel("Work experience")}
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "14px", lineHeight: 1.6 }}>
              List roles, companies, dates and responsibilities. Don't worry about wording — AI handles that.
            </p>
            {field("experience", "Experience", "2023 – present: Frontend Intern at XYZ Agency\n- Built React components\n- Integrated REST APIs\n\n2022: Freelance developer\n- Built 3 websites", 9)}
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            {card(
              <>
                {sectionLabel("Education")}
                {field("education", "Education", "2021 – present: Bachelor of CS, Faculty of Informatics, Zagreb\n2017 – 2021: Gymnasium, Split", 3)}
              </>
            )}
            {card(
              <>
                {sectionLabel("Skills")}
                {field("skills", "Skills", "Python, JavaScript, React, Next.js, FastAPI, Git, SQL...", 2)}
              </>
            )}
          </>
        )}

        {/* Step 4 - Template */}
        {step === 4 && card(
          <>
            {sectionLabel("Choose a template")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              {TEMPLATES.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  style={{
                    border: template === t.id ? "1px solid var(--accent)" : "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "12px",
                    cursor: "pointer",
                    background: template === t.id ? "var(--accent-dim)" : "transparent",
                    transition: "all 0.2s",
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ height: "76px", borderRadius: "6px", overflow: "hidden", marginBottom: "10px" }}>
                    {t.id === "minimal" && (
                      <div style={{ background: "white", height: "100%", padding: "10px" }}>
                        <div style={{ height: "7px", background: "#1a1a2e", borderRadius: "2px", width: "55%", marginBottom: "5px" }} />
                        <div style={{ height: "3px", background: "#ccc", borderRadius: "2px", width: "75%", marginBottom: "8px" }} />
                        <div style={{ height: "1px", background: "#e5e5e5", marginBottom: "6px" }} />
                        <div style={{ height: "2px", background: "#ddd", borderRadius: "2px", marginBottom: "3px" }} />
                        <div style={{ height: "2px", background: "#ddd", borderRadius: "2px", width: "80%", marginBottom: "3px" }} />
                        <div style={{ height: "2px", background: "#eee", borderRadius: "2px", width: "65%" }} />
                      </div>
                    )}
                    {t.id === "classic" && (
                      <div style={{ background: "white", height: "100%", padding: "10px", textAlign: "center" }}>
                        <div style={{ height: "7px", background: "#1a1a2e", borderRadius: "2px", width: "50%", margin: "0 auto 4px" }} />
                        <div style={{ height: "2px", background: "#999", borderRadius: "2px", width: "65%", margin: "0 auto 7px" }} />
                        <div style={{ height: "1px", background: "#1a1a2e", marginBottom: "5px" }} />
                        <div style={{ height: "5px", background: "#1a1a2e", borderRadius: "1px", width: "28%", marginBottom: "4px" }} />
                        <div style={{ height: "2px", background: "#ccc", borderRadius: "2px", marginBottom: "2px" }} />
                        <div style={{ height: "2px", background: "#ddd", borderRadius: "2px", width: "75%" }} />
                      </div>
                    )}
                    {t.id === "creative" && (
                      <div style={{ display: "flex", height: "100%" }}>
                        <div style={{ width: "36%", background: "#00e5ff", padding: "8px 6px" }}>
                          <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(0,0,0,0.2)", marginBottom: "6px" }} />
                          <div style={{ height: "2px", background: "rgba(0,0,0,0.2)", borderRadius: "2px", marginBottom: "3px" }} />
                          <div style={{ height: "2px", background: "rgba(0,0,0,0.15)", borderRadius: "2px", width: "70%" }} />
                        </div>
                        <div style={{ flex: 1, background: "white", padding: "8px 6px" }}>
                          <div style={{ height: "5px", background: "#eee", borderRadius: "2px", width: "70%", marginBottom: "5px" }} />
                          <div style={{ height: "2px", background: "#f0f0f0", borderRadius: "2px", marginBottom: "3px" }} />
                          <div style={{ height: "2px", background: "#f0f0f0", borderRadius: "2px", width: "80%" }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <p style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: template === t.id ? "var(--accent)" : "white",
                    marginBottom: "2px",
                  }}>{t.name}</p>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)" }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                flex: 1,
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-muted)",
                fontFamily: "Syne, sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.04em",
                transition: "all 0.2s",
              }}
            >
              ← Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              style={{
                flex: 2,
                padding: "13px",
                borderRadius: "10px",
                border: "none",
                background: "var(--accent)",
                color: "#080b12",
                fontFamily: "Syne, sans-serif",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                transition: "opacity 0.2s",
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={loading}
              style={{
                flex: 2,
                padding: "13px",
                borderRadius: "10px",
                border: "none",
                background: loading ? "rgba(0,229,255,0.4)" : "var(--accent)",
                color: "#080b12",
                fontFamily: "Syne, sans-serif",
                fontSize: "13px",
                fontWeight: 800,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {loading ? "Generating..." : "Generate CV →"}
            </button>
          )}
        </div>

      </div>
    </main>
  );
}