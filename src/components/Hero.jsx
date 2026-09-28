import { portfolioData } from "../data/portfolioData";
import { IconArrowDown } from "./Icons";

const Hero = () => {
  const { name, role, tagline, status } = portfolioData.profile;
  const { bio, focus } = portfolioData.about;

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
        <a href="#learning" className="btn-ghost">
          Sedang belajar apa
          <IconArrowDown className="opacity-60" />
        </a>
      </div>

      <p className="reveal-stagger-item delay-400 float-soft pt-4 text-sm text-[var(--color-muted)]">— {name}</p>
    </section>
  );
};

export default Hero;
