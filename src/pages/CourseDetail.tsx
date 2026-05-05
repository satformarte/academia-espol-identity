// ─────────────────────────────────────────────────────────────────────────────
// src/pages/CourseDetail.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import {
    ChevronRight,
    ChevronDown,
    BookOpen,
    BookMarked,
    Clock,
    Users,
    User,
    UserX,
    Award,
    CheckCircle2,
    Target,
    UserCheck,
    GraduationCap,
    FileText,
    MessageCircle,
    Star,
    CalendarDays,
    Monitor,
    BadgeCheck,
    ShieldCheck,
    ShieldAlert,
    Microscope,
    Brain,
    Scale,
    Search,
    X,
    HelpCircle,
    Check,
    BadgeAlert,
    Flame,
    AlertTriangle,
    AlertOctagon,
    Zap,
    Package,
    Layers,
    Wrench,
    Key,
    Eye,
    EyeOff,
    Tag,
    Truck,
    Heart,
    Gauge,
    MapPin,
    Cloud,
    Globe,
    Bug,
    Lock,
    Mail,
    Building2,
    Navigation,
    Lightbulb,
    TrendingUp,
    Fingerprint,
    PenLine,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCourses, useCourse } from "@/hooks/useCourses";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    COURSE_TITLES_ES,
    translateHeroStat,
    FAQ_Q_ES,
    AUDIENCE_TITLE_ES,
    MODULES_ES,
} from "@/i18n/courseTranslations";

const MODULE_ICON_MAP: { keys: string[]; icon: JSX.Element }[] = [
    // ── Ciberseguretat (específics primer) ────────────────────────────────────
    { keys: ['ciberespai', 'ciberesp'],                                            icon: <Globe size={18} /> },
    { keys: ['ciberatac', 'atac inform'],                                          icon: <Bug size={18} /> },
    { keys: ['ciberseg'],                                                          icon: <ShieldAlert size={18} /> },
    { keys: ['dark web'],                                                          icon: <EyeOff size={18} /> },
    { keys: ['màfia', 'similitud'],                                                icon: <UserX size={18} /> },
    { keys: ['enginyeria social'],                                                 icon: <MessageCircle size={18} /> },
    { keys: ['amenaça'],                                                           icon: <AlertOctagon size={18} /> },
    { keys: ['consells', 'que faig front', 'recoman'],                             icon: <Lightbulb size={18} /> },
    { keys: ['situació actual', 'tendència'],                                      icon: <TrendingUp size={18} /> },

    // ── Àrea penitenciària ────────────────────────────────────────────────────
    { keys: ['penitenci', 'presó', 'centre penit'],                                icon: <Building2 size={18} /> },
    { keys: ['trasllat', 'custòd'],                                                icon: <Navigation size={18} /> },
    { keys: ['drons'],                                                             icon: <Navigation size={18} /> },
    { keys: ['vigilàn'],                                                           icon: <Eye size={18} /> },
    { keys: ['jutjat', 'permís extrao'],                                           icon: <Scale size={18} /> },
    { keys: ['coordinació interinstitucion', 'entorn penitenci'],                  icon: <Users size={18} /> },

    // ── Criminalística ────────────────────────────────────────────────────────
    { keys: ['empremtes'],                                                         icon: <Fingerprint size={18} /> },
    { keys: ['balística'],                                                         icon: <Target size={18} /> },
    { keys: ['biologia', 'genètica'],                                              icon: <Microscope size={18} /> },
    { keys: ['escena del crim', "escena"],                                         icon: <Search size={18} /> },
    { keys: ['peritatge'],                                                         icon: <FileText size={18} /> },

    // ── Redacció de documents ─────────────────────────────────────────────────
    { keys: ['vocabulari'],                                                        icon: <BookMarked size={18} /> },
    { keys: ["criteris d'estil", 'estil en la red'],                               icon: <PenLine size={18} /> },
    { keys: ['correu electr', 'ofici', 'missatge de'],                             icon: <Mail size={18} /> },
    { keys: ['atestat'],                                                           icon: <FileText size={18} /> },

    // ── Dret Penal ────────────────────────────────────────────────────────────
    { keys: ['homicidi', 'assassinat'],                                            icon: <AlertOctagon size={18} /> },
    { keys: ['detenci il·legal', 'segrest', 'indemnitat', 'agressió sexual'],      icon: <Lock size={18} /> },
    { keys: ["tràfic d'éssers"],                                                   icon: <Users size={18} /> },
    { keys: ['menor', 'menors'],                                                   icon: <User size={18} /> },
    { keys: ['subjecte passiu', 'subjectes actiu', 'béns protegits'],              icon: <User size={18} /> },
    { keys: ['mesures sancion'],                                                   icon: <Scale size={18} /> },
    { keys: ['antijuridic', 'supòsit'],                                            icon: <Scale size={18} /> },
    { keys: ['glossari'],                                                          icon: <BookMarked size={18} /> },
    { keys: ['introducció'],                                                       icon: <BookOpen size={18} /> },

    // ── Trànsit ───────────────────────────────────────────────────────────────
    { keys: ['elèctric', 'electric'],                                              icon: <Zap size={18} /> },
    { keys: ['incendi', 'fuita'],                                                  icon: <Flame size={18} /> },
    { keys: ['classificació'],                                                     icon: <Layers size={18} /> },
    { keys: ['accident', 'accidentabilitat'],                                      icon: <AlertTriangle size={18} /> },
    { keys: ['risc', 'perill', 'adr'],                                             icon: <AlertTriangle size={18} /> },
    { keys: ['tacògraf', 'stoneridge', 'siemens', 'vdo'],                         icon: <Gauge size={18} /> },
    { keys: ['temps de conducció', 'descans'],                                     icon: <Clock size={18} /> },
    { keys: ['conducció', 'posició en la conduc'],                                 icon: <Gauge size={18} /> },
    { keys: ['meteorolog'],                                                        icon: <Cloud size={18} /> },
    { keys: ['retenció infantil', 'cinturó'],                                      icon: <ShieldCheck size={18} /> },
    { keys: ['rotond', 'circulació'],                                              icon: <MapPin size={18} /> },
    { keys: ['fabricació', 'instal', 'assaig'],                                    icon: <Wrench size={18} /> },

    // ── Genèrics (al final, menys específics) ─────────────────────────────────
    { keys: ['legisla', 'reglament', 'normativa', 'sancions', 'obligacion', 'responsabilitat', 'exempcions', 'marc normatiu', 'llei orgàn', 'nomenclàtor', 'principis jur'], icon: <Scale size={18} /> },
    { keys: ['drets i deures', 'drets i oblig'],                                   icon: <Scale size={18} /> },
    { keys: ['etiquetatge'],                                                       icon: <Tag size={18} /> },
    { keys: ['embalat', 'envasos', 'marcat', 'embalatge', 'homologac'],            icon: <Package size={18} /> },
    { keys: ['càrrega', 'descàrrega', 'estiva', 'manipulació'],                    icon: <Truck size={18} /> },
    { keys: ['pictograma', 'aparences'],                                           icon: <Eye size={18} /> },
    { keys: ['accessos', 'manuals'],                                               icon: <Key size={18} /> },
    { keys: ['emocions', 'reacci'],                                                icon: <Heart size={18} /> },
    { keys: ['documentació policials', 'característiques generals'],               icon: <FileText size={18} /> },
    { keys: ['protecció', 'protocol', 'equipament', 'prevenci', 'autoprotec'],     icon: <ShieldCheck size={18} /> },
    { keys: ['seguretat viàr', 'seguretat en cond'],                               icon: <ShieldCheck size={18} /> },
    { keys: ['negociac', 'passos', 'ritme', 'mediac', 'mediació', 'mediador', 'cooperar'], icon: <MessageCircle size={18} /> },
    { keys: ['policia comunit', 'víctima', 'participants'],                        icon: <Users size={18} /> },
    { keys: ['evidènc'],                                                           icon: <Microscope size={18} /> },
    { keys: ['estratègi', 'resolució', 'simulac', 'casos pràctic'],                icon: <Target size={18} /> },
    { keys: ['perspectiva', 'poder', 'fonament', 'valoració'],                     icon: <Brain size={18} /> },
    { keys: ['delinqü', 'delict', 'crimin', 'problemes', 'identificació'],         icon: <Search size={18} /> },
    { keys: ['procediment', 'actuació', 'post-accident'],                          icon: <CheckCircle2 size={18} /> },
    { keys: ['coordinació', 'interinstitucion'],                                   icon: <Users size={18} /> },
    { keys: ['conceptes bàsics', 'marc legislatiu', 'paquet mobilitat'],           icon: <BookOpen size={18} /> },
];

const getModuleIcon = (title: string): JSX.Element => {
    const t = title.toLowerCase();
    const match = MODULE_ICON_MAP.find(({ keys }) => keys.some((k) => t.includes(k)));
    return match ? match.icon : <BookOpen size={18} />;
};

const REQ_ICONS = [
    <GraduationCap size={16} />,
    <BadgeCheck size={16} />,
    <FileText size={16} />,
    <BookOpen size={16} />,
    <MessageCircle size={16} />,
    <Monitor size={16} />,
];

const AUDIENCE_ICONS = [
    <ShieldCheck size={22} />,
    <Scale size={22} />,
    <GraduationCap size={22} />,
    <Brain size={22} />,
    <Users size={22} />,
    <BookOpen size={22} />,
];

function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".scroll-reveal");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

function useStickyCard() {
    const ref = useRef<HTMLDivElement>(null);
    const [stuck, setStuck] = useState(false);
    useEffect(() => {
        const handleScroll = () => { if (ref.current) setStuck(window.scrollY > 300); };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return { ref, stuck };
}

const EnrollmentModal = ({ url, title, onClose }: { url: string; title: string; onClose: () => void }) => {
    const [loaded, setLoaded] = useState(false);
    const { t } = useLanguage();
    const cd = t.courseDetail;

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full h-full sm:w-[90vw] sm:h-[90vh] bg-card rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.25)] flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                            <BookOpen size={15} />
                        </div>
                        <div>
                            <h3 className="font-display font-black text-sm text-foreground uppercase tracking-tight">{cd.matriculacioTitle}</h3>
                            <p className="font-body text-[11px] text-muted-foreground">{title}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-lg bg-muted hover:bg-accent hover:text-white text-muted-foreground flex items-center justify-center transition-all duration-150 cursor-pointer" aria-label={cd.tancar}>
                        <X size={15} />
                    </button>
                </div>
                <div className="relative flex-1 overflow-hidden">
                    {!loaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card z-10">
                            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                            <span className="font-body text-xs text-muted-foreground">{cd.carregantFormulari}</span>
                        </div>
                    )}
                    <iframe src={url} title={cd.matriculacioTitle} className="w-full h-full border-0" onLoad={() => setLoaded(true)} allow="fullscreen" />
                </div>
                <div className="flex items-center gap-2 px-6 py-3 border-t border-border bg-muted/50 flex-shrink-0">
                    <UserCheck size={13} className="text-accent flex-shrink-0" />
                    <p className="font-body text-[11px] text-muted-foreground">{cd.formulariFoot}</p>
                </div>
            </div>
        </div>
    );
};

function getIspcCode(metaItems?: any[]): string | null {
    if (!metaItems) return null;
    const item = metaItems.find((m) => {
        const lbl = (m.label_ca ?? m.label_es ?? m.label ?? "").toLowerCase();
        return lbl.includes("ispc") || lbl.includes("reconegu");
    });
    return item ? item.value : null;
}

const CourseDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const { courses, isLoading: listLoading } = useCourses();
    const courseFromList = courses.find((c) => c.slug === slug);

    // Fetch by slug in parallel so inactive/new courses (not in public list) also load
    const { course: directCourse, isLoading: directLoading } = useCourse(slug);

    const course = courseFromList ?? directCourse;
    const { t, lang } = useLanguage();
    const cd = t.courseDetail;

    const [activeModule, setActiveModule] = useState<number | null>(null);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [showAllModules, setShowAllModules] = useState(false);
    const [enrollOpen, setEnrollOpen] = useState(false);
    const { ref: sidebarRef } = useStickyCard();
    useScrollReveal();

    // Wait while both sources are still loading, or while list is done but direct hasn't resolved yet
    if (!course && (listLoading || directLoading)) return null;
    if (!course) return <Navigate to="/404" replace />;

    const collaborators = course.collaborators ?? [];
    const rawTitle = `${course.titleBase}${course.titleAccent ? ` ${course.titleAccent}` : ""}`;
    const courseTitle = lang === "es" ? (COURSE_TITLES_ES[course.slug] ?? course.titleEs ?? rawTitle) : rawTitle;
    const categoryDisplay = lang === "es"
        ? ((t.categoryPage.categories as Record<string, { title: string }>)[course.categoriaSlug]?.title ?? course.categoriaLabel)
        : course.categoriaLabel;
    const ispcCode = getIspcCode(course.metaItems);

    const displayModules = lang === "es"
        ? (course.modulesEs?.length ? course.modulesEs : (MODULES_ES[course.slug] ?? course.modules ?? []))
        : (course.modules ?? []);
    const displayFaq = lang === "es"
        ? (course.faqEs?.length ? course.faqEs : (course.faq?.map((f) => FAQ_Q_ES[f.q] ?? f) ?? []))
        : (course.faq ?? []);
    const displayAudience = lang === "es"
        ? (course.audienceEs?.length ? course.audienceEs : (course.audience?.map((a) => AUDIENCE_TITLE_ES[a.title] ?? a) ?? []))
        : (course.audience ?? []);

    const iconMap: Record<string, React.ReactNode> = {
        "Durada": <Clock size={14} />, "Duración": <Clock size={14} />,
        "Modalitat": <Monitor size={14} />, "Modalidad": <Monitor size={14} />,
        "Inici": <CalendarDays size={14} />, "Inicio": <CalendarDays size={14} />,
        "Alumnes": <Users size={14} />, "Alumnos": <Users size={14} />,
        "Certificat": <Award size={14} />, "Certificado": <Award size={14} />,
        "Certificat reconegut ISPC": <Award size={14} />, "Certificado reconocido ISPC": <Award size={14} />,
        "Nivell": <Target size={14} />, "Nivel": <Target size={14} />,
    };

    return (
        <div className="min-h-screen bg-background">
            <Topbar />
            <Navbar />

            {enrollOpen && course.enrollmentUrl && (
                <EnrollmentModal
                    url={course.enrollmentUrl}
                    title={courseTitle}
                    onClose={() => setEnrollOpen(false)}
                />
            )}

            {/* Breadcrumbs */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <Link to="/" className="hover:text-accent transition-colors">{cd.breadcrumbHome}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <Link to="/" className="hover:text-accent transition-colors">{cd.breadcrumbCursos}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <Link to={`/${course.categoriaSlug}`} className="hover:text-accent transition-colors">{categoryDisplay}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">{courseTitle}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0">
                    <img src={course.img} alt="imatgeHero" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-r via-primary/95 to-primary/70" />
                </div>
                <div className="relative container mx-auto px-4 max-w-[1400px] py-14 lg:py-20">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
                            <BookOpen size={10} /> {categoryDisplay}
                        </span>
                        <h1 className="font-display font-black text-3xl lg:text-5xl text-white leading-tight mb-4">
                            {lang === "es" ? courseTitle : course.titleBase}
                            {lang !== "es" && course.titleAccent && <><br /><span className="text-accent">{course.titleAccent}</span></>}
                        </h1>
                        {course.description && (
                            <p className="font-body text-white/80 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
                                {course.description}
                            </p>
                        )}
                        {course.heroStats && course.heroStats.length > 0 && (
                            <div className="flex flex-wrap gap-5">
                                {[
                                    { icon: <Clock size={14} />, label: course.heroStats[0]?.label },
                                    { icon: <Monitor size={14} />, label: course.heroStats[1]?.label },
                                    { icon: <CalendarDays size={14} />, label: course.heroStats[2]?.label },
                                    { icon: <Award size={14} />, label: course.heroStats[3]?.label },
                                ].filter(s => s.label).map(({ icon, label }) => {
                                    const displayLabel = lang === "es" ? translateHeroStat(label!) : label!;
                                    return (
                                    <div key={label} className="flex items-center gap-2 text-white/90 font-body font-semibold text-sm">
                                        <span className="text-accent">{icon}</span>{displayLabel}
                                    </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main content + sidebar */}
            <div className="container mx-auto px-4 max-w-[1400px] py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

                    {/* LEFT COLUMN */}
                    <div className="space-y-12">

                        {/* Mòduls */}
                        {displayModules.length > 0 && (
                            <section className="scroll-reveal">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-7 bg-accent rounded-full" />
                                    <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{cd.contingutsCurs}</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {displayModules.slice(0, 4).map((mod, i) => {
                                        const hasTopics = mod.topics.length > 0;
                                        return hasTopics ? (
                                            <div key={i} className="c-card bg-card border border-border rounded-xl p-5 cursor-pointer group" onClick={() => setActiveModule(activeModule === i ? null : i)}>
                                                <div className="flex items-start gap-3 mb-3">
                                                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                                        {getModuleIcon(mod.title)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <h3 className="font-display font-bold text-sm text-foreground leading-snug">{mod.title}</h3>
                                                            <ChevronRight size={14} className={`flex-shrink-0 text-muted-foreground transition-transform duration-200 ${activeModule === i ? "rotate-90" : ""}`} />
                                                        </div>
                                                        <span className="font-body text-[11px] text-muted-foreground">{cd.modulLabel} {i + 1} · {mod.topics.length} {cd.temesLabel}</span>
                                                    </div>
                                                </div>
                                                <div className={`overflow-hidden transition-all duration-300 ${activeModule === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                                                    <ul className="space-y-1.5 pt-2 border-t border-border/60">
                                                        {mod.topics.map((topic, j) => (
                                                            <li key={j} className="flex items-start gap-2 font-body text-xs text-muted-foreground">
                                                                <CheckCircle2 size={12} className="text-accent flex-shrink-0 mt-0.5" />{topic}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <div key={i} className="c-card bg-card border border-border rounded-xl p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                                        {getModuleIcon(mod.title)}
                                                    </div>
                                                    <h3 className="font-display font-bold text-sm text-foreground leading-snug">{mod.title}</h3>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {displayModules.length > 4 && (
                                        <div className={`col-span-full overflow-hidden transition-all duration-500 ease-in-out ${showAllModules ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-0">
                                                {displayModules.slice(4).map((mod, j) => {
                                                    const i = j + 4;
                                                    const hasTopics = mod.topics.length > 0;
                                                    return hasTopics ? (
                                                        <div key={i} className="c-card bg-card border border-border rounded-xl p-5 cursor-pointer group" onClick={() => setActiveModule(activeModule === i ? null : i)}>
                                                            <div className="flex items-start gap-3 mb-3">
                                                                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                                                    {getModuleIcon(mod.title)}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center justify-between gap-2">
                                                                        <h3 className="font-display font-bold text-sm text-foreground leading-snug">{mod.title}</h3>
                                                                        <ChevronRight size={14} className={`flex-shrink-0 text-muted-foreground transition-transform duration-200 ${activeModule === i ? "rotate-90" : ""}`} />
                                                                    </div>
                                                                    <span className="font-body text-[11px] text-muted-foreground">{cd.modulLabel} {i + 1} · {mod.topics.length} {cd.temesLabel}</span>
                                                                </div>
                                                            </div>
                                                            <div className={`overflow-hidden transition-all duration-300 ${activeModule === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                                                                <ul className="space-y-1.5 pt-2 border-t border-border/60">
                                                                    {mod.topics.map((topic, k) => (
                                                                        <li key={k} className="flex items-start gap-2 font-body text-xs text-muted-foreground">
                                                                            <CheckCircle2 size={12} className="text-accent flex-shrink-0 mt-0.5" />{topic}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div key={i} className="c-card bg-card border border-border rounded-xl p-5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                                                    {getModuleIcon(mod.title)}
                                                                </div>
                                                                <h3 className="font-display font-bold text-sm text-foreground leading-snug">{mod.title}</h3>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {displayModules.length > 4 && (
                                    <div className="flex justify-center mt-6">
                                        <button
                                            onClick={() => setShowAllModules(!showAllModules)}
                                            className="inline-flex items-center gap-2 bg-card border border-border hover:border-accent/50 hover:shadow-md text-foreground font-body font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-150"
                                        >
                                            <ChevronDown size={16} className={`text-accent transition-transform duration-200 ${showAllModules ? "rotate-180" : ""}`} />
                                            {showAllModules
                                                ? cd.veureMenys
                                                : cd.veureMes.replace("{n}", String(displayModules.length - 4))}
                                        </button>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Certificació */}
                        {course.certification && (
                            <section className="scroll-reveal">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-7 bg-accent rounded-full" />
                                    <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{cd.certificacioOficial}</h2>
                                </div>
                                <div className="bg-card border border-border rounded-xl overflow-hidden">
                                    <div className="bg-primary px-6 py-5 flex items-center gap-4">
                                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                                            <Award size={28} className="text-accent" />
                                        </div>
                                        <div>
                                            <p className="font-body text-white/70 text-[11px] uppercase tracking-widest font-semibold mb-0.5">{cd.certificatEmesPer}</p>
                                            <h3 className="font-display font-black text-white text-lg leading-tight">{course.certification.entity}</h3>
                                            <p className="font-body text-white/60 text-xs mt-0.5">{cd.entitat} {course.certification.code}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
                                        {[
                                            { icon: <BadgeCheck size={15} />, label: cd.validesa, value: course.certification.validity },
                                            { icon: <FileText size={15} />, label: cd.format, value: course.certification.format },
                                            { icon: <CalendarDays size={15} />, label: cd.emissio, value: course.certification.delivery },
                                            { icon: <Target size={15} />, label: cd.puntuacio, value: course.certification.score },
                                        ].map(({ icon, label, value }) => (
                                            <div key={label} className="p-5 flex items-start gap-3">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center mt-0.5">{icon}</div>
                                                <div>
                                                    <p className="font-body font-bold text-[11px] text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
                                                    <p className="font-body text-sm text-foreground leading-snug">{value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-border px-6 py-4 bg-muted/40 flex items-center gap-2">
                                        <BadgeAlert size={13} className="text-accent flex-shrink-0" />
                                        <p className="font-body text-[11px] text-muted-foreground">{course.certification.footerNote}</p>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Plans i preus */}
                        {course.plans && course.plans.length > 0 && (() => {
                            const displayPlans = lang === "es"
                                ? (course.plansEs && course.plansEs.length > 0 ? course.plansEs : course.plans)
                                : (course.plansCa && course.plansCa.length > 0 ? course.plansCa : course.plans);
                            return (
                            <section className="scroll-reveal">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-7 bg-accent rounded-full" />
                                    <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{cd.plansPreus}</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                                    {displayPlans.map((plan) => {
                                        const planName = plan.name;
                                        const planBadge = plan.badge ?? null;
                                        const color = plan.highlight ? "#C42B36" : plan.name.toLowerCase().startsWith('no ') ? "#397DBA" : "#1B3088";
                                        return (
                                        <div
                                            key={plan.name}
                                            className={`relative rounded-2xl overflow-hidden flex flex-col transition-all duration-150 ${plan.highlight ? "-my-3" : ""}`}
                                            style={{ border: `2px solid ${color}`, boxShadow: plan.highlight ? `0 12px 40px ${color}33` : `0 8px 24px ${color}22` }}
                                        >
                                            <div
                                                className="text-white font-body font-bold text-[10px] uppercase tracking-widest text-center py-2"
                                                style={{ backgroundColor: color }}
                                            >
                                                {planBadge ?? planName}
                                            </div>

                                            <div
                                                className="px-5 pt-4 pb-4 text-center"
                                                style={{ backgroundColor: color }}
                                            >
                                                <p className="font-body font-bold text-[11px] text-white/60 uppercase tracking-widest mb-2">
                                                    {planName}
                                                </p>
                                                <div className="flex items-end justify-center gap-1.5">
                                                    <span className={`font-display font-black text-white ${plan.highlight ? "text-4xl" : "text-3xl"}`}>
                                                        {plan.price}€
                                                    </span>
                                                    {plan.originalPrice && (
                                                        <span className="font-body text-sm line-through mb-1 text-white/40">
                                                            {plan.originalPrice}€
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="px-5 pt-4 pb-5 flex-1 flex flex-col gap-3 bg-card">
                                                {plan.features.map((feat) => {
                                                    const featText = feat.text;
                                                    return (
                                                    <div key={feat.text} className="flex items-center gap-2.5">
                                                        <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${feat.included
                                                            ? "bg-primary/10 text-primary"
                                                            : "bg-muted text-muted-foreground/40"
                                                            }`}>
                                                            {feat.included
                                                                ? <Check size={10} strokeWidth={3} />
                                                                : <X size={9} strokeWidth={2.5} />
                                                            }
                                                        </div>
                                                        <span className={`font-body text-xs ${feat.included ? "text-foreground" : "text-muted-foreground/50 line-through"}`}>
                                                            {featText}
                                                        </span>
                                                    </div>
                                                    );
                                                })}

                                                <button
                                                    onClick={() => setEnrollOpen(true)}
                                                    className="mt-auto w-full font-body font-bold text-xs uppercase tracking-[0.06em] px-4 py-2.5 rounded-xl transition-all duration-150 cursor-pointer text-white hover:opacity-90 hover:shadow-lg"
                                                    style={{ backgroundColor: color }}
                                                >
                                                    {cd.matricularMe}
                                                </button>
                                            </div>
                                        </div>
                                        );
                                    })}
                                </div>
                            </section>
                            );
                        })()}

                        {/* Requisits */}
                        {course.requirements && course.requirements.length > 0 && (
                            <section className="scroll-reveal">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-7 bg-accent rounded-full" />
                                    <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{cd.requisitsAcces}</h2>
                                </div>
                                <div className="bg-card border border-border rounded-xl p-6">
                                    <ul className="space-y-4">
                                        {course.requirements.map((req, i) => (
                                            <li key={i} className="flex items-center gap-4 group" style={{ animationDelay: `${i * 60}ms` }}>
                                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                                    {REQ_ICONS[i % REQ_ICONS.length]}
                                                </div>
                                                <span className="font-body text-sm text-foreground">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        )}

                        {/* Públic objectiu */}
                        {displayAudience.length > 0 && (
                            <section className="scroll-reveal">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-7 bg-accent rounded-full" />
                                    <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{cd.aQuiVaDirigit}</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {displayAudience.map((item, i) => (
                                        <div key={i} className="c-card bg-card border border-border rounded-xl p-5 group">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                    {AUDIENCE_ICONS[i % AUDIENCE_ICONS.length]}
                                                </div>
                                                <div>
                                                    <h3 className="font-display font-bold text-sm text-foreground mb-1">{item.title}</h3>
                                                    <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Reconeixement ISPC */}
                        {ispcCode && (
                            <section className="scroll-reveal">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-7 bg-accent rounded-full" />
                                    <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{cd.reconeixementISPC}</h2>
                                </div>
                                <div className="bg-card border border-border rounded-xl overflow-hidden">
                                    <div className="bg-primary px-6 py-5 flex items-center gap-4">
                                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                                            <Award size={28} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="font-body text-white/70 text-[11px] uppercase tracking-widest font-semibold mb-0.5">{cd.reconegutPer}</p>
                                            <h3 className="font-display font-black text-white text-base leading-tight">{cd.ispcNom}</h3>
                                            <p className="font-body text-white/60 text-xs mt-0.5">{cd.ispcCodiLabel} <strong className="text-white/90">{ispcCode}</strong></p>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <p
                                            className="font-body text-sm text-muted-foreground leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: cd.ispcDesc }}
                                        />
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {[
                                                { icon: <ShieldCheck size={15} />, label: cd.organisme, value: cd.ispcOrganisme },
                                                { icon: <Award size={15} />, label: cd.codi, value: ispcCode },
                                            ].map(({ icon, label, value }) => (
                                                <div key={label} className="bg-muted/50 rounded-xl p-4 flex items-start gap-3">
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center mt-0.5">{icon}</div>
                                                    <div>
                                                        <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
                                                        <p className="font-body text-xs text-foreground leading-snug font-semibold">{value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="border-t border-border px-6 py-4 bg-muted/40 flex items-center gap-2">
                                        <BadgeAlert size={13} className="text-accent flex-shrink-0" />
                                        <p
                                            className="font-body text-[11px] text-muted-foreground"
                                            dangerouslySetInnerHTML={{ __html: cd.ispcFootNote }}
                                        />
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* FAQ */}
                        {displayFaq.length > 0 && (
                            <section className="scroll-reveal">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-7 bg-accent rounded-full" />
                                    <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{cd.preguntesFrequents}</h2>
                                </div>
                                <div className="space-y-2">
                                    {displayFaq.map((faq, i) => (
                                        <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <HelpCircle size={15} className="text-accent flex-shrink-0" />
                                                    <span className="font-display font-bold text-sm text-foreground leading-snug">{faq.q}</span>
                                                </div>
                                                <ChevronRight size={14} className={`flex-shrink-0 text-muted-foreground transition-transform duration-200 ${activeFaq === i ? "rotate-90" : ""}`} />
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ${activeFaq === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                                                <p className="font-body text-sm text-muted-foreground leading-relaxed px-5 pb-5 border-t border-border/60 pt-3">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Valoració */}
                        {course.reviews && (
                            <section className="scroll-reveal">
                                <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-5">
                                    <div className="flex-shrink-0 text-center">
                                        <div className="font-display font-black text-5xl text-primary">{course.reviews.rating}</div>
                                        <div className="flex items-center justify-center gap-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                                        </div>
                                        <div className="font-body text-xs text-muted-foreground mt-1">{course.reviews.count} {cd.valoracions}</div>
                                    </div>
                                    <div className="w-px h-16 bg-border hidden sm:block" />
                                    <div>
                                        <p className="font-body text-sm text-foreground italic leading-relaxed">
                                            "{course.reviews.text}"
                                        </p>
                                        <div className="flex items-center gap-2 mt-3">
                                            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-xs text-primary">{course.reviews.initials}</div>
                                            <div>
                                                <div className="font-body font-bold text-xs text-foreground">{course.reviews.author}</div>
                                                <div className="font-body text-[10px] text-muted-foreground">{course.reviews.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside ref={sidebarRef} className="lg:sticky lg:top-[90px]">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(27,48,136,0.10)]">
                            <div className="relative h-48 overflow-hidden">
                                <img src={course.img} alt="imatgeCurs" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                                {course.sidebarCategoryLabel && (
                                    <div className="absolute bottom-3 left-4">
                                        <span className="font-body font-bold text-[10px] uppercase tracking-widest text-white/90 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                            {lang === "es"
                                                ? ((t.categoryPage.categories as Record<string, { title: string }>)[course.categoriaSlug]?.title ?? course.sidebarCategoryLabel)
                                                : course.sidebarCategoryLabel}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Preu */}
                                <div>
                                    <div className="flex items-end gap-2 mb-0.5">
                                        <span className="font-body text-xs text-muted-foreground mb-1.5 mr-1">{cd.desde}</span>
                                        <span className="font-display font-black text-4xl text-foreground">{course.price}€</span>
                                        {course.originalPrice && (
                                            <span className="font-body text-sm text-muted-foreground line-through mb-1">{course.originalPrice}€</span>
                                        )}
                                        {course.originalPrice && (
                                            <span className="ml-auto font-body font-bold text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                -{Math.round((1 - course.price / course.originalPrice) * 100)}%
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setEnrollOpen(true)}
                                    className="btn-hover block w-full bg-accent text-accent-foreground font-body font-bold text-sm uppercase tracking-[0.06em] text-center px-6 py-3.5 rounded-xl hover:shadow-lg transition-all cursor-pointer"
                                >
                                    {cd.matricularMeAra}
                                </button>

                                {/* Meta items */}
                                {((course.metaItems && course.metaItems.length > 0) || course.gridHours || course.gridStartDate || course.gridEndDate) && (
                                    <div className="space-y-3 pt-2 border-t border-border">
                                        {course.gridHours && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <span className="text-accent"><Clock size={14} /></span>
                                                    <span className="font-body text-xs">{cd.durada}</span>
                                                </div>
                                                <span className="font-body font-bold text-xs text-foreground">{course.gridHours}</span>
                                            </div>
                                        )}
                                        {course.metaItems && course.metaItems.map((m: any) => {
                                            const label = lang === "es"
                                                ? (m.label_es || m.label_ca || m.label || "")
                                                : (m.label_ca || m.label_es || m.label || "");
                                            const value = m.value ?? "";
                                            return (
                                            <div key={label} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <span className="text-accent">{iconMap[label] ?? <BookOpen size={14} />}</span>
                                                    <span className="font-body text-xs">{label}</span>
                                                </div>
                                                <span className="font-body font-bold text-xs text-foreground">{value}</span>
                                            </div>
                                            );
                                        })}
                                        {course.gridStartDate && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <span className="text-accent"><CalendarDays size={14} /></span>
                                                    <span className="font-body text-xs">{cd.inici}</span>
                                                </div>
                                                <span className="font-body font-bold text-xs text-foreground">{lang === "es" ? translateHeroStat(course.gridStartDate!) : course.gridStartDate}</span>
                                            </div>
                                        )}
                                        {course.gridEndDate && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <span className="text-accent"><CalendarDays size={14} /></span>
                                                    <span className="font-body text-xs">{cd.fi}</span>
                                                </div>
                                                <span className="font-body font-bold text-xs text-foreground">{course.gridEndDate}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Entitats col·laboradores */}
            {collaborators.length > 0 && (
                <section className="py-10 bg-card border-t border-border scroll-reveal">
                    <div className="container mx-auto px-4 max-w-[1400px]">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-7 bg-accent rounded-full" />
                            <h2 className="font-display font-black text-lg text-foreground uppercase tracking-tight">{cd.entitatsColaboradores}</h2>
                        </div>
                        <div className="flex flex-wrap items-center justify-start gap-10">
                            {collaborators.map((col) => (
                                <div key={col.name} className="flex items-center justify-center h-16">
                                    <img src={col.img} alt={col.name} className="max-h-full w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Et pot interessar */}
            {(() => {
                const related = courses
                    .filter((c) => c.slug !== course.slug && c.categoriaSlug === course.categoriaSlug)
                    .slice(0, 3);
                const fill = related.length < 3
                    ? courses.filter((c) => c.slug !== course.slug && c.categoriaSlug !== course.categoriaSlug).slice(0, 3 - related.length)
                    : [];
                const suggestions = [...related, ...fill];
                if (suggestions.length === 0) return null;
                return (
                    <section className="py-12 bg-muted/40 border-t border-border scroll-reveal">
                        <div className="container mx-auto px-4 max-w-[1400px]">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1 h-7 bg-accent rounded-full" />
                                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{cd.etPotInteressar}</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {suggestions.map((c) => (
                                    <Link
                                        key={c.slug}
                                        to={`/curs/${c.slug}`}
                                        className="group bg-card rounded-2xl border border-border overflow-hidden flex flex-col hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(27,48,136,0.10)] transition-all duration-150"
                                    >
                                        <div className="relative h-40 overflow-hidden flex-shrink-0 bg-muted">
                                            <img
                                                src={c.gridImg}
                                                alt={`${c.titleBase} ${c.titleAccent ?? ""}`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <span className="font-body text-accent text-[10px] uppercase tracking-[0.15em] font-semibold mb-1.5">
                                                {lang === "es" ? ((t.categoryPage.categories as Record<string, { title: string }>)[c.categoriaSlug]?.title ?? c.categoriaLabel) : c.categoriaLabel}
                                            </span>
                                            <h3 className="font-display font-bold text-sm text-foreground leading-snug mb-2 line-clamp-2">
                                                {lang === "es" ? (COURSE_TITLES_ES[c.slug] ?? `${c.titleBase} ${c.titleAccent ?? ""}`.trim()) : `${c.titleBase} ${c.titleAccent ?? ""}`.trim()}
                                            </h3>
                                            {c.gridShortDesc && (
                                                <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{c.gridShortDesc}</p>
                                            )}
                                            <div className="mt-auto border-t border-border pt-3 flex items-center justify-between">
                                                {c.gridStartDate && (
                                                    <span className="flex items-center gap-1 font-body text-xs text-foreground/80">
                                                        <CalendarDays size={11} className="text-accent" />
                                                        {lang === "es" ? translateHeroStat(c.gridStartDate) : c.gridStartDate}
                                                    </span>
                                                )}
                                                <span className="ml-auto inline-flex items-center gap-1 font-body font-semibold text-accent text-xs group-hover:gap-2 transition-[gap] duration-150">
                                                    {cd.mesInfo} <ChevronRight size={12} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })()}

            {/* WhatsApp CTA */}
            <a
                href={`https://wa.me/34694234416?text=${encodeURIComponent(`${cd.whatsappMsg} ${courseTitle}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-[300] group flex items-center gap-3"
                aria-label={cd.whatsappAriaLabel}
            >
                <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-foreground text-background font-body font-bold text-xs uppercase tracking-wide px-3 py-2 rounded-xl shadow-lg whitespace-nowrap">
                    {cd.whatsappTooltip}
                </span>
                <div className="relative w-14 h-14 rounded-full bg-espol-whatsapp flex items-center justify-center shadow-[0_4px_20px_rgba(34,197,94,0.5)] hover:shadow-[0_6px_28px_rgba(34,197,94,0.7)] transition-all duration-300 hover:-translate-y-1">
                    <span className="absolute inset-0 rounded-full bg-espol-whatsapp animate-ping opacity-30" />
                    <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 relative z-10">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </div>
            </a>

            <Footer />
        </div>
    );
};

export default CourseDetail;
