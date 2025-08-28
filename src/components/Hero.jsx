import { motion as Motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Link as LinkIcon } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-black/5 dark:bg-white/10">
      {children}
    </span>
  );
}

export default function Hero({ data, t, fancy }) {
  return (
    <Motion.header
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur print:bg-white print:dark:bg-white"
    >
      <AnimatePresence>
        {fancy && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-fuchsia-400" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-indigo-400" />
          </Motion.div>
        )}
      </AnimatePresence>

      <Motion.div variants={fadeUp} className="flex items-center gap-4">
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
      </Motion.div>

      <Motion.div variants={fadeUp} className="mt-4 flex flex-wrap items-center gap-2 text-sm">
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
      </Motion.div>
    </Motion.header>
  );
}
