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
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <Header />
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
