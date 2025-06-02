import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contato"
      className="w-full bg-black/50 backdrop-blur-sm py-12 px-4 md:px-8 lg:px-15"
    >
      <div className="max-w-6xl mx-auto">
        {/* Seção de Contato */}
        <div className="flex flex-col items-start gap-6 mb-12">
          {/* Email */}
          <a
            href="mailto:mateus.vitor.andrade@gmail.com"
            className="flex items-center gap-3 text-primary hover:text-secondary transition-colors duration-300"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-2xl text-secondary"
            />
            <span className="text-sm md:text-base">
              mateus.vitor.andrade@gmail.com
            </span>
          </a>

          {/* Telefone */}
          <a
            href="tel:+5531986039374"
            className="flex items-center gap-3 text-primary hover:text-secondary transition-colors duration-300"
          >
            <FontAwesomeIcon
              icon={faPhone}
              className="text-2xl text-secondary"
            />
            <span className="text-sm md:text-base">+55 (31) 98603-9374</span>
          </a>

          {/* Redes Sociais */}
          <a
            href="https://www.instagram.com/matt.andrade87/?igsh=c2xydjBmZzRpdjEz&utm_source=qr#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-secondary hover:text-primary transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
            <span className="text-sm md:text-base text-primary">Instagram</span>
          </a>
        </div>

        {/* Linha Divisória */}
        <div className="w-full h-px bg-secondary/20 mb-8"></div>

        {/* Copyright e Botão Voltar ao Topo */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary text-sm">© {currentYear}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 cursor-pointer text-primary hover:text-secondary transition-colors duration-300"
          >
            <span className="text-sm">Voltar ao topo</span>
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-lg animate-bounce"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
