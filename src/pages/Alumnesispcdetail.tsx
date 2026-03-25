import { useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
    ChevronRight,
    Clock,
    MapPin,
    CalendarDays,
    ExternalLink,
    GraduationCap,
    CheckCircle2,
    Users,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const WHATSAPP_LINK = "https://wa.me/34694234416";

// ─── Data ────────────────────────────────────────────────────────────────────
const cursos = [
    {
        slug: "bulevard",
        nom: "Bulevard",
        subtitol: "Formació pràctica en tècniques policials de control i contenció.",
        durada: "6 sessions (18 hores)",
        sessions: 6,
        hores: 18,
        preu: "180 €",
        afiliats: "150 €",
        img: "/images/bulevard.jpg",
        descripcio: "El curs de Bulevard és una formació intensiva i pràctica que prepara als alumnes de l'ISPC en les tècniques essencials de control i contenció en entorns policials reals. Amb 6 sessions presencials, els participants adquireixen habilitats operatives directament aplicables al servei.",
        continguts: [
            "Tècniques de control i reducció de persones",
            "Maneig de situacions conflictives en espai públic",
            "Protocols d'actuació en escenaris de risc",
            "Pràctiques amb equipament reglamentari",
            "Simulacres d'intervenció real",
        ],
        requisits: [
            "Ser alumne/a de l'ISPC en actiu",
            "Disposar d'equipament de protecció bàsic",
        ],
    },
    {
        slug: "procediments-intervencio",
        nom: "Procediments d'intervenció",
        subtitol: "Identificació, Esposar, Maneig de Persones Agressives/Conflictives",
        durada: "3 sessions (4,5 hores)",
        sessions: 3,
        hores: 4.5,
        preu: "75 €",
        afiliats: "–",
        img: "/images/procediments.jpg",
        descripcio: "Curs orientat als procediments bàsics d'intervenció policial: identificació de persones, ús d'esposar i maneig de persones agressives o conflictives. Formació pràctica i directa per a l'aplicació immediata en servei.",
        continguts: [
            "Procediments d'identificació policial",
            "Tècnica correcta d'ús d'esposar",
            "Estratègies de desescalada verbal",
            "Maneig de persones agressives",
            "Actuació davant de persones conflictives",
        ],
        requisits: [
            "Ser alumne/a de l'ISPC en actiu",
        ],
    },
    {
        slug: "trafic-i-transport",
        nom: "Tràfic i Transport",
        subtitol: "Normativa, procediments i protocols de trànsit per a agents en actiu.",
        durada: "3 sessions (4,5 hores)",
        sessions: 3,
        hores: 4.5,
        preu: "75 €",
        afiliats: "–",
        img: "/images/transit-transport.jpg",
        descripcio: "Formació especialitzada en normativa de trànsit i transport, procediments de control viàri i protocols d'actuació en accidents. Dissenyada per a agents que necessiten reforçar els seus coneixements en matèria viària.",
        continguts: [
            "Normativa vigent de trànsit i transport",
            "Protocols de control de vehicles",
            "Actuació en accidents de trànsit",
            "Gestió del trànsit en esdeveniments",
            "Documentació i infraccions",
        ],
        requisits: [
            "Ser alumne/a de l'ISPC en actiu",
        ],
    },
    {
        slug: "armament",
        nom: "Armament",
        subtitol: "Formació en ús i manteniment d'armament policial reglamentari.",
        durada: "2 sessions (4 hores)",
        sessions: 2,
        hores: 4,
        preu: "50 €",
        afiliats: "–",
        img: "/images/armament.jpg",
        descripcio: "Curs pràctic sobre l'ús segur, manteniment i legislació de l'armament reglamentari policial. Contingut actualitzat i adaptat als protocols actuals dels cossos de seguretat de Catalunya.",
        continguts: [
            "Legislació sobre ús d'armament policial",
            "Manteniment i neteja de l'arma reglamentària",
            "Posicions de tir i seguretat activa",
            "Protocols d'ús proporcionat de la força",
            "Pràctiques de manipulació segura",
        ],
        requisits: [
            "Ser alumne/a de l'ISPC en actiu",
            "Acreditació de port d'armes vigent",
        ],
    },
];

// ─── Component ───────────────────────────────────────────────────────────────
const AlumnesISPCDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const curso = cursos.find((c) => c.slug === slug);

    if (!curso) return <Navigate to="/alumnes-ispc" replace />;

    return (
        <div className="min-h-screen bg-background">
            <Topbar />
            <Navbar />

            {/* Breadcrumbs */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground flex-wrap">
                        <Link to="/" className="hover:text-accent transition-colors">Inici</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <Link to="/alumnes-ispc" className="hover:text-accent transition-colors">Alumnes ISPC</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">{curso.nom}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0">
                    <img src={curso.img} alt={curso.nom} className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-r via-primary/95 to-primary/70" />
                </div>
                <div className="relative container mx-auto px-4 max-w-[1400px] py-14 lg:py-20">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
                            <GraduationCap size={10} /> Alumnes ISPC
                        </span>
                        <h1 className="font-display font-black text-3xl lg:text-5xl text-white leading-tight mb-4">
                            {curso.nom}
                        </h1>
                        <p className="font-body text-white/80 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
                            {curso.subtitol}
                        </p>
                        <div className="flex flex-wrap gap-5">
                            <div className="flex items-center gap-2 text-white/90 font-body font-semibold text-sm">
                                <Clock size={14} className="text-accent" />{curso.durada}
                            </div>
                            <div className="flex items-center gap-2 text-white/90 font-body font-semibold text-sm">
                                <MapPin size={14} className="text-accent" />Instal·lacions GAMS (Martorelles)
                            </div>
                            <div className="flex items-center gap-2 text-white/90 font-body font-semibold text-sm">
                                <CalendarDays size={14} className="text-accent" />Inici: 16 de març de 2026
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content + sidebar */}
            <div className="container mx-auto px-4 max-w-[1400px] py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

                    {/* LEFT */}
                    <div className="space-y-12">

                        {/* Descripció */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-7 bg-accent rounded-full" />
                                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">Sobre el curs</h2>
                            </div>
                            <p className="font-body text-foreground/80 text-base leading-relaxed">
                                {curso.descripcio}
                            </p>
                        </section>

                        {/* Continguts */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-7 bg-accent rounded-full" />
                                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">Continguts</h2>
                            </div>
                            <div className="bg-card border border-border rounded-xl p-6">
                                <ul className="space-y-4">
                                    {curso.continguts.map((item, i) => (
                                        <li key={i} className="flex items-center gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <span className="font-body text-sm text-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Requisits */}
                        {curso.requisits.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-7 bg-accent rounded-full" />
                                    <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">Requisits d'Accés</h2>
                                </div>
                                <div className="bg-card border border-border rounded-xl p-6">
                                    <ul className="space-y-4">
                                        {curso.requisits.map((req, i) => (
                                            <li key={i} className="flex items-center gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                                                    <Users size={16} />
                                                </div>
                                                <span className="font-body text-sm text-foreground">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* SIDEBAR */}
                    <aside className="lg:sticky lg:top-[90px]">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(27,48,136,0.10)]">

                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img src={curso.img} alt={curso.nom} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                                <div className="absolute bottom-3 left-4">
                                    <span className="font-body font-bold text-[10px] uppercase tracking-widest text-white/90 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                        Alumnes ISPC
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-5">

                                {/* Preu */}
                                <div>
                                    <p className="font-body text-xs text-muted-foreground mb-1">Preu</p>
                                    <div className="flex items-end gap-3">
                                        <span className="font-display font-black text-4xl text-foreground">{curso.preu}</span>
                                        {curso.afiliats !== "–" && (
                                            <span className="font-body text-sm text-accent font-semibold bg-accent/10 px-2.5 py-1 rounded-full mb-1">
                                                Afiliats: {curso.afiliats}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <a
                                    href={WHATSAPP_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-hover flex items-center justify-center gap-2 w-full bg-accent text-accent-foreground font-body font-bold text-sm uppercase tracking-[0.06em] px-6 py-3.5 rounded-xl hover:shadow-lg transition-all"
                                >
                                    Inscripció <ExternalLink size={14} />
                                </a>

                                {/* Meta */}
                                <div className="space-y-3 pt-2 border-t border-border">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Clock size={14} className="text-accent" />
                                            <span className="font-body text-xs">Durada</span>
                                        </div>
                                        <span className="font-body font-bold text-xs text-foreground">{curso.durada}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <CalendarDays size={14} className="text-accent" />
                                            <span className="font-body text-xs">Inici</span>
                                        </div>
                                        <span className="font-body font-bold text-xs text-foreground">16 de març de 2026</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin size={14} className="text-accent" />
                                            <span className="font-body text-xs">Lloc</span>
                                        </div>
                                        <span className="font-body font-bold text-xs text-foreground text-right max-w-[160px]">GAMS (Martorelles)</span>
                                    </div>
                                </div>

                                {/* Torns */}
                                <div className="space-y-2 pt-2 border-t border-border">
                                    <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Torns disponibles</p>
                                    <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2.5">
                                        <Clock size={13} className="text-accent flex-shrink-0" />
                                        <span className="font-body text-xs text-foreground font-semibold">Matí: 10:00 – 13:00 h</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2.5">
                                        <Clock size={13} className="text-accent flex-shrink-0" />
                                        <span className="font-body text-xs text-foreground font-semibold">Tarda: 16:00 – 19:00 h</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default AlumnesISPCDetail;