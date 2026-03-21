"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const fields = [
  { name: "summary", label: "Professional Summary", placeholder: "Computer science student with experience in web development...", rows: 3 },
  { name: "experience", label: "Work Experience", placeholder: "2023 – present: Intern at XYZ, built React applications...", rows: 4 },
  { name: "education", label: "Education", placeholder: "2021 – present: Faculty of Informatics, Zagreb", rows: 2 },
  { name: "skills", label: "Skills", placeholder: "Python, JavaScript, React, Git, SQL...", rows: 2 },
];

export default function Builder() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "", email: "", phone: "", location: "",
    summary: "", experience: "", education: "", skills: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-cv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      localStorage.setItem("generatedCV", data.cv);
      router.push("/result");
    } catch {
      alert("Error connecting to backend. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <div className="glow" style={{ top: "-100px", right: "-200px" }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "36px", marginBottom: "8px" }}>
            Generate CV
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
            Fill in your details and AI will craft a professional CV.
          </p>
        </div>

        <div className="card" style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: "20px", textTransform: "uppercase" }}>
            Personal Info
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { name: "full_name", label: "Full Name", placeholder: "Ivan Horvat" },
              { name: "email", label: "Email", placeholder: "ivan@email.com" },
              { name: "phone", label: "Phone", placeholder: "+385 91 234 5678" },
              { name: "location", label: "Location", placeholder: "Zagreb, Croatia" },
            ].map((f) => (
              <div key={f.name}>
                <label className="label">{f.label}</label>
                <input
                  name={f.name}
                  value={formData[f.name as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  className="input"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: "20px", textTransform: "uppercase" }}>
            Professional Details
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {fields.map((f) => (
              <div key={f.name}>
                <label className="label">{f.label}</label>
                <textarea
                  name={f.name}
                  value={formData[f.name as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  rows={f.rows}
                  className="input"
                  style={{ resize: "none" }}
                />
              </div>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Generating your CV..." : "Generate CV →"}
        </button>

      </div>
    </main>
  );
}