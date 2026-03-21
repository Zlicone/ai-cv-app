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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze-cv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv_text: cvText, job_description: jobDescription }),
      });
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch {
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <div className="glow" style={{ bottom: "-200px", right: "-200px" }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "36px", marginBottom: "8px" }}>
            Analyze CV
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
            Paste your CV and get instant AI-powered feedback.
          </p>
        </div>

        <div className="card" style={{ marginBottom: "16px" }}>
          <label className="label">Your CV text *</label>
          <textarea
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            placeholder="Paste your CV text here..."
            rows={10}
            className="input"
            style={{ resize: "none" }}
          />
        </div>

        <div className="card" style={{ marginBottom: "24px" }}>
          <label className="label">Job description (optional)</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job posting here — AI will tailor the analysis to this specific role..."
            rows={4}
            className="input"
            style={{ resize: "none" }}
          />
        </div>

        <button className="btn-primary" onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze CV →"}
        </button>

        {/* Results */}
        {analysis && (
          <div style={{ marginTop: "32px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px",
            }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)" }} />
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "18px", color: "var(--accent)" }}>
                AI Feedback
              </h2>
            </div>
            <div className="card">
              <pre style={{
                whiteSpace: "pre-wrap",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "14px",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.8)",
              }}>
                {analysis}
              </pre>
            </div>
            <button
              className="btn-secondary"
              onClick={() => { setAnalysis(""); setCvText(""); setJobDescription(""); }}
              style={{ marginTop: "12px" }}
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </main>
  );
}