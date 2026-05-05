import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    ChevronRight,
    CalendarDays,
    MapPin,
    Clock,
    BadgePercent,
    CheckCircle2,
    ExternalLink,
    GraduationCap,
    Star,
    ArrowRight,
    BookOpen,
    X,
    UserCheck,
    Package,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";

// Static data that doesn't need translation
const CURSO_IMGS: Record<string, string> = {
    "bulevard": "/images/bulevard.webp",
    "procediments-intervencio": "/images/procediments.webp",
    "transit-i-transport": "/images/transit-transport.webp",
    "armament": "/images/armament.webp",
};

const PACKS2_URLS = [
    "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=S1KIu1x7N/M=&return=no&returnurl=",
    "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=fMDolMWiGk8=&return=no&returnurl=",
    "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=tgsuWqUR34Q=&return=no&returnurl=",
    "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=y2FAlfUxiWc=&return=no&returnurl=",
    "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=a9m37okhmBM=&return=no&returnurl=",
    "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=oah3Bohah/Y=&return=no&returnurl=",
];

const PACK_COMPLET_URLS = [
    "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=PW/K4QqzccA=&return=no&returnurl=",
    "https://formar-te.iformalia.es/Publico/Portal/FormacionFormulario.aspx?idg=PW/K4QqzccA=&return=no&returnurl=",
];

const EnrollmentModal = ({ url, title, onClose, ai }: { url: string; title: string; onClose: () => void; ai: { modalTitle: string; modalClose: string; modalLoading: string; modalFooter: string } }) => {
    const [loaded, setLoaded] = useState(false);

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
                            <h3 className="font-display font-black text-sm text-foreground uppercase tracking-tight">{ai.modalTitle}</h3>
                            <p className="font-body text-[11px] text-muted-foreground">{title}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-lg bg-muted hover:bg-accent hover:text-white text-muted-foreground flex items-center justify-center transition-all duration-150 cursor-pointer" aria-label={ai.modalClose}>
                        <X size={15} />
                    </button>
                </div>
                <div className="relative flex-1 overflow-hidden">
                    {!loaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card z-10">
                            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                            <span className="font-body text-xs text-muted-foreground">{ai.modalLoading}</span>
                        </div>
                    )}
                    <iframe src={url} title={ai.modalTitle} className="w-full h-full border-0" onLoad={() => setLoaded(true)} allow="fullscreen" />
                </div>
                <div className="flex items-center gap-2 px-6 py-3 border-t border-border bg-muted/50 flex-shrink-0">
                    <UserCheck size={13} className="text-accent flex-shrink-0" />
                    <p className="font-body text-[11px] text-muted-foreground">{ai.modalFooter}</p>
                </div>
            </div>
        </div>
    );
};

function useScrollReveal(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const cards = el.querySelectorAll(".scroll-reveal");
        const obs = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("visible");
                }),
            { threshold: 0.08 }
        );
        cards.forEach((c) => obs.observe(c));
        return () => obs.disconnect();
    }, []);
}

const AlumnesISPC = () => {
    const ref = useRef<HTMLDivElement>(null);
    useScrollReveal(ref as React.RefObject<HTMLElement>);
    const { t } = useLanguage();
    const ai = t.alumnesISPCList;
    const [enrollPack, setEnrollPack] = useState<{ url: string; title: string } | null>(null);

    return (
        <div className="min-h-screen bg-background" ref={ref}>
            {enrollPack && (
                <EnrollmentModal
                    url={enrollPack.url}
                    title={enrollPack.title}
                    onClose={() => setEnrollPack(null)}
                    ai={ai}
                />
            )}
            <Topbar />
            <Navbar />

            {/* Breadcrumbs */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <Link to="/" className="hover:text-accent transition-colors duration-150">{ai.breadcrumbHome}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">{ai.breadcrumb}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
                <div className="relative container mx-auto px-4 max-w-[1400px] py-14 lg:py-20">
                    <div className="max-w-5xl">
                        <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
                            <GraduationCap size={11} />
                            {ai.heroBadge}
                        </span>
                        <h1 className="font-display font-black text-3xl lg:text-5xl text-primary-foreground leading-tight mb-4">
                            {ai.heroTitle}
                        </h1>
                        <p className="font-body text-primary-foreground/80 text-sm lg:text-base leading-relaxed max-w-2xl mb-8">
                            {ai.heroDesc}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-xl px-4 py-2.5">
                                <CalendarDays size={15} className="text-accent" />
                                <div>
                                    <span className="block font-body text-[10px] uppercase tracking-wider text-primary-foreground/60">{ai.pillDateLabel}</span>
                                    <span className="font-display font-bold text-sm text-primary-foreground">{ai.pillDateValue}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-xl px-4 py-2.5">
                                <MapPin size={15} className="text-accent" />
                                <div>
                                    <span className="block font-body text-[10px] uppercase tracking-wider text-primary-foreground/60">{ai.pillLocationLabel}</span>
                                    <span className="font-display font-bold text-sm text-primary-foreground">{ai.pillLocationValue}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-xl px-4 py-2.5">
                                <Clock size={15} className="text-accent" />
                                <div>
                                    <span className="block font-body text-[10px] uppercase tracking-wider text-primary-foreground/60">{ai.pillMatiLabel}</span>
                                    <span className="font-display font-bold text-sm text-primary-foreground">{ai.pillMatiValue}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-xl px-4 py-2.5">
                                <Clock size={15} className="text-accent" />
                                <div>
                                    <span className="block font-body text-[10px] uppercase tracking-wider text-primary-foreground/60">{ai.pillTardaLabel}</span>
                                    <span className="font-display font-bold text-sm text-primary-foreground">{ai.pillTardaValue}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid de cursos */}
            <section className="py-14 bg-muted">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="flex items-center gap-3 mb-8 scroll-reveal">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">
                            {ai.cursos.length} {ai.cursosDisponiblesLabel}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ai.cursos.map((c, i) => (
                            <Link
                                key={c.slug}
                                to={`/alumnes-ispc/${c.slug}`}
                                className="scroll-reveal group bg-card rounded-2xl border border-border overflow-hidden flex flex-col transition-[border-color,box-shadow] duration-150 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(27,48,136,0.10)]"
                                style={{ transitionDelay: `${i * 60}ms` }}
                            >
                                <div className="relative h-[190px] overflow-hidden flex-shrink-0">
                                    <img
                                        src={CURSO_IMGS[c.slug]}
                                        alt={c.nom}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute bottom-3 right-3">
                                        <span className="font-body font-bold text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-lg bg-accent text-accent-foreground">
                                            {c.preu}
                                        </span>
                                    </div>
                                    {c.afiliats !== "–" && (
                                        <div className="absolute bottom-3 left-3">
                                            <span className="font-body font-bold text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/20">
                                                {ai.afiliatsLabel} {c.afiliats}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <span className="font-body text-accent text-[10px] uppercase tracking-[0.15em] font-semibold mb-2">
                                        {ai.alumnesISPCLabel}
                                    </span>
                                    <h3 className="font-display font-bold text-[14px] text-foreground leading-snug mb-2 line-clamp-2">
                                        {c.nom}
                                    </h3>
                                    {c.subtitol && (
                                        <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                                            {c.subtitol}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-3 text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1 font-body text-[11px]">
                                            <Clock size={11} className="text-accent" />
                                            {c.durada}
                                        </span>
                                    </div>
                                    <div className="border-t border-border pt-4 flex items-center justify-between mt-auto">
                                        <span className="inline-flex items-center gap-1.5 font-body font-semibold text-accent text-xs group-hover:gap-2.5 transition-[gap] duration-150">
                                            {ai.mesInfoBtn} <ArrowRight size={13} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Preus afiliats */}
            <section className="py-16 bg-card">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-10 scroll-reveal">
                            <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent font-body font-semibold text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-4">
                                <BadgePercent size={13} />
                                {ai.preusSectionBadge}
                            </span>
                            <h2 className="font-display font-black text-2xl md:text-3xl text-foreground mb-3">
                                {ai.preusSectionTitle}
                            </h2>
                            <p className="font-body text-muted-foreground text-sm max-w-lg mx-auto">
                                {ai.preusSectionDesc}
                            </p>
                        </div>
                        <div className="flex justify-center scroll-reveal">
                            <div className="flex items-start gap-3 bg-muted rounded-2xl p-5 w-full max-w-sm">
                                <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-display font-bold text-sm text-foreground">{ai.preusSectionItem}</p>
                                    <p className="font-body text-xs text-muted-foreground mt-1">{ai.preusSectionItemDesc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default AlumnesISPC;
