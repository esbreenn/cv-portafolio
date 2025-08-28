import { Languages, Moon, Sun, Printer, Rocket } from "lucide-react";

export default function TopActions({ theme, setTheme, lang, setLang, fancy, setFancy, t }) {
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
