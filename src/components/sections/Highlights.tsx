import { useTranslation } from "react-i18next";

const Highlights = () => {
  const { t } = useTranslation();

  const metrics = [
    { value: t("highlights.metric1"), label: t("highlights.label1") },
    { value: t("highlights.metric2"), label: t("highlights.label2") },
    { value: t("highlights.metric3"), label: t("highlights.label3") },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-14 max-w-3xl">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="border border-secondary/20 bg-black/30 backdrop-blur-sm rounded-lg p-5 text-center"
        >
          <p className="text-3xl sm:text-4xl font-heading font-bold text-secondary">
            {metric.value}
          </p>
          <p className="text-xs sm:text-sm text-primary/70 mt-1 font-body">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Highlights;
