import React from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      // Forçar a atualização do DOM após a mudança de idioma
      window.location.reload();
    });
  };

  return (
    <div className="language-switcher flex gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded ${
          i18n.language === "en"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("pt")}
        className={`px-3 py-1 rounded ${
          i18n.language === "pt"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Português
      </button>
    </div>
  );
};
