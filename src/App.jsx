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
import es from "./locales/es.json";
import en from "./locales/en.json";
import profile from "./data/profile.json";
const ICONS = { Github, Linkedin };

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("es");
  const [fancy, setFancy] = useState(true);
  const t = lang === "es" ? es : en;
  const data = useMemo(
    () => ({
      ...profile,
      socials: profile.socials.map((s) => ({ ...s, icon: ICONS[s.icon] })),
    }),
    []
  );

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
