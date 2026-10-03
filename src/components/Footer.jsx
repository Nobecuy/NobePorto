import { useState } from "react";
import { portfolioData } from "../data/portfolioData";
import Stats from './Stats';
import Toast from './Toast';

const Footer = () => {
  const { email, whatsapp, whatsappAlt, socials, name } = portfolioData.profile;
  const { philosophy } = portfolioData.about;
  const { siteName } = portfolioData;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setToastMessage("Email copied to clipboard! ✨");
      setShowToast(true);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Using Formspree with actual email endpoint
      const response = await fetch("https://formspree.io/f/xbglnjwr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setToastMessage("Message sent successfully! 🎉");
        setShowToast(true);
      } else {
        setToastMessage("Failed to send message. Please try again.");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setToastMessage("Failed to send message. Please try again.");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                ) : item.label === "Email" ? (
                  <div className="mt-0.5 flex items-center gap-2">
                    <a
                      href={item.href}
                      className="inline-block text-[0.9375rem] font-medium text-[var(--color-fg)] no-underline transition-opacity hover:opacity-60"
                    >
                      {item.value}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-900/40 px-2 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-white/30 hover:bg-zinc-900/60"
                      aria-label="Copy email to clipboard"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </button>
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

          {/* Contact Form */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-[var(--color-fg)] mb-4">Send me a message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your Name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-md transition-all focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Your Email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-md transition-all focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Your Message"
                  required
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-md transition-all focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
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
      
      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </footer>
  );
};

export default Footer;