import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

interface Job {
  role: string;
  company: string;
  period: string;
  summary?: string;
  items: string[];
}

const Experience = () => {
  const { t } = useTranslation();
  const jobs = t("experience.jobs", { returnObjects: true }) as Job[];
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => new Set(prev).add(index));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [jobs.length]);

  return (
    <section
      id="experiencia"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-secondary font-heading text-center mb-12 sm:mb-16">
          {t("experience.title")}
        </h2>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/60 via-secondary/30 to-secondary/0" />

          <div className="space-y-10 sm:space-y-12">
            {jobs.map((job, index) => (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                data-index={index}
                className={`relative pl-12 sm:pl-16 transition-all duration-700 ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                <div className="absolute left-2.5 sm:left-4.5 top-2 w-3 h-3 rounded-full bg-secondary border-2 border-background ring-4 ring-secondary/20" />

                <div className="border border-secondary/15 bg-black/30 backdrop-blur-sm rounded-xl p-5 sm:p-6 hover:border-secondary/40 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-3">
                    <h3 className="text-lg sm:text-xl font-heading font-semibold text-secondary">
                      {job.role}
                    </h3>
                    <p className="text-xs sm:text-sm text-primary/60 font-body shrink-0">
                      {job.period}
                    </p>
                  </div>
                  {job.company && (
                    <p className="text-sm text-primary/80 font-body mt-1 font-medium">
                      {job.company}
                    </p>
                  )}
                  {job.summary && (
                    <p className="mt-3 text-sm sm:text-base text-primary/70 font-body italic leading-relaxed">
                      {job.summary}
                    </p>
                  )}

                  <ul className="mt-4 space-y-2.5">
                    {job.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm sm:text-base text-primary/85 font-body flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="text-secondary mt-2 text-[8px] shrink-0">&#9670;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
