import { useState } from "react";
import { portfolioData } from "../data/portfolioData";
import { IconClose, IconMenu, IconMoon, IconSun } from "./Icons";

const navLinks = [
  { label: "Work", href: "#projects", id: "projects" },
  { label: "Focus", href: "#learning", id: "learning" },
  { label: "About", href: "#about", id: "about" },
  { label: "Stats", href: "#stats", id: "stats" },
];

const ThemeToggle = ({ theme, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-fg)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-hover)]"
    aria-label="Toggle dark mode"
    title="Toggle dark mode"
  >
    <span className="transition-transform duration-200 ease-out group-active:scale-95">
      {theme === "dark" ? <IconSun className="h-5 w-5" /> : <IconMoon className="h-5 w-5" />}
    </span>
  </button>
);

const Header = ({ activeSection, theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { siteName } = portfolioData;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
      <nav className="page-wrap flex h-14 items-center justify-between">
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-[var(--color-fg)] no-underline"
        >
          {siteName}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link ${activeSection === link.id ? "is-active" : ""}`}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href="#contact" className="btn-primary !py-2 !text-[0.8125rem]">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="flex items-center justify-center rounded-full p-2 text-[var(--color-fg)]"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="animate-slide-down border-t border-[var(--color-border)] bg-[var(--color-bg)] px-[var(--spacing-page-x)] py-4 md:hidden">
          <div className="mx-auto flex max-w-[42rem] flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors ${
                  activeSection === link.id
                    ? "bg-[var(--color-accent-muted)] text-[var(--color-fg)]"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-hover)] hover:text-[var(--color-fg)]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary mt-2 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
