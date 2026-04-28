import { useTranslation } from "react-i18next";

interface Project {
  name: string;
  tagline: string;
  year: string;
  description: string;
  highlights: string[];
  tech: string[];
}

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects.items", { returnObjects: true }) as Project[];

  return (
    <section
      id="projetos"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-secondary font-heading text-center mb-12 sm:mb-16">
          {t("projects.title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative border border-secondary/20 bg-black/40 backdrop-blur-sm rounded-xl p-6 sm:p-7 hover:border-secondary/50 transition-all duration-300 flex flex-col"
            >
              <div className="absolute top-4 right-4 text-xs font-body text-secondary/70 bg-secondary/5 border border-secondary/20 rounded-full px-2.5 py-0.5">
                {project.year}
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-bold text-secondary pr-16">
                {project.name}
              </h3>
              <p className="text-sm text-primary/60 font-body mt-1">
                {project.tagline}
              </p>

              <p className="text-sm sm:text-base text-primary/85 font-body mt-4 leading-relaxed">
                {project.description}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-sm text-primary/80 font-body flex items-start gap-2"
                    >
                      <span className="text-secondary mt-2 text-[7px] shrink-0">&#9670;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-secondary/15">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs sm:text-sm bg-secondary/10 text-secondary border border-secondary/30 rounded-full px-2.5 py-0.5 font-body"
                  >
                    {tech}
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

export default Projects;
