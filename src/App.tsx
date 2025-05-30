import React from "react";
import Header from "./components/Header";
import AnimatedBackground from "./components/AnimatedBackground";
import Highlight from "./components/Highlight";
import Features from "./components/Features";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <AnimatedBackground />
      <Highlight />
      <Features />
    </>
  );
};

export default App;
