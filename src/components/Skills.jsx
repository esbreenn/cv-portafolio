import { motion as Motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionTitle from "./SectionTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function LevelBar({ level, fancy }) {
  return (
    <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
      <Motion.div
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

export default function Skills({ data, t, fancy }) {
  return (
    <section className="rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white">
      <SectionTitle icon={Star}>{t.skills}</SectionTitle>
      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        {data.skills.map((s, i) => (
          <Motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center justify-between text-sm font-medium">
              <span>{s.name}</span>
              <span className="opacity-70">{s.level}%</span>
            </div>
            <LevelBar level={s.level} fancy={fancy} />
          </Motion.div>
        ))}
      </div>
    </section>
  );
}
