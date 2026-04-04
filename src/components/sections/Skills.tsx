import { useTranslation } from "react-i18next";

interface Category {
  title: string;
  items: string[];
}

const CATEGORY_KEYS = [
  "languages",
  "frontend",
  "backend",
  "database",
  "devops",
  "other",
] as const;

const Skills = () => {
  const { t } = useTranslation();

  const categories: Category[] = CATEGORY_KEYS.map((key) => ({
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
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-secondary font-heading text-center mb-12 sm:mb-16">
          {t("skills.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="border border-secondary/15 bg-black/30 backdrop-blur-sm rounded-lg p-5"
            >
              <h3 className="text-base sm:text-lg font-heading font-semibold text-secondary mb-3">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs sm:text-sm bg-secondary/5 text-primary/80 border border-secondary/20 rounded-full px-3 py-1 font-body"
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
