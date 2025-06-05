import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="language-switcher flex gap-1 sm:gap-2 bg-black/30 backdrop-blur-sm p-1 rounded-lg border border-gray-700">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs sm:text-sm transition-colors duration-300 font-body ${
          i18n.language === "en"
            ? "bg-secondary text-primary"
            : "bg-transparent text-primary hover:bg-gray-700/50"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("pt")}
        className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs sm:text-sm transition-colors duration-300 font-body ${
          i18n.language === "pt"
            ? "bg-secondary text-primary"
            : "bg-transparent text-primary hover:bg-gray-700/50"
        }`}
      >
        PT
      </button>
    </div>
  );
};
