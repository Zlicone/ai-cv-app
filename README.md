# AI CV Builder

A full-stack AI-powered CV generator and analyzer built with Next.js and FastAPI.

🔗 **Live demo:** [your-app.vercel.app](https://your-app.vercel.app)

## Features

- **CV Generator** — fill in your details and AI crafts a professional CV
- **CV Analyzer** — paste your CV and get instant feedback with a score
- **3 Templates** — Minimal, Classic, Creative
- **Language support** — generate in English or Croatian
- **PDF export** — clean print output, no UI chrome

## Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

**Backend**
- FastAPI (Python)
- OpenAI API (GPT-4o mini)

## Running locally

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Add your OpenAI API key to `backend/.env`:
```
OPENAI_API_KEY=your_key_here
```