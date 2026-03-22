from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Model koji definira što frontend šalje
class CVData(BaseModel):
    full_name: str
    email: str
    phone: str
    location: str
    summary: str
    experience: str
    education: str
    skills: str
    language: str="english"

@app.get("/")
def root():
    return {"status": "AI CV API radi!"}

@app.post("/generate-cv")
def generate_cv(data: CVData):
    prompt = f"""
    Na temelju ovih podataka napiši profesionalni CV na {"engleskom" if data.language == "english" else "hrvatskom"} jeziku.
    Formatiraj ga jasno s odjeljcima: Summary, Experience, Education, Skills.
    VAŽNO: Ne koristi markdown formatiranje. Bez **, ##, *, ili bilo kakvih simbola. Samo čisti tekst.

    Ime: {data.full_name}
    Email: {data.email}
    Telefon: {data.phone}
    Lokacija: {data.location}
    Kratki opis: {data.summary}
    Radno iskustvo: {data.experience}
    Obrazovanje: {data.education}
    Vještine: {data.skills}

    Napiši profesionalni, impresivni CV koji ističe kandidatove kvalitete. Bez markdown formatiranja.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Ti si expert za pisanje profesionalnih CV-a."},
            {"role": "user", "content": prompt}
        ]
    )

    cv_text = response.choices[0].message.content

    return {"cv": cv_text}


class CVAnalysis(BaseModel):
    cv_text: str
    job_description: str = ""  # opcionalno - opis posla za koji se prijavljuje

@app.post("/analyze-cv")
def analyze_cv(data: CVAnalysis):
    job_context = ""
    if data.job_description:
        job_context = f"\nKorisnik se prijavljuje za: {data.job_description}\nAnaliziraj CV u kontekstu tog posla."

    prompt = f"""
    Analiziraj ovaj CV i daj detaljan feedback.
    
    CV:
    {data.cv_text}
    {job_context}
    
    Daj feedback u ovom formatu:
    
    OCJENA: (broj od 1-10)
    
    SNAGE:
    - (navedi 3-5 jakih strana)
    
    SLABOSTI:
    - (navedi 3-5 stvari koje treba poboljšati)
    
    KONKRETNI PRIJEDLOZI:
    - (navedi 3-5 konkretnih izmjena)
    
    ZAKLJUČAK:
    (kratki zaključak u 2-3 rečenice)
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Ti si expert HR konzultant s 10 godina iskustva u procjeni CV-a."},
            {"role": "user", "content": prompt}
        ]
    )

    analysis = response.choices[0].message.content

    return {"analysis": analysis}