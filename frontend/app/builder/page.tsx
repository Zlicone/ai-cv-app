"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Builder() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
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
    } catch (error) {
      alert("Greška pri generiranju CV-a. Provjeri je li backend pokrenut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Generiraj CV</h1>
        <p className="text-gray-400">Ispuni podatke i AI će generirati profesionalni CV.</p>

        <div className="space-y-4">
          {/* Osnovni podaci */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Ime i prezime</label>
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Ivan Horvat"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ivan@email.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Telefon</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+385 91 234 5678"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Lokacija</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Zagreb, Croatia"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Textarea polja */}
          {[
            { name: "summary", label: "Kratki opis (tko si, što tražiš)", placeholder: "Student informatike s iskustvom u web razvoju..." },
            { name: "experience", label: "Radno iskustvo", placeholder: "2023 - danas: Stažist u tvrtki XYZ, radio na React aplikacijama..." },
            { name: "education", label: "Obrazovanje", placeholder: "2021 - danas: Fakultet informatike, Zagreb" },
            { name: "skills", label: "Vještine", placeholder: "Python, JavaScript, React, Git, SQL..." },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm text-gray-400 mb-1">{field.label}</label>
              <textarea
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.placeholder}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? "Generiranje..." : "Generiraj CV"}
        </button>
      </div>
    </main>
  );
}