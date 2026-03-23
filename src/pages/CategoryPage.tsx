import { useEffect, useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
    ChevronRight,
    Clock,
    Monitor,
    Award,
    BadgeCheck,
    Star,
    ArrowRight,
    BookOpen,
    Users,
    Sparkles,
    CalendarDays,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";

// ─────────────────────────────────────────────────────────────────────────────
// Per afegir una categoria nova:
//  1. Afegeix una entrada a categoryMeta amb el slug, títol, descripció i imatge
//  2. Afegeix cursos a courses.ts amb el categoriaSlug corresponent
//  3. No cal tocar res més — la pàgina es genera automàticament
// ─────────────────────────────────────────────────────────────────────────────

interface CategoryMeta {
    title: string;
    description: string;
    img: string;
}

const categoryMeta: Record<string, CategoryMeta> = {
    "criminologia": {
        title: "Criminologia",
        description: "Formació especialitzada en l'estudi científic del delicte, la conducta criminal i els sistemes de justícia. Tots els cursos compten amb certificació oficial reconeguda.",
        img: "/images/criminologia.jpg",
    },
    "dret-penal": {
        title: "Dret Penal",
        description: "Formació en dret penal per a professionals de la seguretat i l'àmbit jurídic. Coneix el marc legal que regula els delictes i les penes.",
        img: "/images/dret-penal.jpg",
    },
    "transit-i-circulacio": {
        title: "Trànsit i Circulació",
        description: "Cursos especialitzats en normativa de trànsit, accidents de circulació i investigació viària per a agents i professionals del sector.",
        img: "/images/transit-circulacio.jpg",
    },
    "seguretat-ciutadana": {
        title: "Seguretat Ciutadana",
        description: "Formació en seguretat pública, gestió de conflictes i ordre públic per a policies i professionals de la seguretat.",
        img: "/images/seguretat-ciutadana.jpg",
    },
    "procediments-policials": {
        title: "Procediments Policials",
        description: "Cursos pràctics sobre actuació policial, protocols d'intervenció i procediments operatius per a cossos de seguretat.",
        img: "/images/procediments-policials.jpg",
    },
    "ciberdelinquencia": {
        title: "Ciberdelinqüència",
        description: "Formació en ciberseguretat, investigació digital i delictes informàtics per a agents i professionals del sector tecnològic.",
        img: "/images/ciberdelinquencia.jpg",
    },
    "altres-tematiques": {
        title: "Altres Temàtiques",
        description: "Formació complementària en àmbits relacionats amb la seguretat, el dret i l'administració pública.",
        img: "/images/altres-tematiques.jpg",
    },
    "actic-i-angles": {
        title: "ACTIC i Anglès",
        description: "Preparació per a les certificacions oficials d'informàtica ACTIC i d'idiomes en anglès per a l'accés a la funció pública.",
        img: "/images/actic-angles.jpg",
    },
    "criminalistica": {
        title: "Criminalística",
        description: "Formació en tècniques d'investigació forense, anàlisi de proves i escena del crim per a professionals de la seguretat.",
        img: "/images/criminalistica.jpg",
    },
};

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
const CategoryPage = () => {
    const { categoria } = useParams<{ categoria: string }>();
    const ref = useRef<HTMLDivElement>(null);
    useScrollReveal(ref as React.RefObject<HTMLElement>);

    const meta = categoryMeta[categoria ?? ""];
    if (!meta) return <Navigate to="/404" replace />;

    const categoryCourses = courses.filter((c) => c.categoriaSlug === categoria);

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
                        <Link to="/" className="hover:text-accent transition-colors duration-150">Cursos Puntuables</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">{meta.title}</span>
                    </nav>
                </div>
            </div>

            {/* ── Hero ──────────────────────────────────────────────────────────── */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={meta.img}
                        alt={meta.title}
                        className="w-full h-full object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/60" />
                </div>

                <div className="relative container mx-auto px-4 max-w-[1400px] py-12 lg:py-16">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
                            <BookOpen size={10} />
                            Cursos Puntuables
                        </span>

                        <h1 className="font-display font-black text-3xl lg:text-4xl text-white leading-tight mb-3">
                            {meta.title}
                        </h1>

                        {meta.description && (
                            <p className="font-body text-white/75 text-sm lg:text-base leading-relaxed mb-7 max-w-xl">
                                {meta.description}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-5">
                            {[
                                {
                                    icon: <BookOpen size={13} />,
                                    label: categoryCourses.length === 1
                                        ? "1 curs disponible"
                                        : `${categoryCourses.length} cursos disponibles`,
                                },
                                { icon: <Monitor size={13} />, label: "100% online" },
                                { icon: <Award size={13} />, label: "Certificat oficial" },
                                { icon: <BadgeCheck size={13} />, label: "Accés immediat" },
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

                    <div className="flex items-center justify-between mb-8 scroll-reveal">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-7 bg-accent rounded-full" />
                            <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">
                                {categoryCourses.length === 1
                                    ? "1 Curs disponible"
                                    : `${categoryCourses.length} Cursos disponibles`}
                            </h2>
                        </div>
                    </div>

                    {/* Missatge si no hi ha cursos encara */}
                    {categoryCourses.length === 0 && (
                        <div className="text-center py-20 scroll-reveal">
                            <div className="w-14 h-14 rounded-2xl bg-muted-foreground/10 flex items-center justify-center mx-auto mb-4">
                                <BookOpen size={24} className="text-muted-foreground/40" />
                            </div>
                            <h3 className="font-display font-black text-lg text-foreground mb-2">
                                Pròximament
                            </h3>
                            <p className="font-body text-sm text-muted-foreground max-w-sm mx-auto">
                                Estem preparant els cursos d'aquesta categoria. Torna aviat o contacta'ns per més informació.
                            </p>
                        </div>
                    )}

                    {/* Grid */}
                    {categoryCourses.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryCourses.map((course, i) => (
                                <Link
                                    key={course.slug}
                                    to={`/curs/${course.slug}`}
                                    className="scroll-reveal group bg-card rounded-2xl border border-border overflow-hidden flex flex-col transition-[border-color,box-shadow] duration-150 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(27,48,136,0.10)]"
                                    style={{ transitionDelay: `${i * 60}ms` }}
                                >
                                    {/* Image */}
                                    <div className="relative h-[190px] overflow-hidden flex-shrink-0">
                                        <img
                                            src={course.gridImg}
                                            alt={`${course.titleBase} ${course.titleAccent}`}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                        {/* Badges */}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            {course.isNew && (
                                                <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground font-body font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                                                    <Sparkles size={9} />
                                                    Nou
                                                </span>
                                            )}
                                            {course.isPopular && (
                                                <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground font-body font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                                                    <Star size={9} className="fill-current" />
                                                    Popular
                                                </span>
                                            )}
                                        </div>

                                        {/* Level badge */}
                                        <div className="absolute bottom-3 right-3">
                                            <span className={`font-body font-bold text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-lg ${levelConfig[course.gridLevel]}`}>
                                                {course.gridLevel}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-5 flex flex-col flex-1">

                                        {/* Categoria label */}
                                        <span className="font-body text-accent text-[10px] uppercase tracking-[0.15em] font-semibold mb-2">
                                            {course.categoriaLabel}
                                        </span>

                                        {/* Títol */}
                                        <h3 className="font-display font-bold text-[14px] text-foreground leading-snug mb-2 line-clamp-2">
                                            {course.titleBase} {course.titleAccent}
                                        </h3>

                                        {/* Descripció curta — només si té contingut */}
                                        {course.gridShortDesc && (
                                            <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                                                {course.gridShortDesc}
                                            </p>
                                        )}

                                        {/* Meta row — hores, modalitat, alumnes */}
                                        <div className="flex items-center gap-3 text-muted-foreground mb-3">
                                            {course.gridHours && (
                                                <span className="flex items-center gap-1 font-body text-[11px]">
                                                    <Clock size={11} className="text-accent" />
                                                    {course.gridHours}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1 font-body text-[11px]">
                                                <Monitor size={11} className="text-accent" />
                                                Online
                                            </span>
                                            {course.gridStudents > 0 && (
                                                <span className="flex items-center gap-1 font-body text-[11px]">
                                                    <Users size={11} className="text-accent" />
                                                    {course.gridStudents.toLocaleString()}
                                                </span>
                                            )}
                                        </div>

                                        {/* Dates — inici i fi, només si existeixen */}
                                        {(course.gridStartDate || course.gridEndDate) && (
                                            <div className="flex items-center gap-3 text-muted-foreground mb-3">
                                                {course.gridStartDate && (
                                                    <span className="flex items-center gap-1 font-body text-[11px]">
                                                        <CalendarDays size={11} className="text-accent" />
                                                        Inici: {course.gridStartDate}
                                                    </span>
                                                )}
                                                {course.gridEndDate && (
                                                    <span className="flex items-center gap-1 font-body text-[11px]">
                                                        <CalendarDays size={11} className="text-accent" />
                                                        Fi: {course.gridEndDate}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Rating — només si té valor */}
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

                                        {/* Preu + CTA */}
                                        <div className="border-t border-border pt-4 flex items-center justify-between mt-auto">
                                            <div>
                                                <div className="flex items-end gap-1.5">
                                                    <span className="font-display font-black text-xl text-foreground">{course.price}€</span>
                                                    {course.originalPrice && (
                                                        <span className="font-body text-xs text-muted-foreground line-through mb-0.5">
                                                            {course.originalPrice}€
                                                        </span>
                                                    )}
                                                </div>
                                                {course.originalPrice && (
                                                    <span className="font-body font-bold text-[10px] text-green-600">
                                                        -{Math.round((1 - course.price / course.originalPrice) * 100)}% descompte
                                                    </span>
                                                )}
                                            </div>

                                            <span className="inline-flex items-center gap-1.5 font-body font-semibold text-accent text-xs group-hover:gap-2.5 transition-[gap] duration-150">
                                                Més info <ArrowRight size={13} />
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
        </div>
    );
};

export default CategoryPage;