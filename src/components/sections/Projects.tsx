import { useTranslation } from "react-i18next";

interface Project {
  name: string;
  tagline: string;
  year: string;
  description: string;
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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-secondary font-heading text-center mb-12 sm:mb-16">
          {t("projects.title")}
        </h2>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-secondary/20 bg-black/40 backdrop-blur-sm rounded-lg p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-secondary">
                    {project.name}
                  </h3>
                  <p className="text-sm text-primary/60 font-body">
                    {project.tagline}
                  </p>
                </div>
                <span className="text-sm text-secondary/70 font-body shrink-0">
                  {project.year}
                </span>
              </div>

              <p className="text-sm sm:text-base text-primary/80 font-body mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs sm:text-sm bg-secondary/10 text-secondary border border-secondary/30 rounded-full px-3 py-1 font-body"
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
