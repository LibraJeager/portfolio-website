import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/projects";

const toneClassMap = {
  cool: "project-tone-cool",
  violet: "project-tone-violet",
  sage: "project-tone-sage",
};

function getPolylinePoints(
  values,
  width = 440,
  height = 220,
  paddingX = 26,
  paddingY = 22,
) {
  const count = values.length;
  const stepX = (width - paddingX * 2) / Math.max(count - 1, 1);

  return values
    .map((value, index) => {
      const x = paddingX + stepX * index;
      const y = height - paddingY - (value / 100) * (height - paddingY * 2);
      return `${x},${y}`;
    })
    .join(" ");
}

function VisualBars({ project }) {
  const points = getPolylinePoints(project.previewBars, 440, 220, 28, 22);

  return (
    <div className="absolute inset-x-6 bottom-6 top-14">
      <svg
        viewBox="0 0 440 220"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <polyline
          points={points}
          fill="none"
          stroke="var(--project-accent)"
          strokeWidth="1.45"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.66"
        />
      </svg>

      <div className="relative z-10 flex h-full items-end gap-3">
        {project.previewBars.map((bar, index) => (
          <div
            key={`${project.id}-bar-${index}`}
            className="project-signal relative flex-1 overflow-hidden rounded-t-[999px] transition-all duration-700"
            style={{
              height: `${bar}%`,
              background:
                "linear-gradient(180deg, var(--project-accent) 0%, var(--project-accent-soft) 100%)",
              boxShadow: "0 0 0 1px var(--project-accent-soft) inset",
            }}
          >
            <span
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "var(--project-accent-line)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualSegments({ project }) {
  return (
    <div className="absolute inset-x-6 bottom-6 top-14 flex flex-col justify-center gap-4">
      {project.previewBars.slice(0, 5).map((value, index) => (
        <div
          key={`${project.id}-segment-${index}`}
          className="grid grid-cols-[68px_1fr_auto] items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.22em] theme-text-faint">
            {project.segmentLabels[index]}
          </span>

          <div className="theme-track h-[6px] overflow-hidden rounded-full">
            <div
              className="project-signal h-full rounded-full transition-all duration-700"
              style={{
                width: `${value}%`,
                background:
                  "linear-gradient(90deg, var(--project-accent) 0%, var(--project-accent-soft) 100%)",
                boxShadow: "0 0 0 1px var(--project-accent-soft) inset",
              }}
            />
          </div>

          <span className="text-[10px] uppercase tracking-[0.22em] theme-text-faint">
            {value}%
          </span>
        </div>
      ))}
    </div>
  );
}

function VisualForecast({ project }) {
  const points = getPolylinePoints(project.previewBars, 440, 220, 26, 24);

  return (
    <div className="absolute inset-x-5 bottom-5 top-12">
      <svg viewBox="0 0 440 220" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient
            id={`forecast-fill-${project.id}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--project-accent)"
              stopOpacity="0.18"
            />
            <stop
              offset="100%"
              stopColor="var(--project-accent)"
              stopOpacity="0.02"
            />
          </linearGradient>
        </defs>

        <polygon
          points={`26,196 ${points} 414,196`}
          fill={`url(#forecast-fill-${project.id})`}
        />

        <polyline
          className="project-signal"
          points={points}
          fill="none"
          stroke="var(--project-accent)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.74"
        />

        {project.previewBars.map((value, index) => {
          const x =
            26 +
            ((440 - 52) / Math.max(project.previewBars.length - 1, 1)) * index;
          const y = 220 - 24 - (value / 100) * (220 - 48);

          return (
            <circle
              className="project-signal"
              key={`${project.id}-dot-${index}`}
              cx={x}
              cy={y}
              r="2.1"
              fill="var(--project-accent)"
              opacity="0.86"
            />
          );
        })}

        <rect
          x="338"
          y="26"
          width="76"
          height="170"
          fill="var(--project-accent-soft)"
          opacity="0.78"
          rx="16"
        />
      </svg>
    </div>
  );
}

function CanvasVisual({ project }) {
  if (project.visualType === "segments") {
    return <VisualSegments project={project} />;
  }

  if (project.visualType === "forecast") {
    return <VisualForecast project={project} />;
  }

  return <VisualBars project={project} />;
}

function ProjectPreview({ project }) {
  const toneClass = toneClassMap[project.tone] || toneClassMap.cool;

  return (
    <div
      className={`project-preview relative mx-auto w-full max-w-[680px] xl:max-w-[730px] ${toneClass}`}
    >
      <div className="theme-preview-glow pointer-events-none absolute -inset-12 rounded-full blur-3xl transition-all duration-700" />

      <div
        key={project.id}
        className="scene-soft-scale theme-preview-shell relative rounded-[2.1rem] border p-[18px]"
        style={{ boxShadow: "var(--project-shell-shadow)" }}
      >
        <div className="theme-preview-frame overflow-hidden rounded-[1.65rem] border">
          <div className="border-b theme-border px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.34em] theme-text-faint">
                  {project.previewLabel}
                </p>
                <p className="mt-2 text-sm font-light theme-text-soft">
                  {project.previewTitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {project.previewTags.map((tag) => (
                  <span
                    key={tag}
                    data-cursor="tag"
                    className="project-meta-chip theme-preview-meta rounded-full border px-3 py-1 text-[9px] uppercase tracking-[0.26em] theme-text-faint"
                    style={{ boxShadow: "var(--project-card-shadow)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div
              data-cursor="canvas"
              className="project-canvas-hover theme-preview-panel relative h-[330px] overflow-hidden rounded-[1.35rem] border px-5 py-5"
              style={{ boxShadow: "var(--project-canvas-shadow)" }}
            >
              <div className="pointer-events-none absolute inset-x-5 bottom-5 top-5 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((line) => (
                  <span
                    key={`${project.id}-grid-${line}`}
                    className="project-grid-line theme-preview-grid-line"
                  />
                ))}
              </div>

              <div className="absolute left-5 top-5 flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--project-accent)" }}
                />
                <p className="text-[10px] uppercase tracking-[0.26em] theme-text-faint">
                  {project.canvasLabel}
                </p>
              </div>

              <div className="project-canvas-motion">
                <CanvasVisual project={project} />
              </div>

              <div className="absolute inset-x-5 bottom-4 flex items-center justify-between gap-4 border-t theme-border pt-3">
                <p className="text-[10px] uppercase tracking-[0.24em] theme-text-faint">
                  {project.canvasFootnoteLeft}
                </p>
                <p className="text-[10px] uppercase tracking-[0.24em] theme-text-faint">
                  {project.canvasFootnoteRight}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="theme-preview-meta rounded-[1rem] border px-4 py-3.5"
                  style={{ boxShadow: "var(--project-card-shadow)" }}
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] theme-text-faint">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-sm font-light theme-text-soft">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t theme-border pt-5">
              <p className="max-w-[560px] text-sm font-light leading-7 theme-text-muted">
                {project.previewNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const nextIndex = Number(visibleEntries[0].target.dataset.index);
        setActiveIndex(nextIndex);
      },
      {
        threshold: [0.35, 0.55, 0.75],
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const handleSelectProject = (index) => {
    const targetNode = stepRefs.current[index];

    if (!targetNode) {
      setActiveIndex(index);
      return;
    }

    const offsetTop = targetNode.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      className="relative border-t theme-border"
      style={{ minHeight: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full items-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
            <ProjectPreview project={activeProject} />

            <div className="lg:pl-1">
              <div className="border-t theme-border pt-6">
                <div className="flex items-center gap-5">
                  <h2 className="text-[1.8rem] font-extralight tracking-[-0.05em] theme-text-strong">
                    Works
                  </h2>
                  <span className="theme-line h-px flex-1" />
                  <span className="text-sm theme-text-faint">/libra</span>
                </div>

                <div key={activeProject.id} className="scene-fade-up">
                  <p className="mt-12 text-[12px] uppercase tracking-[0.36em] theme-text-faint">
                    [ {activeProject.index} /{" "}
                    {String(projects.length).padStart(2, "0")} ]
                  </p>

                  <h3 className="mt-6 max-w-[520px] text-[clamp(2.15rem,4.05vw,3.75rem)] font-extralight leading-[1.04] tracking-[-0.052em] theme-text-strong">
                    {activeProject.title}
                  </h3>

                  <p className="mt-4 text-[1rem] font-light theme-text-soft">
                    {activeProject.category}
                  </p>

                  <p className="mt-7 max-w-[520px] text-sm leading-8 theme-text-muted sm:text-base">
                    {activeProject.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {activeProject.stack.map((item) => (
                      <span
                        key={item}
                        data-cursor="tag"
                        className="project-meta-chip theme-preview-meta rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] theme-text-soft"
                        style={{ boxShadow: "var(--project-card-shadow)" }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-11 border-t theme-border pt-6">
                  <div className="space-y-1">
                    {projects.map((project, index) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => handleSelectProject(index)}
                        data-cursor="project"
                        className={`project-row group flex w-full items-center gap-4 border-b py-4 text-left transition-[opacity,transform,color] duration-500 ${
                          activeIndex === index
                            ? "theme-text-strong opacity-100"
                            : "theme-text-faint opacity-70 hover:opacity-100"
                        }`}
                        style={{ borderColor: "var(--line-soft)" }}
                      >
                        <span className="project-row-line" />

                        <div className="min-w-[42px] text-[11px] uppercase tracking-[0.28em]">
                          {project.index}
                        </div>

                        <p className="text-[0.96rem] font-light tracking-[-0.02em]">
                          {project.title}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <p className="mt-6 text-[0.9rem] italic theme-text-faint opacity-70">
                  Scroll to move quietly through each project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(node) => {
              stepRefs.current[index] = node;
            }}
            data-index={index}
            className="h-screen"
          />
        ))}
      </div>
    </section>
  );
}
