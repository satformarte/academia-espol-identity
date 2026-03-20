import { useState, useEffect, useRef } from "react";
import {
    ChevronRight,
    BookOpen,
    Clock,
    Users,
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
    Microscope,
    Brain,
    Scale,
    Search,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Types ────────────────────────────────────────────────────────────────────
interface ModuleItem {
    icon: React.ReactNode;
    title: string;
    topics: string[];
}

interface RequirementItem {
    icon: React.ReactNode;
    text: string;
}

interface AudienceItem {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const modules: ModuleItem[] = [
    {
        icon: <Brain size={18} />,
        title: "Fonaments de la Criminologia",
        topics: [
            "Història i evolució de la criminologia",
            "Teories clàssiques i contemporànies",
            "Factors biològics, psicològics i socials del delicte",
        ],
    },
    {
        icon: <Search size={18} />,
        title: "Metodologia d'Investigació Criminal",
        topics: [
            "Tècniques d'investigació qualitativa i quantitativa",
            "Anàlisi de dades criminalístiques",
            "Elaboració d'informes pericials",
        ],
    },
    {
        icon: <Scale size={18} />,
        title: "Marc Jurídic i Penal",
        topics: [
            "Codi Penal: delictes i penes",
            "Procediment penal i policial",
            "Drets fonamentals en la investigació",
        ],
    },
    {
        icon: <Microscope size={18} />,
        title: "Criminalística Aplicada",
        topics: [
            "Escena del crim: recollida de proves",
            "Mètodes forenses d'identificació",
            "Cadena de custòdia de la prova",
        ],
    },
    {
        icon: <ShieldCheck size={18} />,
        title: "Victimologia i Prevenció",
        topics: [
            "Tipologies de víctimes",
            "Estratègies de prevenció del delicte",
            "Programes de reinserció social",
        ],
    },
    {
        icon: <Monitor size={18} />,
        title: "Criminologia Digital",
        topics: [
            "Ciberdelinqüència i delictes informàtics",
            "Investigació en entorns digitals",
            "Eines d'anàlisi OSINT",
        ],
    },
];

const requirements: RequirementItem[] = [
    { icon: <GraduationCap size={16} />, text: "Titulació de Batxillerat o equivalent" },
    { icon: <BadgeCheck size={16} />, text: "No es requereix experiència prèvia en criminologia" },
    { icon: <FileText size={16} />, text: "Accés a un dispositiu amb connexió a internet" },
    { icon: <BookOpen size={16} />, text: "Disponibilitat mínima de 6 hores setmanals" },
    { icon: <MessageCircle size={16} />, text: "Nivell bàsic de català o castellà" },
];

const audience: AudienceItem[] = [
    {
        icon: <ShieldCheck size={22} />,
        title: "Cossos de Seguretat",
        desc: "Agents dels Mossos d'Esquadra, Policia Nacional, Guàrdia Civil i policies locals que volen ampliar la seva formació.",
    },
    {
        icon: <Scale size={22} />,
        title: "Professionals Jurídics",
        desc: "Advocats, fiscals, jutges i procuradors que necessiten comprendre la conducta criminal des d'una perspectiva científica.",
    },
    {
        icon: <GraduationCap size={22} />,
        title: "Estudiants Universitaris",
        desc: "Alumnes de Dret, Psicologia, Sociologia o Treball Social amb interès en la criminologia aplicada.",
    },
    {
        icon: <Brain size={22} />,
        title: "Professionals de la Salut Mental",
        desc: "Psicòlegs i treballadors socials que intervenen en contextos de conducta antisocial i rehabilitació.",
    },
];

const collaborators = [
    {
        name: "CCOO FSC",
        img: "/images/ccoo.png",
    },
    {
        name: "GAMS",
        img: "/images/gams.jpg",
    },
    {
        name: "ISO 9001",
        img: "/images/iso.png",
    },
];

// ── Scroll reveal hook ───────────────────────────────────────────────────────
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

// ── Sticky sidebar hook ──────────────────────────────────────────────────────
function useStickyCard() {
    const ref = useRef<HTMLDivElement>(null);
    const [stuck, setStuck] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                setStuck(window.scrollY > 300);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return { ref, stuck };
}

// ── Main component ────────────────────────────────────────────────────────────
const CourseDetail = () => {

    const [activeModule, setActiveModule] = useState<number | null>(null);
    const { ref: sidebarRef } = useStickyCard();
    useScrollReveal();

    return (

        <div className="min-h-screen bg-background">
            <Topbar />
            <Navbar />

            {/* ── Breadcrumbs ───────────────────────────────────────────────────── */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <a href="/" className="hover:text-accent transition-colors">Inici</a>
                        <ChevronRight size={12} className="opacity-40" />
                        <a href="/" className="hover:text-accent transition-colors">Cursos Puntuables</a>
                        <ChevronRight size={12} className="opacity-40" />
                        <a href="/criminologia" className="hover:text-accent transition-colors">Criminologia</a>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">Curs de Criminologia Aplicada</span>
                    </nav>
                </div>
            </div>

            {/* ── Hero banner ───────────────────────────────────────────────────── */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/criminologia.jpg"
                        alt="imatgeHero"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r via-primary/95 to-primary/70" />
                </div>

                <div className="relative container mx-auto px-4 max-w-[1400px] py-14 lg:py-20">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
                            <BookOpen size={10} />
                            Criminologia
                        </span>

                        <h1 className="font-display font-black text-3xl lg:text-5xl text-white leading-tight mb-4">
                            Curs de Criminologia<br />
                            <span className="text-accent">Aplicada</span>
                        </h1>

                        <p className="font-body text-white/80 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
                            Aprofundeix en l'estudi científic del delicte, la conducta criminal i els sistemes de justícia. Formació 100% reconeguda per a l'accés als cossos de seguretat.
                        </p>

                        <div className="flex flex-wrap gap-5">
                            {[
                                { icon: <Clock size={14} />, label: "120 hores" },
                                { icon: <Monitor size={14} />, label: "100% online" },
                                { icon: <CalendarDays size={14} />, label: "Matrícula oberta" },
                                { icon: <Award size={14} />, label: "Certificat oficial" },
                            ].map(({ icon, label }) => (
                                <div key={label} className="flex items-center gap-2 text-white/90 font-body font-semibold text-sm">
                                    <span className="text-accent">{icon}</span>
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main content + sidebar ────────────────────────────────────────── */}
            <div className="container mx-auto px-4 max-w-[1400px] py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

                    {/* ── LEFT COLUMN ───────────────────────────────────────────────── */}
                    <div className="space-y-12">

                        {/* ── Course modules grid ─────────────────────────────────────── */}
                        <section className="scroll-reveal">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-7 bg-accent rounded-full" />
                                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">
                                    Continguts del Curs
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {modules.map((mod, i) => (
                                    <div
                                        key={i}
                                        className="c-card bg-card border border-border rounded-xl p-5 cursor-pointer group"
                                        onClick={() => setActiveModule(activeModule === i ? null : i)}
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                                {mod.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3 className="font-display font-bold text-sm text-foreground leading-snug">
                                                        {mod.title}
                                                    </h3>
                                                    <ChevronRight
                                                        size={14}
                                                        className={`flex-shrink-0 text-muted-foreground transition-transform duration-200 ${activeModule === i ? "rotate-90" : ""}`}
                                                    />
                                                </div>
                                                <span className="font-body text-[11px] text-muted-foreground">
                                                    Mòdul {i + 1} · {mod.topics.length} temes
                                                </span>
                                            </div>
                                        </div>

                                        <div className={`overflow-hidden transition-all duration-300 ${activeModule === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <ul className="space-y-1.5 pt-2 border-t border-border/60">
                                                {mod.topics.map((topic, j) => (
                                                    <li key={j} className="flex items-start gap-2 font-body text-xs text-muted-foreground">
                                                        <CheckCircle2 size={12} className="text-accent flex-shrink-0 mt-0.5" />
                                                        {topic}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ── Requirements ────────────────────────────────────────────── */}
                        <section className="scroll-reveal">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-7 bg-accent rounded-full" />
                                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">
                                    Requisits d'Accés
                                </h2>
                            </div>

                            <div className="bg-card border border-border rounded-xl p-6">
                                <ul className="space-y-4">
                                    {requirements.map((req, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-4 group"
                                            style={{ animationDelay: `${i * 60}ms` }}
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                                {req.icon}
                                            </div>
                                            <span className="font-body text-sm text-foreground">{req.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* ── Audience ────────────────────────────────────────────────── */}
                        <section className="scroll-reveal">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-7 bg-accent rounded-full" />
                                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">
                                    A Qui Va Dirigit
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {audience.map((item, i) => (
                                    <div
                                        key={i}
                                        className="c-card bg-card border border-border rounded-xl p-5 group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                {item.icon}
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

                        {/* ── Reviews strip ───────────────────────────────────────────── */}
                        <section className="scroll-reveal">
                            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-5">
                                <div className="flex-shrink-0 text-center">
                                    <div className="font-display font-black text-5xl text-primary">4.9</div>
                                    <div className="flex items-center justify-center gap-0.5 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                    <div className="font-body text-xs text-muted-foreground mt-1">238 valoracions</div>
                                </div>
                                <div className="w-px h-16 bg-border hidden sm:block" />
                                <div>
                                    <p className="font-body text-sm text-foreground italic leading-relaxed">
                                        "El millor curs de criminologia que he fet. Els continguts estan molt ben estructurats i els docents expliquen amb casos reals que et fan entendre tot de forma molt pràctica."
                                    </p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-xs text-primary">MG</div>
                                        <div>
                                            <div className="font-body font-bold text-xs text-foreground">Maria G.</div>
                                            <div className="font-body text-[10px] text-muted-foreground">Mossos d'Esquadra · 2024</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* ── RIGHT SIDEBAR — sticky card ──────────────────────────────── */}
                    <aside ref={sidebarRef} className="lg:sticky lg:top-[90px]">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(27,48,136,0.10)]">

                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="/images/criminologia.jpg"
                                    alt="imatgeCurs"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                                <div className="absolute bottom-3 left-4">
                                    <span className="font-body font-bold text-[10px] uppercase tracking-widest text-white/90 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                        Criminologia
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-5">
                                <div>
                                    <div className="flex items-end gap-2 mb-0.5">
                                        <span className="font-display font-black text-4xl text-foreground">249€</span>
                                        <span className="font-body text-sm text-muted-foreground line-through mb-1">320€</span>
                                        <span className="ml-auto font-body font-bold text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">-22%</span>
                                    </div>
                                    <p className="font-body text-xs text-muted-foreground">Preu únic · accés il·limitat</p>
                                </div>

                                <a
                                    href="#"
                                    className="btn-hover block w-full bg-accent text-accent-foreground font-body font-bold text-sm uppercase tracking-[0.06em] text-center px-6 py-3.5 rounded-xl hover:shadow-lg transition-all"
                                >
                                    Matricular-me ara
                                </a>

                                <a
                                    href="#"
                                    className="btn-hover block w-full bg-transparent border-2 border-primary text-primary font-body font-bold text-sm uppercase tracking-[0.06em] text-center px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-all"
                                >
                                    Descarregar dossier
                                </a>

                                <div className="space-y-3 pt-2 border-t border-border">
                                    {[
                                        { icon: <Clock size={14} />, label: "Durada", value: "120 hores" },
                                        { icon: <Monitor size={14} />, label: "Modalitat", value: "100% online" },
                                        { icon: <CalendarDays size={14} />, label: "Inici", value: "Accés immediat" },
                                        { icon: <Users size={14} />, label: "Alumnes", value: "+1.200 matriculats" },
                                        { icon: <Award size={14} />, label: "Certificat", value: "Oficial ESPOL" },
                                        { icon: <Target size={14} />, label: "Nivell", value: "Bàsic–Intermedi" },
                                    ].map(({ icon, label, value }) => (
                                        <div key={label} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <span className="text-accent">{icon}</span>
                                                <span className="font-body text-xs">{label}</span>
                                            </div>
                                            <span className="font-body font-bold text-xs text-foreground">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
                                    <UserCheck size={14} className="text-accent flex-shrink-0" />
                                    <p className="font-body text-[11px] text-muted-foreground leading-snug">
                                        Formació <strong className="text-foreground">reconeguda</strong> per a l'accés als cossos de seguretat de Catalunya
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* ── Entitats col·laboradores ─────────────────────────────────────────── */}
            <section className="py-10 bg-card border-t border-border scroll-reveal">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-lg text-foreground uppercase tracking-tight">
                            Entitats Col·laboradores
                        </h2>
                    </div>

                    <div className="flex flex-wrap items-center justify-start gap-10">
                        {collaborators.map((col) => (
                            <div
                                key={col.name}
                                className="group flex items-center justify-center h-14"
                            >
                                <img
                                    src={col.img}
                                    alt={col.name}
                                    className="max-h-full w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WhatsApp fixed CTA ───────────────────────────────────────────────── */}
            <a
                href="https://wa.me/34694234416?text=Hola!%20M'interessa%20el%20curs%20de%20Criminologia%20Aplicada"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-[300] group flex items-center gap-3"
                aria-label="Contacta per WhatsApp"
            >
                <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-foreground text-background font-body font-bold text-xs uppercase tracking-wide px-3 py-2 rounded-xl shadow-lg whitespace-nowrap">
                    Consulta pel curs
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