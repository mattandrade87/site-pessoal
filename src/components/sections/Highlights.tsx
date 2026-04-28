import { useTranslation } from "react-i18next";

const Highlights = () => {
  const { t } = useTranslation();

  const metrics = [
    { value: t("highlights.metric1"), label: t("highlights.label1") },
    { value: t("highlights.metric2"), label: t("highlights.label2") },
    { value: t("highlights.metric3"), label: t("highlights.label3") },
    { value: t("highlights.metric4"), label: t("highlights.label4") },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14 max-w-4xl">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="group border border-secondary/20 bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-5 text-center transition-all duration-300 hover:border-secondary/60 hover:-translate-y-0.5"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-secondary">
            {metric.value}
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm text-primary/70 mt-1 font-body leading-snug">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Highlights;
