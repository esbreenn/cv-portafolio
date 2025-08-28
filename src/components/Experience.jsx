import { motion as Motion } from "framer-motion";
import { Rocket } from "lucide-react";
import SectionTitle from "./SectionTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Experience({ data, t }) {
  return (
    <section className="rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white">
      <SectionTitle icon={Rocket}>{t.experience}</SectionTitle>
      <div className="mt-4 space-y-6">
        {data.experience.map((e, i) => (
          <Motion.div
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
          </Motion.div>
        ))}
      </div>
    </section>
  );
}
