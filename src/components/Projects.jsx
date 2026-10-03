import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolioData";
import { IconArrowUpRight } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

const VISIBLE_COUNT = 3;

// Scatter positions and rotations for each card
// Desktop: more dramatic scatter effect
// Mobile: minimal rotation for cleaner stack layout
const scatterConfig = [
  { rotate: -3, x: 0, y: 0, rotateMobile: -1 },
  { rotate: 4, x: 20, y: -10, rotateMobile: 1 },
  { rotate: -2, x: -15, y: 5, rotateMobile: -0.5 },
  { rotate: 5, x: 10, y: -8, rotateMobile: 0.5 },
  { rotate: -4, x: -20, y: 12, rotateMobile: -1 },
  { rotate: 3, x: 15, y: -5, rotateMobile: 1 },
];

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

/* ─── Scatter Card Component (Interactive Photo Grid) ─────────────────────── */
const ScatterCard = ({ project, index, cardRef, scatterPosition }) => {
  const hasDemo = project.demo && project.demo !== "#";
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    if (hasDemo && !isDragging) window.open(project.demo, "_blank", "noopener,noreferrer");
  };

  // Use mobile-specific rotation if on mobile
  const rotationValue = isMobile ? scatterPosition.rotateMobile : scatterPosition.rotate;
  const positionX = isMobile ? 0 : scatterPosition.x;
  const positionY = isMobile ? 0 : scatterPosition.y;

  return (
    <motion.article
      ref={cardRef}
      drag={!isMobile} // Disable drag on mobile
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
      initial={{
        opacity: 0,
        scale: 0.8,
        rotate: rotationValue,
        x: positionX,
        y: positionY,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: isHovered ? 0 : rotationValue,
        x: positionX,
        y: positionY,
      }}
      whileHover={{
        scale: isMobile ? 1 : 1.05, // Disable scale on mobile
        zIndex: 50,
        boxShadow: "0 0 40px rgba(255,255,255,0.15)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative bg-white/80 dark:bg-zinc-900/60 backdrop-blur-lg border border-zinc-200 dark:border-white/20 rounded-2xl p-5 shadow-2xl ${
        hasDemo && !isMobile ? "cursor-grab active:cursor-grabbing" : hasDemo ? "cursor-pointer" : "cursor-default"
      } ${isHovered ? "border-zinc-300 dark:border-white/40" : ""}`}
      style={{
        touchAction: isMobile ? "pan-y" : "none", // Allow vertical scroll on mobile
      }}
    >
      {/* Drag Indicator - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isDragging ? 1 : 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/10"
        >
          🎯 Dragging...
        </motion.div>
      )}

      <div className="browser-mockup mb-4">
        <div className="controls">
          <div className="control control-red" aria-hidden="true" />
          <div className="control control-yellow" aria-hidden="true" />
          <div className="control control-green" aria-hidden="true" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          <motion.img
            src={project.image}
            alt={`Portfolio ${project.title}`}
            loading="lazy"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium tabular-nums text-zinc-600 dark:text-zinc-400">
                {String(index + 1).padStart(2, "0")} · {project.year}
              </span>
              {project.badges && project.badges.map((badge, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: (index * 0.1) + (idx * 0.1), type: "spring", stiffness: 200 }}
                  className={`text-[10px] px-2 py-0.5 rounded-full border backdrop-blur-md ${
                    badge.type === 'ai' 
                      ? 'bg-emerald-500/20 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 dark:border-emerald-500/20' 
                      : badge.type === 'speed'
                        ? 'bg-blue-500/20 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30 dark:border-blue-500/20'
                        : 'bg-zinc-200 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-white/10'
                  }`}
                >
                  {badge.text}
                </motion.span>
              ))}
            </div>
            <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
              {project.title}
            </h3>
          </div>
          {hasDemo && (
            <motion.span
              whileHover={{ scale: 1.2, rotate: 45 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 dark:border-white/20 text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-white/5"
            >
              <IconArrowUpRight />
            </motion.span>
          )}
        </div>

        <p className="text-zinc-600 dark:text-zinc-300 text-sm line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index * 0.1) + (idx * 0.05) }}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-200 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-xs px-2 py-0.5 rounded-full text-zinc-700 dark:text-zinc-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
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
      {/* ── Header with Interactive Badge ─── */}
      <header
        ref={headerRef}
        className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="section-title tone-on-scroll !mb-0">Projects</h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            6 Selected Works
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 backdrop-blur-md"
          >
            <span className="text-sm">✨</span>
            Interactive Scatter Canvas
          </motion.div>
        </div>
      </header>

      {/* ── Scatter Grid Canvas ─── */}
      <div 
        ref={gridRef} 
        className="relative min-h-[600px] md:min-h-[600px] w-full flex flex-col gap-6 md:block"
      >
        {visibleProjects.map((project, index) => (
          <ScatterCard
            key={project.id}
            project={project}
            index={index}
            cardRef={(el) => (cardRefs.current[index] = el)}
            scatterPosition={scatterConfig[index % scatterConfig.length]}
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
      
      {/* Gradient Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-12" />
    </section>
  );
};

export default Projects;
