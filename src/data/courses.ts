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

// ── Dades compartides reutilitzables ──────────────────────────────────────────

const faqEstandard = [
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
];

const collaboratorsEstandard = [
  { name: "Agents Rurals", img: "/images/agents-rurals.webp" },
  { name: "Execució Penal", img: "/images/execucio-penal.webp" },
  { name: "CCOO Policies Locals", img: "/images/ccoo-locals.webp" },
  { name: "CCOO Mossos D'Esquadra", img: "/images/mossos-ccoo.webp" },
  { name: "CCOO Bombers", img: "/images/bombers-logo.webp" },
  { name: "GAMS", img: "/images/gams.webp" },
  { name: "ISO 9001", img: "/images/iso.webp" },
];

const audienceEstandard = [
  {
    title: "Cossos de Seguretat",
    desc: "Agents dels Mossos d'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l'ISPC i policies locals que volen ampliar la seva formació.",
  },
];

// Helpers per a camps que varien únicament per codi de certificat
const heroStatsFor = (code: string): { label: string }[] => [
  { label: "100% online" },
  { label: "Matrícula oberta" },
  { label: `Certificat reconegust ISPC: ${code}` },
];

const metaItemsFor = (code: string): { label: string; value: string }[] => [
  { label: "Modalitat", value: "100% online" },
  { label: "Inici", value: "Accés immediat" },
  { label: "Certificat reconegust ISPC", value: code },
];

const planFeaturesFor = (code: string): { text: string; included: boolean }[] => [
  { text: "Accés a tots els mòduls", included: true },
  { text: "Material didàctic PDF", included: true },
  { text: `Certificat reconegust ISPC: ${code}`, included: true },
  { text: "Tutories en línea", included: true },
  { text: "Accés il·limitat", included: true },
];

// ── Cursos ────────────────────────────────────────────────────────────────────
export const courses: CourseData[] = [

  // CRIMINOLOGIA ────────────────────────────────────────────────────────────────

  // espol26-002-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-002-001",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "Curs de criminologia. La prevenció de la delinqüència - online",
    img: "/images/espol26-002-001.webp",
    heroStats: heroStatsFor("RP20250140963"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=Ybt074TR7CU=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Criminologia",
    metaItems: metaItemsFor("RP20250140963"),

    gridImg: "/images/espol26-002-001.webp",
    gridStudents: 30,
    gridStartDate: "12/05/2026",
    gridEndDate: "12/06/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "TEMA 1. Introducció a la criminologia i a la prevenció",
        topics: [
          "La criminologia preventiva",
          "La prevenció de la delinqüència",
        ],
      },
      {
        title: "TEMA 2. Fonament teòric i pràctic de les diferents formes de prevenció",
        topics: [
          "Prevenció mitjançant el sistema de justícia penal",
          "Prevenció del desenvolupament",
          "Prevenció comunitària",
          "Prevenció situacional",
          "Prevenció de la policia mitjançant els models proactius",
        ],
      },
      {
        title: "TEMA 3. Estratègies, tècniques i programes de prevenció de la delinqüència",
        topics: [
          "Propostes Internacionals",
          "Estratègies que augmenten la seguretat dels ciutadans",
          "Les vint-i-cinc tècniques de prevenció situacional",
          "L'avaluació dels programes de prevenció de la delinqüència",
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
        features: planFeaturesFor("RP20250140963"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250140963"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250140963"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // espol26-004-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-004-001",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "Curs de criminologia. Resolució de problemes - online",
    img: "/images/espol26-004-001.webp",
    heroStats: heroStatsFor("RP20250140975"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=xkpaKA+8PCE=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250140975"),

    gridImg: "/images/espol26-004-001.webp",
    gridStudents: 30,
    gridStartDate: "12/05/2026",
    gridEndDate: "12/06/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "La policia orientada a la resolució de problemes delictius",
        topics: [
          "Eficàcia de les estratègies policials",
          "Concepte i fonament de la policia orientada a la resolució de problemes delictius",
          "Condicions ambientals criminolögiques",
        ],
      },
      {
        title: "El procediment de resolució BASE (SARA)",
        topics: [
          "La identificació dels factors criminògens",
          "L'anàlisi dels problemes",
          "Les propostes de resolució",
          "L'avaluació eficaç",
        ],
      },
      {
        title: "La perspectiva de valoració dels problemes",
        topics: [
          "La comunicació",
          "Aspectes positius del model de policia orientada a la resolució de problemes",
          "Crítiques al model de policia orientada a la resolució de problemes",
          "Diferents evolucions del model",
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
        features: planFeaturesFor("RP20250140975"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250140975"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250140975"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // espol26-029-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-029-001",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "Curs sobre introducció a la negociació i la mediació per a la solució de conflictes",
    img: "/images/espol26-029-001.webp",
    heroStats: heroStatsFor("RP20250141153"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=x+hU0p8iQYc=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141153"),

    gridImg: "/images/espol26-029-001.webp",
    gridStudents: 30,
    gridStartDate: "16/06/2026",
    gridEndDate: "17/07/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "TEMA 1. Definicions",
        topics: [
          "Que és un conflicte",
          "Que és una negociació",
          "Que és una mediació",
        ],
      },
      {
        title: "TEMA 2. Negociacions bàsiques - Mapa de les negociacions",
        topics: [
          "Interessos",
          "Opcions",
          "Normes",
          "Alternatives",
          "Propostes",
        ],
      },
      {
        title: "TEMA 3. Deu passos que ajuden a portar el ritme d'una negociació",
        topics: [
          "Crear un clima favorable per a les negociacions",
          "Revelar i esbrinar interessos per a progressar",
          "Discutir normes d'equitat i demanar consell",
          "Aspiracions i no limitacions",
          "Replantejar amenaces, insults, culpabilitzacions",
        ],
      },
      {
        title: "TEMA 4 – Mediació bàsica – Principis bàsics d'actuació",
        topics: [
          "Confidencialitat i actitud sense judicis",
          "Clarificació d'interessos i possibilitats reals",
          "Cap implicació en la solució",
          "Creació de confiança i comunicació clara",
          "Adaptabilitat al que hi ha",
          "Visió àmplia sobre els recursos",
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
        features: planFeaturesFor("RP20250141153"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141153"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141153"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // espol26-031-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-031-001",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "Curs de mediació i negociació amb persones que adopten postures inflexibles. MÒDUL 3 - online",
    img: "/images/espol26-031-001.webp",
    heroStats: heroStatsFor("RP20250141155"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=fZREYxjy7rA=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141155"),

    gridImg: "/images/espol26-031-001.webp",
    gridStudents: 30,
    gridStartDate: "21/07/2026",
    gridEndDate: "20/09/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "TEMA 1. No reaccionis",
        topics: [
          "Tipus de tàctiques per fer-te saltar",
          "Coneix els teus punts vulnerables",
        ],
      },
      {
        title: "TEMA 2. Desactiva les emocions negatives de l'altre part",
        topics: [
          "No discuteixis, posa't de part d'ells.",
          "Replanteja la seva posició",
          "Replanteja les seves tàctiques 'de manipulació'",
        ],
      },
      {
        title: "TEMA 3. Actua com ho faria un mediador amb una postura inclusiva",
        topics: [
          "Reconeix el punt de vista de l'altre",
          "Accedeix tant com puguis",
          "Dona reconeixement a la persona",
          "Expressa la teva opinió sense punxar",
        ],
      },
      {
        title: "TEMA 4. Cuida les aparences",
        topics: [
          "Inclou l'altre part en la idea",
          "Satisfés els seus interessos",
          "Ajuda'l a quedar bé",
          "Ves a poc a poc, per avançar ràpid",
        ],
      },
      {
        title: "TEMA 5. Ensenya a cooperar per mitjà del poder",
        topics: [
          "Analitza la situació amb l'altre",
          "Evidencia el teu poder",
          "Evidencia la teva generositat",
          "Forja un acord durador",
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
        features: planFeaturesFor("RP20250141155"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141155"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141155"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // espol26-028-002
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-028-002",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "Curs de criminologia. L'eficàcia comunitària - online",
    img: "/images/espol26-028-002.webp",
    heroStats: heroStatsFor("RP20250141176"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=dGRd24wxyjs=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141176"),

    gridImg: "/images/espol26-028-002.webp",
    gridStudents: 30,
    gridStartDate: "16/06/2026",
    gridEndDate: "17/07/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Els beneficis i les conseqüències de la policia reactiva",
        topics: [
          "Policia reactiva vs policia proactiva",
          "Beneficis de la policia reactiva",
          "Conseqüències de l'activitat policial",
        ],
      },
      {
        title: "La policia comunitària",
        topics: [
          "Precedents",
          "Formulació i elements clau",
          "La implementació de la policia comunitària",
          "La implicació dels governs",
        ],
      },
      {
        title: "L'evidència comunitària",
        topics: [
          "Efectes de la policia comunitària en la societat",
          "Estratègies exitoses i no tan exitoses",
          "Dificultats i crítiques de la implementació",
          "Bones pràctiques",
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
        features: planFeaturesFor("RP20250141176"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141176"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141176"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // TRÀNSIT I CIRCULACIÓ ────────────────────────────────────────────────────────

  // espol26-006-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-006-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "Curs d'inspecció i control del tacògraf analògic - online",
    img: "/images/espol26-006-001.webp",
    heroStats: heroStatsFor("RP20250141001"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=noOpwJmtROI=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141001"),

    gridImg: "/images/espol26-006-001.webp",
    gridStudents: 30,
    gridStartDate: "12/05/2026",
    gridEndDate: "12/06/2026",
    isNew: true,
    isPopular: true,

    modules: [
      { title: "TEMA 1. Introducció al tacògraf", topics: [] },
      { title: "TEMA 2. Condicions de fabricació, assaig, instal·lació i control. Característiques generals", topics: [] },
      { title: "TEMA 3. Definicions. El reglament (CE) 165/2014 i el Reglament (UE) nº 1054/2020", topics: [] },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141001"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141001"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141001"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // espol26-013-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-013-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "Curs sobre seguretat viària i eficiència en la conducció - online",
    img: "/images/espol26-013-001.webp",
    heroStats: heroStatsFor("RP20250141036"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=fdpx5fnYf2w=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141036"),

    gridImg: "/images/espol26-013-001.webp",
    gridStudents: 30,
    gridStartDate: "16/06/2026",
    gridEndDate: "17/07/2026",
    isNew: true,
    isPopular: true,

    modules: [
      { title: "TEMA 1. Risc i accidentabilitat", topics: [] },
      { title: "TEMA 2. Principals causes dels accidents de trànsit", topics: [] },
      { title: "TEMA 3. Conducció eficient", topics: [] },
      { title: "TEMA 4. Consells de seguretat en condicions meteorològiques adverses", topics: [] },
      { title: "TEMA 5. Sistemes de retenció infantil", topics: [] },
      { title: "TEMA 6. Utilització del cinturó", topics: [] },
      { title: "TEMA 7. Normativa sobre la circulació en rotondes", topics: [] },
      { title: "TEMA 8. Posició en la conducció", topics: [] },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141036"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141036"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141036"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // espol26-042-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-042-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "Inspecció del nou sistema de tacògraf digital grau mitjà",
    img: "/images/espol26-042-001.webp",
    heroStats: heroStatsFor("RP20250141067"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=AJ5Vpjz2Vmg=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141067"),

    gridImg: "/images/espol26-042-001.webp",
    gridStudents: 30,
    gridStartDate: "12/05/2026",
    gridEndDate: "12/06/2026",
    isNew: true,
    isPopular: true,

    modules: [
      { title: "Marc legislatiu d'aplicació: el paquet Mobilitat I de la UE", topics: [] },
      { title: "Conceptes bàsics sobre el tacògraf digital", topics: [] },
      { title: "Drets i obligacions dels participants", topics: [] },
      { title: "Característiques i elements", topics: [] },
      { title: "Tacògraf digital. STONERIGDE i SIEMENS VDO", topics: [] },
      { title: "Pictogrames bàsics de funcionament", topics: [] },
      { title: "Accessos addicionals i manuals", topics: [] },
      { title: "Introducció i funcions en OUT", topics: [] },
      { title: "Aplicació dels nous temps de conducció i descans sota criteris d'instrucció circular", topics: [] },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141067"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141067"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141067"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // espol26-016-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-016-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "Curs sobre procediments de seguretat ADR - online",
    img: "/images/espol26-016-001.webp",
    heroStats: heroStatsFor("RP20250141150"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=uympuw5k6Ak=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141150"),

    gridImg: "/images/espol26-016-001.webp",
    gridStudents: 30,
    gridStartDate: "12/05/2026",
    gridEndDate: "12/06/2026",
    isNew: true,
    isPopular: true,

    modules: [
      { title: "TEMA 1. Què és l'ADR?", topics: [] },
      { title: "TEMA 2. Exempcions a l'aplicació de la normativa", topics: [] },
      { title: "TEMA 3. Sancions", topics: [] },
      { title: "TEMA 4. Participants i obligacions", topics: [] },
      { title: "TEMA 5. Documentació", topics: [] },
      { title: "TEMA 6. Classificació de matèries i objectes perillosos", topics: [] },
      { title: "TEMA 7. Perill i riscos dels diferents tipus", topics: [] },
      { title: "TEMA 8. Marcat i embalatge", topics: [] },
      { title: "TEMA 9. Panels d'identificació de perill", topics: [] },
      { title: "TEMA 10. Equipament de seguretat i protecció", topics: [] },
      { title: "TEMA 11. Homologació d'envasos i embalatges", topics: [] },
      { title: "TEMA 12. Operacions de càrrega, descàrrega i manipulació", topics: [] },
      { title: "TEMA 13. Seguretat, manipulació i estiva", topics: [] },
      { title: "TEMA 14. Etiquetatge de substàncies químiques", topics: [] },
      { title: "TEMA 15. Responsabilitat per l'incompliment de les normes d'etiquetatge, empaquetat i classificació", topics: [] },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141150"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141150"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141150"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // espol26-034-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-034-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "Actuacions policials en accidents amb vehicles elèctrics",
    img: "/images/espol26-034-001.webp",
    heroStats: heroStatsFor("RP20250141203"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=5KnVOlbAq7s=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141203"),

    gridImg: "/images/espol26-034-001.webp",
    gridStudents: 30,
    gridStartDate: "12/05/2026",
    gridEndDate: "12/06/2026",
    isNew: true,
    isPopular: true,

    modules: [
      { title: "Coneixements bàsics sobre vehicles elèctrics", topics: [] },
      { title: "Riscos específics en intervencions amb vehicles elèctrics", topics: [] },
      { title: "Protocol d'actuació policial en accidents amb vehicles elèctrics", topics: [] },
      { title: "Actuacions amb víctimes i persones implicades", topics: [] },
      { title: "Gestió de situacions d'incendi i fuites", topics: [] },
      { title: "Procediments post-accident", topics: [] },
      { title: "Legislació i normativa aplicable", topics: [] },
      { title: "Casos pràctics i simulacions", topics: [] },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141203"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141203"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141203"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // PROCEDIMENTS POLICIALS ──────────────────────────────────────────────────────

  // espol26-010-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-010-001",
    categoriaLabel: "Procediments Policials",
    categoriaSlug: "procediments-policials",
    titleBase: "Curs de redacció de documents policials 1 - online",
    img: "/images/espol26-010-001.webp",
    heroStats: heroStatsFor("RP20250141030"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Procediments Policials",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=NVuBNZin69w=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141030"),

    gridImg: "/images/espol26-010-001.webp",
    gridStudents: 30,
    gridStartDate: "12/05/2026",
    gridEndDate: "12/06/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "El llenguatge policial",
        topics: [
          "El llenguatge policial com a eina bàsica de comunicació",
          "Trets característics del llenguatge policial",
          "El vocabulari",
        ],
      },
      { title: "Criteris d'estil en la redacció policial", topics: [] },
      {
        title: "La documentació policial",
        topics: [
          "Els objectius comunicatius en la redacció policial",
          "L'elaboració del text policial",
          "Els tractaments personals",
          "Els criteris de revisió",
        ],
      },
      {
        title: "Redacció de documents policials específics",
        topics: [
          "L'ofici",
          "El missatge de correu electrònic",
          "L'informe",
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
        features: planFeaturesFor("RP20250141030"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141030"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141030"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // espol26-033-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-033-001",
    categoriaLabel: "Procediments Policials",
    categoriaSlug: "procediments-policials",
    titleBase: "APEN. Àrea penitenciària: vigilància i trasllats",
    img: "/images/espol26-033-001.webp",
    heroStats: heroStatsFor("RP20250141204"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Procediments Policials",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=zbOfvqN65T0=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141204"),

    gridImg: "/images/espol26-033-001.webp",
    gridStudents: 30,
    gridStartDate: "16/06/2026",
    gridEndDate: "17/07/2026",
    isNew: true,
    isPopular: true,

    modules: [
      { title: "Història i evolució de les presons", topics: [] },
      { title: "Marc normatiu i competencial", topics: [] },
      { title: "Vigilància exterior dels centres penitenciaris", topics: [] },
      { title: "Trasllats penitenciaris i Custòdies", topics: [] },
      { title: "Emergències i incidències", topics: [] },
      { title: "Drons i noves tecnologies", topics: [] },
      { title: "Protocol als jutjats i permisos extraordinaris", topics: [] },
      { title: "Drets i deures de les persones sota custòdia", topics: [] },
      { title: "Coordinació interinstitucional i Unitat d'Entorn Penitenciari (UEP)", topics: [] },
      { title: "Procediments de seguretat i autoprotecció", topics: [] },
      { title: "Legislació i responsabilitat professional", topics: [] },
      { title: "Casos pràctics i actuacions recomanades", topics: [] },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141204"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141204"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141204"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // SEGURETAT CIUTADANA ─────────────────────────────────────────────────────────

  // espol26-026-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-026-001",
    categoriaLabel: "Seguretat Ciutadana",
    categoriaSlug: "seguretat-ciutadana",
    titleBase: "Curs sobre l'aplicació policial de la Llei orgànica 4/2015 - online",
    img: "/images/espol26-026-001.webp",
    heroStats: heroStatsFor("RP20250141152"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Seguretat Ciutadana",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=qruYLed9IAw=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141152"),

    gridImg: "/images/espol26-026-001.webp",
    gridStudents: 30,
    gridStartDate: "12/05/2026",
    gridEndDate: "12/06/2026",
    isNew: true,
    isPopular: true,

    modules: [
      { title: "Principis jurídics aplicables en l'operativa policial", topics: [] },
      { title: "La Llei orgànica 4/2015 de l'àmbit de la seguretat ciutadana", topics: [] },
      { title: "Nomenclàtor codificat d'infraccions a la Llei 4/2015", topics: [] },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141152"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141152"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141152"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // CIBERSEGURETAT ──────────────────────────────────────────────────────────────

  // espol26-039-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-039-001",
    categoriaLabel: "Ciberseguretat",
    categoriaSlug: "ciberseguretat",
    titleBase: "Fundamentos de ciberseguridad para fuerzas y cuerpos de Seguridad - online",
    img: "/images/espol26-039-001.webp",
    heroStats: heroStatsFor("RP20250141193"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Ciberseguretat",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=wtydUn9zrik=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141193"),

    gridImg: "/images/espol26-039-001.webp",
    gridStudents: 30,
    gridStartDate: "12/05/2026",
    gridEndDate: "12/06/2026",
    isNew: true,
    isPopular: true,

    modules: [
      { title: "El Ciberespai", topics: [] },
      { title: "Les 7 característiques del ciberespai", topics: [] },
      { title: "Seguretat i Ciberseguretat", topics: [] },
      { title: "Situació actual del ciberespai", topics: [] },
      { title: "Principals actors d'amenaça", topics: [] },
      { title: "Similituds entre la màfia comuna i el ciberdelicte", topics: [] },
      { title: "La Dark Web", topics: [] },
      { title: "Els 4 ciberatacs més habituals a empreses", topics: [] },
      { title: "Ciberatac o Ciberdelicte?", topics: [] },
      { title: "Enginyeria Social", topics: [] },
      { title: "Consells de ciberseguretat generals", topics: [] },
      { title: "Què faig front a un ciberatac?", topics: [] },
      { title: "Consells de ciberseguretat per a membres de les FCS", topics: [] },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141193"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141193"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141193"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // CRIMINALÍSTICA ──────────────────────────────────────────────────────────────

  // espol26-032-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-032-001",
    categoriaLabel: "Criminalística",
    categoriaSlug: "criminalistica",
    titleBase: "Criminalística: policia científica bàsica",
    img: "/images/espol26-032-001.webp",
    heroStats: heroStatsFor("RP20250141205"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminalística",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=q6E3QkLYpcY=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141205"),

    gridImg: "/images/espol26-032-001.webp",
    gridStudents: 30,
    gridStartDate: "16/06/2026",
    gridEndDate: "17/07/2026",
    isNew: true,
    isPopular: true,

    modules: [
      { title: "MÒDUL 1. Introducció a la Criminalística Policial", topics: [] },
      { title: "MÒDUL 2. L'escena del crim", topics: [] },
      { title: "MÒDUL 3. Indicis i evidències materials", topics: [] },
      { title: "MÒDUL 4. Identificació i empremtes", topics: [] },
      { title: "MÒDUL 5. Balística forense", topics: [] },
      { title: "MÒDUL 6. Biologia i genètica forense", topics: [] },
      { title: "MÒDUL 7. Elaboració d'informes i peritatges policials", topics: [] },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141205"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141205"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141205"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // DRET PENAL ──────────────────────────────────────────────────────────────────

  // espol26-036-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-036-001",
    categoriaLabel: "Dret Penal",
    categoriaSlug: "dret-penal",
    titleBase: "La jurisdicció penal de menors des de l'òptica policial - online",
    img: "/images/espol26-036-001.webp",
    heroStats: heroStatsFor("RP20250141194"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Dret Penal",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=AZPvYCe0ZWU=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141194"),

    gridImg: "/images/espol26-036-001.webp",
    gridStudents: 30,
    gridStartDate: "16/06/2026",
    gridEndDate: "17/07/2026",
    isNew: true,
    isPopular: true,

    modules: [
      { title: "Introducció", topics: [] },
      { title: "Glossari", topics: [] },
      { title: "Aspectes substantius i processals de la Jurisdicció Penal de Menors", topics: [] },
      { title: "Les mesures sancionadores-educatives i la seva execució", topics: [] },
      { title: "Intervenció policial anterior a la redacció de l'atestat", topics: [] },
      { title: "Actuació policial durant la formació de l'atestat", topics: [] },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141194"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141194"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141194"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // espol26-043-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-043-001",
    categoriaLabel: "Dret Penal",
    categoriaSlug: "dret-penal",
    titleBase: "Els delictes contra les persones. Les actuacions policials",
    img: "/images/espol26-043-001.webp",
    heroStats: heroStatsFor("RP20250141207"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Dret Penal",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=hK2TZwweQlU=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141207"),

    gridImg: "/images/espol26-043-001.webp",
    gridStudents: 30,
    gridStartDate: "12/05/2026",
    gridEndDate: "12/06/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "TEMA 1. Característiques del delicte",
        topics: [
          "Subjectes actiu",
          "Subjecte passiu",
          "Béns protegits",
        ],
      },
      {
        title: "TEMA 2. Marc normatiu dels delictes contra les persones",
        topics: [
          "Homicidi i assassinat",
          "Lesions",
          "Delictes contra la llibertat",
          "Tràfic d'éssers humans",
          "Contra la llibertat i indemnitat sexual",
        ],
      },
      {
        title: "TEMA 3. Gestions policials en relació als delictes contra les persones",
        topics: [
          "Homicidis",
          "Lesions",
          "Detencions il·legals i segrestos",
          "Tràfic d'éssers humans",
          "Agressió sexual",
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
        features: planFeaturesFor("RP20250141207"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141207"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141207"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

  // espol26-046-001
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-046-001",
    categoriaLabel: "Dret Penal",
    categoriaSlug: "dret-penal",
    titleBase: "Curs de dret penal sobre l'atemptat als agents de l'autoritat",
    img: "/images/espol26-046-001.webp",
    heroStats: heroStatsFor("RP20250141218"),

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Dret Penal",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=lnr4CFQxNLw=&return=no&returnurl=",
    metaItems: metaItemsFor("RP20250141218"),

    gridImg: "/images/espol26-046-001.webp",
    gridStudents: 30,
    gridStartDate: "16/06/2026",
    gridEndDate: "17/07/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "TEMA 1",
        topics: [
          "Dret Penal",
          "Dret Administratiu",
          "Concurs d'Infraccions Penals",
        ],
      },
      { title: "TEMA 2. Significat de les diferents conductes penals", topics: [] },
      { title: "TEMA 3. Subjecte Passiu", topics: [] },
      { title: "TEMA 4. Supòsits d'antijuridicitat", topics: [] },
      { title: "TEMA 5. Infraccions", topics: [] },
    ],

    plans: [
      {
        name: "Nou afiliat/ada",
        price: 30,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141218"),
      },
      {
        name: "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats",
        price: 25,
        originalPrice: null,
        highlight: true,
        badge: "Afiliats/ades",
        features: planFeaturesFor("RP20250141218"),
      },
      {
        name: "No afiliat/ada",
        price: 50,
        originalPrice: null,
        highlight: false,
        badge: null,
        features: planFeaturesFor("RP20250141218"),
      },
    ],
    audience: audienceEstandard,
    faq: faqEstandard,
    collaborators: collaboratorsEstandard,
  },

];
