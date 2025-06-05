import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faJs,
  faPython,
  faPhp,
  faDocker,
  faNodeJs,
  faReact,
  faJava,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const TechStackCarousel: React.FC = () => {
  const { t } = useTranslation();
  const techStack = [
    { name: "JavaScript", icon: faJs, color: "#F7DF1E" },
    { name: "TypeScript", icon: faJs, color: "#3178C6" },
    { name: "Python", icon: faPython, color: "#3776AB" },
    { name: "PHP", icon: faPhp, color: "#777BB4" },
    { name: "Docker", icon: faDocker, color: "#2496ED" },
    { name: "Node.js", icon: faNodeJs, color: "#339933" },
    { name: "React", icon: faReact, color: "#61DAFB" },
    { name: "Java", icon: faJava, color: "#007396" },
    { name: "React Native", icon: faAndroid, color: "#61DAFB" },
  ];

  return (
    <section
      id="tecnologias"
      className="-translate-y-50 w-full py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-15 overflow-hidden"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-secondary mb-6 sm:mb-8 text-center">
        {t("technologies.title")}
      </h2>

      <div className="relative">
        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 animate-scroll">
          {/* Primeira sequência */}
          {techStack.map((tech, index) => (
            <div
              key={`first-${index}`}
              className="flex flex-col items-center gap-1 sm:gap-2 min-w-[80px] sm:min-w-[100px]"
            >
              <FontAwesomeIcon
                icon={tech.icon}
                className="text-3xl sm:text-4xl md:text-5xl transition-transform duration-300 hover:scale-110"
                style={{ color: tech.color }}
              />
              <span className="text-primary text-xs sm:text-sm md:text-base whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}

          {/* Segunda sequência (duplicada para efeito contínuo) */}
          {techStack.map((tech, index) => (
            <div
              key={`second-${index}`}
              className="flex flex-col items-center gap-1 sm:gap-2 min-w-[80px] sm:min-w-[100px]"
            >
              <FontAwesomeIcon
                icon={tech.icon}
                className="text-3xl sm:text-4xl md:text-5xl transition-transform duration-300 hover:scale-110"
                style={{ color: tech.color }}
              />
              <span className="text-primary text-xs sm:text-sm md:text-base whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackCarousel;
