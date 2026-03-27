import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Clock,
    Monitor,
    Users,
    Star,
    ArrowRight,
    Sparkles,
    CalendarDays,
    ChevronDown,
} from "lucide-react";
import { courses } from "@/data/courses";

const PAGE_SIZE = 6;

const levelConfig: Record<string, string> = {
    Bàsic: "bg-emerald-100 text-emerald-700",
    Intermedi: "bg-amber-100 text-amber-700",
    Avançat: "bg-rose-100 text-rose-700",
};

const RecentCourses = () => {
    const [visible, setVisible] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = () => {
        setLoading(true);
        // Petit delay per donar sensació de càrrega progressiva
        setTimeout(() => {
            setVisible((prev) => prev + PAGE_SIZE);
            setLoading(false);
        }, 300);
    };

    const visibleCourses = courses.slice(0, visible);
    const hasMore = visible < courses.length;

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-[1400px]">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <div>
                            <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">
                                Cursos Recents
                            </h2>
                            <p className="font-body text-muted-foreground text-sm mt-0.5">
                                {courses.length} cursos disponibles
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleCourses.map((course, i) => (
                        <Link
                            key={course.slug}
                            to={`/curs/${course.slug}`}
                            className="group bg-card rounded-2xl border border-border overflow-hidden flex flex-col transition-[border-color,box-shadow] duration-150 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(27,48,136,0.10)]"
                            style={{
                                // Animació d'entrada per als nous cursos carregats
                                animation: i >= visible - PAGE_SIZE ? "fadeInUp 0.4s ease forwards" : "none",
                                animationDelay: `${(i % PAGE_SIZE) * 50}ms`,
                            }}
                        >
                            {/* Image */}
                            <div className="relative h-[190px] overflow-hidden flex-shrink-0 bg-muted">
                                <img
                                    src={course.gridImg}
                                    alt={`${course.titleBase} ${course.titleAccent ?? ""}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                    loading={i < 6 ? "eager" : "lazy"}
                                    decoding="async"
                                    fetchPriority={i < 3 ? "high" : "low"}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    {course.isNew && (
                                        <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground font-body font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                                            <Sparkles size={9} />
                                            Pròxima edició
                                        </span>
                                    )}
                                </div>

                                {/* Level badge */}
                                {course.gridLevel && (
                                    <div className="absolute bottom-3 right-3">
                                        <span className={`font-body font-bold text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-lg ${levelConfig[course.gridLevel] ?? ""}`}>
                                            {course.gridLevel}
                                        </span>
                                    </div>
                                )}
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

                                {/* Descripció curta */}
                                {course.gridShortDesc && (
                                    <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                                        {course.gridShortDesc}
                                    </p>
                                )}

                                {/* Meta row */}
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
                                    {course.gridStudents && course.gridStudents > 0 && (
                                        <span className="flex items-center gap-1 font-body text-[11px]">
                                            <Users size={11} className="text-accent" />
                                            {course.gridStudents.toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                {/* Dates */}
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

                                {/* Rating */}
                                {course.gridRating && course.gridRating > 0 && (
                                    <div className="flex items-center gap-1.5 mb-4">
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, j) => (
                                                <Star
                                                    key={j}
                                                    size={11}
                                                    className={j < Math.floor(course.gridRating!) ? "text-amber-400 fill-amber-400" : "text-border fill-border"}
                                                />
                                            ))}
                                        </div>
                                        <span className="font-body font-bold text-[11px] text-foreground">{course.gridRating}</span>
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

                {/* Botó "Veure més" */}
                {hasMore && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="inline-flex items-center gap-2 bg-card border border-border hover:border-accent/50 hover:shadow-md text-foreground font-body font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                                    Carregant...
                                </>
                            ) : (
                                <>
                                    <ChevronDown size={16} className="text-accent" />
                                    Veure més ({courses.length - visible} restants)
                                </>
                            )}
                        </button>
                    </div>
                )}

            </div>

            {/* Keyframe per a l'animació d'entrada */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default RecentCourses;