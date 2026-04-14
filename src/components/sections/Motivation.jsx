import useReveal from "../../hooks/useReveal";

export default function Motivation() {
  const [motRef, motVisible] = useReveal({
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  });

  const visible = motVisible ? "is-visible" : "";

  return (
    <section
      id="motivation"
      ref={motRef}
      className="border-t theme-border px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl">
        <div className={`reveal ${visible}`}>
          <div className="flex items-center gap-5">
            <h2 className="text-[1.6rem] font-extralight tracking-[-0.04em] theme-text-strong uppercase">
              Motivation
            </h2>
            <span className="theme-line h-px flex-1" />
          </div>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <p
              className={`reveal reveal-delay-1 text-[1.05rem] font-light leading-9 tracking-[-0.015em] theme-text-soft sm:text-[1.15rem] ${visible}`}
            >
              I'm a data enthusiast with a growing focus on{" "}
              <span className="theme-text-strong">frontend development</span>.
            </p>

            <p
              className={`reveal reveal-delay-2 mt-6 text-sm leading-8 theme-text-muted sm:text-base ${visible}`}
            >
              While I'm still exploring where I want my career to evolve, I've
              discovered that building user interfaces is what excites me the
              most.
            </p>

            <p
              className={`reveal reveal-delay-3 mt-6 text-sm leading-8 theme-text-muted sm:text-base ${visible}`}
            >
              That's why I'm currently dedicating my energy to improving both my
              technical execution and design sensitivity on the frontend.
            </p>
          </div>

          <div className={`reveal reveal-delay-3 ${visible}`}>
            <div className="motivation-image-wrapper relative overflow-hidden rounded-2xl">
              <div className="aspect-[16/10] w-full bg-gradient-to-br from-[var(--surface-contrast)] to-[var(--surface-soft)] relative">
                {/* Cinematic photo placeholder - abstract visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="motivation-visual">
                    <div className="motivation-grid">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="motivation-grid-item"
                          style={{
                            animationDelay: `${i * 200}ms`,
                            opacity: 0.15 + (i % 4) * 0.15,
                          }}
                        />
                      ))}
                    </div>
                    <div className="motivation-overlay" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.28em] theme-text-faint">
                    Exploring the intersection
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.28em] theme-text-faint">
                    Data × Design
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
