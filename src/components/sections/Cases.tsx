import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faBell,
  faDiagramProject,
  faMicrophoneLines,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface CaseItem {
  name: string;
  tagline: string;
  problem: string;
  solution: string[];
  impact: string[];
  stack: string[];
}

const ICONS: IconDefinition[] = [faBolt, faBell, faDiagramProject, faMicrophoneLines];

const Cases = () => {
  const { t } = useTranslation();
  const cases = t("cases.items", { returnObjects: true }) as CaseItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="cases"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-secondary font-heading text-center mb-3">
          {t("cases.title")}
        </h2>
        <p className="text-center text-primary/60 font-body text-sm sm:text-base mb-12 sm:mb-16">
          {t("cases.subtitle")}
        </p>

        <div className="space-y-4 sm:space-y-5">
          {cases.map((item, index) => {
            const isOpen = openIndex === index;
            const Icon = ICONS[index % ICONS.length];
            return (
              <div
                key={index}
                className={`border bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-secondary/60 shadow-lg shadow-secondary/5" : "border-secondary/15 hover:border-secondary/35"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center gap-4 cursor-pointer"
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/30 text-secondary text-base sm:text-lg">
                    <FontAwesomeIcon icon={Icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-heading font-semibold text-secondary leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-primary/70 font-body mt-1 leading-relaxed">
                      {item.tagline}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-secondary text-sm sm:text-base transition-transform duration-300 shrink-0 mt-1 sm:mt-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 sm:pb-7 pt-1 border-t border-secondary/15">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-5">
                        <div>
                          <p className="text-[11px] sm:text-xs uppercase tracking-wider text-secondary/80 font-heading font-semibold mb-2">
                            {t("cases.labels.problem")}
                          </p>
                          <p className="text-sm sm:text-base text-primary/85 font-body leading-relaxed">
                            {item.problem}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] sm:text-xs uppercase tracking-wider text-secondary/80 font-heading font-semibold mb-2">
                            {t("cases.labels.solution")}
                          </p>
                          <ul className="space-y-1.5">
                            {item.solution.map((s, i) => (
                              <li
                                key={i}
                                className="text-sm text-primary/80 font-body flex items-start gap-2 leading-relaxed"
                              >
                                <span className="text-secondary mt-2 text-[7px] shrink-0">&#9670;</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6">
                        <p className="text-[11px] sm:text-xs uppercase tracking-wider text-secondary/80 font-heading font-semibold mb-2">
                          {t("cases.labels.impact")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.impact.map((m, i) => (
                            <span
                              key={i}
                              className="text-xs sm:text-sm bg-secondary/10 text-secondary border border-secondary/30 rounded-md px-2.5 py-1 font-body"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="text-[11px] sm:text-xs uppercase tracking-wider text-secondary/80 font-heading font-semibold mb-2">
                          {t("cases.labels.stack")}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.stack.map((s, i) => (
                            <span
                              key={i}
                              className="text-[11px] sm:text-xs bg-black/40 text-primary/80 border border-secondary/20 rounded-full px-2.5 py-0.5 font-body"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Cases;
