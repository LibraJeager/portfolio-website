import useReveal from "../../hooks/useReveal";
import Motivation from "./Motivation";
import Skills from "./Skills";

const notes = [
  "Curiosity first, then structure.",
  "Clarity matters as much as accuracy.",
  "I want data work to feel calm, useful, and human.",
];

export default function About() {
  const [aboutRef, aboutVisible] = useReveal({
    threshold: 0.12,
    rootMargin: "0px 0px -12% 0px",
  });

  const visible = aboutVisible ? "is-visible" : "";

  return (
    <section
      id="about"
      className="border-t theme-border px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="about-stack max-w-7xl">
        <div ref={aboutRef} className="about-block">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p
                className={`reveal text-[11px] uppercase tracking-[0.38em] theme-text-faint ${visible}`}
              >
                01 / About
              </p>

              <h2
                className={`reveal reveal-delay-1 mt-6 text-4xl font-extralight leading-[0.96] tracking-[-0.06em] theme-text-strong sm:text-5xl lg:text-[3.5rem] ${visible}`}
              >
                Soft-spoken,
                <br />
                sharp-minded.
              </h2>

              <p
                className={`reveal reveal-delay-2 mt-8 max-w-sm text-sm leading-8 theme-text-muted sm:text-base ${visible}`}
              >
                I feel most at home where observation meets intention — somewhere
                between numbers, nuance, and narrative.
              </p>
            </div>

            <div>
              <div
                className={`reveal reveal-delay-2 border-t theme-border pt-6 ${visible}`}
              >
                <div className="flex items-center gap-5">
                  <h3 className="text-[1.9rem] font-extralight tracking-[-0.05em] theme-text-strong">
                    About Me
                  </h3>
                  <span className="theme-line h-px flex-1" />
                </div>

                <p className="mt-10 max-w-[620px] text-[1.05rem] font-light leading-9 tracking-[-0.015em] theme-text-soft sm:text-[1.15rem]">
                  I am growing as a Data Analyst / Data Science Intern through
                  projects that blend clean logic, visual clarity, and thoughtful
                  storytelling.
                </p>

                <p className="mt-8 max-w-[620px] text-sm leading-8 theme-text-muted sm:text-base">
                  What draws me to data is the quiet discipline of asking better
                  questions, listening to the signal beneath the noise, and
                  shaping answers that feel grounded and easy to follow.
                </p>

                <p className="mt-6 max-w-[620px] text-sm leading-8 theme-text-muted sm:text-base">
                  I am especially interested in Python, SQL, dashboards, and
                  early-stage machine learning — not only as tools, but as ways
                  to make insight more tangible.
                </p>
              </div>

              <div className="mt-14">
                {notes.map((item, index) => (
                  <div
                    key={item}
                    className={`reveal border-t theme-border py-5 text-sm leading-8 theme-text-soft ${visible}`}
                    style={{ transitionDelay: `${320 + index * 110}ms` }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div
                className={`reveal mt-10 text-[11px] uppercase tracking-[0.34em] theme-text-faint ${visible}`}
                style={{ transitionDelay: "620ms" }}
              >
                Python · SQL · Power BI · Pandas · Machine Learning
              </div>
            </div>
          </div>
        </div>

        <Motivation />
        <Skills />
      </div>
    </section>
  );
}