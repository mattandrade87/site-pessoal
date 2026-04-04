import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

interface NavItem {
  label: string;
  id: string;
  offset: number;
}

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: t("navigation.home"), id: "inicio", offset: 80 },
    { label: t("navigation.about"), id: "sobre-mim", offset: 80 },
    { label: t("navigation.experience"), id: "experiencia", offset: 80 },
    { label: t("navigation.skills"), id: "habilidades", offset: 80 },
    { label: t("navigation.projects"), id: "projetos", offset: 80 },
    { label: t("navigation.contact"), id: "contato", offset: 80 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-650 bg-black bg-opacity-30 py-4 px-6 sm:px-12 transition-shadow duration-300 ${
        scrolled ? "shadow-md border-b border-gray-700" : ""
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <button
          className="md:hidden text-icons text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id, item.offset)}
              className="text-icons text-base hover:text-secondary hover:underline cursor-pointer font-body transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/mateus-andrade-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-icons text-2xl hover:text-blue-500 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/mattandrade87"
            target="_blank"
            rel="noopener noreferrer"
            className="text-icons text-2xl hover:text-gray-400 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-black bg-opacity-90 rounded-lg p-6">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id, item.offset)}
                className="text-icons text-lg hover:text-secondary hover:underline cursor-pointer text-left font-body transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
