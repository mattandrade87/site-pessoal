import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faArrowUp,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import curriculoPDF from "/CurriculoMateusAndrade.pdf";

const Footer: React.FC = () => {
  const { t } = useTranslation();

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
      className="w-full bg-black/50 backdrop-blur-sm py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-15"
    >
      <div className="max-w-6xl mx-auto">
        {/* Seção de Contato */}
        <div className="flex flex-col items-start gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Email */}
          <a
            href="mailto:mateus.vitor.andrade@gmail.com"
            className="flex items-center gap-2 sm:gap-3 text-primary hover:text-secondary transition-colors duration-300 font-body"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-xl sm:text-2xl text-secondary"
            />
            <span className="text-xs sm:text-sm md:text-base break-all">
              mateus.vitor.andrade@gmail.com
            </span>
          </a>

          {/* Telefone */}
          <a
            href="tel:+5531986039374"
            className="flex items-center gap-2 sm:gap-3 text-primary hover:text-secondary transition-colors duration-300 font-body"
          >
            <FontAwesomeIcon
              icon={faPhone}
              className="text-xl sm:text-2xl text-secondary"
            />
            <span className="text-xs sm:text-sm md:text-base">
              +55 (31) 98603-9374
            </span>
          </a>

          {/* Currículo */}
          <a
            href={curriculoPDF}
            download
            className="group flex items-center gap-2 sm:gap-3 text-primary hover:text-secondary transition-colors duration-300 font-body"
          >
            <FontAwesomeIcon
              icon={faFileDownload}
              className="text-xl sm:text-2xl text-secondary transition-colors duration-300"
            />
            <span className="text-xs sm:text-sm md:text-base text-primary hover:text-secondary transition-colors duration-300">
              {t("footer.curriculum")}
            </span>
          </a>

          {/* Redes Sociais */}
          <a
            href="https://www.instagram.com/mateusvsandrade"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 text-secondary transition-colors duration-300 font-body"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-xl sm:text-2xl"
            />
            <span className="text-xs sm:text-sm md:text-base text-primary hover:text-secondary">
              {t("footer.instagram")}
            </span>
          </a>
        </div>

        {/* Linha Divisória */}
        <div className="w-full h-px bg-secondary/20 mb-6 sm:mb-8"></div>

        {/* Copyright e Botão Voltar ao Topo */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary text-xs sm:text-sm">© {currentYear}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 cursor-pointer text-primary hover:text-secondary transition-colors duration-300"
          >
            <span className="text-xs sm:text-sm">{t("footer.backToTop")}</span>
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-base sm:text-lg animate-bounce"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
