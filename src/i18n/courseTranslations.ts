// Spanish translation lookups for dynamic course data (plans, FAQ, audience, titles)

export const COURSE_TITLES_ES: Record<string, string> = {
  "espol26-002-001": "Curso de criminología. La prevención de la delincuencia - online",
  "espol26-004-001": "Curso de criminología. Resolución de problemas - online",
  "espol26-029-001": "Curso sobre introducción a la negociación y la mediación para la solución de conflictos",
  "espol26-031-001": "Curso de mediación y negociación con personas que adoptan posturas inflexibles. MÓDULO 3 - online",
  "espol26-028-002": "Curso de criminología. La eficacia comunitaria - online",
  "espol26-006-001": "Curso de inspección y control del tacógrafo analógico - online",
  "espol26-013-001": "Curso sobre seguridad vial y eficiencia en la conducción - online",
  "espol26-042-001": "Inspección del nuevo sistema de tacógrafo digital grado medio",
  "espol26-016-001": "Curso sobre procedimientos de seguridad ADR - online",
  "espol26-034-001": "Actuaciones policiales en accidentes con vehículos eléctricos",
  "espol26-010-001": "Curso de redacción de documentos policiales 1 - online",
  "espol26-033-001": "APEN. Área penitenciaria: vigilancia y traslados",
  "espol26-026-001": "Curso sobre la aplicación policial de la Ley orgánica 4/2015 - online",
  "espol26-039-001": "Fundamentos de ciberseguridad para fuerzas y cuerpos de Seguridad - online",
  "espol26-032-001": "Criminalística: policía científica básica",
  "espol26-036-001": "La jurisdicción penal de menores desde la óptica policial - online",
  "espol26-043-001": "Los delitos contra las personas. Las actuaciones policiales",
  "espol26-046-001": "Curso de derecho penal sobre el atentado a los agentes de la autoridad",
  "espol26-053-001": "Curso ACTIC MEDIO",
  "espol26-054-001": "Curso ACTIC AVANZADO",
  "espol26-055-001": "Curso Inglés Nivel B2",
};

export const PLAN_NAMES_ES: Record<string, string> = {
  "Nou afiliat/ada": "Nuevo afiliado/a",
  "Afiliat/ada + 6 mesos i alumnes en pràctiques afiliats": "Afiliado/a + 6 meses y alumnos en prácticas afiliados",
  "No afiliat/ada": "No afiliado/a",
};

export const PLAN_BADGES_ES: Record<string, string> = {
  "Afiliats/ades": "Afiliados/as",
};

const FEATURE_MAP: Record<string, string> = {
  "Accés a tots els mòduls": "Acceso a todos los módulos",
  "Material didàctic PDF": "Material didáctico PDF",
  "Tutories en línea": "Tutorías en línea",
  "Accés il·limitat dins de la durada del curs": "Acceso ilimitado durante la duración del curso",
  "Accés il·limitat": "Acceso ilimitado",
};

export const translateFeature = (text: string): string => {
  if (FEATURE_MAP[text]) return FEATURE_MAP[text];
  if (text.startsWith("Certificat reconegust ISPC:"))
    return text.replace("Certificat reconegust ISPC:", "Certificado reconocido ISPC:");
  return text;
};

export const translateHeroStat = (label: string): string => {
  if (label === "Matrícula oberta") return "Matrícula abierta";
  if (label === "Pròximament") return "Próximamente";
  if (label.startsWith("Certificat reconegust ISPC:"))
    return label.replace("Certificat reconegust ISPC:", "Certificado reconocido ISPC:");
  return label;
};

export const META_LABEL_ES: Record<string, string> = {
  "Modalitat": "Modalidad",
  "Certificat reconegust ISPC": "Certificado reconocido ISPC",
};

export const FAQ_Q_ES: Record<string, { q: string; a: string }> = {
  "El certificat és vàlid per a les oposicions dels Mossos d'Esquadra?": {
    q: "¿El certificado es válido para las oposiciones de los Mossos d'Esquadra?",
    a: "En el proceso selectivo no, pero sí en los procesos de promoción interna y concursos de traslado - movilidad horizontal.",
  },
  "Hi ha examen final?": {
    q: "¿Hay examen final?",
    a: "El curso se evalúa mediante actividades y el cuestionario en línea. Además, si quieres obtener el certificado de aprovechamiento para que el curso te otorgue méritos, es necesario superar una prueba presencial.",
  },
  "Puc fer el curs al meu propi ritme?": {
    q: "¿Puedo hacer el curso a mi propio ritmo?",
    a: "Sí, el curso es 100% asíncrono. Una vez matriculado tienes acceso ilimitado a los contenidos y puedes avanzar a tu ritmo, pero siempre dentro de la fecha de finalización del curso.",
  },
  "Oferiu tutories o suport durant el curs?": {
    q: "¿Ofrecéis tutorías o soporte durante el curso?",
    a: "Sí. Todos los alumnos matriculados tienen acceso a tutorías a través de un foro de dudas con respuesta garantizada en menos de 48 horas hábiles.",
  },
  "Quan rebo el certificat un cop acabat el curs?": {
    q: "¿Cuándo recibo el certificado una vez finalizado el curso?",
    a: "El certificado se emite automáticamente en formato digital en un plazo de cinco días hábiles desde que finaliza el curso. El documento tiene validez legal e incluye código de verificación.",
  },
  "Es pot sol·licitar factura per a empresa o organisme públic?": {
    q: "¿Se puede solicitar factura para empresa u organismo público?",
    a: "Sí, en el momento de la matrícula puedes indicar los datos fiscales de la empresa u organismo. La factura se envía al correo electrónico en un plazo de 48 horas hábiles.",
  },
};

export const AUDIENCE_TITLE_ES: Record<string, { title: string; desc: string }> = {
  "Cossos de Seguretat": {
    title: "Cuerpos de Seguridad",
    desc: "Agentes del Cuerpo de Mossos d'Esquadra, Policía Nacional, Guardia Civil, alumnos del ISPC y policías locales que quieren ampliar su formación.",
  },
};

type ModuleES = { title: string; topics: string[] };

export const MODULES_ES: Record<string, ModuleES[]> = {
  "espol26-002-001": [
    {
      title: "TEMA 1. Introducción a la criminología y a la prevención",
      topics: [
        "La criminología preventiva",
        "La prevención de la delincuencia",
      ],
    },
    {
      title: "TEMA 2. Fundamento teórico y práctico de las diferentes formas de prevención",
      topics: [
        "Prevención mediante el sistema de justicia penal",
        "Prevención del desarrollo",
        "Prevención comunitaria",
        "Prevención situacional",
        "Prevención policial mediante los modelos proactivos",
      ],
    },
    {
      title: "TEMA 3. Estrategias, técnicas y programas de prevención de la delincuencia",
      topics: [
        "Propuestas Internacionales",
        "Estrategias que aumentan la seguridad de los ciudadanos",
        "Las veinticinco técnicas de prevención situacional",
        "La evaluación de los programas de prevención de la delincuencia",
      ],
    },
  ],
  "espol26-004-001": [
    {
      title: "La policía orientada a la resolución de problemas delictivos",
      topics: [
        "Eficacia de las estrategias policiales",
        "Concepto y fundamento de la policía orientada a la resolución de problemas delictivos",
        "Condiciones ambientales criminológicas",
      ],
    },
    {
      title: "El procedimiento de resolución BASE (SARA)",
      topics: [
        "La identificación de los factores criminógenos",
        "El análisis de los problemas",
        "Las propuestas de resolución",
        "La evaluación eficaz",
      ],
    },
    {
      title: "La perspectiva de valoración de los problemas",
      topics: [
        "La comunicación",
        "Aspectos positivos del modelo de policía orientada a la resolución de problemas",
        "Críticas al modelo de policía orientada a la resolución de problemas",
        "Diferentes evoluciones del modelo",
      ],
    },
  ],
  "espol26-029-001": [
    {
      title: "TEMA 1. Definiciones",
      topics: [
        "Qué es un conflicto",
        "Qué es una negociación",
        "Qué es una mediación",
      ],
    },
    {
      title: "TEMA 2. Negociaciones básicas - Mapa de las negociaciones",
      topics: [
        "Intereses",
        "Opciones",
        "Normas",
        "Alternativas",
        "Propuestas",
      ],
    },
    {
      title: "TEMA 3. Diez pasos que ayudan a llevar el ritmo de una negociación",
      topics: [
        "Crear un clima favorable para las negociaciones",
        "Revelar y averiguar intereses para progresar",
        "Discutir normas de equidad y pedir consejo",
        "Aspiraciones y no limitaciones",
        "Replantear amenazas, insultos, culpabilizaciones",
      ],
    },
    {
      title: "TEMA 4 – Mediación básica – Principios básicos de actuación",
      topics: [
        "Confidencialidad y actitud sin juicios",
        "Clarificación de intereses y posibilidades reales",
        "Ninguna implicación en la solución",
        "Creación de confianza y comunicación clara",
        "Adaptabilidad a lo que hay",
        "Visión amplia sobre los recursos",
      ],
    },
  ],
  "espol26-031-001": [
    {
      title: "TEMA 1. No reacciones",
      topics: [
        "Tipos de tácticas para hacerte saltar",
        "Conoce tus puntos vulnerables",
      ],
    },
    {
      title: "TEMA 2. Desactiva las emociones negativas de la otra parte",
      topics: [
        "No discutas, ponte de su parte.",
        "Replantea su posición",
        "Replantea sus tácticas 'de manipulación'",
      ],
    },
    {
      title: "TEMA 3. Actúa como lo haría un mediador con una postura inclusiva",
      topics: [
        "Reconoce el punto de vista del otro",
        "Accede tanto como puedas",
        "Da reconocimiento a la persona",
        "Expresa tu opinión sin pinchar",
      ],
    },
    {
      title: "TEMA 4. Cuida las apariencias",
      topics: [
        "Incluye a la otra parte en la idea",
        "Satisface sus intereses",
        "Ayúdale a quedar bien",
        "Ve despacio, para avanzar rápido",
      ],
    },
    {
      title: "TEMA 5. Enseña a cooperar a través del poder",
      topics: [
        "Analiza la situación con el otro",
        "Evidencia tu poder",
        "Evidencia tu generosidad",
        "Forja un acuerdo duradero",
      ],
    },
  ],
  "espol26-028-002": [
    {
      title: "Los beneficios y las consecuencias de la policía reactiva",
      topics: [
        "Policía reactiva vs policía proactiva",
        "Beneficios de la policía reactiva",
        "Consecuencias de la actividad policial",
      ],
    },
    {
      title: "La policía comunitaria",
      topics: [
        "Precedentes",
        "Formulación y elementos clave",
        "La implementación de la policía comunitaria",
        "La implicación de los gobiernos",
      ],
    },
    {
      title: "La evidencia comunitaria",
      topics: [
        "Efectos de la policía comunitaria en la sociedad",
        "Estrategias exitosas y no tan exitosas",
        "Dificultades y críticas de la implementación",
        "Buenas prácticas",
      ],
    },
  ],
  "espol26-006-001": [
    { title: "TEMA 1. Introducción al tacógrafo", topics: [] },
    { title: "TEMA 2. Condiciones de fabricación, ensayo, instalación y control. Características generales", topics: [] },
    { title: "TEMA 3. Definiciones. El reglamento (CE) 165/2014 y el Reglamento (UE) nº 1054/2020", topics: [] },
  ],
  "espol26-013-001": [
    { title: "TEMA 1. Riesgo y accidentabilidad", topics: [] },
    { title: "TEMA 2. Principales causas de los accidentes de tráfico", topics: [] },
    { title: "TEMA 3. Conducción eficiente", topics: [] },
    { title: "TEMA 4. Consejos de seguridad en condiciones meteorológicas adversas", topics: [] },
    { title: "TEMA 5. Sistemas de retención infantil", topics: [] },
    { title: "TEMA 6. Utilización del cinturón", topics: [] },
    { title: "TEMA 7. Normativa sobre la circulación en rotondas", topics: [] },
    { title: "TEMA 8. Posición en la conducción", topics: [] },
  ],
  "espol26-042-001": [
    { title: "Marco legislativo de aplicación: el paquete Movilidad I de la UE", topics: [] },
    { title: "Conceptos básicos sobre el tacógrafo digital", topics: [] },
    { title: "Derechos y obligaciones de los participantes", topics: [] },
    { title: "Características y elementos", topics: [] },
    { title: "Tacógrafo digital. STONERIGDE y SIEMENS VDO", topics: [] },
    { title: "Pictogramas básicos de funcionamiento", topics: [] },
    { title: "Accesos adicionales y manuales", topics: [] },
    { title: "Introducción y funciones en OUT", topics: [] },
    { title: "Aplicación de los nuevos tiempos de conducción y descanso bajo criterios de instrucción circular", topics: [] },
  ],
  "espol26-016-001": [
    { title: "TEMA 1. ¿Qué es el ADR?", topics: [] },
    { title: "TEMA 2. Exenciones a la aplicación de la normativa", topics: [] },
    { title: "TEMA 3. Sanciones", topics: [] },
    { title: "TEMA 4. Participantes y obligaciones", topics: [] },
    { title: "TEMA 5. Documentación", topics: [] },
    { title: "TEMA 6. Clasificación de materias y objetos peligrosos", topics: [] },
    { title: "TEMA 7. Peligro y riesgos de los diferentes tipos", topics: [] },
    { title: "TEMA 8. Marcado y embalaje", topics: [] },
    { title: "TEMA 9. Paneles de identificación de peligro", topics: [] },
    { title: "TEMA 10. Equipamiento de seguridad y protección", topics: [] },
    { title: "TEMA 11. Homologación de envases y embalajes", topics: [] },
    { title: "TEMA 12. Operaciones de carga, descarga y manipulación", topics: [] },
    { title: "TEMA 13. Seguridad, manipulación y estiba", topics: [] },
    { title: "TEMA 14. Etiquetado de sustancias químicas", topics: [] },
    { title: "TEMA 15. Responsabilidad por el incumplimiento de las normas de etiquetado, empaquetado y clasificación", topics: [] },
  ],
  "espol26-034-001": [
    { title: "Conocimientos básicos sobre vehículos eléctricos", topics: [] },
    { title: "Riesgos específicos en intervenciones con vehículos eléctricos", topics: [] },
    { title: "Protocolo de actuación policial en accidentes con vehículos eléctricos", topics: [] },
    { title: "Actuaciones con víctimas y personas implicadas", topics: [] },
    { title: "Gestión de situaciones de incendio y fugas", topics: [] },
    { title: "Procedimientos post-accidente", topics: [] },
    { title: "Legislación y normativa aplicable", topics: [] },
    { title: "Casos prácticos y simulaciones", topics: [] },
  ],
  "espol26-010-001": [
    {
      title: "El lenguaje policial",
      topics: [
        "El lenguaje policial como herramienta básica de comunicación",
        "Rasgos característicos del lenguaje policial",
        "El vocabulario",
      ],
    },
    { title: "Criterios de estilo en la redacción policial", topics: [] },
    {
      title: "La documentación policial",
      topics: [
        "Los objetivos comunicativos en la redacción policial",
        "La elaboración del texto policial",
        "Los tratamientos personales",
        "Los criterios de revisión",
      ],
    },
    {
      title: "Redacción de documentos policiales específicos",
      topics: [
        "El oficio",
        "El mensaje de correo electrónico",
        "El informe",
      ],
    },
  ],
  "espol26-033-001": [
    { title: "Historia y evolución de las prisiones", topics: [] },
    { title: "Marco normativo y competencial", topics: [] },
    { title: "Vigilancia exterior de los centros penitenciarios", topics: [] },
    { title: "Traslados penitenciarios y Custodias", topics: [] },
    { title: "Emergencias e incidencias", topics: [] },
    { title: "Drones y nuevas tecnologías", topics: [] },
    { title: "Protocolo en los juzgados y permisos extraordinarios", topics: [] },
    { title: "Derechos y deberes de las personas bajo custodia", topics: [] },
    { title: "Coordinación interinstitucional y Unidad de Entorno Penitenciario (UEP)", topics: [] },
    { title: "Procedimientos de seguridad y autoprotección", topics: [] },
    { title: "Legislación y responsabilidad profesional", topics: [] },
    { title: "Casos prácticos y actuaciones recomendadas", topics: [] },
  ],
  "espol26-026-001": [
    { title: "Principios jurídicos aplicables en la operativa policial", topics: [] },
    { title: "La Ley orgánica 4/2015 del ámbito de la seguridad ciudadana", topics: [] },
    { title: "Nomenclátor codificado de infracciones a la Ley 4/2015", topics: [] },
  ],
  "espol26-039-001": [
    { title: "El Ciberespacio", topics: [] },
    { title: "Las 7 características del ciberespacio", topics: [] },
    { title: "Seguridad y Ciberseguridad", topics: [] },
    { title: "Situación actual del ciberespacio", topics: [] },
    { title: "Principales actores de amenaza", topics: [] },
    { title: "Similitudes entre la mafia común y el ciberdelito", topics: [] },
    { title: "La Dark Web", topics: [] },
    { title: "Los 4 ciberataques más habituales en empresas", topics: [] },
    { title: "¿Ciberataque o Ciberdelito?", topics: [] },
    { title: "Ingeniería Social", topics: [] },
    { title: "Consejos de ciberseguridad generales", topics: [] },
    { title: "¿Qué hago ante un ciberataque?", topics: [] },
    { title: "Consejos de ciberseguridad para miembros de las FCS", topics: [] },
  ],
  "espol26-032-001": [
    { title: "MÓDULO 1. Introducción a la Criminalística Policial", topics: [] },
    { title: "MÓDULO 2. La escena del crimen", topics: [] },
    { title: "MÓDULO 3. Indicios y evidencias materiales", topics: [] },
    { title: "MÓDULO 4. Identificación y huellas", topics: [] },
    { title: "MÓDULO 5. Balística forense", topics: [] },
    { title: "MÓDULO 6. Biología y genética forense", topics: [] },
    { title: "MÓDULO 7. Elaboración de informes y peritajes policiales", topics: [] },
  ],
  "espol26-036-001": [
    { title: "Introducción", topics: [] },
    { title: "Glosario", topics: [] },
    { title: "Aspectos sustantivos y procesales de la Jurisdicción Penal de Menores", topics: [] },
    { title: "Las medidas sancionadoras-educativas y su ejecución", topics: [] },
    { title: "Intervención policial anterior a la redacción del atestado", topics: [] },
    { title: "Actuación policial durante la formación del atestado", topics: [] },
  ],
  "espol26-043-001": [
    {
      title: "TEMA 1. Características del delito",
      topics: [
        "Sujeto activo",
        "Sujeto pasivo",
        "Bienes protegidos",
      ],
    },
    {
      title: "TEMA 2. Marco normativo de los delitos contra las personas",
      topics: [
        "Homicidio y asesinato",
        "Lesiones",
        "Delitos contra la libertad",
        "Tráfico de seres humanos",
        "Contra la libertad e indemnidad sexual",
      ],
    },
    {
      title: "TEMA 3. Gestiones policiales en relación a los delitos contra las personas",
      topics: [
        "Homicidios",
        "Lesiones",
        "Detenciones ilegales y secuestros",
        "Tráfico de seres humanos",
        "Agresión sexual",
      ],
    },
  ],
  "espol26-046-001": [
    {
      title: "TEMA 1",
      topics: [
        "Derecho Penal",
        "Derecho Administrativo",
        "Concurso de Infracciones Penales",
      ],
    },
    { title: "TEMA 2. Significado de las diferentes conductas penales", topics: [] },
    { title: "TEMA 3. Sujeto Pasivo", topics: [] },
    { title: "TEMA 4. Supuestos de antijuridicidad", topics: [] },
    { title: "TEMA 5. Infracciones", topics: [] },
  ],
  "espol26-053-001": [
    { title: "C1 - Cultura, participación y civismo digital", topics: [] },
    { title: "C2 - Tecnología digital, uso del ordenador y del sistema operativo", topics: [] },
    { title: "C3 - Navegación, búsqueda y comunicación en el mundo digital", topics: [] },
    { title: "C4 - Tratamiento de la información escrita", topics: [] },
    { title: "C5 - Tratamiento de la información gráfica, sonora y de la imagen en movimiento", topics: [] },
    { title: "C6 - Tratamiento de la información numérica", topics: [] },
    { title: "C7 - Tratamiento de los datos", topics: [] },
    { title: "C8 - Presentación de contenidos", topics: [] },
  ],
  "espol26-054-001": [
    { title: "C4 - Tratamiento de la información escrita", topics: [] },
    { title: "C5 - Tratamiento de la información gráfica, sonora y de la imagen en movimiento", topics: [] },
    { title: "C6 - Tratamiento de la información numérica", topics: [] },
    { title: "C7 - Tratamiento de los datos", topics: [] },
    { title: "C8 - Presentación de contenidos", topics: [] },
  ],
};
