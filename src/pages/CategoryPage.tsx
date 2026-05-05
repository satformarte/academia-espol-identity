import { useEffect, useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
    ChevronRight,
    Clock,
    Monitor,
    Star,
    ArrowRight,
    BookOpen,
    Sparkles,
    CalendarDays,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCourses } from "@/hooks/useCourses";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { COURSE_TITLES_ES, translateHeroStat } from "@/i18n/courseTranslations";

// Images are fixed regardless of language
const CATEGORY_IMGS: Record<string, string> = {
    criminologia: "/images/criminologia.webp",
    "dret-penal": "/images/dret-penal.webp",
    "transit-i-circulacio": "/images/transit-circulacio.webp",
    "seguretat-ciutadana": "/images/seguretat-ciutadana.webp",
    "procediments-policials": "/images/procediments-policials.webp",
    ciberseguretat: "/images/ciberdelinquencia.webp",
    "altres-tematiques": "/images/altres-tematiques.webp",
    "actic-i-angles": "/images/actic-angles.webp",
    criminalistica: "/images/criminalistica.webp",
};

// CSS classes keyed by Catalan level name (from data)
const levelConfig: Record<string, string> = {
    Bàsic: "bg-emerald-100 text-emerald-700",
    Intermedi: "bg-amber-100 text-amber-700",
    Avançat: "bg-rose-100 text-rose-700",
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

// Injects a <link rel="preload"> for the hero image to improve LCP
function usePreloadImage(src: string) {
    useEffect(() => {
        if (!src) return;
        const existing = document.querySelector(`link[rel="preload"][href="${src}"]`);
        if (existing) return;
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
    }, [src]);
}

const CategoryPage = () => {
    const { t, lang } = useLanguage();
    const { courses } = useCourses();
    const cp = t.categoryPage;
    const { categoria } = useParams<{ categoria: string }>();
    const ref = useRef<HTMLDivElement>(null);
    useScrollReveal(ref as React.RefObject<HTMLElement>);

    const catData = (cp.categories as Record<string, { title: string; description: string }>)[categoria ?? ""];
    const img = CATEGORY_IMGS[categoria ?? ""];
    if (!catData || !img) return <Navigate to="/404" replace />;

    usePreloadImage(img);

    const parseStartDate = (d?: string) => {
        if (!d) return Infinity;
        const [day, month, year] = d.split("/").map(Number);
        if (isNaN(day) || isNaN(month) || isNaN(year)) return Infinity;
        return new Date(year, month - 1, day).getTime();
    };

    const categoryCourses = courses
        .filter((c) => c.categoriaSlug === categoria)
        .sort((a, b) => {
            if (a.comingSoon && !b.comingSoon) return -1;
            if (!a.comingSoon && b.comingSoon) return 1;
            return parseStartDate(a.gridStartDate) - parseStartDate(b.gridStartDate);
        });

    const countLabel = categoryCourses.length === 1
        ? cp.oneCursDisponible
        : `${categoryCourses.length} ${cp.cursosDisponibles}`;

    return (
        <div className="min-h-screen bg-background" ref={ref}>
            <Topbar />
            <Navbar />

            {/* ── Breadcrumbs ───────────────────────────────────────────────────── */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <Link to="/" className="hover:text-accent transition-colors duration-150">{cp.breadcrumbHome}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <Link to="/" className="hover:text-accent transition-colors duration-150">{cp.breadcrumbCursos}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">{catData.title}</span>
                    </nav>
                </div>
            </div>

            {/* ── Hero ──────────────────────────────────────────────────────────── */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={img}
                        alt={catData.title}
                        className="w-full h-full object-cover opacity-25"
                        fetchPriority="high"
                        decoding="sync"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r via-primary/95 to-primary/70" />
                </div>

                <div className="relative container mx-auto px-4 max-w-[1400px] py-12 lg:py-16">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
                            <BookOpen size={10} />
                            {cp.heroBadge}
                        </span>

                        <h1 className="font-display font-black text-3xl lg:text-4xl text-white leading-tight mb-3">
                            {catData.title}
                        </h1>

                        {catData.description && (
                            <p className="font-body text-white/75 text-sm lg:text-base leading-relaxed mb-7 max-w-xl">
                                {catData.description}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-5">
                            {[
                                { icon: <BookOpen size={13} />, label: countLabel },
                                { icon: <Monitor size={13} />, label: cp.online },
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
                                {countLabel}
                            </h2>
                        </div>
                    </div>

                    {categoryCourses.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-14 h-14 rounded-2xl bg-muted-foreground/10 flex items-center justify-center mx-auto mb-4">
                                <BookOpen size={24} className="text-muted-foreground/40" />
                            </div>
                            <h3 className="font-display font-black text-lg text-foreground mb-2">
                                {cp.emptyTitle}
                            </h3>
                            <p className="font-body text-sm text-muted-foreground max-w-sm mx-auto">
                                {cp.emptyDesc}
                            </p>
                        </div>
                    )}

                    {categoryCourses.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryCourses.map((course, i) => (
                                <Link
                                    key={course.slug}
                                    to={`/curs/${course.slug}`}
                                    className="group bg-card rounded-2xl border border-border overflow-hidden flex flex-col transition-[border-color,box-shadow] duration-150 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(27,48,136,0.10)]"
                                    style={{ transitionDelay: `${i * 60}ms` }}
                                >
                                    {/* Image */}
                                    <div className="relative h-[190px] overflow-hidden flex-shrink-0 bg-muted">
                                        <img
                                            src={course.gridImg}
                                            alt={`${course.titleBase} ${course.titleAccent ?? ""}`}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                            loading={i < 3 ? "eager" : "lazy"}
                                            decoding="async"
                                            fetchPriority={i < 3 ? "high" : "low"}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                        <div className="absolute top-3 left-3 flex gap-2">
                                            {course.isNew && (
                                                <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground font-body font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                                                    <Sparkles size={9} />
                                                    {cp.proximaEdicio}
                                                </span>
                                            )}
                                            {course.comingSoon && (
                                                <span className="inline-flex items-center gap-1 bg-primary text-white font-body font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                                                    <Sparkles size={9} />
                                                    {cp.proximament}
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute bottom-3 right-3">
                                            <span className={`font-body font-bold text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-lg ${levelConfig[course.gridLevel] ?? ""}`}>
                                                {(cp.nivells as Record<string, string>)[course.gridLevel] ?? course.gridLevel}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-5 flex flex-col flex-1">
                                        {course.categoriaSlug !== "actic-i-angles" && (
                                            <span className="font-body text-accent text-[10px] uppercase tracking-[0.15em] font-semibold mb-2">
                                                {lang === "es"
                                                    ? ((cp.categories as Record<string, { title: string }>)[course.categoriaSlug]?.title ?? course.categoriaLabel)
                                                    : course.categoriaLabel}
                                            </span>
                                        )}

                                        <h3 className="font-display font-bold text-[14px] text-foreground leading-snug mb-2 line-clamp-2">
                                            {lang === "es" ? (COURSE_TITLES_ES[course.slug] ?? `${course.titleBase} ${course.titleAccent ?? ""}`.trim()) : `${course.titleBase} ${course.titleAccent ?? ""}`.trim()}
                                        </h3>

                                        {course.gridShortDesc && (
                                            <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                                                {course.gridShortDesc}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-3 text-foreground/80 mb-3">
                                            {course.gridHours && (
                                                <span className="flex items-center gap-1 font-body text-xs">
                                                    <Clock size={12} className="text-accent" />
                                                    {course.gridHours}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1 font-body text-xs">
                                                <Monitor size={12} className="text-accent" />
                                                {cp.online}
                                            </span>
                                        </div>

                                        {(course.gridStartDate || course.gridEndDate) && (
                                            <div className="flex items-center gap-3 text-foreground/80 mb-3">
                                                {course.gridStartDate && (
                                                    <span className="flex items-center gap-1 font-body text-xs">
                                                        <CalendarDays size={12} className="text-accent" />
                                                        {cp.inici} {lang === "es" ? translateHeroStat(course.gridStartDate) : course.gridStartDate}
                                                    </span>
                                                )}
                                                {course.gridEndDate && (
                                                    <span className="flex items-center gap-1 font-body text-xs">
                                                        <CalendarDays size={12} className="text-accent" />
                                                        {cp.fi} {course.gridEndDate}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {course.gridRating > 0 && (
                                            <div className="flex items-center gap-1.5 mb-4">
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, j) => (
                                                        <Star
                                                            key={j}
                                                            size={11}
                                                            className={j < Math.floor(course.gridRating) ? "text-amber-400 fill-amber-400" : "text-border fill-border"}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="font-body font-bold text-[11px] text-foreground">{course.gridRating}</span>
                                            </div>
                                        )}

                                        <div className="border-t border-border pt-4 flex items-center justify-between mt-auto">
                                            <span className="inline-flex items-center gap-1.5 font-body font-semibold text-accent text-xs group-hover:gap-2.5 transition-[gap] duration-150">
                                                {cp.moreInfo} <ArrowRight size={13} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default CategoryPage;
