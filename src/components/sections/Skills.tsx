import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faMobileScreen,
  faServer,
  faDatabase,
  faRoute,
  faRobot,
  faCloud,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Category {
  key: string;
  title: string;
  items: string[];
  icon: IconDefinition;
}

const CATEGORY_KEYS: { key: string; icon: IconDefinition }[] = [
  { key: "languages", icon: faCode },
  { key: "frontend", icon: faMobileScreen },
  { key: "backend", icon: faServer },
  { key: "database", icon: faDatabase },
  { key: "messaging", icon: faRoute },
  { key: "ai", icon: faRobot },
  { key: "devops", icon: faCloud },
  { key: "architecture", icon: faSitemap },
];

const Skills = () => {
  const { t } = useTranslation();

  const categories: Category[] = CATEGORY_KEYS.map(({ key, icon }) => ({
    key,
    icon,
    title: t(`skills.categories.${key}.title`),
    items: t(`skills.categories.${key}.items`, {
      returnObjects: true,
    }) as string[],
  }));

  return (
    <section
      id="habilidades"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-secondary font-heading text-center mb-12 sm:mb-16">
          {t("skills.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((category) => (
            <div
              key={category.key}
              className="border border-secondary/15 bg-black/30 backdrop-blur-sm rounded-xl p-5 hover:border-secondary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/30 text-secondary">
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <h3 className="text-base sm:text-lg font-heading font-semibold text-secondary">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs sm:text-sm bg-secondary/5 text-primary/80 border border-secondary/20 rounded-full px-2.5 py-1 font-body"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
