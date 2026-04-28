import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faJs,
  faPython,
  faPhp,
  faDocker,
  faNodeJs,
  faReact,
  faLinux,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiSharp,
  SiDotnet,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiTailwindcss,
  SiNestjs,
  SiSupabase,
  SiRabbitmq,
  SiOpenai,
  SiWebrtc,
  SiExpress,
  SiSentry,
  SiCaddy,
  SiAnsible,
  SiFastapi,
  SiExpo,
  SiTypescript,
} from "react-icons/si";
import React, { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";

type TechItem = {
  name: string;
  color: string;
  type: "fa" | "react-icon";
  icon: IconDefinition | IconType;
};

const NORMAL_SPEED = 0.4;
const SLOW_SPEED = 0.1;
const LERP_FACTOR = 0.03;

const TechStackCarousel: React.FC = () => {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(NORMAL_SPEED);
  const targetSpeedRef = useRef(NORMAL_SPEED);
  const frameRef = useRef<number>(0);
  const halfWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    halfWidthRef.current = track.scrollWidth / 2;

    const onResize = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };
    window.addEventListener("resize", onResize);

    function animate() {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * LERP_FACTOR;

      offsetRef.current -= speedRef.current;

      if (halfWidthRef.current > 0) {
        offsetRef.current = ((offsetRef.current % halfWidthRef.current) - halfWidthRef.current) % halfWidthRef.current;
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleMouseEnter = () => {
    targetSpeedRef.current = SLOW_SPEED;
  };

  const handleMouseLeave = () => {
    targetSpeedRef.current = NORMAL_SPEED;
  };

  const techStack: TechItem[] = [
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", type: "react-icon" },
    { name: "JavaScript", icon: faJs, color: "#F7DF1E", type: "fa" },
    { name: "C#", icon: SiSharp, color: "#9A7BFF", type: "react-icon" },
    { name: "Python", icon: faPython, color: "#3776AB", type: "fa" },
    { name: "PHP", icon: faPhp, color: "#777BB4", type: "fa" },
    { name: "React", icon: faReact, color: "#61DAFB", type: "fa" },
    { name: "React Native", icon: faReact, color: "#61DAFB", type: "fa" },
    { name: "Expo", icon: SiExpo, color: "#ffffff", type: "react-icon" },
    { name: "Next.js", icon: RiNextjsFill, color: "#ffffff", type: "react-icon" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", type: "react-icon" },
    { name: ".NET", icon: SiDotnet, color: "#9A7BFF", type: "react-icon" },
    { name: "Node.js", icon: faNodeJs, color: "#339933", type: "fa" },
    { name: "NestJS", icon: SiNestjs, color: "#E0234E", type: "react-icon" },
    { name: "Express", icon: SiExpress, color: "#ffffff", type: "react-icon" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688", type: "react-icon" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", type: "react-icon" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", type: "react-icon" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", type: "react-icon" },
    { name: "Redis", icon: SiRedis, color: "#DC382D", type: "react-icon" },
    { name: "RabbitMQ", icon: SiRabbitmq, color: "#FF6600", type: "react-icon" },
    { name: "OpenAI", icon: SiOpenai, color: "#ffffff", type: "react-icon" },
    { name: "WebRTC", icon: SiWebrtc, color: "#333333", type: "react-icon" },
    { name: "Docker", icon: faDocker, color: "#2496ED", type: "fa" },
    { name: "Caddy", icon: SiCaddy, color: "#1F88C0", type: "react-icon" },
    { name: "Ansible", icon: SiAnsible, color: "#EE0000", type: "react-icon" },
    { name: "Linux", icon: faLinux, color: "#FCC624", type: "fa" },
    { name: "Sentry", icon: SiSentry, color: "#362D59", type: "react-icon" },
    { name: "GitHub", icon: faGithub, color: "#ffffff", type: "fa" },
  ];

  return (
    <section
      id="tecnologias"
      className="w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-15 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-secondary mb-6 sm:mb-8 text-center font-heading">
        {t("technologies.title")}
      </h2>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 will-change-transform"
          style={{ width: "max-content" }}
        >
          {techStack.concat(techStack).map((tech, index) => (
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
                React.createElement(tech.icon as IconType, {
                  className:
                    "text-3xl sm:text-4xl md:text-5xl transition-transform duration-300 hover:scale-110",
                  style: { color: tech.color },
                })
              )}
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
