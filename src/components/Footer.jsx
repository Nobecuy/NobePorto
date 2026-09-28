import { portfolioData } from "../data/portfolioData";
import Stats from './Stats';

const Footer = () => {
  const { email, whatsapp, whatsappAlt, socials, name } = portfolioData.profile;
  const { philosophy } = portfolioData.about;
  const { siteName } = portfolioData;

  const links = [
    { label: "Email", href: socials.emailLink },
    { label: "GitHub", href: socials.github, external: true },
    { label: "LinkedIn", href: socials.linkedin, external: true },
    { label: "WhatsApp", href: socials.whatsappLinkAlt, external: true },
  ];

  const contactItems = [
    {
      label: "Email",
      value: email,
      href: socials.emailLink,
    },
    {
      label: "WhatsApp",
      values: [
        { value: whatsapp, href: socials.whatsappLink },
        { value: whatsappAlt, href: socials.whatsappLinkAlt },
      ],
      external: true,
    },
    {
      label: "GitHub",
      value: "github.com/Nobecuy",
      href: socials.github,
      external: true,
    },
    {
      label: "LinkedIn",
      value: "Achmad Nobe Anta Ananda",
      href: socials.linkedin,
      external: true,
    },
  ];

  return (
    <footer
      id="footer"
      className="scroll-mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="page-wrap py-[var(--spacing-section)]">
        <Stats />
        <div id="contact" className="scroll-mt-16 mb-12 max-w-lg">
          <p className="section-label mb-3">Contact</p>
          <h2 className="section-title tone-on-scroll mb-3">Mari terhubung.</h2>
          <p className="body-text mb-8">
            Terbuka untuk kolaborasi, diskusi belajar, atau sekadar ngobrol soal
            web development.
          </p>

          <ul className="flex flex-col gap-4">
            {contactItems.map((item) => (
              <li key={item.label}>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                  {item.label}
                </p>
                {"values" in item ? (
                  <div className="mt-0.5 flex flex-col gap-1">
                    {item.values.map((entry) => (
                      <a
                        key={entry.href}
                        href={entry.href}
                        className="inline-block text-[0.9375rem] font-medium text-[var(--color-fg)] no-underline transition-opacity hover:opacity-60"
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {entry.value}
                      </a>
                    ))}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="mt-0.5 inline-block text-[0.9375rem] font-medium text-[var(--color-fg)] no-underline transition-opacity hover:opacity-60"
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.value}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <p className="mb-8 max-w-prose border-l-2 border-[var(--color-border)] pl-4 text-sm italic leading-relaxed text-[var(--color-muted)]">
          {philosophy}
        </p>

        <div className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[var(--color-muted)]">
              © {new Date().getFullYear()} {name} · {siteName}
            </p>
          </div>
          <nav className="flex flex-wrap gap-6" aria-label="Social links">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-subtle text-sm font-medium"
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;