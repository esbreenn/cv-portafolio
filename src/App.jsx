// src/App.jsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Languages,
  Moon,
  Sun,
  Printer,
  Github,
  Linkedin,
  Phone,
  MapPin,
  Link as LinkIcon,
  Rocket,
  Star,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

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

// --- Animaciones ---
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// --- UI helpers ---
function LevelBar({ level, fancy }) {
  return (
    <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{
          type: fancy ? "spring" : "tween",
          stiffness: 120,
          damping: 18,
          duration: fancy ? 0.6 : 0.4,
        }}
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500"
      />
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-black/5 dark:bg-white/10">
      {children}
    </span>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4" />
      <h2 className="text-sm tracking-wide font-semibold uppercase opacity-80">{children}</h2>
    </div>
  );
}

function TopActions({ theme, setTheme, lang, setLang, fancy, setFancy, t }) {
  return (
    <div className="print:hidden sticky top-3 z-50 flex items-center gap-2 self-end">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-xl border border-black/10 dark:border-white/10 backdrop-blur px-3 py-2 text-sm flex items-center gap-2 shadow-sm hover:shadow transition bg-white/70 dark:bg-black/40"
        aria-label="Theme toggle"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
      </button>
      <button
        onClick={() => setFancy(!fancy)}
        className="rounded-xl border border-black/10 dark:border-white/10 backdrop-blur px-3 py-2 text-sm flex items-center gap-2 shadow-sm hover:shadow transition bg-white/70 dark:bg-black/40"
      >
        <Rocket className="w-4 h-4" />
        <span className="hidden sm:inline">{fancy ? "Fancy" : "Minimal"}</span>
      </button>
      <button
        onClick={() => setLang(lang === "es" ? "en" : "es")}
        className="rounded-xl border border-black/10 dark:border-white/10 backdrop-blur px-3 py-2 text-sm flex items-center gap-2 shadow-sm hover:shadow transition bg-white/70 dark:bg-black/40"
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">{t.ctaLang}</span>
      </button>
      <button
        onClick={() => window.print()}
        className="rounded-xl border border-black/10 dark:border-white/10 backdrop-blur px-3 py-2 text-sm flex items-center gap-2 shadow-sm hover:shadow transition bg-white/70 dark:bg-black/40"
      >
        <Printer className="w-4 h-4" />
        <span className="hidden sm:inline">{t.ctaPrint}</span>
      </button>
    </div>
  );
}

function Hero({ data, t, fancy }) {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white"
    >
      <AnimatePresence>
        {fancy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-fuchsia-400" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-indigo-400" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white grid place-items-center text-2xl font-bold">
          {data.name?.[0] || "G"}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {data.name || "Tu Nombre"}
          </h1>
          <p className="text-sm opacity-80 mt-1">{t.role}</p>
          <p className="text-sm opacity-80 mt-2 max-w-prose">{t.about}</p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <Pill>
          <MapPin className="w-3 h-3" /> {data.location}
        </Pill>
        <Pill>
          <Mail className="w-3 h-3" /> {data.email}
        </Pill>
        <Pill>
          <Phone className="w-3 h-3" /> {data.phone}
        </Pill>
        {data.site && (
          <Pill>
            <LinkIcon className="w-3 h-3" /> {new URL(data.site).host}
          </Pill>
        )}
        {data.socials?.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="no-underline"
            aria-label={s.label}
          >
            <Pill>
              <s.icon className="w-3 h-3" /> {s.label}
            </Pill>
          </a>
        ))}
      </motion.div>
    </motion.header>
  );
}

function Skills({ data, t, fancy }) {
  return (
    <section className="rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white">
      <SectionTitle icon={Star}>{t.skills}</SectionTitle>
      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        {data.skills.map((s, i) => (
          <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center justify-between text-sm font-medium">
              <span>{s.name}</span>
              <span className="opacity-70">{s.level}%</span>
            </div>
            <LevelBar level={s.level} fancy={fancy} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Projects({ data, t }) {
  return (
    <section className="rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white">
      <SectionTitle icon={ChevronRight}>{t.projects}</SectionTitle>
      <div className="mt-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {data.projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group rounded-2xl border border-black/10 dark:border-white/10 p-4 no-underline bg-white/60 dark:bg-white/5 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold tracking-tight">{p.title}</h3>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="text-sm opacity-80 mt-2 min-h-[48px]">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function Experience({ data, t }) {
  return (
    <section className="rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white">
      <SectionTitle icon={Rocket}>{t.experience}</SectionTitle>
      <div className="mt-4 space-y-6">
        {data.experience.map((e, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative pl-5"
          >
            <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{e.role}</span>
              <span className="opacity-70">· {e.company}</span>
              <span className="ml-auto opacity-70">
                {e.start} – {e.end}
              </span>
            </div>
            <p className="text-sm opacity-80 mt-1">{e.summary}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Education({ data, t }) {
  return (
    <section className="rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white">
      <SectionTitle icon={Star}>{t.education}</SectionTitle>
      <div className="mt-3 space-y-3">
        {data.education.map((ed, i) => (
          <div key={i} className="text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">{ed.degree}</span>
              <span className="opacity-70">· {ed.place}</span>
              <span className="ml-auto opacity-70">
                {ed.start} – {ed.end}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({ data, t }) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      alert("Email copiado ✔");
    } catch {}
  };
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: data.name, text: data.headline, url: data.site });
      } else {
        await navigator.clipboard.writeText(data.site);
        alert("Link copiado ✔");
      }
    } catch {}
  };
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(initialData, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cv.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <section className="rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white">
      <SectionTitle icon={Mail}>{t.contact}</SectionTitle>
      <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
        <button onClick={copyEmail} className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-left hover:shadow">
          <div className="font-semibold">{data.email}</div>
          <div className="opacity-70">{t.ctaContact}</div>
        </button>
        <button onClick={() => window.print()} className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-left hover:shadow">
          <div className="font-semibold">PDF</div>
          <div className="opacity-70">{t.ctaPrint}</div>
        </button>
        <button onClick={downloadJSON} className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-left hover:shadow">
          <div className="font-semibold">JSON</div>
          <div className="opacity-70">{t.ctaDownload}</div>
        </button>
        <button onClick={share} className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-left hover:shadow sm:col-span-3">
          <div className="font-semibold">{data.site}</div>
          <div className="opacity-70">Share / Copiar link</div>
        </button>
      </div>
    </section>
  );
}

function Highlights({ data }) {
  return (
    <section className="rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white">
      <div className="grid sm:grid-cols-3 gap-4">
        {data.highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 140, damping: 14 }}
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/60 dark:bg-white/5 text-center"
          >
            <div className="text-3xl font-bold tracking-tight">{h.value}</div>
            <div className="text-xs opacity-70 mt-1">{h.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

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
