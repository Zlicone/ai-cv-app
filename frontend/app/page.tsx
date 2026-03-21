import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-5xl font-bold text-white">
          AI CV Builder
        </h1>
        <p className="text-gray-400 text-lg">
          Generiraj profesionalni CV ili analiziraj postojeći pomoću umjetne inteligencije.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/builder"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Generiraj CV
          </Link>
          <Link
            href="/analyzer"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Analiziraj CV
          </Link>
        </div>
      </div>
    </main>
  );
}