// ─────────────────────────────────────────────────────────────────────────────
// src/data/courses.ts
// ─────────────────────────────────────────────────────────────────────────────

export interface CoursePlan {
  name: string;
  price: number;
  originalPrice: number | null;
  highlight: boolean;
  badge: string | null;
  features: { text: string; included: boolean }[];
}

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface CourseReview {
  rating: number;
  count: number;
  text: string;
  author: string;
  role: string;
  initials: string;
}

export interface CourseCertification {
  entity: string;
  code: string;
  validity: string;
  format: string;
  delivery: string;
  score: string;
  footerNote: string;
}

export interface CourseData {
  slug: string;

  // ── Breadcrumb + hero ─────────────────────────────────────────────────────
  categoriaLabel: string;
  categoriaSlug: string;
  titleBase: string;
  titleAccent?: string;
  description?: string;
  img: string;
  heroStats?: { label: string }[];

  // ── Sidebar ───────────────────────────────────────────────────────────────
  price: number;
  originalPrice?: number | null;
  sidebarCategoryLabel?: string;
  totalPlaces?: number;
  remainingPlaces?: number;
  metaItems?: { label: string; value: string }[];
  enrollmentUrl?: string;
  whatsappText?: string;

  // ── Camps per a la grid de categoria ─────────────────────────────────────
  gridImg: string;
  gridShortDesc?: string;
  gridHours?: string;
  gridStudents?: number;
  gridRating?: number;
  gridLevel?: "Bàsic" | "Intermedi" | "Avançat";
  gridStartDate?: string;
  gridEndDate?: string;
  isNew?: boolean;
  isPopular?: boolean;

  // ── Seccions opcionals ────────────────────────────────────────────────────
  modules?: CourseModule[];
  requirements?: string[];
  audience?: { title: string; desc: string }[];
  faq?: { q: string; a: string }[];
  plans?: CoursePlan[];
  certification?: CourseCertification;
  reviews?: CourseReview;
  collaborators?: { name: string; img: string }[];
}

// ── Plans compartits ──────────────────────────────────────────────────────────
const plansEstandard: CoursePlan[] = [];

// ── Cursos ────────────────────────────────────────────────────────────────────
export const courses: CourseData[] = [

  // ──────────────────────────────────────────────────────────────────────────
  // espol26-026-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-026-001",
    categoriaLabel: "Dret Penal",
    categoriaSlug: "dret-penal",
    titleBase: "Curs sobre l'aplicació policial de la Llei orgànica 4/2015",
    titleAccent: "Online",
    img: "/images/espol26-026-001.jpg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP20250141152" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Dret Penal",
    totalPlaces: 35,
    remainingPlaces: 20,
    enrollmentUrl:
      "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=qruYLed9IAw=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Dret%20Penal",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250141152" },
    ],

    gridImg: "/images/espol26-026-001.jpg",
    gridStudents: 30,
    gridStartDate: "15/09/2025",
    gridEndDate: "15/03/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Fonaments de la Criminologia",
        topics: [
          "Història i evolució de la criminologia",
          "Teories clàssiques i contemporànies",
          "Factors biològics, psicològics i socials del delicte",
        ],
      },
      {
        title: "Metodologia d'Investigació Criminal",
        topics: [
          "Tècniques d'investigació qualitativa i quantitativa",
          "Anàlisi de dades criminalístiques",
          "Elaboració d'informes pericials",
        ],
      },
      {
        title: "Marc Jurídic i Penal",
        topics: [
          "Codi Penal: delictes i penes",
          "Procediment penal i policial",
          "Drets fonamentals en la investigació",
        ],
      },
      {
        title: "Criminalística Aplicada",
        topics: [
          "Escena del crim: recollida de proves",
          "Mètodes forenses d'identificació",
          "Cadena de custòdia de la prova",
        ],
      },
      {
        title: "Victimologia i Prevenció",
        topics: [
          "Tipologies de víctimes",
          "Estratègies de prevenció del delicte",
          "Programes de reinserció social",
        ],
      },
      {
        title: "Criminologia Digital",
        topics: [
          "Ciberdelinqüència i delictes informàtics",
          "Investigació en entorns digitals",
          "Eines d'anàlisi OSINT",
        ],
      },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: [
          { text: "Accés a tots els mòduls", included: true },
          { text: "Material didàctic PDF", included: true },
          { text: "Certificat reconegust ISPC: RP20250141152", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: [
          { text: "Accés a tots els mòduls", included: true },
          { text: "Material didàctic PDF", included: true },
          { text: "Certificat reconegust ISPC: RP20250141152", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: [
          { text: "Accés a tots els mòduls", included: true },
          { text: "Material didàctic PDF", included: true },
          { text: "Certificat reconegust ISPC: RP20250141152", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d'aprofitament perquè el curs t'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l'última activitat i s'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l'empresa o organisme. La factura s'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "El millor curs de dret penal que he fet. Els continguts estan molt ben estructurats i el docent explica amb casos reals que et fan entendre tot de forma molt pràctica.",
      author: "Maria G.",
      role: "Mossos d'Esquadra · 2025",
      initials: "MG",
    },

    collaborators: [
      { name: "Agents Rurals", img: "/images/agents-rurals.jpg" },
      { name: "Execució Penal", img: "/images/execucio-penal.jpg" },
      { name: "CCOO Policies Locals", img: "/images/ccoo-locals.jpg" },
      { name: "CCOO Mossos D'Esquadra", img: "/images/mossos-ccoo.jpg" },
      { name: "CCOO Bombers", img: "/images/bombers-logo.png" },
      { name: "GAMS", img: "/images/gams.jpg" },
      { name: "ISO 9001", img: "/images/iso.png" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CRIMINOLOGIA — espol26-001-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-001-001",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "Curs de Criminologia",
    titleAccent: "Aplicada",
    description:
      "Aprofundeix en l'estudi científic del delicte, la conducta criminal i els sistemes de justícia. Formació 100% reconeguda per a l'accés als cossos de seguretat.",
    img: "/images/criminologia.jpg",
    heroStats: [
      { label: "120 hores" },
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat oficial" },
    ],

    price: 249,
    originalPrice: 320,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 30,
    remainingPlaces: 7,
    enrollmentUrl:
      "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=xkpaKA+8PCE=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Criminologia%20Aplicada",
    metaItems: [
      { label: "Durada", value: "120 hores" },
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Alumnes", value: "+1.200 matriculats" },
      { label: "Certificat", value: "Oficial ESPOL" },
      { label: "Nivell", value: "Bàsic–Intermedi" },
    ],

    gridImg: "/images/criminologia.jpg",
    gridShortDesc: "Aprofundeix en l'estudi científic del delicte, la conducta criminal i els sistemes de justícia.",
    gridHours: "120h",
    gridStudents: 1200,
    gridRating: 4.9,
    gridLevel: "Intermedi",
    isNew: false,
    isPopular: true,

    modules: [
      {
        title: "Fonaments de la Criminologia",
        topics: [
          "Història i evolució de la criminologia",
          "Teories clàssiques i contemporànies",
          "Factors biològics, psicològics i socials del delicte",
        ],
      },
      {
        title: "Metodologia d'Investigació Criminal",
        topics: [
          "Tècniques d'investigació qualitativa i quantitativa",
          "Anàlisi de dades criminalístiques",
          "Elaboració d'informes pericials",
        ],
      },
      {
        title: "Marc Jurídic i Penal",
        topics: [
          "Codi Penal: delictes i penes",
          "Procediment penal i policial",
          "Drets fonamentals en la investigació",
        ],
      },
      {
        title: "Criminalística Aplicada",
        topics: [
          "Escena del crim: recollida de proves",
          "Mètodes forenses d'identificació",
          "Cadena de custòdia de la prova",
        ],
      },
      {
        title: "Victimologia i Prevenció",
        topics: [
          "Tipologies de víctimes",
          "Estratègies de prevenció del delicte",
          "Programes de reinserció social",
        ],
      },
      {
        title: "Criminologia Digital",
        topics: [
          "Ciberdelinqüència i delictes informàtics",
          "Investigació en entorns digitals",
          "Eines d'anàlisi OSINT",
        ],
      },
    ],

    certification: {
      entity: "Acadèmia ESPOL",
      code: "ESPOL-CRIM-2025",
      validity: "Reconegut en oposicions de Catalunya i Espanya",
      format: "Digital amb codi de verificació únic",
      delivery: "5 dies hàbils després de completar el curs",
      score: "Mèrit en processos selectius de cossos de seguretat",
      footerNote:
        "El certificat és vàlid per als processos selectius dels Mossos d'Esquadra, Policia Nacional i policies locals de Catalunya.",
    },

    plans: plansEstandard,

    requirements: [
      "Titulació de Batxillerat o equivalent",
      "No es requereix experiència prèvia en criminologia",
      "Accés a un dispositiu amb connexió a internet",
      "Disponibilitat mínima de 6 hores setmanals",
      "Nivell bàsic de català o castellà",
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d'Esquadra, Policia Nacional, Guàrdia Civil i policies locals que volen ampliar la seva formació.",
      },
      {
        title: "Professionals Jurídics",
        desc: "Advocats, fiscals, jutges i procuradors que necessiten comprendre la conducta criminal des d'una perspectiva científica.",
      },
      {
        title: "Estudiants Universitaris",
        desc: "Alumnes de Dret, Psicologia, Sociologia o Treball Social amb interès en la criminologia aplicada.",
      },
      {
        title: "Professionals de la Salut Mental",
        desc: "Psicòlegs i treballadors socials que intervenen en contextos de conducta antisocial i rehabilitació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s'avalua mitjançant activitats pràctiques i qüestionaris al final de cada mòdul. No hi ha un examen presencial. L'avaluació és contínua i es pot realitzar des de qualsevol dispositiu.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme. El termini màxim per completar-lo és de 6 mesos des de la data de matriculació.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories setmanals per videoconferència i a un fòrum de dubtes amb resposta garantida en menys de 48 hores.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l'última activitat i s'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l'empresa o organisme. La factura s'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "El millor curs de criminologia que he fet. Els continguts estan molt ben estructurats i els docents expliquen amb casos reals que et fan entendre tot de forma molt pràctica.",
      author: "Maria G.",
      role: "Mossos d'Esquadra · 2024",
      initials: "MG",
    },

    collaborators: [
      { name: "Agents Rurals", img: "/images/agents-rurals.jpg" },
      { name: "Execució Penal", img: "/images/execucio-penal.jpg" },
      { name: "CCOO Policies Locals", img: "/images/ccoo-locals.jpg" },
      { name: "CCOO Mossos D'Esquadra", img: "/images/mossos-ccoo.jpg" },
      { name: "CCOO Bombers", img: "/images/bombers-logo.png" },
      { name: "GAMS", img: "/images/gams.jpg" },
      { name: "ISO 9001", img: "/images/iso.png" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CRIMINOLOGIA — espol26-001-002
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-001-002",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "Curs de Criminologia",
    titleAccent: "Aplicada",
    description:
      "Aprofundeix en l'estudi científic del delicte, la conducta criminal i els sistemes de justícia. Formació 100% reconeguda per a l'accés als cossos de seguretat.",
    img: "/images/procediments-policials.jpg",
    heroStats: [
      { label: "120 hores" },
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat oficial" },
    ],

    price: 249,
    originalPrice: 320,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 30,
    remainingPlaces: 7,
    enrollmentUrl:
      "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=xkpaKA+8PCE=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Criminologia%20Aplicada",
    metaItems: [
      { label: "Durada", value: "120 hores" },
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Alumnes", value: "+1.200 matriculats" },
      { label: "Certificat", value: "Oficial ESPOL" },
      { label: "Nivell", value: "Bàsic–Intermedi" },
    ],

    gridImg: "/images/procediments-policials.jpg",
    gridShortDesc: "Aprofundeix en l'estudi científic del delicte, la conducta criminal i els sistemes de justícia.",
    gridHours: "120h",
    gridStudents: 1200,
    gridRating: 4.9,
    gridLevel: "Intermedi",
    isNew: false,
    isPopular: true,

    modules: [
      {
        title: "Fonaments de la Criminologia",
        topics: [
          "Història i evolució de la criminologia",
          "Teories clàssiques i contemporànies",
          "Factors biològics, psicològics i socials del delicte",
        ],
      },
      {
        title: "Metodologia d'Investigació Criminal",
        topics: [
          "Tècniques d'investigació qualitativa i quantitativa",
          "Anàlisi de dades criminalístiques",
          "Elaboració d'informes pericials",
        ],
      },
      {
        title: "Marc Jurídic i Penal",
        topics: [
          "Codi Penal: delictes i penes",
          "Procediment penal i policial",
          "Drets fonamentals en la investigació",
        ],
      },
      {
        title: "Criminalística Aplicada",
        topics: [
          "Escena del crim: recollida de proves",
          "Mètodes forenses d'identificació",
          "Cadena de custòdia de la prova",
        ],
      },
      {
        title: "Victimologia i Prevenció",
        topics: [
          "Tipologies de víctimes",
          "Estratègies de prevenció del delicte",
          "Programes de reinserció social",
        ],
      },
      {
        title: "Criminologia Digital",
        topics: [
          "Ciberdelinqüència i delictes informàtics",
          "Investigació en entorns digitals",
          "Eines d'anàlisi OSINT",
        ],
      },
    ],

    certification: {
      entity: "Acadèmia ESPOL",
      code: "ESPOL-CRIM-2025",
      validity: "Reconegut en oposicions de Catalunya i Espanya",
      format: "Digital amb codi de verificació únic",
      delivery: "5 dies hàbils després de completar el curs",
      score: "Mèrit en processos selectius de cossos de seguretat",
      footerNote:
        "El certificat és vàlid per als processos selectius dels Mossos d'Esquadra, Policia Nacional i policies locals de Catalunya.",
    },

    plans: plansEstandard,

    requirements: [
      "Titulació de Batxillerat o equivalent",
      "No es requereix experiència prèvia en criminologia",
      "Accés a un dispositiu amb connexió a internet",
      "Disponibilitat mínima de 6 hores setmanals",
      "Nivell bàsic de català o castellà",
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d'Esquadra, Policia Nacional, Guàrdia Civil i policies locals que volen ampliar la seva formació.",
      },
      {
        title: "Professionals Jurídics",
        desc: "Advocats, fiscals, jutges i procuradors que necessiten comprendre la conducta criminal des d'una perspectiva científica.",
      },
      {
        title: "Estudiants Universitaris",
        desc: "Alumnes de Dret, Psicologia, Sociologia o Treball Social amb interès en la criminologia aplicada.",
      },
      {
        title: "Professionals de la Salut Mental",
        desc: "Psicòlegs i treballadors socials que intervenen en contextos de conducta antisocial i rehabilitació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s'avalua mitjançant activitats pràctiques i qüestionaris al final de cada mòdul. No hi ha un examen presencial. L'avaluació és contínua i es pot realitzar des de qualsevol dispositiu.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme. El termini màxim per completar-lo és de 6 mesos des de la data de matriculació.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories setmanals per videoconferència i a un fòrum de dubtes amb resposta garantida en menys de 48 hores.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l'última activitat i s'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l'empresa o organisme. La factura s'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "El millor curs de criminologia que he fet. Els continguts estan molt ben estructurats i els docents expliquen amb casos reals que et fan entendre tot de forma molt pràctica.",
      author: "Maria G.",
      role: "Mossos d'Esquadra · 2024",
      initials: "MG",
    },

    collaborators: [
      { name: "Agents Rurals", img: "/images/agents-rurals.jpg" },
      { name: "Execució Penal", img: "/images/execucio-penal.jpg" },
      { name: "CCOO Policies Locals", img: "/images/ccoo-locals.jpg" },
      { name: "CCOO Mossos D'Esquadra", img: "/images/mossos-ccoo.jpg" },
      { name: "CCOO Bombers", img: "/images/bombers-logo.png" },
      { name: "GAMS", img: "/images/gams.jpg" },
      { name: "ISO 9001", img: "/images/iso.png" },
    ],
  },

];