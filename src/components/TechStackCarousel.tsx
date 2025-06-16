// Tipagem explícita para evitar conflitos
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
import { RiNextjsFill } from "react-icons/ri";
import type { IconType } from "react-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";

// Tipos possíveis
type TechItem = {
  name: string;
  color: string;
  type: "fa" | "react-icon";
  icon: IconDefinition | IconType;
};

const TechStackCarousel: React.FC = () => {
  const { t } = useTranslation();

  const techStack: TechItem[] = [
    { name: "JavaScript", icon: faJs, color: "#F7DF1E", type: "fa" },
    { name: "TypeScript", icon: faJs, color: "#3178C6", type: "fa" },
    { name: "Python", icon: faPython, color: "#3776AB", type: "fa" },
    { name: "PHP", icon: faPhp, color: "#777BB4", type: "fa" },
    { name: "Docker", icon: faDocker, color: "#2496ED", type: "fa" },
    { name: "Node.js", icon: faNodeJs, color: "#339933", type: "fa" },
    { name: "React", icon: faReact, color: "#61DAFB", type: "fa" },
    {
      name: "Next.js",
      icon: RiNextjsFill,
      color: "#000000",
      type: "react-icon",
    },
    { name: "Java", icon: faJava, color: "#007396", type: "fa" },
    { name: "React Native", icon: faAndroid, color: "#61DAFB", type: "fa" },
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
          {techStack.concat(techStack).map((tech, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-1 sm:gap-2 min-w-[80px] sm:min-w-[100px]"
              >
                {tech.type === "fa" ? (
                  <FontAwesomeIcon
                    icon={tech.icon as IconDefinition}
                    className="text-3xl sm:text-4xl md:text-5xl transition-transform duration-300 hover:scale-110"
                    style={{ color: tech.color }}
                  />
                ) : (
                  // react-icons são componentes React
                  React.createElement(tech.icon as IconType, {
                    className:
                      "text-3xl bg-white sm:text-4xl md:text-5xl transition-transform duration-300 hover:scale-110",
                    style: { color: tech.color },
                  })
                )}
                <span className="text-primary text-xs sm:text-sm md:text-base whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackCarousel;
