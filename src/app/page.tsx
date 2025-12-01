'use client';

import { ThemeProvider } from "@/components/ThemeProvider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEnvelopeOpen, FaGithub, FaLinkedin, FaMobile, FaMoon, FaSun } from "react-icons/fa";

function calculateExperience(startDate: Date): string {
  const currentDate = new Date();
  const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - startDate.getMonth() + (currentDate.getDate() < startDate.getDate() ? -1 : 0);
  let years = yearsDiff;
  let months = monthsDiff;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `${years} year${years > 1 ? "s" : ""} and ${months} month${months > 1 ? "s" : ""}`;
}

const START_DATE = new Date(2018, 6);

interface Skill {
  id: string;
  category: string;
  skills: string;
}

const SKILLS: Skill[] = [
  { id: "lang", category: "Languages", skills: "JavaScript, TypeScript, Golang" },
  { id: "frontend", category: "Frontend Frameworks", skills: "React.js, Next.js, Angular, React Native" },
  { id: "backend", category: "Backend Frameworks", skills: "Node.js, Express.js, Nest.js, Fastify, Hono.js" },
  { id: "db", category: "Databases", skills: "MySQL, MongoDB" },
  { id: "devops", category: "DevOps Tools", skills: "AWS, Docker, Jenkins" },
  { id: "comp", category: "Complementary Skills", skills: "Team Leading" }
];

function HeaderSection({ isDark, toggleTheme }: Readonly<{ isDark: boolean; toggleTheme: () => void; }>) {
  return (
    <header className="w-full text-center py-12 sm:py-16 lg:py-20 px-4 relative">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 tracking-wide leading-tight sm:leading-relaxed">
          Aishwary Shah
        </h1>
        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl mt-3 sm:mt-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Senior Software Developer | MERN Stack Expert
        </p>
      </motion.div>
      <button onClick={toggleTheme} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} className={`absolute top-4 sm:top-6 right-4 sm:right-6 p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDark ? "bg-zinc-900 hover:bg-zinc-800 text-yellow-300 focus:ring-yellow-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-500"}`}>
        {isDark ? <FaSun size={18} className="sm:w-5 sm:h-5" /> : <FaMoon size={18} className="sm:w-5 sm:h-5" />}
      </button>
    </header>
  );
}

function AboutSection({ isDark, experience }: Readonly<{ isDark: boolean; experience: string; }>) {
  return (
    <motion.section initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className={`w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 mx-auto max-w-4xl mt-6 sm:mt-8 lg:mt-10 rounded-xl shadow-lg ${isDark ? "bg-zinc-900 shadow-black/50" : "bg-white shadow-gray-200/60"}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-indigo-500 mb-3 sm:mb-4">About Me</h2>
      <p suppressHydrationWarning className={`mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
        With over {experience} of experience in software development, I specialize in building scalable and efficient applications using React.js, Express.js, and Node.js. My expertise includes optimizing system architecture, improving CI/CD workflows, and integrating microservices. Additionally, I focus on code optimization and query optimization to enhance the performance and scalability of applications.
      </p>
    </motion.section>
  );
}

function SkillsSection({ isDark }: Readonly<{ isDark: boolean; }>) {
  return (
    <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-14 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 text-center text-indigo-500">Technical Skills</h2>
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className={`table-auto w-full border-collapse text-sm sm:text-base lg:text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          <thead>
            <tr className={isDark ? "bg-zinc-900" : "bg-gray-100"}>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">Category</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">Technologies</th>
            </tr>
          </thead>
          <tbody>
            {SKILLS.map((item, index) => (
              <motion.tr key={item.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 * index }} className={`transition-colors ${isDark ? "hover:bg-zinc-900" : "hover:bg-gray-50"} ${index < SKILLS.length - 1 ? "border-b border-zinc-800/30 dark:border-gray-300/10" : ""}`}>
                <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium">{item.category}</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3">{item.skills}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}

function FooterSection({ isDark, currentYear }: Readonly<{ isDark: boolean; currentYear: number; }>) {
  return (
    <footer className={`w-full py-6 sm:py-8 mt-auto text-center flex flex-col items-center ${isDark ? "bg-black" : "bg-gray-50"}`}>
      <div className="flex justify-center gap-4 sm:gap-6 mb-3 sm:mb-4">
        <Link href="https://www.linkedin.com/in/aishwary-shah-web-developer/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }} className="text-blue-500 hover:text-blue-400 transition-transform">
            <FaLinkedin size={28} className="sm:w-8 sm:h-8" />
          </motion.div>
        </Link>
        <Link href="https://github.com/aishwary11" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }} className={`transition-transform ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
            <FaGithub size={28} className="sm:w-8 sm:h-8" />
          </motion.div>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-3 sm:gap-4 px-4">
        <a href="tel:+918591693650" className="group">
          <div className="flex items-center justify-center gap-2">
            <FaMobile size={14} className={`sm:w-4 sm:h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
            <span className={`text-sm sm:text-base ${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-800"} transition-colors`}>+91-8591693650</span>
          </div>
        </a>
        <a href="mailto:aishwary46@gmail.com" className="group">
          <div className="flex items-center justify-center gap-2">
            <FaEnvelopeOpen size={14} className={`sm:w-4 sm:h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
            <span className={`text-sm sm:text-base ${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-800"} transition-colors`}>aishwary46@gmail.com</span>
          </div>
        </a>
      </div>
      <p suppressHydrationWarning className={`mt-3 sm:mt-4 text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>&copy; {currentYear} Aishwary Shah. All rights reserved.</p>
    </footer>
  );
}

export default function Home() {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("portfolio-theme", "dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const isDark = theme === "dark";

  // Calculate these values on every render after mount - they'll be consistent
  const experience = mounted ? calculateExperience(START_DATE) : "7 years and 5 months";
  const currentYear = mounted ? new Date().getFullYear() : 2025;

  return (
    <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
      <div suppressHydrationWarning className={`min-h-screen w-full font-sans flex flex-col transition-colors duration-300 ${isDark ? "bg-black text-gray-100" : "bg-gray-50 text-gray-900"}`}>
        <HeaderSection isDark={isDark} toggleTheme={toggleTheme} />
        <AboutSection isDark={isDark} experience={experience} />
        <SkillsSection isDark={isDark} />
        <FooterSection isDark={isDark} currentYear={currentYear} />
      </div>
    </ThemeProvider>
  );
}
