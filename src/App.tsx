import React from "react";
import Header from "./components/Header";
import AnimatedBackground from "./components/AnimatedBackground";
import "./App.css";
import MainSection from "./components/MainSection";
import About from "./components/About";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <MainSection />
      <div className="mt-20">
        <AnimatedBackground />
      </div>

      <About />
    </>
  );
};

export default App;
