// src/App.jsx
import React, { useMemo, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import TopActions from "./components/TopActions";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Highlights from "./components/Highlights";

// --- Textos ES/EN ---
const es = {
  role: "Desarrollador Web / Estudiante",
  about:
    "Full-stack junior con foco en front-end moderno. Me muevo cómodo con React, Vite, Tailwind y Firebase/Mongo. Fan de las UIs limpias y que cargan en un suspiro.",
  ctaContact: "Contactar",
  ctaDownload: "Descargar JSON",
  ctaPrint: "Imprimir PDF",
  ctaShare: "Compartir",
  ctaLang: "ES",
  skills: "Habilidades",
  projects: "Proyectos Destacados",
  experience: "Experiencia",
  education: "Educación",
  contact: "Contacto",
  years: "años",
};

const en = {
  role: "Web Developer / Student",
  about:
    "Junior full-stack focused on modern front-end. Comfortable with React, Vite, Tailwind and Firebase/Mongo. I love clean UIs that load fast.",
  ctaContact: "Contact",
  ctaDownload: "Download JSON",
  ctaPrint: "Print PDF",
  ctaShare: "Share",
  ctaLang: "EN",
  skills: "Skills",
  projects: "Featured Projects",
  experience: "Experience",
  education: "Education",
  contact: "Contact",
  years: "yrs",
};

// --- Datos iniciales (editalos) ---
const initialData = {
  name: "Gonzalo",
  headline: "Construyo interfaces rápidas y con estilo.",
  location: "La Rioja, AR",
  email: "gonzalo@example.com",
  phone: "+54 380 123 4567",
  site: "https://tu-portfolio.dev",
  socials: [
    { label: "GitHub", href: "https://github.com/tuusuario", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com/in/tuusuario", icon: Linkedin },
  ],
  skills: [
    { name: "React (Vite)", level: 85 },
    { name: "Tailwind CSS", level: 90 },
    { name: "JavaScript/TypeScript", level: 80 },
    { name: "Node.js", level: 70 },
    { name: "Firebase/Mongo", level: 70 },
    { name: "Git & Vercel", level: 75 },
  ],
  projects: [
    {
      title: "Rapitaxi — MVP ride-hailing",
      description:
        "Prototipo tipo Uber con flujo A→B, cálculo de tarifa, asignación de conductor y soporte desde central.",
      tags: ["React", "Tailwind", "Firebase"],
      link: "https://rapitaxi.example.com",
    },
    {
      title: "POS Carnicería — Panel de ventas",
      description:
        "Panel para gestión de productos, ventas y caja diaria. Firestore + Realtime DB sin conflictos.",
      tags: ["React", "Vite", "Firestore", "RTDB"],
      link: "https://carniceria-panel.example.com",
    },
    {
      title: "Barber Turnos — Agenda online",
      description:
        "Sistema de turnos con recordatorios, escáner QR y dashboard. Desplegado en Vercel.",
      tags: ["React", "Tailwind", "Vercel"],
      link: "https://barber-turnos.example.com",
    },
  ],
  experience: [
    {
      company: "Telecom — Auditorías FTTH/HFC",
      role: "Técnico / Auditor NAPs",
      start: "2024",
      end: "Actualidad",
      summary:
        "Optimización de procesos con apps internas (QR, escaneo, etiquetado). Mejora de tiempos y trazabilidad.",
    },
    {
      company: "Proyectos académicos",
      role: "Full-Stack Jr",
      start: "2023",
      end: "2024",
      summary:
        "CRUDs con Mongo/Mongoose, APIs Express y front con React + Tailwind. Deploys en Vercel/Render.",
    },
  ],
  education: [
    {
      place: "Universidad — Programación / Redes",
      degree: "Estudiante",
      start: "2023",
      end: "Actualidad",
    },
  ],
  highlights: [
    { label: "Proyectos", value: 12 },
    { label: "Repos", value: 25 },
    { label: "Clientes/Usuarios", value: 8 },
  ],
};

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("es");
  const [fancy, setFancy] = useState(true);
  const t = lang === "es" ? es : en;
  const data = useMemo(() => initialData, []);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <main className="min-h-dvh print:bg-white bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.15),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.25),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.25),transparent_50%)] transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 text-black dark:text-white">
          <TopActions
            theme={theme}
            setTheme={setTheme}
            lang={lang}
            setLang={setLang}
            fancy={fancy}
            setFancy={setFancy}
            t={t}
          />

          <div className="grid gap-4 sm:gap-6">
            <Hero data={data} t={t} fancy={fancy} />
            <Highlights data={data} />
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <Skills data={data} t={t} fancy={fancy} />
              <Projects data={data} t={t} />
            </div>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <Experience data={data} t={t} />
              <Education data={data} t={t} />
            </div>
            <Contact data={data} t={t} />
          </div>

          {/* Print-only simple A4 */}
          <section className="hidden print:block mt-6 text-black">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <div className="text-sm opacity-80">
              {t.role} · {data.location} · {data.email} · {data.phone}
            </div>
            <hr className="my-3" />
            <h2 className="text-sm font-semibold uppercase">Resumen</h2>
            <p className="text-sm mt-1">{t.about}</p>
            <h2 className="text-sm font-semibold uppercase mt-3">{t.skills}</h2>
            <ul className="text-sm list-disc ml-5">
              {data.skills.map((s) => (
                <li key={s.name}>
                  {s.name} — {s.level}%
                </li>
              ))}
            </ul>
            <h2 className="text-sm font-semibold uppercase mt-3">{t.experience}</h2>
            <ul className="text-sm list-disc ml-5">
              {data.experience.map((e, i) => (
                <li key={i}>
                  {e.role} · {e.company} ({e.start}–{e.end}) — {e.summary}
                </li>
              ))}
            </ul>
            <h2 className="text-sm font-semibold uppercase mt-3">{t.education}</h2>
            <ul className="text-sm list-disc ml-5">
              {data.education.map((ed, i) => (
                <li key={i}>
                  {ed.degree} · {ed.place} ({ed.start}–{ed.end})
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
