import { useTranslation } from "react-i18next";

const Education = () => {
  const { t } = useTranslation();

  return (
    <section
      id="educacao"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-secondary font-heading text-center mb-12 sm:mb-16">
          {t("education.title")}
        </h2>

        <div className="border border-secondary/15 bg-black/30 backdrop-blur-sm rounded-lg p-6 sm:p-8 max-w-2xl mx-auto text-center">
          <h3 className="text-lg sm:text-xl font-heading font-semibold text-secondary">
            {t("education.degree")}
          </h3>
          <p className="text-sm sm:text-base text-primary/80 font-body mt-2">
            {t("education.institution")}
          </p>
          <p className="text-sm text-primary/60 font-body mt-1">
            {t("education.period")}
          </p>
          <span className="inline-block mt-4 text-xs sm:text-sm bg-secondary/10 text-secondary border border-secondary/30 rounded-full px-4 py-1.5 font-body">
            {t("education.extra")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Education;
