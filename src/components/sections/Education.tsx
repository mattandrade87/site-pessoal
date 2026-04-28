import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faLanguage, faCertificate } from "@fortawesome/free-solid-svg-icons";

const Education = () => {
  const { t } = useTranslation();
  const certifications = t("education.certifications", { returnObjects: true }) as string[];

  return (
    <section
      id="educacao"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-secondary font-heading text-center mb-12 sm:mb-16">
          {t("education.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-secondary/15 bg-black/30 backdrop-blur-sm rounded-xl p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/30 text-secondary">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <h3 className="text-base sm:text-lg font-heading font-semibold text-secondary">
                {t("education.degree")}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-primary/85 font-body">
              {t("education.institution")}
            </p>
            <p className="text-xs sm:text-sm text-primary/60 font-body mt-1">
              {t("education.period")}
            </p>

            <div className="mt-5 pt-5 border-t border-secondary/15 flex items-start gap-3">
              <FontAwesomeIcon icon={faLanguage} className="text-secondary mt-1" />
              <p className="text-sm text-primary/80 font-body">
                {t("education.languages")}
              </p>
            </div>
          </div>

          <div className="border border-secondary/15 bg-black/30 backdrop-blur-sm rounded-xl p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/30 text-secondary">
                <FontAwesomeIcon icon={faCertificate} />
              </div>
              <h3 className="text-base sm:text-lg font-heading font-semibold text-secondary">
                {t("education.certificationsTitle")}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {certifications.map((cert, i) => (
                <li
                  key={i}
                  className="text-sm text-primary/85 font-body flex items-start gap-2 leading-relaxed"
                >
                  <span className="text-secondary mt-2 text-[7px] shrink-0">&#9670;</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
