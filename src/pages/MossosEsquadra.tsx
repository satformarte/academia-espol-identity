import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    ChevronRight,
    Clock,
    BookOpen,
    Users,
    ArrowRight,
    CalendarDays,
    ShieldCheck,
    GraduationCap,
    Target,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// ─── Data ────────────────────────────────────────────────────────────────────
const cursos = [
    {
        slug: "temari-mossos-esquadra",
        titleBase: "Temari Complet",
        titleAccent: "Mossos d'Esquadra",
        shortDesc: "Preparació exhaustiva de tots els blocs temàtics del procés selectiu dels Mossos d'Esquadra de la Generalitat de Catalunya.",
        hours: "150 h",
        modality: "Online + Presencial",
        students: 520,
        rating: 4.9,
        startDate: "Abril 2026",
        level: "Intermedi" as const,
        isNew: true,
        img: "/images/altres-tematiques.jpg",
    },
    {
        slug: "psicotecnics-mossos-esquadra",
        titleBase: "Psicotècnics",
        titleAccent: "Mossos d'Esquadra",
        shortDesc: "Entrenament intensiu de les proves psicotècniques específiques del procés selectiu dels Mossos d'Esquadra.",
        hours: "40 h",
        modality: "Online",
        students: 380,
        rating: 4.7,
        startDate: "Abril 2026",
        level: "Bàsic" as const,
        isNew: false,
        img: "/images/armament.jpg",
    },
    {
        slug: "proves-fisiques-mossos-esquadra",
        titleBase: "Proves Físiques",
        titleAccent: "Mossos d'Esquadra",
        shortDesc: "Pla d'entrenament personalitzat per superar les proves físiques del procés selectiu dels Mossos d'Esquadra.",
        hours: "60 h",
        modality: "Presencial",
        students: 290,
        rating: 4.8,
        startDate: "Abril 2026",
        level: "Intermedi" as const,
        isNew: false,
        img: "/images/criminalistica.jpg",
    },
];

// ── Level badge colors ────────────────────────────────────────────────────────
const levelConfig = {
    Bàsic: "bg-emerald-100 text-emerald-700",
    Intermedi: "bg-amber-100 text-amber-700",
    Avançat: "bg-rose-100 text-rose-700",
};

// ── Scroll reveal hook ────────────────────────────────────────────────────────
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

// ── Main component ────────────────────────────────────────────────────────────
const MossosEsquadra = () => {
    const ref = useRef<HTMLDivElement>(null);
    useScrollReveal(ref as React.RefObject<HTMLElement>);

    return (
        <div className="min-h-screen bg-background" ref={ref}>
            <Topbar />
            <Navbar />

            {/* ── Breadcrumbs ───────────────────────────────────────────────────── */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <Link to="/" className="hover:text-accent transition-colors duration-150">Inici</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <Link to="/oposicions" className="hover:text-accent transition-colors duration-150">Oposicions</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">Mossos d'Esquadra</span>
                    </nav>
                </div>
            </div>

            {/* ── Hero ──────────────────────────────────────────────────────────── */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/heroSlider3.jpg"
                        alt="Mossos d'Esquadra"
                        className="w-full h-full object-cover opacity-25"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r via-primary/95 to-primary/70" />
                </div>

                <div className="relative container mx-auto px-4 max-w-[1400px] py-12 lg:py-16">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
                            <ShieldCheck size={10} />
                            Oposicions
                        </span>

                        <h1 className="font-display font-black text-3xl lg:text-4xl text-white leading-tight mb-3">
                            Mossos d'Esquadra
                        </h1>

                        <p className="font-body text-white/75 text-sm lg:text-base leading-relaxed mb-7 max-w-xl">
                            Preparació completa per a les oposicions dels Mossos d'Esquadra. Temari actualitzat, professors en actiu i metodologia contrastada per maximitzar les teves possibilitats d'èxit.
                        </p>

                        <div className="flex flex-wrap gap-5">
                            {[
                                {
                                    icon: <BookOpen size={13} />,
                                    label: `${cursos.length} cursos disponibles`,
                                },
                                { icon: <ShieldCheck size={13} />, label: "Professors en actiu" },
                                { icon: <Target size={13} />, label: "Metodologia contrastada" },
                            ].map(({ icon, label }) => (
                                <div key={label} className="flex items-center gap-2 text-white/85 font-body font-semibold text-xs">
                                    <span className="text-accent">{icon}</span>
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Course grid ───────────────────────────────────────────────────── */}
            <section className="py-14 bg-muted">
                <div className="container mx-auto px-4 max-w-[1400px]">

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-7 bg-accent rounded-full" />
                            <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">
                                {cursos.length} Cursos disponibles
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cursos.map((course, i) => (
                            <Link
                                key={course.slug}
                                to={`/oposicions/mossos-esquadra/${course.slug}`}
                                className="scroll-reveal group bg-card rounded-2xl border border-border overflow-hidden flex flex-col transition-[border-color,box-shadow] duration-150 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(27,48,136,0.10)]"
                                style={{ transitionDelay: `${i * 60}ms` }}
                            >
                                {/* Image */}
                                <div className="relative h-[190px] overflow-hidden flex-shrink-0">
                                    <img
                                        src={course.img}
                                        alt={`${course.titleBase} ${course.titleAccent}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                    {/* Badge nou */}
                                    {course.isNew && (
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground font-body font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                                                <GraduationCap size={9} />
                                                Pròxima edició
                                            </span>
                                        </div>
                                    )}

                                    {/* Level badge */}
                                    <div className="absolute bottom-3 right-3">
                                        <span className={`font-body font-bold text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-lg ${levelConfig[course.level]}`}>
                                            {course.level}
                                        </span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-5 flex flex-col flex-1">

                                    {/* Categoria label */}
                                    <span className="font-body text-accent text-[10px] uppercase tracking-[0.15em] font-semibold mb-2">
                                        Mossos d'Esquadra
                                    </span>

                                    {/* Títol */}
                                    <h3 className="font-display font-bold text-[14px] text-foreground leading-snug mb-2 line-clamp-2">
                                        {course.titleBase} {course.titleAccent}
                                    </h3>

                                    {/* Descripció curta */}
                                    {course.shortDesc && (
                                        <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                                            {course.shortDesc}
                                        </p>
                                    )}

                                    {/* Meta row */}
                                    <div className="flex items-center gap-3 text-muted-foreground mb-3">
                                        {course.hours && (
                                            <span className="flex items-center gap-1 font-body text-[11px]">
                                                <Clock size={11} className="text-accent" />
                                                {course.hours}
                                            </span>
                                        )}
                                        {course.students > 0 && (
                                            <span className="flex items-center gap-1 font-body text-[11px]">
                                                <Users size={11} className="text-accent" />
                                                {course.students.toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    {/* Data inici */}
                                    {course.startDate && (
                                        <div className="flex items-center gap-3 text-muted-foreground mb-3">
                                            <span className="flex items-center gap-1 font-body text-[11px]">
                                                <CalendarDays size={11} className="text-accent" />
                                                Inici: {course.startDate}
                                            </span>
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <div className="border-t border-border pt-4 flex items-center justify-between mt-auto">
                                        <span className="inline-flex items-center gap-1.5 font-body font-semibold text-accent text-xs group-hover:gap-2.5 transition-[gap] duration-150">
                                            Més info <ArrowRight size={13} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default MossosEsquadra;