import { Star } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function Education({ data, t }) {
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
