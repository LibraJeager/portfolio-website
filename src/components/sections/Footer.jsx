import useReveal from "../../hooks/useReveal";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const [footerRef, footerVisible] = useReveal({
    threshold: 0.15,
    rootMargin: "0px 0px -5% 0px",
  });

  const visible = footerVisible ? "is-visible" : "";

  return (
    <footer
      ref={footerRef}
      className="border-t theme-border px-6 py-20 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl">
        <div className="flex flex-col items-end gap-5">
          <a
            href="#projects"
            data-cursor="link"
            className={`reveal footer-nav-link group flex items-center gap-3 text-[1rem] font-light tracking-[-0.02em] theme-text-soft ${visible}`}
            style={{ transitionDelay: "80ms" }}
          >
            <span>Works</span>
            <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#about"
            data-cursor="link"
            className={`reveal footer-nav-link group flex items-center gap-3 text-[1rem] font-light tracking-[-0.02em] theme-text-soft ${visible}`}
            style={{ transitionDelay: "200ms" }}
          >
            <span>About</span>
            <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div
          className={`reveal mt-16 flex items-center justify-between border-t theme-border pt-6 ${visible}`}
          style={{ transitionDelay: "320ms" }}
        >
          <p className="text-xs theme-text-quiet">
            © {new Date().getFullYear()} Thanh Cong
          </p>
          <p className="text-[10px] uppercase tracking-[0.32em] theme-text-quiet">
            Libra
          </p>
        </div>
      </div>
    </footer>
  );
}
