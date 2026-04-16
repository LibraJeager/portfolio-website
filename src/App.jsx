import Sidebar from "./components/layout/Sidebar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Footer from "./components/sections/Footer";
import ThemeToggle from "./components/ui/ThemeToggle";
import useTheme from "./hooks/useTheme";
import CustomCursor from "./components/ui/CustomCursor";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-transparent text-inherit">
      <CustomCursor />

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Sidebar theme={theme} toggleTheme={toggleTheme} />

      <main className="lg:ml-[220px]">
        <Hero />
        <About />
        <Projects />
        <Footer />
      </main>
    </div>
  );
}