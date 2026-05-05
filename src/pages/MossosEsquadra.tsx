import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    ChevronRight,
    Clock,
    BookOpen,
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
import { useLanguage } from "@/contexts/LanguageContext";

// Slugs and images are fixed — never change
const COURSE_META = [
    { slug: "temari-mossos-esquadra", img: "/images/altres-tematiques.webp", hours: "150 h" },
    { slug: "psicotecnics-mossos-esquadra", img: "/images/armament.webp", hours: "40 h" },
    { slug: "proves-fisiques-mossos-esquadra", img: "/images/criminalistica.webp", hours: "60 h" },
];

function useScrollReveal(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const cards = el.querySelectorAll(".scroll-reveal");
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
            { threshold: 0.08 }
        );
        cards.forEach((c) => obs.observe(c));
        return () => obs.disconnect();
    }, []);
}

const MossosEsquadra = () => {
    const { t } = useLanguage();
    const m = t.mossosEsquadra;
    const ref = useRef<HTMLDivElement>(null);
    useScrollReveal(ref as React.RefObject<HTMLElement>);

    return (
        <div className="min-h-screen bg-background" ref={ref}>
            <Topbar />
            <Navbar />

            {/* Breadcrumbs */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <Link to="/" className="hover:text-accent transition-colors duration-150">{m.breadcrumbHome}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <Link to="/" className="hover:text-accent transition-colors duration-150">{m.breadcrumbOposicions}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">{m.breadcrumb}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/images/heroSlider3.webp" alt="Mossos d'Esquadra" className="w-full h-full object-cover opacity-25" />
                    <div className="absolute inset-0 bg-gradient-to-r via-primary/95 to-primary/70" />
                </div>

                <div className="relative container mx-auto px-4 max-w-[1400px] py-12 lg:py-16">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
                            <ShieldCheck size={10} />
                            {m.heroBadge}
                        </span>

                        <h1 className="font-display font-black text-3xl lg:text-4xl text-white leading-tight mb-3">
                            {m.heroTitle}
                        </h1>

                        <p className="font-body text-white/75 text-sm lg:text-base leading-relaxed mb-7 max-w-xl">
                            {m.heroDesc}
                        </p>

                        <div className="flex flex-wrap gap-5">
                            {[
                                { icon: <BookOpen size={13} />, label: `${COURSE_META.length} ${m.cursosLabel}` },
                                { icon: <ShieldCheck size={13} />, label: m.heroFeature2 },
                                { icon: <Target size={13} />, label: m.heroFeature3 },
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

            {/* Course grid */}
            <section className="py-14 bg-muted">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-7 bg-accent rounded-full" />
                            <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">
                                {COURSE_META.length} {m.cursosLabel}
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {m.cursos.map((course, i) => (
                            <Link
                                key={COURSE_META[i].slug}
                                to={`/oposicions/mossos-desquadra/${COURSE_META[i].slug}`}
                                state={{
                                    courseName: `${course.titleBase} ${course.titleAccent}`,
                                    categoryLabel: m.categoryLabel,
                                    categoryPath: "/oposicions/mossos-desquadra",
                                }}
                                className="scroll-reveal group bg-card rounded-2xl border border-border overflow-hidden flex flex-col transition-[border-color,box-shadow] duration-150 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(27,48,136,0.10)]"
                                style={{ transitionDelay: `${i * 60}ms` }}
                            >
                                {/* Image */}
                                <div className="relative h-[190px] overflow-hidden flex-shrink-0">
                                    <img
                                        src={COURSE_META[i].img}
                                        alt={`${course.titleBase} ${course.titleAccent}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute top-3 left-3">
                                        <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground font-body font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                                            <GraduationCap size={9} />
                                            {m.proximament}
                                        </span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-5 flex flex-col flex-1">
                                    <span className="font-body text-accent text-[10px] uppercase tracking-[0.15em] font-semibold mb-1.5">
                                        {m.categoryLabel}
                                    </span>
                                    <h3 className="font-display font-bold text-[14px] text-foreground leading-snug mb-1.5 line-clamp-2">
                                        {course.titleBase} {course.titleAccent}
                                    </h3>
                                    {course.shortDesc && (
                                        <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                                            {course.shortDesc}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-3 text-foreground/80 mb-2">
                                        <span className="flex items-center gap-1 font-body text-xs">
                                            <Clock size={12} className="text-accent" />
                                            {COURSE_META[i].hours}
                                        </span>
                                    </div>
                                    {course.startDate && (
                                        <div className="flex items-center gap-3 text-foreground/80 mb-2">
                                            <span className="flex items-center gap-1 font-body text-xs">
                                                <CalendarDays size={12} className="text-accent" />
                                                {m.inici} {course.startDate}
                                            </span>
                                        </div>
                                    )}
                                    <div className="border-t border-border pt-4 flex items-center justify-between mt-auto">
                                        <span className="inline-flex items-center gap-1.5 font-body font-semibold text-accent text-xs group-hover:gap-2.5 transition-[gap] duration-150">
                                            {m.moreInfo} <ArrowRight size={13} />
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
