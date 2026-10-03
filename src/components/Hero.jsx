import { useState, useEffect } from "react";
import { portfolioData } from "../data/portfolioData";
import { IconArrowDown } from "./Icons";

const Hero = () => {
  const { name, role, tagline, status } = portfolioData.profile;
  const { bio, focus } = portfolioData.about;
  const [currentTime, setCurrentTime] = useState("");

  // Update WIB time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const wibTime = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setCurrentTime(wibTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col gap-8 pb-[var(--spacing-section)] pt-16 md:pt-20">
      <div className="reveal-stagger-item delay-100 flex flex-wrap items-center gap-3">
        <span className="section-label">{role}</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]">
          <span
            className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500"
            aria-hidden="true"
          />
          {status}
        </span>
      </div>

      <div className="reveal-stagger-item delay-200 flex flex-col gap-4">
        <h1 className="max-w-[22ch] text-[clamp(2rem,5.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--color-fg)]">
          {tagline}
        </h1>
        
        {/* Live Status & Time Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-500/30 bg-emerald-100 dark:bg-emerald-950/60 px-4 py-2 text-sm font-medium text-emerald-800 dark:text-emerald-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Projects & Freelance
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 backdrop-blur-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="tabular-nums">{currentTime} WIB</span>
          </div>
        </div>
        <div className="flex max-w-prose flex-col gap-3">
          {bio.slice(0, 2).map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="body-text text-[1.0625rem]">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="max-w-prose text-sm text-[var(--color-muted)]">{focus}</p>
      </div>

      <div className="reveal-stagger-item delay-300 flex flex-wrap items-center gap-3 pt-1">
        <a href="#projects" className="btn-primary">
          Lihat project
        </a>
        <a href="#contact" className="btn-ghost">
          Mari terhubung
          <IconArrowDown className="opacity-60" />
        </a>
      </div>

      <div className="reveal-stagger-item delay-400 float-soft pt-4 text-sm text-[var(--color-muted)]">— {name}</div>
      
      {/* Gradient Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-8" />
    </section>
  );
};

export default Hero;
