"use client";

import { useState } from "react";

export default function Analyzer() {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!cvText.trim()) {
      alert("Molim upiši tekst CV-a!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze-cv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cv_text: cvText,
          job_description: jobDescription,
        }),
      });

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      alert("Greška pri analizi. Provjeri je li backend pokrenut.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCvText("");
    setJobDescription("");
    setAnalysis("");
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Analiziraj CV</h1>
          <p className="text-gray-400 mt-1">
            Zalijepi tekst svog CV-a i dobij detaljan AI feedback.
          </p>
        </div>

        {/* CV input */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Tekst CV-a *
          </label>
          <textarea
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            placeholder="Zalijepi ovdje tekst svog CV-a..."
            rows={10}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        {/* Job description input */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Opis posla (opcionalno)
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Zalijepi oglas za posao za koji se prijavljuješ — AI će analizirati koliko tvoj CV odgovara..."
            rows={4}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        {/* Gumbi */}
        <div className="flex gap-4">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? "Analiziranje..." : "Analiziraj CV"}
          </button>
          {analysis && (
            <button
              onClick={handleClear}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Očisti
            </button>
          )}
        </div>

        {/* Rezultat analize */}
        {analysis && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-blue-400">AI Feedback</h2>
            <pre className="whitespace-pre-wrap text-gray-200 text-sm leading-relaxed font-sans">
              {analysis}
            </pre>
          </div>
        )}

      </div>
    </main>
  );
}