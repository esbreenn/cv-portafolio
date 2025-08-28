import { motion as Motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import SectionTitle from "./SectionTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Projects({ data, t }) {
  return (
    <section className="rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white">
      <SectionTitle icon={ChevronRight}>{t.projects}</SectionTitle>
      <div className="mt-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {data.projects.map((p, i) => (
          <Motion.a
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
          </Motion.a>
        ))}
      </div>
    </section>
  );
}
