import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolioData";
import { IconArrowUpRight } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

const VISIBLE_COUNT = 3;

/* ─── Magnetic Button Component ─────────────────────────────── */
const MagneticButton = ({ children, onClick, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic effect radius
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = 100;

    if (distance < maxDistance) {
      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

/* ─── 3D Tilt Card Component ─────────────────────────────────── */
const TiltCard = ({ children, project, index, cardRef }) => {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={cardRef}>{children}</div>
    </motion.div>
  );
};

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
    <TiltCard project={project} index={index} cardRef={cardRef}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={`group bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-white/30 hover:bg-zinc-900/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 ${
          hasDemo ? "cursor-pointer" : ""
        }`}
        onClick={hasDemo ? handleClick : undefined}
        onKeyDown={hasDemo ? handleKeyDown : undefined}
        role={hasDemo ? "link" : undefined}
        tabIndex={hasDemo ? 0 : undefined}
      >
        <div className="browser-mockup mb-4">
          <div className="controls">
            <div className="control control-red" aria-hidden="true" />
            <div className="control control-yellow" aria-hidden="true" />
            <div className="control control-green" aria-hidden="true" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            <motion.img
              src={project.image}
              alt={`Portofolio buatan Achmad Nobe`}
              loading="lazy"
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium tabular-nums text-zinc-400">
                  {String(index + 1).padStart(2, "0")} · {project.year}
                </span>
                {project.badges && project.badges.map((badge, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
                    className={`text-[10px] px-2 py-0.5 rounded-full border backdrop-blur-md ${
                      badge.type === 'ai' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : badge.type === 'speed'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-white/5 text-zinc-300 border-white/10'
                    }`}
                  >
                    {badge.text}
                  </motion.span>
                ))}
              </div>
              <h3 className="tone-on-scroll text-lg font-semibold tracking-tight transition-colors group-hover:text-white">
                {project.title}
              </h3>
            </div>
            {hasDemo && (
              <motion.span
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white"
              >
                <IconArrowUpRight />
              </motion.span>
            )}
          </div>

          <p className="text-zinc-300 text-sm">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.map((tag, idx) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 border border-white/10 text-xs px-2.5 py-1 rounded-full text-zinc-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </TiltCard>
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
        className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-4">
          <h2 className="section-title tone-on-scroll !mb-0">Projects</h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            6 Selected Works
          </div>
        </div>
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
          <MagneticButton
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
          </MagneticButton>
        </div>
      )}
    </section>
  );
};

export default Projects;
