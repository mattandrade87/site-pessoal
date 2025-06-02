import React from "react";

const About: React.FC = () => {
  return (
    <section className="relative bg-transparent px-6 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[500px]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:min-h-[500px]">
        {/* Lado da Imagem */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-center">
          <img
            src="/avatar.jpg" // Substitua com seu caminho
            alt="Mateus Andrade"
            className="w-64 h-64 object-cover rounded-xl shadow-lg md:translate-x-8"
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
            Ao longo dos meus projetos, utilizei tecnologias como React e React
            Native para criar soluções responsivas e que garantem uma
            experiência de usuário fluida, e Node.js com TypeScript no
            desenvolvimento de APIs robustas. No gerenciamento de dados,
            integrei o PostgreSQL para sistemas de autenticação, como SignUp e
            Login, e empreguei Docker para assegurar a portabilidade e facilitar
            os processos de deploy, sempre com foco em estabilidade e segurança
            das aplicações. Sou apaixonado por desenvolvimento de software,
            busco constante aprendizado e estou sempre explorando novas
            tecnologias para entregar soluções inovadoras e de alta qualidade.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
