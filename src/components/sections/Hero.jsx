import useReveal from "../../hooks/useReveal";

const signature = "Where numbers whisper, clearer meanings rise.";

export default function Hero() {
  const [heroRef, heroVisible] = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -10% 0px",
  });

  const visible = heroVisible ? "is-visible" : "";

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-20 sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="theme-ambient-orb ambient-orb absolute left-[10%] top-[16%] h-36 w-36 rounded-full blur-3xl" />
        <div className="theme-ambient-orb ambient-orb ambient-delay-1 absolute right-[10%] top-[18%] h-64 w-64 rounded-full blur-3xl" />
        <div className="theme-ambient-orb ambient-orb ambient-delay-2 absolute bottom-[12%] left-[34%] h-48 w-48 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-20">
          <div>
            <div className={`reveal ${visible}`}>
              <div className="mb-10 flex items-center gap-4">
                <span className="line-grow theme-line-strong h-px w-12" />
                <p className="text-[11px] uppercase tracking-[0.38em] theme-text-faint">
                  Libra / Portfolio / 2026
                </p>
              </div>
            </div>

            <div className="max-w-[560px]">
              <h1
                className={`reveal text-[clamp(3.7rem,6vw,5.35rem)] font-thin uppercase leading-[0.92] tracking-[-0.075em] theme-text-strong ${visible}`}
              >
                Thanh
              </h1>

              <h1
                className={`reveal reveal-delay-1 text-[clamp(3.7rem,6vw,5.35rem)] font-thin uppercase leading-[0.92] tracking-[-0.075em] theme-text-strong ${visible}`}
              >
                Cong
              </h1>
            </div>

            <div
              className={`reveal reveal-delay-2 mt-8 border-t theme-border pt-6 ${visible}`}
            >
              <p className="text-[11px] uppercase tracking-[0.38em] theme-text-faint">
                Data Analyst / Data Science Intern
              </p>

              <p className="mt-6 max-w-[520px] text-[1.45rem] font-light leading-[1.62] tracking-[-0.03em] theme-text-soft sm:text-[1.65rem]">
                I like turning raw data into
                <span className="ml-2 font-serif italic theme-text-strong">
                  quiet clarity
                </span>
                , useful stories, and decisions people can trust.
              </p>

              <p className="mt-6 max-w-[500px] text-sm leading-8 theme-text-muted sm:text-base">
                I am building a portfolio shaped by both analysis and intention
                — a space where data feels clear, thoughtful, and a little more
                human.
              </p>

              <p className="mt-6 text-sm font-light italic tracking-[0.04em] theme-text-soft">
                {signature}
              </p>
            </div>

            <div
              className={`reveal reveal-delay-3 mt-10 flex flex-wrap gap-6 ${visible}`}
            >
              <a
                href="#about"
                className="theme-editorial-link"
                data-cursor="link"
              >
                About
              </a>

              <a
                href="#projects"
                className="theme-editorial-link"
                data-cursor="link"
              >
                Projects
              </a>
            </div>

            <div
              className={`reveal reveal-delay-4 mt-14 text-sm leading-8 theme-text-muted ${visible}`}
            >
              For opportunities, say hello at
              <br />
              <a
                href="mailto:thanhcong.master01@gmail.com"
                className="theme-inline-link"
                data-cursor="link"
              >
                thanhcong.master01@gmail.com
              </a>
            </div>
          </div>

          <div className={`reveal reveal-delay-3 ${visible}`}>
            <div className="border-t theme-border pt-6">
              <div className="flex items-center gap-5">
                <h2 className="text-[1.9rem] font-extralight tracking-[-0.05em] theme-text-strong">
                  A Quiet Profile
                </h2>
                <span className="theme-line h-px flex-1" />
              </div>

              <p className="mt-10 max-w-[500px] text-lg font-light leading-9 tracking-[-0.02em] theme-text-soft sm:text-[1.15rem]">
                I am Thanh Cong, and Libra is the quieter rhythm behind the way
                I think — reflective, curious, and always drawn to clarity.
              </p>

              <p className="mt-8 max-w-[520px] text-sm leading-8 theme-text-muted sm:text-base">
                What keeps me close to data is not only the logic, but the
                possibility of turning complexity into something calm, useful,
                and easy to understand.
              </p>

              <p className="mt-6 max-w-[520px] text-sm leading-8 theme-text-muted sm:text-base">
                I like work that begins with questions, follows subtle patterns,
                and ends in insights that feel simple, grounded, and human.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
