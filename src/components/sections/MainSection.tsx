import { useTranslation } from "react-i18next";
import Highlights from "./Highlights";

const MainSection = () => {
  const { t } = useTranslation();

  const scrollToExperience = () => {
    const element = document.getElementById("experiencia");
    if (element) {
      const offset = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative z-10 min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24"
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-primary leading-tight tracking-tight">
        {t("main.title")}
        <br />
        <span className="text-secondary">{t("main.subtitle")}</span>
      </h1>

      <p className="mt-4 text-base sm:text-lg md:text-xl text-primary/80 max-w-xl font-body">
        {t("main.description")}
      </p>

      <button
        onClick={scrollToExperience}
        className="mt-6 w-fit bg-secondary text-background font-heading font-semibold rounded-lg px-6 py-3 text-sm sm:text-base hover:bg-secondary/80 transition-colors duration-300 cursor-pointer"
      >
        {t("main.cta")}
      </button>

      <Highlights />
    </section>
  );
};

export default MainSection;
