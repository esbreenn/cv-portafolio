import { motion as Motion } from "framer-motion";

export default function Highlights({ data }) {
  return (
    <section className="rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white">
      <div className="grid sm:grid-cols-3 gap-4">
        {data.highlights.map((h, i) => (
          <Motion.div
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 140, damping: 14 }}
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/60 dark:bg-white/5 text-center"
          >
            <div className="text-3xl font-bold tracking-tight">{h.value}</div>
            <div className="text-xs opacity-70 mt-1">{h.label}</div>
          </Motion.div>
        ))}
      </div>
    </section>
  );
}
