import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars -- used as <motion.div> in JSX
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "./data/project";

// ─────────────────────────────────────────────────────────────
//  YOUR DETAILS — edit these and the whole site updates.
// ─────────────────────────────────────────────────────────────
const PROFILE = {
  name: "Obire John",
  brand: "ObiresOffice",
  role: "Frontend & Web Developer",
  location: "Warri, Nigeria",
  phone: "+234 807 841 7869",
  cv: "/cv/Obire-John-Frontend-Developer-CV.pdf",
  email: "obiresoffice@gmail.com",
  whatsapp: "https://wa.me/2348078417869",
  github: "https://github.com/Dejohnstc", // leave empty "" to hide
  linkedin: "https://www.linkedin.com/in/john-obire-a28657221", // leave empty "" to hide
  bio: [
    "I'm Obire John, a frontend web developer who started out as an engineer. I trained in Mechanical Engineering at the Petroleum Training Institute and began my career maintaining 100MW gas turbines at Transcorp Power — work where you learn to break complex systems into parts, respect real constraints, and keep testing until everything runs exactly as it should.",
    "Today I bring that same discipline to the web. I build responsive, high-performance websites and web applications with Next.js, React and TypeScript — interfaces that are clean to look at, simple to use, and solid under the hood.",
    "I work with businesses and individuals who want more than a template: a site that loads fast, works on every device, and helps them win customers. From landing pages and restaurant sites to dashboards and full product interfaces, I take projects from first idea to launch.",
  ],
  facts: [
    ["Education", "HND, Mechanical Engineering — Petroleum Training Institute"],
    ["Training", "Front-End Web Development — KwaraTech Academy"],
    ["Focus", "Frontend · Next.js · React · TypeScript"],
    ["Approach", "Plan, build, test, ship"],
  ],
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Framer Motion",
    "Vite",
    "HTML & CSS",
    "Responsive design",
    "Git & GitHub",
    "Vercel",
  ],
};

// ─────────────────────────────────────────────────────────────
//  TESTIMONIALS — reviews submitted on the site are stored in MongoDB and
//  approved at /admin. You can also hard-code extra reviews here. Example:
//  { quote: "Obire delivered our site in a week…", name: "Ada N.", role: "Owner, Smokehouse", rating: 5 },
// ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [];

const SERVICES = [
  {
    title: "Websites for businesses",
    text: "Landing pages and company sites built to turn visitors into enquiries and customers.",
    icon: "◎",
  },
  {
    title: "Web apps & dashboards",
    text: "Interfaces with sign-in, dashboards and data — clean, fast and easy to use.",
    icon: "▦",
  },
  {
    title: "Speed & mobile fixes",
    text: "Make an existing site faster, sharper and fully responsive on every screen.",
    icon: "⚡",
  },
];

const PROCESS = [
  ["01", "Discover", "We talk through your goals, audience and must-haves, and agree on scope and timeline."],
  ["02", "Design", "I map out the pages and layout so you can see the direction before any code is written."],
  ["03", "Build", "I develop the site in React — fast, responsive and tested on real phones and browsers."],
  ["04", "Launch & support", "I deploy it, connect your domain, and stay available for updates and fixes."],
];

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function SocialLinks({ className = "" }) {
  const items = [
    ["GitHub", PROFILE.github, GitHubIcon],
    ["LinkedIn", PROFILE.linkedin, LinkedInIcon],
  ].filter(([, url]) => url);
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {// eslint-disable-next-line no-unused-vars -- Icon is rendered as a component
      items.map(([label, url, Icon]) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-11 h-11 grid place-items-center rounded-full border border-ink/15 dark:border-white/15 hover:border-amber-400 hover:text-amber-500 transition"
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : true;
    } catch {
      return true;
    }
  });
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }, [dark]);

  const visible = projects.filter((p) => p.show);

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper font-body antialiased selection:bg-amber-300 selection:text-ink">
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero count={visible.length} />
        <Projects items={visible} onOpen={setActive} />
        <Services />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────── Navbar ───────────────────────────── */

function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Work", "#projects"],
    ["Services", "#services"],
    ["Process", "#process"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 dark:border-white/10 bg-paper/80 dark:bg-ink/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 md:px-8 h-16">
        <a href="#top" aria-label="ObiresOffice home">
          <Logo />
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-ink/70 dark:text-paper/70 hover:text-amber-500 transition">
              {label}
            </a>
          ))}
          <a href={PROFILE.cv} download className="text-ink/70 dark:text-paper/70 hover:text-amber-500 transition">
            CV ↓
          </a>
          <ThemeToggle dark={dark} setDark={setDark} />
          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-ink text-paper dark:bg-paper dark:text-ink font-medium hover:opacity-90 transition"
          >
            Hire me
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle dark={dark} setDark={setDark} />
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="w-10 h-10 grid place-items-center rounded-lg border border-ink/15 dark:border-white/15"
          >
            <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-ink/10 dark:border-white/10"
          >
            <div className="flex flex-col px-5 py-4 gap-1">
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-lg font-display border-b border-ink/5 dark:border-white/5"
                >
                  {label}
                </a>
              ))}
              <a href={PROFILE.cv} download className="py-3 text-lg font-display text-amber-500">
                Download CV ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Logo({ className = "" }) {
  return (
    <span className={`font-display font-bold text-xl tracking-[-0.04em] leading-none ${className}`}>
      Obires<span className="text-amber-500">Office</span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 ml-0.5 align-baseline" />
    </span>
  );
}

function ThemeToggle({ dark, setDark }) {
  return (
    <button
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setDark(!dark)}
      className="w-10 h-10 grid place-items-center rounded-lg border border-ink/15 dark:border-white/15 hover:bg-ink/5 dark:hover:bg-white/10 transition"
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero({ count }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[34rem] h-[34rem] rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute top-60 -left-40 w-[28rem] h-[28rem] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-0 grid-bg opacity-[0.35] dark:opacity-[0.25]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-20 pb-24 md:pt-32 md:pb-36">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
          <motion.p
            variants={fade}
            className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-ink/15 dark:border-white/15 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for new projects
          </motion.p>

          <motion.h1
            variants={fade}
            className="font-display font-bold tracking-tight text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl max-w-4xl"
          >
            Hi, I'm {PROFILE.name.split(" ")[0]}. I build websites that{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">work hard</span>
              <span className="absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-5 bg-amber-400/70 -z-0 rounded" />
            </span>{" "}
            for your business.
          </motion.h1>

          <motion.p variants={fade} className="mt-8 text-lg md:text-xl text-ink/65 dark:text-paper/65 max-w-2xl">
            {PROFILE.role} with a mechanical engineering background, based in {PROFILE.location}. I design and
            build fast, mobile-first websites and web apps — engineered to perform.
          </motion.p>

          <motion.div variants={fade} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full bg-amber-400 text-ink font-semibold hover:bg-amber-300 transition shadow-lg shadow-amber-500/20"
            >
              See my work ↓
            </a>
            <a
              href={PROFILE.cv}
              download
              className="px-6 py-3.5 rounded-full border border-ink/20 dark:border-white/20 font-semibold hover:bg-ink/5 dark:hover:bg-white/10 transition"
            >
              Download CV
            </a>
            <SocialLinks />
          </motion.div>

          <motion.dl variants={fade} className="mt-16 grid grid-cols-3 max-w-lg gap-6">
            {[
              [`${count}+`, "Live projects"],
              ["100%", "Mobile-ready"],
              ["24h", "Reply time"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-bold">{n}</dt>
                <dd className="text-sm text-ink/55 dark:text-paper/55 mt-1">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Projects ───────────────────────────── */

function SectionHead({ eyebrow, title, children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fade}
      className="mb-12 md:mb-16"
    >
      <p className="text-sm font-semibold tracking-widest uppercase text-amber-500 mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
      {children && <p className="mt-4 text-ink/60 dark:text-paper/60 max-w-xl text-lg">{children}</p>}
    </motion.div>
  );
}

function Projects({ items, onOpen }) {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-5 md:px-8 py-24">
      <SectionHead eyebrow="Selected work" title="Projects I've built">
        Live sites you can click through. Tap any card for details.
      </SectionHead>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function Cover({ p, large }) {
  if (p.images?.length) {
    return (
      <img
        src={p.images[0]}
        alt={`${p.title} screenshot`}
        loading="lazy"
        className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition duration-500"
      />
    );
  }
  return (
    <div className={`w-full h-full bg-gradient-to-br ${p.accent} relative overflow-hidden`}>
      <div className="absolute inset-0 grid-bg-light opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center px-6 pt-7 text-center">
        <span
          className={`font-display font-bold text-white/90 tracking-tight leading-[1.05] group-hover:scale-105 transition duration-500 ${
            large ? "text-4xl sm:text-5xl md:text-7xl" : "text-3xl md:text-4xl"
          }`}
        >
          {p.title}
        </span>
      </div>
      {/* faux browser bar */}
      <div className="absolute top-0 inset-x-0 h-7 bg-black/20 flex items-center gap-1.5 px-3">
        <span className="w-2.5 h-2.5 rounded-full bg-white/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/35" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="ml-3 text-[10px] text-white/70 truncate">{p.link.replace(/^https?:\/\//, "")}</span>
      </div>
    </div>
  );
}

function ProjectCard({ p, i, onOpen }) {
  const large = p.featured;
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fade}
      transition={{ delay: (i % 2) * 0.08 }}
      className={`group rounded-3xl overflow-hidden border border-ink/10 dark:border-white/10 bg-white dark:bg-ink-2 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink/10 dark:hover:shadow-black/40 transition duration-300 ${
        large ? "md:col-span-2" : ""
      }`}
    >
      <button onClick={() => onOpen(p)} className="block w-full text-left" aria-label={`Details for ${p.title}`}>
        <div className={`${large ? "aspect-[16/8]" : "aspect-[16/10]"} overflow-hidden`}>
          <Cover p={p} large={large} />
        </div>
      </button>

      <div className="p-6 md:p-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-ink/45 dark:text-paper/45">{p.category}</p>
        <h3 className="font-display text-2xl font-bold mt-2 flex items-center gap-3">
          {p.title}
          {p.demo && <DemoBadge />}
        </h3>
        <p className="mt-3 text-ink/65 dark:text-paper/65">{p.summary}</p>

        <div className="flex flex-wrap gap-2 mt-5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full bg-ink/5 dark:bg-white/10 text-ink/70 dark:text-paper/70"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 mt-6 text-sm font-semibold">
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline underline-offset-4"
          >
            View live ↗
          </a>
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper"
            >
              Code ↗
            </a>
          )}
          <button onClick={() => onOpen(p)} className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper">
            Details →
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function DemoBadge() {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border border-ink/20 dark:border-white/20 text-ink/55 dark:text-paper/55">
      Demo
    </span>
  );
}

function ProjectModal({ project: p, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full md:max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-paper dark:bg-ink-2 text-ink dark:text-paper"
      >
        <div className="aspect-[16/8] overflow-hidden relative group">
          <Cover p={p} large />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-10 right-4 w-10 h-10 rounded-full bg-black/50 text-white grid place-items-center hover:bg-black/70"
          >
            ✕
          </button>
        </div>

        <div className="p-6 md:p-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-ink/45 dark:text-paper/45">{p.category}</p>
          <h3 className="font-display text-3xl font-bold mt-2 flex items-center gap-3">
            {p.title}
            {p.demo && <DemoBadge />}
          </h3>
          <p className="mt-4 text-ink/70 dark:text-paper/70 leading-relaxed">{p.details}</p>

          <h4 className="font-display font-semibold mt-8 mb-3">Highlights</h4>
          <ul className="space-y-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-ink/75 dark:text-paper/75">
                <span className="text-amber-500">✓</span>
                {h}
              </li>
            ))}
          </ul>

          {p.images?.length > 1 && (
            <div className="grid grid-cols-2 gap-3 mt-8">
              {p.images.slice(1).map((src) => (
                <img key={src} src={src} alt="" className="rounded-xl border border-ink/10 dark:border-white/10" />
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-8">
            {p.tags.map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-full bg-ink/5 dark:bg-white/10">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-6 py-3 rounded-full bg-amber-400 text-ink font-semibold hover:bg-amber-300 transition"
            >
              Open live site ↗
            </a>
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-6 py-3 rounded-full border border-ink/20 dark:border-white/20 font-semibold hover:bg-ink/5 dark:hover:bg-white/10 transition"
              >
                View code ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────────── Services ───────────────────────────── */

function Services() {
  return (
    <section id="services" className="border-y border-ink/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-24">
        <SectionHead eyebrow="Services" title="How I can help" />
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              transition={{ delay: i * 0.08 }}
              className="p-8 rounded-3xl border border-ink/10 dark:border-white/10 bg-paper dark:bg-ink hover:border-amber-400/60 transition"
            >
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-500 text-2xl">
                {s.icon}
              </span>
              <h3 className="font-display text-xl font-bold mt-6">{s.title}</h3>
              <p className="mt-3 text-ink/65 dark:text-paper/65">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Process ───────────────────────────── */

function Process() {
  return (
    <section id="process" className="max-w-6xl mx-auto px-5 md:px-8 pt-24">
      <SectionHead eyebrow="Process" title="How I work">
        A clear, engineering-style process — so you always know what's happening and what comes next.
      </SectionHead>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS.map(([n, title, text], i) => (
          <motion.li
            key={n}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            transition={{ delay: i * 0.08 }}
            className="relative pt-6 border-t-2 border-ink/10 dark:border-white/10"
          >
            <span className="absolute -top-[2px] left-0 w-12 h-[2px] bg-amber-400" />
            <span className="font-display text-sm font-bold text-amber-500">{n}</span>
            <h3 className="font-display text-xl font-bold mt-2">{title}</h3>
            <p className="mt-2 text-ink/65 dark:text-paper/65">{text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

/* ───────────────────────────── About ───────────────────────────── */

function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-5 md:px-8 py-24">
      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3">
          <SectionHead eyebrow="About" title="Engineer by training. Developer by craft." />
          <div className="space-y-5 text-lg text-ink/70 dark:text-paper/70 leading-relaxed -mt-4">
            {PROFILE.bio.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fade}
          className="md:col-span-2 p-8 rounded-3xl bg-ink text-paper dark:bg-ink-2 border border-white/10"
        >
          <h3 className="font-display font-semibold text-lg">Tools I work with</h3>
          <div className="flex flex-wrap gap-2 mt-5">
            {PROFILE.skills.map((s) => (
              <span key={s} className="text-sm px-3 py-1.5 rounded-full bg-white/10">
                {s}
              </span>
            ))}
          </div>
          <dl className="mt-8 pt-6 border-t border-white/10 space-y-4">
            {PROFILE.facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-widest text-paper/45">{k}</dt>
                <dd className="mt-1 text-paper/90">{v}</dd>
              </div>
            ))}
            <div>
              <dt className="text-xs uppercase tracking-widest text-paper/45">Based in</dt>
              <dd className="mt-1 text-paper/90">{PROFILE.location} · working with clients worldwide</dd>
            </div>
          </dl>
          <SocialLinks className="mt-8 [&_a]:border-white/20" />
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Testimonials ───────────────────────────── */

function Testimonials() {
  const [live, setLive] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => !cancelled && Array.isArray(data) && setLive(data))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const reviews = [...live, ...TESTIMONIALS];
  const has = reviews.length > 0;

  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-5 md:px-8 pb-24">
      <SectionHead eyebrow="Reviews" title={has ? "What clients say" : "Worked with me?"}>
        {has
          ? "Real feedback from people I've built for."
          : "If I've built something for you, I'd be grateful for a short review. It helps new clients trust my work."}
      </SectionHead>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {reviews.map((t, i) => (
          <motion.figure
            key={t.id || `${t.name}-${i}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            className="p-8 rounded-3xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink-2 flex flex-col"
          >
            {t.rating && (
              <div className="text-amber-500 tracking-widest" aria-label={`${t.rating} out of 5 stars`}>
                {"★".repeat(t.rating)}
                <span className="text-ink/15 dark:text-white/15">{"★".repeat(5 - t.rating)}</span>
              </div>
            )}
            <blockquote className="mt-4 text-lg text-ink/80 dark:text-paper/80 flex-1">“{t.quote}”</blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold">{t.name}</span>
              {t.role && <span className="text-ink/55 dark:text-paper/55"> · {t.role}</span>}
              {t.project && <span className="block text-ink/45 dark:text-paper/45 mt-0.5">Project: {t.project}</span>}
            </figcaption>
          </motion.figure>
        ))}

        <ReviewForm wide={reviews.length % 3 === 0} />
      </div>
    </section>
  );
}

function ReviewForm({ wide }) {
  const empty = { name: "", role: "", project: "", rating: 5, review: "", website: "" };
  const [f, setF] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const ready = f.name.trim().length > 1 && f.review.trim().length > 9;

  async function submit(e) {
    e.preventDefault();
    if (!ready || status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const r = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
      setF(empty);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-2xl bg-paper dark:bg-ink border border-ink/15 dark:border-white/15 px-4 py-3 placeholder:text-ink/40 dark:placeholder:text-paper/40 focus:outline-none focus:border-amber-400 transition";
  const box = `p-8 rounded-3xl border-2 border-dashed border-amber-400/60 bg-amber-400/5 ${wide ? "lg:col-span-3" : ""}`;

  if (status === "sent") {
    return (
      <div className={`${box} flex flex-col justify-center`} role="status">
        <span className="text-4xl">🙏</span>
        <h3 className="font-display text-xl font-bold mt-3">Thank you for your review!</h3>
        <p className="mt-2 text-ink/65 dark:text-paper/65">It will appear here once it's been confirmed.</p>
        <button onClick={() => setStatus("idle")} className="mt-5 self-start text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          Write another
        </button>
      </div>
    );
  }

  return (
    <motion.form
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fade}
      onSubmit={submit}
      aria-label="Leave a review"
      className={box}
    >
      <h3 className="font-display text-xl font-bold">Leave a review</h3>
      <p className="mt-1 text-sm text-ink/60 dark:text-paper/60">
        Reviews are checked before they're published, so every review here is from a real client.
      </p>

      <div className={`mt-6 grid gap-3 ${wide ? "md:grid-cols-2" : ""}`}>
        <input className={field} placeholder="Your name *" value={f.name} onChange={set("name")} aria-label="Your name" maxLength={80} required />
        <input className={field} placeholder="Company or role (optional)" value={f.role} onChange={set("role")} aria-label="Company or role" maxLength={100} />
        <input className={field} placeholder="Which project? (optional)" value={f.project} onChange={set("project")} aria-label="Project" maxLength={100} />
        <div className={`${field} flex items-center justify-between`} role="radiogroup" aria-label="Rating">
          <span className="text-ink/50 dark:text-paper/50">Rating</span>
          <span className="text-2xl leading-none">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={Number(f.rating) === n}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                onClick={() => setF({ ...f, rating: n })}
                className={n <= f.rating ? "text-amber-500" : "text-ink/20 dark:text-white/20"}
              >
                ★
              </button>
            ))}
          </span>
        </div>
        <textarea
          className={`${field} min-h-[120px] resize-y ${wide ? "md:col-span-2" : ""}`}
          placeholder="Your review — what was it like working with me? *"
          value={f.review}
          onChange={set("review")}
          aria-label="Your review"
          maxLength={1200}
          required
        />
        {/* Honeypot for spam bots — hidden from people */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={f.website}
          onChange={set("website")}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}{" "}
          <a href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer" className="underline">
            Or send it on WhatsApp.
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={!ready || status === "sending"}
        className="mt-5 px-6 py-3 rounded-full bg-amber-400 text-ink font-semibold transition hover:bg-amber-300 disabled:opacity-40 disabled:pointer-events-none"
      >
        {status === "sending" ? "Sending…" : "Submit review"}
      </button>
    </motion.form>
  );
}

/* ───────────────────────────── Contact ───────────────────────────── */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const ready = form.name.trim() && form.message.trim();

  const body = `Hi Obire, my name is ${form.name}${form.email ? ` (${form.email})` : ""}.\n\n${form.message}`;
  const waNumber = PROFILE.whatsapp.replace(/\D/g, "");
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(body)}`;
  const mailLink = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `Project enquiry from ${form.name}`
  )}&body=${encodeURIComponent(body)}`;

  const field =
    "w-full rounded-2xl bg-white/60 border-2 border-ink/15 px-4 py-3 text-ink placeholder:text-ink/45 focus:outline-none focus:border-ink transition";

  return (
    <section id="contact" className="max-w-6xl mx-auto px-5 md:px-8 pb-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="relative overflow-hidden rounded-[2rem] bg-amber-400 text-ink px-6 py-12 sm:px-10 md:px-16 md:py-16"
      >
        <div className="absolute -right-20 -bottom-24 w-80 h-80 rounded-full bg-amber-300" />
        <div className="relative grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Got a project in mind? Let's build it.
            </h2>
            <p className="mt-5 text-lg text-ink/75 max-w-md">
              Tell me what you need — a new site, a web app, or a fix for the one you have. I usually reply within a
              day.
            </p>
            <div className="mt-8 space-y-2 font-semibold">
              <a href={`mailto:${PROFILE.email}`} className="block hover:underline underline-offset-4">
                ✉ {PROFILE.email}
              </a>
              <a href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer" className="block hover:underline underline-offset-4">
                ☏ {PROFILE.phone} (WhatsApp)
              </a>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-3" aria-label="Contact form">
            <label className="block">
              <span className="sr-only">Your name</span>
              <input className={field} placeholder="Your name *" value={form.name} onChange={set("name")} required />
            </label>
            <label className="block">
              <span className="sr-only">Your email</span>
              <input className={field} type="email" placeholder="Your email" value={form.email} onChange={set("email")} />
            </label>
            <label className="block">
              <span className="sr-only">Project details</span>
              <textarea
                className={`${field} min-h-[140px] resize-y`}
                placeholder="Tell me about your project *"
                value={form.message}
                onChange={set("message")}
                required
              />
            </label>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={ready ? waLink : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!ready}
                className={`px-6 py-3.5 rounded-full bg-ink text-paper font-semibold transition ${
                  ready ? "hover:opacity-90" : "opacity-40 pointer-events-none"
                }`}
              >
                Send on WhatsApp
              </a>
              <a
                href={ready ? mailLink : undefined}
                aria-disabled={!ready}
                className={`px-6 py-3.5 rounded-full border-2 border-ink font-semibold transition ${
                  ready ? "hover:bg-ink hover:text-paper" : "opacity-40 pointer-events-none"
                }`}
              >
                Send by email
              </a>
            </div>
            <p className="text-sm text-ink/60">Your message opens in WhatsApp or your email app, ready to send.</p>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const socials = [
    ["GitHub", PROFILE.github],
    ["LinkedIn", PROFILE.linkedin],
    ["WhatsApp", PROFILE.whatsapp],
  ].filter(([, url]) => url);

  return (
    <footer className="border-t border-ink/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-ink/55 dark:text-paper/55">
        <p className="flex items-center gap-3">
          <Logo className="text-base text-ink dark:text-paper" />
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
        </p>
        <div className="flex gap-6">
          {socials.map(([label, url]) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
