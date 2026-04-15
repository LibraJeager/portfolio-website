import useReveal from "../../hooks/useReveal";

export default function Motivation() {
  const [motRef, motVisible] = useReveal({
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  });

  const visible = motVisible ? "is-visible" : "";

  return (
    <div ref={motRef} className="about-block">
      <div className={`reveal ${visible}`}>
        <div className="flex items-center gap-5">
          <p className="text-[11px] uppercase tracking-[0.38em] theme-text-faint">
            02 / Motivation
          </p>
          <span className="theme-line h-px flex-1" />
        </div>
      </div>

      <div className="mt-14 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <h3
            className={`reveal reveal-delay-1 text-[2rem] font-extralight leading-[1.02] tracking-[-0.05em] theme-text-strong sm:text-[2.4rem] ${visible}`}
          >
            I care about how insight
            <br />
            is felt, not only found.
          </h3>

          <p
            className={`reveal reveal-delay-2 mt-8 max-w-[560px] text-[1.02rem] font-light leading-9 tracking-[-0.015em] theme-text-soft sm:text-[1.12rem] ${visible}`}
          >
            What keeps me close to data is not only analysis itself, but the
            possibility of presenting complexity in a way that feels clear, calm,
            and genuinely useful.
          </p>

          <p
            className={`reveal reveal-delay-3 mt-6 max-w-[560px] text-sm leading-8 theme-text-muted sm:text-base ${visible}`}
          >
            This portfolio is where that interest becomes visible — a space
            shaped by both analytical thinking and visual sensitivity, where
            structure supports meaning instead of overpowering it.
          </p>

          <p
            className={`reveal reveal-delay-4 mt-6 max-w-[560px] text-sm leading-8 theme-text-muted sm:text-base ${visible}`}
          >
            I am especially drawn to work that translates patterns into
            narratives people can quickly trust, revisit, and act on with more
            confidence.
          </p>
        </div>

        <div className={`reveal reveal-delay-3 ${visible}`}>
          <div className="motivation-image-wrapper relative overflow-hidden rounded-[2rem]">
            <div className="relative aspect-[16/10] w-full">
              <div className="motivation-visual">
                <div className="motivation-grid">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div
                      key={index}
                      className="motivation-grid-item"
                      style={{
                        animationDelay: `${index * 180}ms`,
                        opacity: 0.12 + (index % 4) * 0.045,
                      }}
                    />
                  ))}
                </div>

                <div className="motivation-overlay" />

                <div className="motivation-caption">
                  <p className="text-[10px] uppercase tracking-[0.28em] theme-text-faint">
                    data × narrative × interface
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.28em] theme-text-faint">
                    shaped with restraint
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}