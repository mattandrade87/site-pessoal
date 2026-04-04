import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faArrowUp,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
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
      className="w-full bg-black/50 backdrop-blur-sm py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-15"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-secondary font-heading text-center mb-10 sm:mb-12">
          {t("footer.contact")}
        </h2>

        <div className="flex flex-col items-start gap-4 sm:gap-5 mb-8 sm:mb-12">
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

          <a
            href="https://www.linkedin.com/in/mateus-andrade-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 text-primary hover:text-secondary transition-colors duration-300 font-body"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-xl sm:text-2xl text-secondary"
            />
            <span className="text-xs sm:text-sm md:text-base">
              LinkedIn
            </span>
          </a>

          <a
            href={curriculoPDF}
            download
            className="group flex items-center gap-2 sm:gap-3 text-primary hover:text-secondary transition-colors duration-300 font-body"
          >
            <FontAwesomeIcon
              icon={faFileDownload}
              className="text-xl sm:text-2xl text-secondary"
            />
            <span className="text-xs sm:text-sm md:text-base">
              {t("footer.curriculum")}
            </span>
          </a>

          <a
            href="https://www.instagram.com/mateusvsandrade"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 text-primary hover:text-secondary transition-colors duration-300 font-body"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-xl sm:text-2xl text-secondary"
            />
            <span className="text-xs sm:text-sm md:text-base">
              {t("footer.instagram")}
            </span>
          </a>
        </div>

        <div className="w-full h-px bg-secondary/20 mb-6 sm:mb-8"></div>

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
