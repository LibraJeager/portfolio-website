import useReveal from "../../hooks/useReveal";

const skillCategories = [
  {
    title: "Data & Analysis",
    items: ["Python", "SQL", "Pandas", "EDA", "Scikit-learn"],
  },
  {
    title: "Visualization & Reporting",
    items: [
      "Power BI",
      "Dashboards",
      "Data Storytelling",
      "Insight Framing",
      "Presentation",
    ],
  },
  {
    title: "Build & Workflow",
    items: ["React", "Tailwind CSS", "Vite", "Git", "Figma"],
  },
];

export default function Skills() {
  const [skillsRef, skillsVisible] = useReveal({
    threshold: 0.1,
    rootMargin: "0px 0px -8% 0px",
  });

  const visible = skillsVisible ? "is-visible" : "";

  return (
    <div ref={skillsRef} className="about-block">
      <div className={`reveal ${visible}`}>
        <div className="flex items-center gap-5">
          <p className="text-[11px] uppercase tracking-[0.38em] theme-text-faint">
            03 / Skills
          </p>
          <span className="theme-line h-px flex-1" />
        </div>
      </div>

      <div className="mt-14 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-20">
        {skillCategories.map((category, catIndex) => (
          <div
            key={category.title}
            className={`reveal ${visible}`}
            style={{ transitionDelay: `${120 + catIndex * 120}ms` }}
          >
            <h3 className="text-[1.35rem] font-extralight tracking-[-0.04em] theme-text-strong">
              {category.title}
            </h3>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {category.items.map((item, itemIndex) => (
                <span
                  key={item}
                  data-cursor="tag"
                  className="skill-pill rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.2em] theme-text-soft"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-soft)",
                    transitionDelay: `${180 + catIndex * 80 + itemIndex * 40}ms`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}