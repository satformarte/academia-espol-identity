import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Types ────────────────────────────────────────────────────────────────────
interface Course {
  title: string;
  img: string;
  price: number;
  originalPrice?: number;
  hours: string;
  modality: string;
  certificate: string;
  students: number;
  rating: number;
  isNew?: boolean;
  isPopular?: boolean;
  level: "Bàsic" | "Intermedi" | "Avançat";
  shortDesc: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const courses: Course[] = [
  {
    title: "Curs de mediació i negociació amb persones que adopten postures inflexibles",
    img: "/images/altres-tematiques.jpg",
    price: 189,
    originalPrice: 240,
    hours: "60h",
    modality: "Online",
    certificate: "Oficial ESPOL",
    students: 312,
    rating: 4.8,
    isNew: false,
    isPopular: true,
    level: "Intermedi",
    shortDesc: "Tècniques avançades per gestionar perfils resistents al diàleg en contextos de alta tensió.",
  },
  {
    title: "CURS PER A GUANYAR LA COOPERACIÓ EN LA MEDIACIÓ I NEGOCIACIÓ",
    img: "/images/procediments-policials.jpg",
    price: 149,
    originalPrice: undefined,
    hours: "45h",
    modality: "Online",
    certificate: "Oficial ESPOL",
    students: 198,
    rating: 4.7,
    isNew: true,
    isPopular: false,
    level: "Bàsic",
    shortDesc: "Estratègies per generar consens i acords duradors en processos de mediació professional.",
  },
  {
    title: "Curs sobre introducció a la negociació i la mediació per a la solució de conflictes",
    img: "/images/criminalistica.jpg",
    price: 99,
    originalPrice: 130,
    hours: "30h",
    modality: "Online",
    certificate: "Oficial ESPOL",
    students: 541,
    rating: 4.9,
    isNew: false,
    isPopular: true,
    level: "Bàsic",
    shortDesc: "Fonaments teòrics i pràctics de la mediació aplicada a l'àmbit policial i judicial.",
  },
  {
    title: "Curs de criminologia. Resolució de problemes",
    img: "/images/criminologia.jpg",
    price: 219,
    originalPrice: 280,
    hours: "80h",
    modality: "Online",
    certificate: "Oficial ESPOL",
    students: 127,
    rating: 4.6,
    isNew: true,
    isPopular: false,
    level: "Avançat",
    shortDesc: "Metodologies criminològiques aplicades a la identificació i resolució de problemes de seguretat.",
  },
  {
    title: "Curs de criminologia. La prevenció de la delinqüència",
    img: "/images/seguretat-ciutadana.jpg",
    price: 199,
    originalPrice: 250,
    hours: "70h",
    modality: "Online",
    certificate: "Oficial ESPOL",
    students: 289,
    rating: 4.8,
    isNew: false,
    isPopular: true,
    level: "Intermedi",
    shortDesc: "Anàlisi dels factors de risc i models de prevenció del delicte des d'una perspectiva científica.",
  },
];

// ── Slug util ─────────────────────────────────────────────────────────────────
const toSlug = (cat: string) =>
  cat
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

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
const CriminologiaCategory = () => {
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
            <Link to="/" className="hover:text-accent transition-colors duration-150">Cursos Puntuables</Link>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-foreground">Criminologia</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/criminologia.jpg"
            alt="Criminologia"
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
              Criminologia
            </h1>
            <p className="font-body text-white/75 text-sm lg:text-base leading-relaxed mb-7 max-w-xl">
              Formació especialitzada en l'estudi científic del delicte, la conducta criminal i els sistemes de justícia. Tots els cursos compten amb certificació oficial reconeguda.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-5">
              {[
                { icon: <BookOpen size={13} />, label: `${courses.length} cursos disponibles` },
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

          {/* Section label */}
          <div className="flex items-center justify-between mb-8 scroll-reveal">
            <div className="flex items-center gap-3">
              <div className="w-1 h-7 bg-accent rounded-full" />
              <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">
                {courses.length} Cursos disponibles
              </h2>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <Link
                key={i}
                to={i === 0 ? "/curs/cursdetall" : "#"}
                className="scroll-reveal group bg-card rounded-2xl border border-border overflow-hidden flex flex-col transition-[border-color,box-shadow] duration-150 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(27,48,136,0.10)]"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Image */}
                <div className="relative h-[190px] overflow-hidden flex-shrink-0">
                  <img
                    src={course.img}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Top badges */}
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

                  {/* Level badge bottom-right */}
                  <div className="absolute bottom-3 right-3">
                    <span className={`font-body font-bold text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-lg ${levelConfig[course.level]}`}>
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="font-body text-accent text-[10px] uppercase tracking-[0.15em] font-semibold mb-2">
                    Criminologia
                  </span>

                  <h3 className="font-display font-bold text-[14px] text-foreground leading-snug mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {course.shortDesc}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 text-muted-foreground mb-4">
                    <span className="flex items-center gap-1 font-body text-[11px]">
                      <Clock size={11} className="text-accent" />
                      {course.hours}
                    </span>
                    <span className="flex items-center gap-1 font-body text-[11px]">
                      <Monitor size={11} className="text-accent" />
                      {course.modality}
                    </span>
                    <span className="flex items-center gap-1 font-body text-[11px]">
                      <Users size={11} className="text-accent" />
                      {course.students}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={11}
                          className={j < Math.floor(course.rating) ? "text-amber-400 fill-amber-400" : "text-border fill-border"}
                        />
                      ))}
                    </div>
                    <span className="font-body font-bold text-[11px] text-foreground">{course.rating}</span>
                  </div>

                  {/* Divider + price + CTA */}
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
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CriminologiaCategory;