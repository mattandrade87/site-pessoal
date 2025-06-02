import React from "react";

const About: React.FC = () => {
  return (
    <section className="relative bg-transparent px-6 py-12 sm:py-16 md:py-20 lg:py-24">
      <h1 className="text-3xl sm:text-4xl text-secondary text-center mb-10">
        Sobre Mim
      </h1>
      <div className="text-base sm:text-lg md:text-xl text-primary space-y-6 max-w-4xl mx-auto">
        <p>
          Sou estudante de Sistemas de Informação na Universidade Federal de
          Ouro Preto, com experiência prática no desenvolvimento de aplicações
          de e-commerce, abrangendo as áreas de Back-end, Front-end e Mobile.
        </p>
        <p>
          Ao longo dos meus projetos, trabalhei com tecnologias como React,
          React Native, Node.js e TypeScript, garantindo soluções responsivas e
          uma experiência de usuário fluida. Na parte de banco de dados,
          integrei o PostgreSQL para o gerenciamento eficiente de informações de
          SignUp e Login, e utilizei Docker para garantir a portabilidade e
          facilidade nos processos de deploy, sempre priorizando estabilidade e
          segurança.
        </p>
        <p>
          Sou apaixonado por desenvolvimento de software, estou em constante
          aprendizado e busco sempre explorar novas tecnologias e aprimorar
          minhas habilidades para oferecer soluções inovadoras e de alta
          qualidade.
        </p>
      </div>
    </section>
  );
};

export default About;
