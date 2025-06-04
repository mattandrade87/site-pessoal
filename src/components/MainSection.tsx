import { useTranslation } from "react-i18next";

const MainSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="inicio"
      className="relative left-4 sm:left-8 md:left-15 top-50 z-190 px-4 sm:px-6 md:px-8"
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-primary leading-tight tracking-tight">
        {t("main.title")}
        <br />
        <span className="text-secondary">{t("main.subtitle")}</span>
      </h1>

      <p className="mt-4 text-base sm:text-lg md:text-xl text-primary max-w-xl mx-4 sm:mx-8 md:mx-20">
        {t("main.description")}
      </p>
    </section>
  );
};

export default MainSection;
