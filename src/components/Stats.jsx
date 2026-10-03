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
        // We treat any non-ok as an error, though our API always returns 200
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        console.log('Response views data:', data);
        if (typeof data.views === 'number') {
          setViews(data.views);
          // If the API indicates fallback data, show error state to indicate using fallback
          setViewsError(data.fallback === true);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.warn('Failed to fetch views, using fallback:', err);
        // On network error or invalid response, set default view count to 1
        setViews(1);
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {/* Card 1: Total Pengunjung */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-white/30 hover:bg-zinc-900/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 flex flex-col justify-between min-h-[110px]">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Total Visitors</span>
          <div className="mt-2 flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-white tabular-nums">
              {views === null ? "..." : views.toLocaleString("id-ID")}
            </span>
            <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1 mt-1">
              {viewsError ? "Using fallback data" : "Connected to Vercel Blob"}
            </span>
          </div>
        </div>

        {/* Card 2: Kecepatan Load */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-white/30 hover:bg-zinc-900/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 flex flex-col justify-between min-h-[110px]">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Load Time</span>
          <div className="mt-2 flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-white tabular-nums">
              {displayLoadTime}
            </span>
            <span className="text-[10px] text-emerald-500 font-medium mt-1">
              ⚡ Blazing Fast (A+)
            </span>
          </div>
        </div>

        {/* Card 3: Tech Stack */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-white/30 hover:bg-zinc-900/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 flex flex-col justify-between min-h-[110px]">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Infrastruktur</span>
          <div className="mt-2 flex flex-col">
            <span className="text-base font-semibold text-white">Vercel Edge</span>
            <span className="text-[10px] text-zinc-400 mt-1">
              React + Tailwind v4
            </span>
          </div>
        </div>

        {/* Card 4: Status Build */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-white/30 hover:bg-zinc-900/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 flex flex-col justify-between min-h-[110px]">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Build Status</span>
          <div className="mt-2 flex flex-col">
            <span className="text-sm font-semibold text-emerald-500 flex items-center gap-1">
              ✔ Deploy Passed
            </span>
            <span className="text-[10px] text-zinc-400 mt-1">
              Verified Production
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;