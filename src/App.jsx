import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [dark, setDark] = useState(true);
  const MotionDiv = motion.div;

  return (
    <div
      className={`min-h-screen ${
        dark
          ? "bg-gradient-to-b from-[#0f172a] to-black text-white"
          : "bg-white text-black"
      }`}
    >
      <Navbar dark={dark} setDark={setDark} />
      <Hero />
      <Projects />
      <Services />
      <About />
      <Contact />
    </div>
  );
}

function Navbar({ dark, setDark }) {
  return (
    <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold text-blue-500">Obire's Office</h1>

      <div className="flex items-center gap-6 text-sm">
        <a href="#projects" className="hover:text-blue-400">
          Projects
        </a>
        <a href="#about" className="hover:text-blue-400">
          About
        </a>
        <a href="#contact" className="hover:text-blue-400">
          Contact
        </a>

        <button
          onClick={() => setDark(!dark)}
          className="border px-3 py-1 rounded-lg hover:bg-white/10 transition"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="text-center py-28 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
      >
        I Build <span className="text-blue-500">High-Performance</span> Web Apps
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-400 max-w-xl mx-auto mb-8 text-lg"
      >
        Helping businesses grow with fast, modern, and scalable web solutions.
      </motion.p>

      <div className="flex justify-center gap-4">
        <a
          href="#projects"
          className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20"
        >
          View Projects
        </a>

        <a
          href="#contact"
          className="border px-6 py-3 rounded-xl hover:bg-white/10 transition"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
  {
    id: "securebank",
    title: "SecureBank – Digital Banking App",
    description:
      "A modern banking web app with authentication, dashboard, and transactions.",
    link: "https://securebank.obiresoffice.com",
  },
  {
    id: "dashboard",
    title: "SaaS Dashboard",
    description:
      "Admin dashboard with analytics and user interface components.",
    link: "https://dashboard.obiresoffice.com",
  },
  {
    id: "landing",
    title: "Business Landing Page",
    description:
      "A high-converting website built for businesses to attract customers.",
    link: "https://landing.obiresoffice.com",
  },
  {
    id: "smokehouse",
    title: "Smokehouse Project",
    description:
      "A restaurant-style platform for food ordering and customer engagement.",
    link: "https//smokehouse.obiresoffice.com",
  },
  {
    id: "broker",
    title: "Broker Project",
    description:
      "A financial platform for managing users, transactions, and analytics.",
    link: "https//realbitcoin.obiresoffice.com",
  },
];
  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Selected Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-[#1e293b] p-6 rounded-2xl hover:scale-105 transition shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3">{p.title}</h3>

            <p className="text-gray-400 mb-4">{p.description}</p>

            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="bg-blue-500/20 px-3 py-1 rounded-lg text-sm">
                React
              </span>
              <span className="bg-blue-500/20 px-3 py-1 rounded-lg text-sm">
                Tailwind
              </span>
              <span className="bg-blue-500/20 px-3 py-1 rounded-lg text-sm">
                Vercel
              </span>
            </div>

            <div className="flex gap-4">
  <a
    href={p.link}
    target="_blank"
    className="text-blue-400 hover:underline"
  >
    View Live →
  </a>

  <button
    onClick={() => alert(`Open ${p.title} details`)}
    className="text-sm text-gray-400 hover:text-white"
  >
    Details →
  </button>
</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-12">Services</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          "Website Development",
          "Frontend Development",
          "Website Optimization",
        ].map((s, i) => (
          <div
            key={i}
            className="bg-[#1e293b] p-6 rounded-2xl hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{s}</h3>
            <p className="text-gray-400">
              Modern, fast, and high-quality solutions for your business.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <p className="text-gray-400 text-lg">
        I’m a web developer focused on building responsive, high-performance
        applications using React and modern tools.
      </p>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-6">Let’s Work Together</h2>

      <p className="text-gray-400 mb-6">
        Have a project in mind? Let’s build something great.
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <a
          href="mailto:obiresoffice@gmail.com"
          className="bg-blue-500 px-6 py-3 rounded-xl hover:bg-blue-600 transition shadow-lg"
        >
          Send Email
        </a>

        <a
          href="https://wa.me/2348078417869"
          className="border px-6 py-3 rounded-xl hover:bg-white/10 transition"
        >
          WhatsApp Me
        </a>
      </div>
    </section>
  );
}