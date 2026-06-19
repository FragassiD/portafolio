/* ============================================================
   Enoden Portfolio — Contenido bilingüe (ES / EN)
   Donatella Fragassi · Software Engineer
   Todo el contenido vive acá para mantener separada la data
   de la lógica y el render.
   ============================================================ */

window.PORTFOLIO_DATA = {
  /* --------- Líneas de skills (rieles) --------- */
  lines: {
    backend: { color: "#0078C8", start: 1, label: { es: "Línea Backend", en: "Backend Line" } },
    frontend: { color: "#E85298", start: 3, label: { es: "Línea Frontend", en: "Frontend Line" } },
    ia: { color: "#00BB85", start: 4, label: { es: "Línea IA", en: "AI Line" } },
  },

  /* --------- UI strings --------- */
  ui: {
    scrollHint: { es: "scrolleá para comenzar el viaje", en: "scroll to begin the journey" },
    role: { es: "Software Engineer", en: "Software Engineer" },
    routeTitle: { es: "RUTA ENODEN", en: "ENODEN ROUTE" },
    period: { es: "Período", en: "Period" },
    roleLabel: { es: "Rol", en: "Role" },
    stack: { es: "Stack", en: "Stack" },
    newLine: { es: "Se suma", en: "Joins here" },
    present: { es: "Presente", en: "Present" },
    soon: { es: "Próximamente", en: "Coming soon" },
    visited: { es: "visitada", en: "visited" },
    contactTitle: { es: "Hagamos contacto", en: "Let's connect" },
  },

  /* --------- Contacto --------- */
  contact: {
    linkedin: "https://www.linkedin.com/in/fragassidonatella/",
    email: "mailto:fragassidonatella1@example.com", // placeholder editable
  },

  /* --------- Estaciones --------- */
  stations: [
    /* 0 — Inicio */
    {
      id: "inicio",
      theme: "dawn",
      kanji: "出発",
      name: { es: "Inicio", en: "Departure" },
      isHeader: true,
      lines: [],
    },

    /* 1 — UNLaM */
    {
      id: "unlam",
      theme: "neon",
      kanji: "大学",
      name: { es: "UNLaM · Universidad", en: "UNLaM · University" },
      period: "2018 — 2026",
      role: { es: "Ingeniería en Informática", en: "Computer Engineering" },
      lines: ["backend"],
      newLine: "backend",
      description: {
        es: "Ingeniería en Informática. Promedio 7.22 · Proyecto Final calificación 10. Acá se forjaron mis bases duras: análisis matemático, álgebra, física, probabilidad y estadística, matemática discreta. Programación desde lo más bajo con Assembler, C y C++, pasando por Java y los paradigmas de objetos. Diseñé y construí un compilador propio en Lenguajes y Compiladores. Bases de datos relacionales y no relacionales, desde el modelo teórico hasta la implementación. Mucho análisis y diseño de sistemas, arquitectura de software e ingeniería de requisitos. 8 años combinando cursada nocturna con trabajo full-time.",
        en: "Computer Engineering. GPA 7.22 · Final Project graded 10/10. This is where my hard foundations were forged: calculus, algebra, probability & statistics, discrete math. Programming from the lowest level with Assembler, C and C++, through Java and object-oriented paradigms. I designed and built my own compiler in Languages & Compilers. Relational and non-relational databases from the theoretical model to implementation. Lots of systems analysis & design, software architecture and requirements engineering. 8 years combining night classes with full-time work.",
      },
      tags: [
        { t: "Assembler", l: "backend" }, { t: "C / C++", l: "backend" },
        { t: "Java", l: "backend" }, { t: "C# / .NET", l: "backend" },
        { t: "SQL", l: "backend" }, { t: "Compiladores", l: "backend" },
      ],
    },

    /* 2 — CTI */
    {
      id: "cti",
      theme: "datacenter",
      kanji: "💾",
      name: { es: "CTI Consultores Associados", en: "CTI Consultores Associados" },
      period: { es: "ene 2021 — dic 2021 · 1 año", en: "Jan 2021 — Dec 2021 · 1 yr" },
      role: { es: "DB Developer", en: "DB Developer" },
      lines: ["backend"],
      description: {
        es: "Mi primer trabajo como desarrolladora. Desarrollo de bases de datos multidimensionales con IBM Cognos TM1 e IBM Cloud para dashboards financieros y comerciales. Construí modelos analíticos que transformaban datos complejos en visualizaciones claras para gerentes.",
        en: "My first job as a developer. Building multidimensional databases with IBM Cognos TM1 and IBM Cloud for financial and commercial dashboards. I built analytical models that turned complex data into clear visualizations for managers.",
      },
      tags: [
        { t: "C#", l: "backend" }, { t: "SQL Server", l: "backend" },
        { t: "IBM Cognos TM1", l: "backend" }, { t: "IBM Cloud", l: "backend" },
      ],
    },

    /* 3 — Circo Studio */
    {
      id: "circo",
      theme: "startup",
      kanji: "スタジオ",
      name: { es: "Circo Studio", en: "Circo Studio" },
      period: { es: "dic 2021 — ene 2024 · 2 años 2 meses", en: "Dec 2021 — Jan 2024 · 2 yrs 2 mo" },
      role: { es: "Software Developer", en: "Software Developer" },
      lines: ["backend", "frontend"],
      newLine: "frontend",
      description: {
        es: "Desarrollo de soluciones web escalables para la industria de Petróleo y Energía, ciclo de vida completo desde el modelado de DB hasta el despliegue. Arquitectura end-to-end con .NET y Angular. Implementé pipelines CI/CD con Azure DevOps, lideré migraciones a través de múltiples versiones de .NET (Core, 5, 6+). Creaba documentación técnica (UML) y prototipos UI/UX en Figma, actuando como nexo entre negocio y desarrollo.",
        en: "Building scalable web solutions for the Oil & Energy industry, full lifecycle from DB modeling to deployment. End-to-end architecture with .NET and Angular. I implemented CI/CD pipelines with Azure DevOps, led migrations across multiple .NET versions (Core, 5, 6+). I produced technical documentation (UML) and UI/UX prototypes in Figma, acting as the bridge between business and development.",
      },
      tags: [
        { t: ".NET", l: "backend" }, { t: "Angular", l: "frontend" },
        { t: "TypeScript", l: "frontend" }, { t: "Azure DevOps", l: "backend" },
        { t: "CI/CD", l: "backend" }, { t: "Figma", l: "frontend" },
      ],
    },

    /* 4 — BAPRO */
    {
      id: "bapro",
      theme: "sunset",
      kanji: "銀行",
      name: { es: "Banco Provincia · BAPRO", en: "Banco Provincia · BAPRO" },
      period: { es: "ene 2024 — Presente", en: "Jan 2024 — Present" },
      role: { es: "Software Developer", en: "Software Developer" },
      lines: ["backend", "frontend", "ia"],
      newLine: "ia",
      description: {
        es: "Software Engineer en el Banco de la Provincia de Buenos Aires. Lidero la migración de monolitos a Clean Architecture (.NET 8/10, C#) definiendo estándares de código del equipo. Orquesto despliegues en OpenShift y Docker. Desarrollo full-stack con APIs RESTful (.NET) y frontends en Angular, validando UX con prototipos en Figma. Mantengo aplicaciones core bancarias legacy (ASP.NET, .NET Framework 4.5-4.8). Diseño flujos ETL con SSIS para procesos críticos. Integré Copilot y Claude para acelerar refactorización y optimizar queries complejas en SQL Server y Oracle, así como múltiples agentes.",
        en: "Software Engineer at Banco de la Provincia de Buenos Aires. I lead the migration of monoliths to Clean Architecture (.NET 8/10, C#), defining the team's coding standards. I orchestrate deployments on OpenShift and Docker. Full-stack development with RESTful APIs (.NET) and Angular frontends, validating UX with Figma prototypes. I maintain legacy core banking apps (ASP.NET, .NET Framework 4.5-4.8). I design ETL flows with SSIS for critical processes. I integrated Copilot and Claude to speed up refactoring and optimize complex queries in SQL Server and Oracle, as well as multiple agents.",
      },
      tags: [
        { t: ".NET 8/10", l: "backend" }, { t: "Clean Architecture", l: "backend" },
        { t: "OpenShift", l: "backend" }, { t: "Docker", l: "backend" },
        { t: "Oracle / SQL Server", l: "backend" }, { t: "SSIS / ETL", l: "backend" },
        { t: "Angular", l: "frontend" }, { t: "Figma", l: "frontend" },
        { t: "GitHub Copilot", l: "ia" }, { t: "Claude", l: "ia" }, { t: "RAG", l: "ia" },
      ],
    },

    /* 5 — Proyectos Propios */
    {
      id: "propios",
      theme: "garage",
      kanji: "発明",
      name: { es: "Proyectos Propios", en: "Own Projects" },
      period: { es: "2025 — Presente", en: "2025 — Present" },
      role: { es: "Founder · Indie Dev", en: "Founder · Indie Dev" },
      lines: ["backend", "frontend", "ia"],
      description: {
        es: "Proyecto final DICTA; inteligencia legal en tiempo real. Proyectos personales como: QuizCraft, plataforma para aprendizaje; AskGemini, skill para alexa; Talleres educativos sobre riesgos tecnológicos para niños y adolescentes. Proyectos freelance para clientes directos, droguerías, farmacias y laboratorios. Donde construyo mis propias ideas, de punta a punta.",
        en: "Final project DICTA, real-time legal intelligence. Personal projects like: QuizCraft, a learning platform; AskGemini, an Alexa skill; Educational workshops on technological risks for children and adolescents. Freelance projects for direct clients, pharmacies, and laboratories. Where I build my own ideas, end to end.",
      },
      tags: [
        { t: ".NET", l: "backend" }, { t: "Angular", l: "frontend" }, { t: "IA", l: "ia" },
      ],
      projects: [
        { es: "SaaS · Canchas deportivas", en: "SaaS · Sports courts" },
        { es: "Plataforma veterinaria", en: "Veterinary platform" },
        { es: "Freelance", en: "Freelance" },
      ],
    },

    /* 6 — Futuro + Contacto */
    {
      id: "futuro",
      theme: "future",
      kanji: "未来",
      name: { es: "Futuro", en: "Future" },
      period: "2026 →",
      role: { es: "Hacia dónde voy", en: "Where I'm headed" },
      lines: ["backend", "frontend", "ia"],
      isContact: true,
      description: {
        es: "Objetivo: Tech Lead. Una micro-consultora de software propia. Siempre aprendiendo, siempre construyendo.",
        en: "Goal: Tech Lead. My own software micro-consultancy. Always learning, always building.",
      },
      tags: [
        { t: "Tech Lead", l: "backend" },  { t: "IA", l: "ia" },
      ],
    },
  ],
};
