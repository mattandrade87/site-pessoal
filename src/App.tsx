import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { LanguageSwitcher } from "./components/layout/LanguageSwitcher";
import MainSection from "./components/sections/MainSection";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import AnimatedBackground from "./components/ui/AnimatedBackground";
import TechStackCarousel from "./components/ui/TechStackCarousel";
import "./App.css";

function App() {
  return (
    <div className="relative">
      <Header />
      <div className="fixed top-18 right-4 z-[700]">
        <LanguageSwitcher />
      </div>
      <MainSection />
      <AnimatedBackground />
      <About />
      <Experience />
      <Skills />
      <TechStackCarousel />
      <Projects />
      <Education />
      <Footer />
    </div>
  );
}

export default App;
