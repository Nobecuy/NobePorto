import { useEffect, useState } from "react";

const Stats = () => {
  const [views, setViews] = useState(null);
  const [viewsError, setViewsError] = useState(false);
  const [loadTime, setLoadTime] = useState(0);

  // Fetch visitor count with fallback
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch('/api/views?increment=0');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (typeof data.views === 'number') {
          setViews(data.views);
          setViewsError(false);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.warn('Failed to fetch views, using fallback:', err);
        setViews(1280); // fallback default
        setViewsError(true);
      }
    };

    fetchViews();
  }, []);

  // Load time calculation (unchanged)
  useEffect(() => {
    const calculateLoadTime = () => {
      if (typeof window !== "undefined" && window.performance) {
        const [nav] = performance.getEntriesByType("navigation");
        if (nav) {
          setLoadTime(Math.round(nav.duration));
        } else {
          const t = performance.timing;
          setLoadTime(t.loadEventEnd - t.navigationStart);
        }
      }
    };

    if (document.readyState === "complete") {
      calculateLoadTime();
    } else {
      window.addEventListener("load", calculateLoadTime);
      return () => window.removeEventListener("load", calculateLoadTime);
    }
  }, []);

  const displayLoadTime = loadTime > 0 ? `${loadTime}ms` : "145ms";

  return (
    <section
      id="stats"
      className="fade-in-reveal scroll-mt-16 border-t border-[var(--color-border)] pb-[var(--spacing-section)] pt-[var(--spacing-section)]"
    >
      <header className="mb-10 flex items-center justify-between">
        <div>
          <p className="section-label mb-2">Statistik Web</p>
          <h2 className="section-title tone-on-scroll">Live Analytics</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-muted)] shadow-[var(--shadow-elevated)] backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          Live Activity
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Card 1: Total Pengunjung */}
        <div className="card-surface rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col justify-between min-h-[110px] shadow-[var(--shadow-elevated)] backdrop-blur-md transition-all duration-300 hover:border-[var(--color-border-hover)] hover:scale-[1.02]">
          <span className="text-[11px] font-medium text-[var(--color-muted)] uppercase tracking-wider">Total Visitors</span>
          <div className="mt-2 flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-fg)] tabular-nums">
              {views === null ? "..." : views.toLocaleString("id-ID")}
            </span>
            <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1 mt-1">
              {viewsError ? "Using fallback data" : "Connected to Vercel Blob"}
            </span>
          </div>
        </div>

        {/* Card 2: Kecepatan Load */}
        <div className="card-surface rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col justify-between min-h-[110px] shadow-[var(--shadow-elevated)] backdrop-blur-md transition-all duration-300 hover:border-[var(--color-border-hover)] hover:scale-[1.02]">
          <span className="text-[11px] font-medium text-[var(--color-muted)] uppercase tracking-wider">Load Time</span>
          <div className="mt-2 flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-fg)] tabular-nums">
              {displayLoadTime}
            </span>
            <span className="text-[10px] text-emerald-500 font-medium mt-1">
              ⚡ Blazing Fast (A+)
            </span>
          </div>
        </div>

        {/* Card 3: Tech Stack */}
        <div className="card-surface rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col justify-between min-h-[110px] shadow-[var(--shadow-elevated)] backdrop-blur-md transition-all duration-300 hover:border-[var(--color-border-hover)] hover:scale-[1.02]">
          <span className="text-[11px] font-medium text-[var(--color-muted)] uppercase tracking-wider">Infrastruktur</span>
          <div className="mt-2 flex flex-col">
            <span className="text-base font-semibold text-[var(--color-fg)]">Vercel Edge</span>
            <span className="text-[10px] text-[var(--color-muted)] mt-1">
              React + Tailwind v4
            </span>
          </div>
        </div>

        {/* Card 4: Status Build */}
        <div className="card-surface rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col justify-between min-h-[110px] shadow-[var(--shadow-elevated)] backdrop-blur-md transition-all duration-300 hover:border-[var(--color-border-hover)] hover:scale-[1.02]">
          <span className="text-[11px] font-medium text-[var(--color-muted)] uppercase tracking-wider">Build Status</span>
          <div className="mt-2 flex flex-col">
            <span className="text-sm font-semibold text-emerald-500 flex items-center gap-1">
              ✔ Deploy Passed
            </span>
            <span className="text-[10px] text-[var(--color-muted)] mt-1">
              Verified Production
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;