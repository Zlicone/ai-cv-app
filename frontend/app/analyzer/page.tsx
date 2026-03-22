"use client";

import { useState } from "react";

export default function Analyzer() {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!cvText.trim()) { alert("Please paste your CV text first!"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze-cv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv_text: cvText, job_description: jobDescription }),
      });
      const data = await res.json();
      setAnalysis(data.analysis);
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
      marginBottom: "14px",
    }}>{text}</p>
  );

  return (
    <main style={{ padding: "40px 24px", minHeight: "calc(100vh - 60px)" }}>
      <div style={{ maxWidth: "580px", margin: "0 auto" }}>

        <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "6px" }}>
          AI-powered feedback
        </p>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "30px", letterSpacing: "-0.02em", marginBottom: "32px", color: "white" }}>
          Analyze CV
        </h1>

        {card(
          <>
            {sectionLabel("Your CV text *")}
            <textarea
              value={cvText}
              onChange={e => setCvText(e.target.value)}
              placeholder="Paste your CV text here..."
              rows={10}
            />
          </>
        )}

        {card(
          <>
            {sectionLabel("Job description (optional)")}
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px", lineHeight: 1.6 }}>
              Paste the job posting and AI will tailor the analysis to that specific role.
            </p>
            <textarea
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder="Junior Frontend Developer at XYZ — looking for a candidate with 1+ years of experience..."
              rows={4}
            />
          </>,
          "24px"
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
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
            marginBottom: "32px",
          }}
        >
          {loading ? "Analyzing..." : "Analyze CV →"}
        </button>

        {analysis && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)" }} />
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "13px", color: "var(--accent)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                AI Feedback
              </p>
            </div>
            {card(
              <pre style={{
                whiteSpace: "pre-wrap",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "14px",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.75)",
              }}>{analysis}</pre>,
              "12px"
            )}
            <button
              onClick={() => { setAnalysis(""); setCvText(""); setJobDescription(""); }}
              style={{
                width: "100%",
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
              }}
            >
              Start over
            </button>
          </div>
        )}

      </div>
    </main>
  );
}