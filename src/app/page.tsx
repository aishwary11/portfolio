'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaMoon, FaSun } from "react-icons/fa";

const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
}>({
  theme: "dark",
  toggleTheme: () => { },
});

export default function Home() {
  const startDate = new Date(2018, 6);
  const [experience, setExperience] = useState("");
  useEffect(() => {
    const calculateExperience = (startDate: Date): string => {
      const currentDate = new Date();
      const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
      const monthsDiff =
        currentDate.getMonth() -
        startDate.getMonth() +
        (currentDate.getDate() < startDate.getDate() ? -1 : 0);
      let years = yearsDiff;
      let months = monthsDiff;
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      return `${years} year${years > 1 ? "s" : ""} and ${months} month${months > 1 ? "s" : ""}`;
    };

    setExperience(calculateExperience(startDate));
  }, []);
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen w-full font-sans flex flex-col transition-colors duration-300 ${theme === "dark"
          ? "bg-slate-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
          }`}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full text-center py-16 px-4 relative"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 tracking-wide leading-relaxed">
            Aishwary Shah
          </h1>
          <p className={`text-lg sm:text-xl md:text-2xl mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Senior Software Developer | MERN Stack Expert
          </p>
          <button
            onClick={toggleTheme}
            className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600 text-yellow-300"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
          >
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </motion.div>

        {/* About Me */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`w-full px-6 sm:px-10 py-10 sm:py-12 mx-auto max-w-4xl mt-10 rounded-xl shadow-lg ${theme === "dark"
            ? "bg-slate-800 shadow-slate-700/30"
            : "bg-white shadow-gray-200/60"
            }`}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-500 mb-4">
            About Me
          </h2>
          <p className={`mt-4 text-lg sm:text-xl leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
            With over {experience} of experience in software development, I specialize in building scalable and efficient applications using React.js, Express.js, and Node.js. My expertise includes optimizing system architecture, improving CI/CD workflows, and integrating microservices.
            Additionally, I focus on code optimization and query optimization to enhance the performance and scalability of applications.
          </p>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full px-6 sm:px-10 py-12 sm:py-14 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-indigo-500">
            Technical Skills
          </h2>
          <div className="overflow-x-auto rounded-xl">
            <table className={`table-auto w-full border-collapse text-lg sm:text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
              <thead>
                <tr className={theme === "dark" ? "bg-slate-800" : "bg-gray-100"}>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Technologies</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { category: "Languages", skills: "JavaScript, TypeScript, Golang" },
                  { category: "Frontend Frameworks", skills: "React.js, Next.js, Angular, React Native" },
                  { category: "Backend Frameworks", skills: "Node.js, Express.js, Nest.js, Fastify, Hono.js" },
                  { category: "Databases", skills: "MySQL, MongoDB" },
                  { category: "DevOps Tools", skills: "AWS, Docker, Jenkins" },
                  { category: "Complementary Skills", skills: "Team Leading" }
                ].map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className={`transition-colors ${theme === "dark"
                      ? "hover:bg-slate-800"
                      : "hover:bg-gray-50"
                      }`}
                  >
                    <td className="px-4 py-3 font-medium">{item.category}</td>
                    <td className="px-4 py-3">{item.skills}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className={`w-full py-8 mt-auto text-center ${theme === "dark" ? "bg-slate-900" : "bg-gray-50"
          }`}>
          <div className="flex justify-center gap-6 mb-4">
            <Link href="https://www.linkedin.com/in/aishwary-shah-web-developer/" target="_blank">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="text-blue-500 hover:text-blue-400 transition-transform"
              >
                <FaLinkedin size={30} />
              </motion.div>
            </Link>
            <Link href="https://github.com/aishwary11" target="_blank">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={`transition-transform ${theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <FaGithub size={30} />
              </motion.div>
            </Link>
          </div>
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
            &copy; {new Date().getFullYear()} Aishwary Shah. All rights reserved.
          </p>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}
