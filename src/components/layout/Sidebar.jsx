import { Facebook, Github, Linkedin, Mail } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#projects" },
];

const socialItems = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/libra173/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Swan1703/",
    icon: Facebook,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/LibraJeager",
    icon: Github,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:thanhcong.master01@gmail.com",
    icon: Mail,
    external: false,
  },
];

export default function Sidebar({ theme, toggleTheme }) {
  return (
    <>
      <aside className="theme-sidebar hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-[220px] lg:flex-col lg:justify-between lg:border-r lg:px-12 lg:py-12 lg:backdrop-blur">
        <div className="space-y-14">
          <nav className="space-y-5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-cursor="link"
                className="theme-nav-link group flex items-center gap-3 text-sm uppercase tracking-[0.18em]"
              >
                <span className="theme-nav-line" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="space-y-5 pt-2">
            {socialItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  data-cursor="icon"
                  className="theme-icon-link block w-fit"
                >
                  <Icon size={20} strokeWidth={1.55} />
                </a>
              );
            })}
          </div>
        </div>

        <p className="text-xs theme-text-quiet">© Thanh Cong</p>
      </aside>

      <header className="theme-mobile-header sticky top-0 z-50 flex items-center justify-between border-b px-6 py-4 backdrop-blur lg:hidden">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] theme-text-faint">
            Portfolio
          </p>
          <h1 className="text-base font-light tracking-[-0.04em] theme-text-strong">
            Thanh Cong
          </h1>
          <p className="text-[10px] uppercase tracking-[0.25em] theme-text-faint">
            Libra
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="text-[10px] uppercase tracking-[0.25em] theme-text-faint">
            Mode
          </span>
          <ThemeToggle
            theme={theme}
            toggleTheme={toggleTheme}
            compact
            className="lg:hidden"
          />
        </div>
      </header>
    </>
  );
}