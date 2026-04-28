import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faFileDownload, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import curriculoPDF from "/CurriculoMateusAndrade.pdf";
import Highlights from "./Highlights";

const MainSection = () => {
  const { t } = useTranslation();
  const specialties = t("main.specialties", { returnObjects: true }) as string[];

  const scrollToExperience = () => {
    const element = document.getElementById("cases");
    if (element) {
      const offset = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative z-10 min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 pt-24 pb-12"
    >
      <span className="inline-flex items-center gap-2 w-fit rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs sm:text-sm text-secondary font-body backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary"></span>
        </span>
        {t("main.available")}
      </span>

      <h1 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-primary leading-tight tracking-tight">
        {t("main.title")}
        <br />
        <span className="text-secondary">{t("main.subtitle")}</span>
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {specialties.map((label) => (
          <span
            key={label}
            className="rounded-full border border-secondary/30 bg-black/30 px-3 py-1 text-xs sm:text-sm text-primary/80 font-body backdrop-blur-sm"
          >
            {label}
          </span>
        ))}
      </div>

      <p className="mt-5 text-base sm:text-lg md:text-xl text-primary/80 max-w-2xl font-body">
        {t("main.description")}
      </p>

      <p className="mt-3 inline-flex items-center gap-2 text-sm text-primary/60 font-body">
        <FontAwesomeIcon icon={faLocationDot} className="text-secondary" />
        {t("main.location")}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={scrollToExperience}
          className="inline-flex items-center gap-2 bg-secondary text-background font-heading font-semibold rounded-lg px-5 sm:px-6 py-3 text-sm sm:text-base hover:bg-secondary/80 transition-colors duration-300 cursor-pointer"
        >
          {t("main.cta")}
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <a
          href={curriculoPDF}
          download
          className="inline-flex items-center gap-2 border border-secondary/40 text-primary font-heading font-semibold rounded-lg px-5 sm:px-6 py-3 text-sm sm:text-base hover:bg-secondary/10 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faFileDownload} />
          {t("main.ctaResume")}
        </a>
      </div>

      <Highlights />
    </section>
  );
};

export default MainSection;
