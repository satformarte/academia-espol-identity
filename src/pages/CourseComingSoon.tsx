import { Link, useLocation, useParams } from "react-router-dom";
import {
    ChevronRight,
    Mail,
    MessageCircle,
    TrafficCone,
    BellRing,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { courses } from "@/data/courses";

const WHATSAPP_LINK = "https://wa.me/34694234416";
const WHATSAPP_TEXT = "Hola!%20M'agradaria%20rebre%20informaci%C3%B3%20sobre%20un%20curs%20que%20est%C3%A0%20en%20preparaci%C3%B3.";
const CONTACT_EMAIL = "iaformarte@formar-te.es";

interface LocationState {
    courseName?: string;
    categoryLabel?: string;
    categoryPath?: string;
}

const staticCourses: Record<string, { name: string; categoryLabel: string; categoryPath: string }> = {
    "temari-guardia-urbana":          { name: "Temari Complet Guàrdia Urbana",      categoryLabel: "Guàrdia Urbana",    categoryPath: "/oposicions/guardia-urbana" },
    "psicotecnics-guardia-urbana":    { name: "Psicotècnics Guàrdia Urbana",        categoryLabel: "Guàrdia Urbana",    categoryPath: "/oposicions/guardia-urbana" },
    "proves-fisiques-guardia-urbana": { name: "Proves Físiques Guàrdia Urbana",     categoryLabel: "Guàrdia Urbana",    categoryPath: "/oposicions/guardia-urbana" },
    "temari-mossos-esquadra":         { name: "Temari Complet Mossos d'Esquadra",   categoryLabel: "Mossos d'Esquadra", categoryPath: "/oposicions/mossos-desquadra" },
    "psicotecnics-mossos-esquadra":   { name: "Psicotècnics Mossos d'Esquadra",     categoryLabel: "Mossos d'Esquadra", categoryPath: "/oposicions/mossos-desquadra" },
    "proves-fisiques-mossos-esquadra":{ name: "Proves Físiques Mossos d'Esquadra",  categoryLabel: "Mossos d'Esquadra", categoryPath: "/oposicions/mossos-desquadra" },
};

const CourseComingSoon = () => {
    const { slug: slugParam } = useParams<{ slug: string }>();
    const location = useLocation();
    const state = (location.state ?? {}) as LocationState;

    const slug = slugParam ?? location.pathname.split("/").pop() ?? "";
    const course = courses.find((c) => c.slug === slug);
    const staticData = staticCourses[slug];

    const courseName = state.courseName
        ?? staticData?.name
        ?? (course ? `${course.titleBase}${course.titleAccent ? ` ${course.titleAccent}` : ""}` : "Curs en preparació");
    const categoryLabel = state.categoryLabel ?? staticData?.categoryLabel ?? course?.categoriaLabel ?? "Cursos";
    const categoryPath = state.categoryPath ?? staticData?.categoryPath ?? (course ? `/${course.categoriaSlug}` : "/");

    return (
        <div className="min-h-screen bg-background">
            <Topbar />
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <Link to="/" className="hover:text-accent transition-colors duration-150">Inici</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <Link to={categoryPath} className="hover:text-accent transition-colors duration-150">{categoryLabel}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground truncate max-w-[200px]">{courseName}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
                <div className="relative container mx-auto px-4 max-w-[1400px] py-10 lg:py-14">
                    <div className="max-w-2xl">
                        <h1 className="font-display font-black text-4xl lg:text-6xl text-primary-foreground leading-tight mb-4">
                            {courseName}
                        </h1>
                        <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full">
                            <TrafficCone size={11} />
                            Curs en preparació
                        </span>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <section className="py-10 bg-muted">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="max-w-2xl mx-auto">

                        {/* Text */}
                        <div className="mb-8">
                            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                                Aquest curs s'està preparant i estarà disponible aviat. El nostre equip de formadors està treballant per dissenyar un programa de màxima qualitat, complet i actualitzat a les últimes convocatòries.
                            </p>
                            <p className="font-body text-sm text-muted-foreground leading-relaxed">
                                Si estàs interessat/da en aquest curs, posa't en contacte amb nosaltres. Et podrem informar sobre la data de llançament prevista, el programa, el preu i totes les condicions de matriculació.
                            </p>
                        </div>

                        {/* Contact CTA */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <BellRing size={15} className="text-accent" />
                                <h3 className="font-display font-bold text-sm text-foreground uppercase tracking-wide">
                                    Vol·les rebre informació quan estigui disponible?
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* WhatsApp */}
                                <a
                                    href={`${WHATSAPP_LINK}?text=${WHATSAPP_TEXT}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 bg-card border border-border hover:border-[#25D366]/50 rounded-2xl p-5 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(37,211,102,0.12)]"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                                        <MessageCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="font-display font-bold text-sm text-foreground">WhatsApp</p>
                                        <p className="font-body text-xs text-muted-foreground mt-0.5">Escriu-nos i et responem aviat</p>
                                    </div>
                                </a>

                                {/* Email / Contacte */}
                                <Link
                                    to="/contacte"
                                    className="group flex items-center gap-4 bg-card border border-border hover:border-accent/40 rounded-2xl p-5 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(27,48,136,0.10)]"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="font-display font-bold text-sm text-foreground">Formulari de contacte</p>
                                        <p className="font-body text-xs text-muted-foreground mt-0.5">{CONTACT_EMAIL}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Back link */}
                        <div className="text-center pt-4">
                            <Link
                                to={categoryPath}
                                className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-muted-foreground hover:text-accent transition-colors duration-150"
                            >
                                <ChevronRight size={14} className="rotate-180" />
                                Tornar a {categoryLabel}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default CourseComingSoon;
