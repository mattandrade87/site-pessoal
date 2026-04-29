# Mateus Andrade — Site Pessoal

Site pessoal e portfólio desenvolvido em React + TypeScript + Vite, com foco em apresentar de forma clara, bonita e técnica meu trabalho como Full Stack Developer (mobile, backend e IA em tempo real).

## Stack

- **React 19** + **TypeScript**
- **Vite 6** (build e dev server)
- **Tailwind CSS 4**
- **react-i18next** (PT-BR / EN com detecção automática)
- **Font Awesome** + **react-icons** (Si / Ri)
- **Simplex Noise** (background animado)
- **gh-pages** (deploy)

## Estrutura do site

| Seção             | Componente                                | O que mostra |
|-------------------|-------------------------------------------|--------------|
| Hero              | `sections/MainSection.tsx`                | Badge de disponibilidade, pílulas de especialidade, descrição, CTA + download de currículo |
| Highlights        | `sections/Highlights.tsx`                 | 4 métricas-chave de impacto (latência IA, throughput de push, testes, anos de experiência) |
| Sobre             | `sections/About.tsx`                      | Posicionamento Full Stack pleno e foco técnico |
| Tech Carousel     | `ui/TechStackCarousel.tsx`                | 28+ tecnologias em carrossel infinito com fade nas bordas |
| Experiência       | `sections/Experience.tsx`                 | Timeline com summary, bullets ricos e gradiente |
| **Cases técnicos**| `sections/Cases.tsx`                      | Acordeão com 4 cases (Problema · Solução · Impacto · Stack) |
| Habilidades       | `sections/Skills.tsx`                     | 8 categorias (linguagens, front, back, DB, mensageria, IA, DevOps, arquitetura) |
| Projetos          | `sections/Projects.tsx`                   | Grid de produtos (Woolly + Portal Sigesis) com highlights |
| Formação          | `sections/Education.tsx`                  | Diploma, idiomas e certificações |
| Footer            | `layout/Footer.tsx`                       | Contatos, redes, download de currículo, voltar ao topo |
| Header            | `layout/Header.tsx`                       | Nav fixo com smooth scroll, links sociais e menu mobile |
| Switcher          | `layout/LanguageSwitcher.tsx`             | Alternância PT-BR / EN |

A ordem das seções é definida em [src/App.tsx](src/App.tsx).

## Internacionalização

As strings ficam em [src/locales/pt/translation.json](src/locales/pt/translation.json) e [src/locales/en/translation.json](src/locales/en/translation.json). A configuração do i18next está em [src/i18n.ts](src/i18n.ts).

## Scripts

```bash
npm install        # instala dependências
npm run dev        # ambiente de desenvolvimento (http://localhost:5173)
npm run build      # tsc + vite build em dist/
npm run preview    # serve o build local
npm run lint       # ESLint
npm run deploy     # gh-pages -d dist
```

## Tema

Variáveis de tema definidas em [src/index.css](src/index.css):

- `--color-primary` (texto primário)
- `--color-secondary` (acento dourado)
- `--color-background` (fundo preto)
- `--color-background-animation` (partículas)
- `--font-heading` / `--font-body`

## Contato

- **Email**: mateus.vitor.andrade@gmail.com
- **LinkedIn**: [mateus-andrade-dev](https://www.linkedin.com/in/mateus-andrade-dev/)
- **GitHub**: [mattandrade87](https://github.com/mattandrade87)
