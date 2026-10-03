import { portfolioData } from "../data/portfolioData";

const Learning = () => {
  const { currentlyLearning, nextGoals } = portfolioData.learning;

  return (
    <section
      id="learning"
      className="fade-in-reveal scroll-mt-16 border-t border-[var(--color-border)] pb-[var(--spacing-section)] pt-[var(--spacing-section)]"
    >
      <header className="mb-10">
        <p className="section-label mb-2">Learning log</p>
        <h2 className="section-title tone-on-scroll">Current focus</h2>
        <p className="mt-3 max-w-prose body-text">
          Sedang fokus belajar — transparan soal apa yang dikuasai dan apa yang masih
          dalam proses.
        </p>
      </header>

      <div className="mb-10 flex flex-col gap-6">
        <p className="section-label">Sedang dipelajari</p>
        {currentlyLearning.map((block, index) => (
          <div
            key={block.topic}
            className="card-surface fade-in-reveal rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md p-6 transition-all duration-500 hover:border-white/30 hover:bg-zinc-900/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            style={{ "--reveal-delay": `${index * 90}ms` }}
          >
            <h3 className="mb-3 text-sm font-semibold text-[var(--color-fg)]">
              {block.topic}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/10"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <p className="section-label mb-4">Next up</p>
        <ol className="flex flex-col gap-3">
          {nextGoals.map((goal, index) => (
            <li
              key={goal}
              className="flex items-center gap-4 text-sm text-[var(--color-fg)]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-xs font-medium text-[var(--color-muted)]">
                {index + 1}
              </span>
              {goal}
            </li>
          ))}
        </ol>
      </div>
      
      {/* Gradient Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Learning;
