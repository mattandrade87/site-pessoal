import React from "react";
import avatar from "../assets/avatar.jpg";

const About: React.FC = () => {
  return (
    <section
      id="sobre-mim"
      className="relative -translate-y-50 bg-transparent px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20 min-h-[500px]"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:min-h-[500px] gap-8 md:gap-12">
        {/* Lado da Imagem */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src={avatar}
            alt="Mateus Andrade"
            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Lado do Texto */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-sm sm:text-base md:text-lg text-primary space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-secondary mb-4 sm:mb-6 text-left">
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
