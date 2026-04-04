import { useTranslation } from "react-i18next";
import avatar from "/avatar.jpg";

const About = () => {
  const { t } = useTranslation();

  return (
    <section
      id="sobre-mim"
      className="relative bg-transparent px-4 sm:px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:min-h-[500px] gap-8 md:gap-12">
        <div className="w-full md:w-1/2 flex items-center justify-center relative z-10">
          <img
            src={avatar}
            alt={t("main.title")}
            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center text-sm sm:text-base md:text-lg text-primary space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-secondary mb-4 sm:mb-6 text-left font-heading">
            {t("about.title")}
          </h2>
          <p className="text-justify font-body">{t("about.description")}</p>
          <p className="text-justify font-body">{t("about.description2")}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
