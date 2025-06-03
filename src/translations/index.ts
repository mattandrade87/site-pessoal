export type Language = "en" | "pt";

export interface Translations {
  header: {
    inicio: string;
    sobreMim: string;
    tecnologias: string;
    contato: string;
  };
  main: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  techStack: {
    title: string;
  };
  footer: {
    backToTop: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      inicio: "Home",
      sobreMim: "About Me",
      tecnologias: "Technologies",
      contato: "Contact",
    },
    main: {
      title: "Mateus Andrade",
      subtitle:
        "Delivering full stack solutions with performance and precision",
    },
    about: {
      title: "About Me",
      paragraph1:
        "I am a Systems Information student at UFOP with practical experience in Full-stack development (Back-end, Front-end, and Mobile) for e-commerce applications. I worked as a freelance developer and currently work at a large company using React and PHP.",
      paragraph2:
        "In my projects, I worked with React, React Native, Node.js, and TypeScript, as well as PostgreSQL for data management and Docker for deployment, always prioritizing stability and security. I am passionate about technology and constantly seek to learn and innovate.",
    },
    techStack: {
      title: "Technologies",
    },
    footer: {
      backToTop: "Back to top",
    },
  },
  pt: {
    header: {
      inicio: "Início",
      sobreMim: "Sobre Mim",
      tecnologias: "Tecnologias",
      contato: "Contato",
    },
    main: {
      title: "Mateus Andrade",
      subtitle: "Entregando soluções full stack com performance e precisão",
    },
    about: {
      title: "Sobre Mim",
      paragraph1:
        "Sou estudante de Sistemas de Informação na UFOP com experiência prática em desenvolvimento Full-stack (Back-end, Front-end e Mobile) para aplicações de e-commerce. Atuei como desenvolvedor freelancer e, atualmente, trabalho em uma grande empresa utilizando React e PHP.",
      paragraph2:
        "Em meus projetos, trabalhei com React, React Native, Node.js e TypeScript, além de PostgreSQL para gerenciamento de dados e Docker para deploy, sempre priorizando estabilidade e segurança. Sou apaixonado por tecnologia e busco constantemente aprender e inovar.",
    },
    techStack: {
      title: "Tecnologias",
    },
    footer: {
      backToTop: "Voltar ao topo",
    },
  },
};
