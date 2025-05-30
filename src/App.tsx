import React from "react";
import Header from "./components/Header";
import AnimatedBackground from "./components/AnimatedBackground";
// import Highlight from "./components/Highlight";
import Features from "./components/Features";
import "./App.css";
import MainSection from "./components/MainSection";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <MainSection />
      <div className="mt-20">
        <AnimatedBackground />
      </div>

      {/* <Highlight /> */}
      <Features />
    </>
  );
};

export default App;
