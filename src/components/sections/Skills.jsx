import useReveal from "../../hooks/useReveal";

const skillCategories = [
  {
    title: "Frontend",
    items: ["JavaScript", "React.js", "HTML5 / CSS3", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend",
    items: ["Python", "SQL", "Node.js", "FastAPI", "Java"],
  },
  {
    title: "Tools",
    items: [
      "Power BI",
      "Git",
      "VS Code",
      "Figma",
      "Pandas",
      "Scikit-learn",
    ],
  },
];

export default function Skills() {
  const [skillsRef, skillsVisible] = useReveal({
    threshold: 0.1,
    rootMargin: "0px 0px -8% 0px",
  });

  const visible = skillsVisible ? "is-visible" : "";

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="border-t theme-border px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl">
        <div className={`reveal ${visible}`}>
          <p className="text-[11px] uppercase tracking-[0.38em] theme-text-faint">
            Skills
          </p>
        </div>

        <div className="mt-14 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-20">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`reveal ${visible}`}
              style={{ transitionDelay: `${120 + catIndex * 120}ms` }}
            >
              <h3 className="text-[1.4rem] font-extralight tracking-[-0.04em] theme-text-strong uppercase">
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
    </section>
  );
}
