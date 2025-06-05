import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import avatar from "../assets/avatar.jpg";

const About: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Forçar a atualização das traduções quando o componente montar
    i18n.changeLanguage(i18n.language);
  }, [i18n]);

  return (
    <section
      id="sobre-mim"
      className="relative -translate-y-50 bg-transparent px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20 min-h-[500px]"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:min-h-[500px] gap-8 md:gap-12">
        {/* Lado da Imagem */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative z-10">
          <img
            src={avatar}
            alt={t("main.title")}
            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Lado do Texto */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-sm sm:text-base md:text-lg text-primary space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-secondary mb-4 sm:mb-6 text-left font-heading">
            {t("about.title")}
          </h1>
          <p className="text-justify font-body">{t("about.description")}</p>
          <p className="text-justify font-body">{t("about.description2")}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
