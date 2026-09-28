import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolioData";
import { IconArrowUpRight } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

const VISIBLE_COUNT = 3;

/* ─── Project Card ─────────────────────────────────────────── */
const ProjectCard = ({ project, index, cardRef }) => {
  const hasDemo = project.demo && project.demo !== "#";

  const handleClick = () => {
    if (hasDemo) window.open(project.demo, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e) => {
    if (hasDemo && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      ref={cardRef}
      className={`project-card card-surface group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-elevated)] ${
        hasDemo ? "cursor-pointer" : ""
      }`}
      onClick={hasDemo ? handleClick : undefined}
      onKeyDown={hasDemo ? handleKeyDown : undefined}
      role={hasDemo ? "link" : undefined}
      tabIndex={hasDemo ? 0 : undefined}
    >
      <div className="browser-mockup">
        <div className="controls">
          <div className="control control-red" aria-hidden="true" />
          <div className="control control-yellow" aria-hidden="true" />
          <div className="control control-green" aria-hidden="true" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 md:px-5 md:py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-xs font-medium tabular-nums text-[var(--color-muted)]">
              {String(index + 1).padStart(2, "0")} · {project.year}
            </span>
            <h3 className="tone-on-scroll text-lg font-semibold tracking-tight transition-colors group-hover:text-[var(--color-accent)]">
              {project.title}
            </h3>
          </div>
          {hasDemo && (
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)] transition-all group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent-muted)] group-hover:text-[var(--color-accent)]">
              <IconArrowUpRight />
            </span>
          )}
        </div>

        <p className="body-text text-[0.9375rem]">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

/* ─── Projects Section ─────────────────────────────────────── */
const Projects = () => {
  const featured = portfolioData.projects.filter((p) => p.featured);
  const hasMore = featured.length > VISIBLE_COUNT;

  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? featured : featured.slice(0, VISIBLE_COUNT);

  /* Refs */
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const btnRef = useRef(null);
  const extraCardsRef = useRef([]);

  /* ── Initial scroll-triggered entrance ─────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header slide-in */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      /* Cards stagger */
      const initialCards = cardRefs.current.slice(0, VISIBLE_COUNT).filter(Boolean);
      gsap.fromTo(
        initialCards,
        { opacity: 0, y: 50, scale: 0.96, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      /* Show More button */
      if (hasMore && btnRef.current) {
        gsap.fromTo(
          btnRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: btnRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [hasMore]);

  /* ── Toggle Show More / Less ────────────────────────────── */
  const handleToggle = () => {
    if (!showAll) {
      /* Expand: show hidden cards with GSAP */
      setShowAll(true);
      /* Animation runs after state update / DOM paint */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const newCards = cardRefs.current.slice(VISIBLE_COUNT).filter(Boolean);
          if (newCards.length) {
            gsap.fromTo(
              newCards,
              { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.65,
                ease: "power3.out",
                stagger: 0.1,
              }
            );
          }
        });
      });
    } else {
      /* Collapse: animate out then set state */
      const extraCards = cardRefs.current.slice(VISIBLE_COUNT).filter(Boolean);
      if (extraCards.length) {
        gsap.to(extraCards, {
          opacity: 0,
          y: 24,
          scale: 0.97,
          filter: "blur(4px)",
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.06,
          onComplete: () => {
            setShowAll(false);
            /* Scroll back up to projects section smoothly */
            sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          },
        });
      } else {
        setShowAll(false);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="scroll-mt-16 pb-[var(--spacing-section)]"
    >
      {/* ── Header ─── */}
      <header
        ref={headerRef}
        className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        style={{ opacity: 0 }}
      >
        <div>
          <p className="section-label mb-2">Selected work</p>
          <h2 className="section-title tone-on-scroll">Projects</h2>
        </div>
        <p className="body-text max-w-xs text-sm sm:text-right">
          Project belajar & eksperimen — setiap satu adalah catatan pertumbuhan.
        </p>
      </header>

      {/* ── Cards Grid ─── */}
      <div ref={gridRef} className="flex flex-col gap-5">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            cardRef={(el) => (cardRefs.current[index] = el)}
          />
        ))}
      </div>

      {/* ── Show More / Less Button ─── */}
      {hasMore && (
        <div className="mt-8 flex justify-center" ref={btnRef} style={{ opacity: 0 }}>
          <button
            onClick={handleToggle}
            className="show-more-btn group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-medium text-[var(--color-fg)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-elevated)]"
          >
            {/* Animated background fill */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[var(--color-accent-muted)] to-transparent transition-transform duration-500 ease-out group-hover:translate-x-0" />

            <span className="relative z-10 flex items-center gap-2">
              {showAll ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  >
                    <path
                      d="M8 11L3 6M8 11L13 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(180 8 8)"
                    />
                  </svg>
                  Show Less
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  >
                    <path
                      d="M8 5L3 10M8 5L13 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(180 8 8)"
                    />
                  </svg>
                  Show More
                  <span className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-muted)] text-[0.65rem] font-semibold text-[var(--color-accent)]">
                    {featured.length - VISIBLE_COUNT}
                  </span>
                </>
              )}
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
