import Header from "./components/Header";
import AnimatedBackground from "./components/AnimatedBackground";
import "./App.css";
import MainSection from "./components/MainSection";
import About from "./components/About";
import TechStackCarousel from "./components/TechStackCarousel";
import Footer from "./components/Footer";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

function App() {
  return (
    <div className="relative">
      <Header />
      <div className="fixed top-18 right-4 z-[700]">
        <LanguageSwitcher />
      </div>
      <MainSection />
      <div className="mt-20">
        <AnimatedBackground />
      </div>
      <About />
      <TechStackCarousel />
      <Footer />
    </div>
  );
}

export default App;
