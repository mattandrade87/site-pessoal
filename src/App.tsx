import React from "react";
import Header from "./components/Header";
import AnimatedBackground from "./components/AnimatedBackground";
import "./App.css";
import MainSection from "./components/MainSection";
import About from "./components/About";
import TechStackCarousel from "./components/TechStackCarousel";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <MainSection />
      <div className="mt-20">
        <AnimatedBackground />
      </div>

      <About />

      <TechStackCarousel />

      <Footer />
    </>
  );
};

export default App;
