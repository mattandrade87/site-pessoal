import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

interface NavItem {
  label: string;
  id: string;
  offset: number;
}

const navItems: NavItem[] = [
  { label: "Início", id: "inicio", offset: 80 },
  { label: "Sobre Mim", id: "sobre-mim", offset: 50 }, // Considerando o -translate-y-50
  { label: "Tecnologias", id: "tecnologias", offset: 130 }, // Considerando o -translate-y-50
  { label: "Contato", id: "contato", offset: 80 },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

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
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-650 bg-black bg-opacity-30 py-4 px-6 sm:px-10 transition-shadow duration-300 ${
        scrolled ? "shadow-md border-b border-gray-700" : ""
      }`}
    >
      <div className="flex flex-wrap justify-end items-center gap-4 sm:gap-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id, item.offset)}
            className="text-icons text-sm sm:text-lg md:text-xl hover:underline cursor-pointer"
          >
            {item.label}
          </button>
        ))}
        <a
          href="https://www.linkedin.com/in/mateus-andrade-dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className="text-icons text-2xl sm:text-3xl md:text-4xl hover:text-blue-500 transition-colors duration-200"
          />
        </a>
        <a
          href="https://github.com/mattandrade87"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="text-icons text-2xl sm:text-3xl md:text-4xl hover:text-gray-400 transition-colors duration-200"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
