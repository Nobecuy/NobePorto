import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Learning from "./components/Learning";
import About from "./components/About";
import Stats from "./components/Stats";
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
  const [views, setViews] = useState(null);
  const [viewsError, setViewsError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const isLocal = typeof window !== "undefined" && 
      (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

    const shouldIncrement =
      typeof window !== "undefined" && !window.sessionStorage.getItem("counted_view");

    const url = `/api/views?increment=${shouldIncrement ? "1" : "0"}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("API error response");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (typeof data?.views === "number") {
          setViews(data.views);
          setViewsError(false);
          if (shouldIncrement) window.sessionStorage.setItem("counted_view", "1");
        } else {
          throw new Error("Invalid response format");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        if (isLocal) {
          // Fallback ke mock views jika local development agar UI tetap bisa dilihat
          setViews(1280); 
          setViewsError(false);
          console.log("Local Dev: Menggunakan mock views karena Vercel KV tidak terdeteksi di localhost.", err);
        } else {
          setViewsError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const loader = document.getElementById("app-loader");
    if (!loader) return;
    const MIN_VISIBLE_MS = window.__APP_LOADER_MIN_MS__ ?? 900;
    const start = window.__APP_LOADER_START__ ?? Date.now();
    const elapsed = Date.now() - start;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

    let outerTimerId;
    let safetyTimerId;

    outerTimerId = window.setTimeout(() => {
      window.__APP_LOADER_SET_PROGRESS__?.(100);

      // Step 1: Fade out inner spinner
      loader.classList.add("fade-inner");

      // Step 2: Slide up the background panel and reveal main app
      window.setTimeout(() => {
        loader.classList.add("slide-up");
        document.documentElement.classList.add("app-revealed");

        // Step 3: Remove loader from DOM after transition completes
        window.setTimeout(() => {
          if (loader && loader.parentNode) {
            loader.remove();
          }
        }, 500);
      }, 200);

      // Safety timeout: ensure loader is removed even if something goes wrong
      safetyTimerId = window.setTimeout(() => {
        if (loader && loader.parentNode) {
          loader.remove();
          document.documentElement.classList.add("app-revealed");
        }
      }, wait + 200 + 500 + 1500); // wait + 2.2s extra
    }, wait);

    return () => {
      window.clearTimeout(outerTimerId);
      window.clearTimeout(safetyTimerId);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  };

  useEffect(() => {
    const sections = ["projects", "learning", "about", "stats"];

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

      <Footer views={views} viewsError={viewsError} />
      <Analytics />
    </div>
  );
}

export default App;
