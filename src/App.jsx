import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "bg-[#0f172a] text-white" : "bg-white text-black"}>
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
      <h1 className="text-xl font-bold">Obire's Office</h1>

      <div className="flex items-center gap-6">
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>

        <button
          onClick={() => setDark(!dark)}
          className="border px-3 py-1 rounded-lg"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="text-center py-24 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold mb-6"
      >
        Hi, I’m Obire 👋
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-400 max-w-xl mx-auto mb-8 text-lg"
      >
        I build fast, modern, and scalable web applications that help businesses grow.
      </motion.p>

      <div className="flex justify-center gap-4">
        <a href="#projects" className="bg-blue-500 px-6 py-3 rounded-xl">
          View Projects
        </a>
        <a href="#contact" className="border px-6 py-3 rounded-xl">
          Contact Me
        </a>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "SecureBank – Digital Banking App",
      description:
        "A modern banking web app with authentication, dashboard, and transaction features.",
      features: [
        "User authentication system",
        "Account balance dashboard",
        "Send money functionality",
        "Transaction tracking",
      ],
      images: [
        "/projects/securebank-login.png",
        "/projects/securebank-dashboard.png",
        "/projects/securebank-menu.png",
      ],
      link: "https://securebank-client.vercel.app",
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>

      {projects.map((p, i) => (
        <div key={i} className="mb-16">
          {/* Title */}
          <h3 className="text-2xl font-semibold mb-4">{p.title}</h3>

          {/* Images */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {p.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="rounded-xl shadow-lg hover:scale-105 transition"
              />
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-400 mb-4">{p.description}</p>

          {/* Features */}
          <ul className="text-gray-400 mb-4 list-disc pl-5">
            {p.features.map((f, index) => (
              <li key={index}>{f}</li>
            ))}
          </ul>

          {/* Link */}
          <a
            href={p.link}
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            View Live →
          </a>
        </div>
      ))}
    </section>
  );
}

function Services() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-10">Services</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">Website Development</h3>
          <p className="text-gray-400">
            Modern, fast, and responsive websites for businesses.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
          <p className="text-gray-400">
            Clean UI with React and modern tools.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">Website Optimization</h3>
          <p className="text-gray-400">
            Improve speed and performance of existing websites.
          </p>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <p className="text-gray-400 text-lg">
        I’m a passionate web developer focused on building responsive,
        high-performance web applications using React and modern tools.
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
          className="bg-blue-500 px-6 py-3 rounded-xl"
        >
          Send Email
        </a>

        <a
          href="https://wa.me/2348078417869"
          className="border border-gray-600 px-6 py-3 rounded-xl"
        >
          WhatsApp Me
        </a>
      </div>
    </section>
  );
}