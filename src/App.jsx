import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Learning from "./components/Learning";
import About from "./components/About";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

const THEME_STORAGE_KEY = "theme";

// View counter now fully integrated into the new Live Analytics Stats dashboard section below.

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";

    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;

    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
      ? "dark"
      : "light";
  });
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Bypass loader: immediately remove loader and reveal app
  useEffect(() => {
    const loader = document.getElementById("app-loader");
    if (loader) {
      loader.remove();
    }
    document.documentElement.classList.add("app-revealed");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  };

  useEffect(() => {
    const sections = ["projects", "learning", "about", "stats", "contact"];

    const handleScroll = () => {
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" },
    );

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const revealEls = document.querySelectorAll(".fade-in-reveal");
    revealEls.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealEls.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <Header
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="page-wrap">
        <Hero />
        <hr className="divider" />
        <Projects />
        <Learning />
        <About />
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}

export default App;