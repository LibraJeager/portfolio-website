export default function ThemeToggle({
  theme,
  toggleTheme,
  compact = false,
  className = "",
}) {
  const isLight = theme === "light";

  const shellClass = compact
    ? "relative inline-flex h-[32px] w-[72px] shrink-0 items-center rounded-full border px-[3px]"
    : "fixed top-5 right-5 z-[100] hidden h-[36px] w-[82px] items-center rounded-full border px-[3px] lg:inline-flex xl:top-6 xl:right-6";

  const knobClass = compact
    ? isLight
      ? "translate-x-[40px]"
      : "translate-x-0"
    : isLight
      ? "translate-x-[46px]"
      : "translate-x-0";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={isLight}
      data-cursor="control"
      className={`theme-toggle ${shellClass} ${className}`}
    >
      <span
        className={`theme-toggle-mark absolute left-[12px] top-1/2 -translate-y-1/2 ${
          isLight ? "opacity-35" : "opacity-90"
        }`}
      />

      <span
        className={`theme-toggle-mark absolute right-[12px] top-1/2 -translate-y-1/2 ${
          isLight ? "opacity-90" : "opacity-35"
        }`}
      />

      <span className="theme-toggle-rail pointer-events-none absolute inset-x-[14px] top-1/2 h-px -translate-y-1/2" />

      <span
        className={`theme-toggle-knob relative z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full transition-all duration-300 ${knobClass}`}
      >
        <span className="theme-toggle-core h-[4px] w-[4px] rounded-full" />
      </span>
    </button>
  );
}