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

  // DRET PENAL ─────────────────────────────────────────────────────────────────
  // espol26-026-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-026-001",
    categoriaLabel: "Dret Penal",
    categoriaSlug: "dret-penal",
    titleBase: "CURS SOBRE L'APLICACIÓ POLICIAL DE LA LLEI ORGÀNICA 4/2015",
    titleAccent: "ONLINE",
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
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=qruYLed9IAw=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Dret%20Penal",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250141152" },
    ],

    gridImg: "/images/espol26-026-001.jpg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
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
        title: "Metodologia d\'Investigació Criminal",
        topics: [
          "Tècniques d\'investigació qualitativa i quantitativa",
          "Anàlisi de dades criminalístiques",
          "Elaboració d\'informes pericials",
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
          "Mètodes forenses d\'identificació",
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
          "Eines d\'anàlisi OSINT",
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
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "El millor curs de dret penal que he fet. Els continguts estan molt ben estructurats i el docent explica amb casos reals que et fan entendre tot de forma molt pràctica.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // DRET PENAL ─────────────────────────────────────────────────────────────────
  // espol26-036-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-036-001",
    categoriaLabel: "Dret Penal",
    categoriaSlug: "dret-penal",
    titleBase: "LA JURISDICCIÓ PENAL DE MENORS DES DE L'ÒPTICA POLICIAL",
    titleAccent: "ONLINE",
    img: "/images/espol26-036-001.jpg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP20250141194" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Dret Penal",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=AZPvYCe0ZWU=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Dret%20Penal",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250141194" },
    ],

    gridImg: "/images/espol26-036-001.jpg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
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
        title: "Metodologia d\'Investigació Criminal",
        topics: [
          "Tècniques d\'investigació qualitativa i quantitativa",
          "Anàlisi de dades criminalístiques",
          "Elaboració d\'informes pericials",
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
          "Mètodes forenses d\'identificació",
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
          "Eines d\'anàlisi OSINT",
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
          { text: "Certificat reconegust ISPC: RP20250141194", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141194", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141194", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "El millor curs de dret penal que he fet. Els continguts estan molt ben estructurats i el docent explica amb casos reals que et fan entendre tot de forma molt pràctica.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // CRIMINOLOGIA ─────────────────────────────────────────────────────────────────
  // espol26-001-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-001-001",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "CURS DE DEONTOLOGIA I ÈTICA POLICIAL",
    titleAccent: "ONLINE",
    img: "/images/espol26-001-001.jpg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP2021018001" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=eI4RQukCPQA=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Criminologia",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP2021018001" },
    ],

    gridImg: "/images/espol26-001-001.jpg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
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
        title: "Metodologia d\'Investigació Criminal",
        topics: [
          "Tècniques d\'investigació qualitativa i quantitativa",
          "Anàlisi de dades criminalístiques",
          "Elaboració d\'informes pericials",
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
          "Mètodes forenses d\'identificació",
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
          "Eines d\'anàlisi OSINT",
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
          { text: "Certificat reconegust ISPC: RP2021018001", included: true },
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
          { text: "Certificat reconegust ISPC: RP2021018001", included: true },
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
          { text: "Certificat reconegust ISPC: RP2021018001", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "El millor curs de dret penal que he fet. Els continguts estan molt ben estructurats i el docent explica amb casos reals que et fan entendre tot de forma molt pràctica.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // CRIMINOLOGIA ─────────────────────────────────────────────────────────────────
  // espol26-002-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-002-001",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "CURS DE CRIMINOLOGIA. LA PREVENCIÓ DE LA DELINQÜÈNCIA",
    titleAccent: "ONLINE",
    img: "/images/espol26-002-001.jpg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP20250140963" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=eI4RQukCPQA=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Criminologia",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250140963" },
    ],

    gridImg: "/images/espol26-002-001.jpg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
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
        title: "Metodologia d\'Investigació Criminal",
        topics: [
          "Tècniques d\'investigació qualitativa i quantitativa",
          "Anàlisi de dades criminalístiques",
          "Elaboració d\'informes pericials",
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
          "Mètodes forenses d\'identificació",
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
          "Eines d\'anàlisi OSINT",
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
          { text: "Certificat reconegust ISPC: RP20250140963", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250140963", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250140963", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "El millor curs de dret penal que he fet. Els continguts estan molt ben estructurats i el docent explica amb casos reals que et fan entendre tot de forma molt pràctica.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // CRIMINOLOGIA ─────────────────────────────────────────────────────────────────
  // espol26-004-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-004-001",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "CURS DE CRIMINOLOGIA. RESOLUCIÓ DE PROBLEMES",
    titleAccent: "ONLINE",
    img: "/images/espol26-004-001.jpg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP20250140975" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=xkpaKA+8PCE=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Criminologia",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250140975" },
    ],

    gridImg: "/images/espol26-004-001.jpg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
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
        title: "Metodologia d\'Investigació Criminal",
        topics: [
          "Tècniques d\'investigació qualitativa i quantitativa",
          "Anàlisi de dades criminalístiques",
          "Elaboració d\'informes pericials",
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
          "Mètodes forenses d\'identificació",
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
          "Eines d\'anàlisi OSINT",
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
          { text: "Certificat reconegust ISPC: RP20250140975", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250140975", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250140975", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "El millor curs de dret penal que he fet. Els continguts estan molt ben estructurats i el docent explica amb casos reals que et fan entendre tot de forma molt pràctica.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // CRIMINOLOGIA ─────────────────────────────────────────────────────────────────
  // espol26-029-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-029-001",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "CURS SOBRE INTRODUCCIÓ A LA NEGOCIACIÓ I LA MEDIACIÓ PER A LA SOLUCIÓ DE CONFLICTES",
    titleAccent: "ONLINE",
    img: "/images/espol26-029-001.png",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP20250141153" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=x+hU0p8iQYc=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Criminologia",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250141153" },
    ],

    gridImg: "/images/espol26-029-001.png",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Introducció i Fonaments",
        topics: [
          "Marc normatiu i legal aplicable",
          "Conceptes clau i terminologia específica",
          "Evolució i context actual",
        ],
      },
      {
        title: "Metodologia i Procediments",
        topics: [
          "Protocols d\'actuació policial",
          "Tècniques pràctiques d\'intervenció",
          "Elaboració d\'informes i documentació",
        ],
      },
      {
        title: "Cases Pràctiques",
        topics: [
          "Anàlisi de situacions reals",
          "Resolució de supòsits pràctics",
          "Simulacres i exercicis aplicats",
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
          { text: "Certificat reconegust ISPC: RP20250141153", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141153", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141153", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "Un curs molt complet i pràctic. Els continguts estan molt ben estructurats i el docent explica amb casos reals.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // CRIMINOLOGIA ─────────────────────────────────────────────────────────────────
  // espol26-030-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-030-001",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "CURS PER A GUANYAR LA COOPERACIÓ EN LA MEDIACIÓ I NEGOCIACIÓ",
    titleAccent: "ONLINE",
    img: "/images/espol26-030-001.jpg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP2021018030" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=XreRSu8LUuM=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Criminologia",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP2021018030" },
    ],

    gridImg: "/images/espol26-030-001.jpg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Introducció i Fonaments",
        topics: [
          "Marc normatiu i legal aplicable",
          "Conceptes clau i terminologia específica",
          "Evolució i context actual",
        ],
      },
      {
        title: "Metodologia i Procediments",
        topics: [
          "Protocols d\'actuació policial",
          "Tècniques pràctiques d\'intervenció",
          "Elaboració d\'informes i documentació",
        ],
      },
      {
        title: "Cases Pràctiques",
        topics: [
          "Anàlisi de situacions reals",
          "Resolució de supòsits pràctics",
          "Simulacres i exercicis aplicats",
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
          { text: "Certificat reconegust ISPC: RP2021018030", included: true },
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
          { text: "Certificat reconegust ISPC: RP2021018030", included: true },
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
          { text: "Certificat reconegust ISPC: RP2021018030", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "Un curs molt complet i pràctic. Els continguts estan molt ben estructurats i el docent explica amb casos reals.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // CRIMINOLOGIA ─────────────────────────────────────────────────────────────────
  // espol26-031-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-031-001",
    categoriaLabel: "Criminologia",
    categoriaSlug: "criminologia",
    titleBase: "CURS DE MEDIACIÓ I NEGOCIACIÓ AMB PERSONES QUE ADOPTEN POSTURES INFLEXIBLES. MÒDUL 3",
    titleAccent: "ONLINE",
    img: "/images/espol26-031-001.jpeg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP20250141155" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Criminologia",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=fZREYxjy7rA=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Criminologia",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250141155" },
    ],

    gridImg: "/images/espol26-031-001.jpeg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Introducció i Fonaments",
        topics: [
          "Marc normatiu i legal aplicable",
          "Conceptes clau i terminologia específica",
          "Evolució i context actual",
        ],
      },
      {
        title: "Metodologia i Procediments",
        topics: [
          "Protocols d\'actuació policial",
          "Tècniques pràctiques d\'intervenció",
          "Elaboració d\'informes i documentació",
        ],
      },
      {
        title: "Cases Pràctiques",
        topics: [
          "Anàlisi de situacions reals",
          "Resolució de supòsits pràctics",
          "Simulacres i exercicis aplicats",
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
          { text: "Certificat reconegust ISPC: RP20250141155", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141155", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141155", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "Un curs molt complet i pràctic. Els continguts estan molt ben estructurats i el docent explica amb casos reals.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // TRÀNSIT I CIRCULACIÓ ─────────────────────────────────────────────────────────────────
  // espol26-006-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-006-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "CURS D'INSPECCIÓ I CONTROL DEL TACÒGRAF ANALÒGIC",
    titleAccent: "ONLINE",
    img: "/images/espol26-006-001.jpeg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP20250141001" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=noOpwJmtROI=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Tr%C3%A0nsit%20i%20Circulaci%C3%B3",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250141001" },
    ],

    gridImg: "/images/espol26-006-001.jpeg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Introducció i Fonaments",
        topics: [
          "Marc normatiu i legal aplicable",
          "Conceptes clau i terminologia específica",
          "Evolució i context actual",
        ],
      },
      {
        title: "Metodologia i Procediments",
        topics: [
          "Protocols d\'actuació policial",
          "Tècniques pràctiques d\'intervenció",
          "Elaboració d\'informes i documentació",
        ],
      },
      {
        title: "Cases Pràctiques",
        topics: [
          "Anàlisi de situacions reals",
          "Resolució de supòsits pràctics",
          "Simulacres i exercicis aplicats",
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
          { text: "Certificat reconegust ISPC: RP20250141001", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141001", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141001", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "Un curs molt complet i pràctic. Els continguts estan molt ben estructurats i el docent explica amb casos reals.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // TRÀNSIT I CIRCULACIÓ ─────────────────────────────────────────────────────────────────
  // espol26-008-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-008-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "CURS D'INSPECCIÓ I CONTROL DEL TACÒGRAF DIGITAL",
    titleAccent: "ONLINE",
    img: "/images/espol26-008-001.jpg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP2021018008" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=uaobYmDFLJs=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Tr%C3%A0nsit%20i%20Circulaci%C3%B3",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP2021018008" },
    ],

    gridImg: "/images/espol26-008-001.jpg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Introducció i Fonaments",
        topics: [
          "Marc normatiu i legal aplicable",
          "Conceptes clau i terminologia específica",
          "Evolució i context actual",
        ],
      },
      {
        title: "Metodologia i Procediments",
        topics: [
          "Protocols d\'actuació policial",
          "Tècniques pràctiques d\'intervenció",
          "Elaboració d\'informes i documentació",
        ],
      },
      {
        title: "Cases Pràctiques",
        topics: [
          "Anàlisi de situacions reals",
          "Resolució de supòsits pràctics",
          "Simulacres i exercicis aplicats",
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
          { text: "Certificat reconegust ISPC: RP2021018008", included: true },
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
          { text: "Certificat reconegust ISPC: RP2021018008", included: true },
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
          { text: "Certificat reconegust ISPC: RP2021018008", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "Un curs molt complet i pràctic. Els continguts estan molt ben estructurats i el docent explica amb casos reals.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // TRÀNSIT I CIRCULACIÓ ─────────────────────────────────────────────────────────────────
  // espol26-013-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-013-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "CURS SOBRE SEGURETAT VIÀRIA I EFICIÈNCIA EN LA CONDUCCIÓ",
    titleAccent: "ONLINE",
    img: "/images/espol26-013-001.jpg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP20250141036" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=fdpx5fnYf2w=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Tr%C3%A0nsit%20i%20Circulaci%C3%B3",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250141036" },
    ],

    gridImg: "/images/espol26-013-001.jpg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Introducció i Fonaments",
        topics: [
          "Marc normatiu i legal aplicable",
          "Conceptes clau i terminologia específica",
          "Evolució i context actual",
        ],
      },
      {
        title: "Metodologia i Procediments",
        topics: [
          "Protocols d\'actuació policial",
          "Tècniques pràctiques d\'intervenció",
          "Elaboració d\'informes i documentació",
        ],
      },
      {
        title: "Cases Pràctiques",
        topics: [
          "Anàlisi de situacions reals",
          "Resolució de supòsits pràctics",
          "Simulacres i exercicis aplicats",
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
          { text: "Certificat reconegust ISPC: RP20250141036", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141036", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141036", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "Un curs molt complet i pràctic. Els continguts estan molt ben estructurats i el docent explica amb casos reals.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // TRÀNSIT I CIRCULACIÓ ─────────────────────────────────────────────────────────────────
  // espol26-016-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-016-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "CURS SOBRE PROCEDIMENTS DE SEGURETAT ADR",
    titleAccent: "ONLINE",
    img: "/images/espol26-016-001.jpg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP20250141150" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=uympuw5k6Ak=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Tr%C3%A0nsit%20i%20Circulaci%C3%B3",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250141150" },
    ],

    gridImg: "/images/espol26-016-001.jpg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Introducció i Fonaments",
        topics: [
          "Marc normatiu i legal aplicable",
          "Conceptes clau i terminologia específica",
          "Evolució i context actual",
        ],
      },
      {
        title: "Metodologia i Procediments",
        topics: [
          "Protocols d\'actuació policial",
          "Tècniques pràctiques d\'intervenció",
          "Elaboració d\'informes i documentació",
        ],
      },
      {
        title: "Cases Pràctiques",
        topics: [
          "Anàlisi de situacions reals",
          "Resolució de supòsits pràctics",
          "Simulacres i exercicis aplicats",
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
          { text: "Certificat reconegust ISPC: RP20250141150", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141150", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141150", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "Un curs molt complet i pràctic. Els continguts estan molt ben estructurats i el docent explica amb casos reals.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // TRÀNSIT I CIRCULACIÓ ─────────────────────────────────────────────────────────────────
  // espol26-042-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-042-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "INSPECCIÓ DEL NOU SISTEMA DE TACÒGRAF DIGITAL GRAU MITJÀ",
    titleAccent: "ONLINE",
    img: "/images/espol26-042-001.png",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP20250141067" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=AZPvYCe0ZWU=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Tr%C3%A0nsit%20i%20Circulaci%C3%B3",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250141067" },
    ],

    gridImg: "/images/espol26-042-001.png",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Introducció i Fonaments",
        topics: [
          "Marc normatiu i legal aplicable",
          "Conceptes clau i terminologia específica",
          "Evolució i context actual",
        ],
      },
      {
        title: "Metodologia i Procediments",
        topics: [
          "Protocols d\'actuació policial",
          "Tècniques pràctiques d\'intervenció",
          "Elaboració d\'informes i documentació",
        ],
      },
      {
        title: "Cases Pràctiques",
        topics: [
          "Anàlisi de situacions reals",
          "Resolució de supòsits pràctics",
          "Simulacres i exercicis aplicats",
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
          { text: "Certificat reconegust ISPC: RP20250141067", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141067", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141067", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "Un curs molt complet i pràctic. Els continguts estan molt ben estructurats i el docent explica amb casos reals.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // TRÀNSIT I CIRCULACIÓ ─────────────────────────────────────────────────────────────────
  // espol26-035-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-035-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "ACTUACIONS BÀSIQUES EN ACCIDENTS DE TRÀNSIT",
    titleAccent: "ONLINE",
    img: "/images/espol26-035-001.jpg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP2021018028" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=svexMfMynJg=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Tr%C3%A0nsit%20i%20Circulaci%C3%B3",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP2021018028" },
    ],

    gridImg: "/images/espol26-035-001.jpg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Introducció i Fonaments",
        topics: [
          "Marc normatiu i legal aplicable",
          "Conceptes clau i terminologia específica",
          "Evolució i context actual",
        ],
      },
      {
        title: "Metodologia i Procediments",
        topics: [
          "Protocols d\'actuació policial",
          "Tècniques pràctiques d\'intervenció",
          "Elaboració d\'informes i documentació",
        ],
      },
      {
        title: "Cases Pràctiques",
        topics: [
          "Anàlisi de situacions reals",
          "Resolució de supòsits pràctics",
          "Simulacres i exercicis aplicats",
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
          { text: "Certificat reconegust ISPC: RP2021018028", included: true },
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
          { text: "Certificat reconegust ISPC: RP2021018028", included: true },
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
          { text: "Certificat reconegust ISPC: RP2021018028", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "Un curs molt complet i pràctic. Els continguts estan molt ben estructurats i el docent explica amb casos reals.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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
  // TRÀNSIT I CIRCULACIÓ ─────────────────────────────────────────────────────────────────
  // espol26-034-001
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "espol26-034-001",
    categoriaLabel: "Trànsit i Circulació",
    categoriaSlug: "transit-i-circulacio",
    titleBase: "ACTUACIONS POLICIALS EN ACCIDENTS AMB VEHICLES ELÈCTRICS",
    titleAccent: "ONLINE",
    img: "/images/espol26-034-001.jpg",
    heroStats: [
      { label: "100% online" },
      { label: "Matrícula oberta" },
      { label: "Certificat reconegust ISPC: RP20250141203" },
    ],

    price: 25,
    originalPrice: null,
    sidebarCategoryLabel: "Trànsit i Circulació",
    totalPlaces: 35,
    remainingPlaces: 35,
    enrollmentUrl: "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=5KnVOlbAq7s=&return=no&returnurl=",
    whatsappText: "Hola!%20M'interessa%20el%20curs%20de%20Tr%C3%A0nsit%20i%20Circulaci%C3%B3",
    metaItems: [
      { label: "Modalitat", value: "100% online" },
      { label: "Inici", value: "Accés immediat" },
      { label: "Certificat reconegust ISPC", value: "RP20250141203" },
    ],

    gridImg: "/images/espol26-034-001.jpg",
    gridStudents: 30,
    gridStartDate: "14/04/2026",
    gridEndDate: "13/05/2026",
    isNew: true,
    isPopular: true,

    modules: [
      {
        title: "Introducció i Fonaments",
        topics: [
          "Marc normatiu i legal aplicable",
          "Conceptes clau i terminologia específica",
          "Evolució i context actual",
        ],
      },
      {
        title: "Metodologia i Procediments",
        topics: [
          "Protocols d\'actuació policial",
          "Tècniques pràctiques d\'intervenció",
          "Elaboració d\'informes i documentació",
        ],
      },
      {
        title: "Cases Pràctiques",
        topics: [
          "Anàlisi de situacions reals",
          "Resolució de supòsits pràctics",
          "Simulacres i exercicis aplicats",
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
          { text: "Certificat reconegust ISPC: RP20250141203", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141203", included: true },
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
          { text: "Certificat reconegust ISPC: RP20250141203", included: true },
          { text: "Tutories en línea", included: true },
          { text: "Accés il·limitat", included: true },
        ],
      },
    ],

    audience: [
      {
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d\'Esquadra, Policia Nacional, Guàrdia Civil, alumnes de l\'ISPC i policies locals que volen ampliar la seva formació.",
      },
    ],

    faq: [
      {
        q: "El certificat és vàlid per a les oposicions dels Mossos d\'Esquadra?",
        a: "Sí. El certificat emès per ESPOL és reconegut com a mèrit en els processos selectius dels Mossos d\'Esquadra, Policia Nacional i policies locals de Catalunya. Puntua dins l\'apartat de formació complementària.",
      },
      {
        q: "Hi ha examen final?",
        a: "El curs s\'avalua mitjançant activitats i el qüestionari en línia. A més, si vols aconseguir el certificat d\'aprofitament perquè el curs t\'atorgui mèrits cal superar una prova presencial.",
      },
      {
        q: "Puc fer el curs al meu propi ritme?",
        a: "Sí, el curs és 100% asíncron. Un cop matriculat tens accés il·limitat als continguts i pots avançar al teu ritme, però sempre dins la data de finalització del curs.",
      },
      {
        q: "Oferiu tutories o suport durant el curs?",
        a: "Sí. Tots els alumnes matriculats tenen accés a tutories a través d\'un fòrum de dubtes amb resposta garantida en menys de 48 hores hàbils.",
      },
      {
        q: "Quan rebo el certificat un cop acabat el curs?",
        a: "El certificat s\'emet automàticament en format digital en un termini de 5 dies hàbils des que es completa l\'última activitat i s\'aprova el curs. El document té validesa legal i inclou codi de verificació.",
      },
      {
        q: "Es pot sol·licitar factura per a empresa o organisme públic?",
        a: "Sí, en el moment de la matrícula pots indicar les dades fiscals de l\'empresa o organisme. La factura s\'envia al correu electrònic en un termini de 48 hores.",
      },
    ],

    reviews: {
      rating: 4.9,
      count: 238,
      text: "Un curs molt complet i pràctic. Els continguts estan molt ben estructurats i el docent explica amb casos reals.",
      author: "Maria G.",
      role: "Mossos d\'Esquadra · 2025",
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