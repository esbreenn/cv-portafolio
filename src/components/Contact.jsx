import { Mail } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function Contact({ data, t }) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      alert("Email copiado ✔");
    } catch {
      // ignore
    }
  };
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: data.name, text: data.headline, url: data.site });
      } else {
        await navigator.clipboard.writeText(data.site);
        alert("Link copiado ✔");
      }
    } catch {
      // ignore
    }
  };
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
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
