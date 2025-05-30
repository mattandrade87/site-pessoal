import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black h-8">
      <div className="flex justify-end gap-6 ">
      <button
          className={`text-icons text-2xl hover:underline tracking-normal cursor-pointer`}
        >
          Inicio
        </button>
        <button
          className={`text-icons text-2xl hover:underline tracking-normal cursor-pointer`}
        >
          Contact
        </button>
        <button
          className={`text-icons text-2xl hover:underline tracking-normal cursor-pointer`}
        >
          About me
        </button>
        <a
          href="https://www.linkedin.com/in/mateus-andrade-dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className={`text-icons text-4xl hover:text-blue-500 transition-colors duration-200`}
          />
        </a>
        <a
          href="https://github.com/mattandrade87"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className={`text-icons text-4xl hover:text-gray-400 transition-colors duration-200`}
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
