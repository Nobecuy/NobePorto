import { useEffect, useState } from "react";
import { portfolioData } from "../data/portfolioData";

const SkillBar = ({ skill, levelLabel, levelDescription, animate }) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-[var(--color-fg)]">{skill.name}</span>
        <div className="relative group">
          <span
            className="tag !text-[0.6875rem] cursor-pointer"
          >
            {levelLabel}
          </span>
          <div className="absolute bottom-full right-0 z-50 mb-2.5 w-52 scale-95 opacity-0 pointer-events-none transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto origin-bottom-right">
            <div className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[0.75rem] leading-relaxed text-[var(--color-muted)] shadow-[var(--shadow-elevated)] backdrop-blur-md">
              {levelDescription}
              <div className="absolute top-full right-4 h-2 w-2 -translate-y-[5px] rotate-45 border-r border-b border-[var(--color-border)] bg-[var(--color-surface)]"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Description always visible */}
      <p className="text-[0.6875rem] leading-[1.2] text-[var(--color-muted)]">
        {levelDescription}
      </p>
    </div>
    <div
      className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-border)]"
      role="progressbar"
      aria-valuenow={skill.percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${skill.name}: ${skill.percent}%`}
    >
      <div
        className="h-full rounded-full bg-[var(--color-fg)] transition-[width] duration-1000 ease-out"
        style={{ width: animate ? `${skill.percent}%` : "0%" }}
      />
    </div>
  </div>
);

const About = () => {
  const { bio, focus, philosophy, whatIDo, skills, levelLabels, levelDescriptions } =
    portfolioData.about;
  const [animateSkills, setAnimateSkills] = useState(false);

  useEffect(() => {
    const section = document.getElementById("about");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateSkills(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="fade-in-reveal scroll-mt-16 border-t border-[var(--color-border)] pb-[var(--spacing-section)] pt-[var(--spacing-section)]"
    >
      <header className="mb-10">
        <p className="section-label mb-2">Tentang saya</p>
        <h2 className="section-title tone-on-scroll">About Me</h2>
      </header>

      <div className="flex flex-col gap-12">
        <div className="max-w-prose flex flex-col gap-4">
          {bio.map((paragraph) => (
            <p key={paragraph.slice(0, 28)} className="body-text">
              {paragraph}
            </p>
          ))}
          <p className="body-text">{focus}</p>
        </div>

        <div>
          <h3 className="section-label mb-5">What I do</h3>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5">
            {whatIDo.map((item, index) => (
              <li
                key={item.title}
                className="card-surface fade-in-reveal rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                style={{ "--reveal-delay": `${index * 90}ms` }}
              >
                <h4 className="mb-2 text-sm font-semibold text-[var(--color-fg)]">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="section-label">Core skills</h3>
            <p className="text-xs text-[var(--color-muted)]">
              Hover label level untuk penjelasan
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {skills.map((skill) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                levelLabel={levelLabels[skill.level]}
                levelDescription={levelDescriptions[skill.level]}
                animate={animateSkills}
              />
            ))}
          </div>
        </div>

        <blockquote className="border-l-2 border-[var(--color-fg)] pl-5">
          <p className="text-[0.9375rem] italic leading-relaxed text-[var(--color-muted)]">
            &ldquo;{philosophy}&rdquo;
          </p>
        </blockquote>
      </div>
    </section>
  );
};

export default About;
