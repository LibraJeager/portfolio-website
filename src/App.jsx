import Sidebar from "./components/layout/sidebar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Motivation from "./components/sections/Motivation";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Footer from "./components/sections/Footer";
import ThemeToggle from "./components/ui/ThemeToggle";
import useTheme from "./hooks/useTheme";
import CustomCursor from "./components/ui/CustomCursor";
import MouseGlow from "./components/ui/MouseGlow";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-transparent text-inherit">
      <MouseGlow />
      <CustomCursor />

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <Sidebar theme={theme} toggleTheme={toggleTheme} />

      <main className="lg:ml-[220px]">
        <Hero />
        <About />
        <Motivation />
        <Skills />
        <Projects />
        <Footer />
      </main>
    </div>
  );
}
