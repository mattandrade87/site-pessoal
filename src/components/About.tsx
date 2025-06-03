import React from "react";
import avatar from "../assets/avatar.jpg";

const About: React.FC = () => {
  return (
    <section
      id="sobre-mim"
      className="relative -translate-y-50 bg-transparent px-6 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[500px]"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:min-h-[500px]">
        {/* Lado da Imagem */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-center">
          <img
            src={avatar}
            alt="Mateus Andrade"
            className="w-80 h-80 object-cover rounded-xl shadow-lg md:translate-x-8"
          />
        </div>

        {/* Lado do Texto */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-base sm:text-lg md:text-xl text-primary space-y-6">
          <h1 className="text-3xl sm:text-4xl text-secondary mb-6 text-left">
            Sobre Mim
          </h1>
          <p className="text-justify">
            Sou estudante de Sistemas de Informação na UFOP com experiência
            prática em desenvolvimento Full-stack (Back-end, Front-end e Mobile)
            para aplicações de e-commerce. Atuei como desenvolvedor freelancer
            e, atualmente, trabalho em uma grande empresa utilizando React e
            PHP.
          </p>
          <p className="text-justify">
            Em meus projetos, trabalhei com React, React Native, Node.js e
            TypeScript, além de PostgreSQL para gerenciamento de dados e Docker
            para deploy, sempre priorizando estabilidade e segurança. Sou
            apaixonado por tecnologia e busco constantemente aprender e inovar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
