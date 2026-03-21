"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Result() {
  const router = useRouter();
  const [cv, setCv] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("generatedCV");
    if (!saved) {
      router.push("/builder");
    } else {
      setCv(saved);
    }
  }, [router]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cv);
    alert("CV kopiran u clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Tvoj CV</h1>
          <button
            onClick={() => router.push("/builder")}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Natrag na formu
          </button>
        </div>

        {/* CV sadržaj */}
        <div className="bg-white text-gray-900 rounded-lg p-8 shadow-lg print:shadow-none">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {cv}
          </pre>
        </div>

        {/* Gumbi */}
        <div className="flex gap-4 print:hidden">
          <button
            onClick={handleCopy}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Kopiraj tekst
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Spremi kao PDF
          </button>
        </div>

        {/* Print uputa */}
        <p className="text-gray-500 text-sm text-center print:hidden">
          Za PDF: klikni "Spremi kao PDF" → u print dijalogu odaberi "Save as PDF"
        </p>

      </div>
    </main>
  );
}