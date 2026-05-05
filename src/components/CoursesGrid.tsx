import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const toSlug = (cat: string) =>
  cat
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

// Catalan names kept for slug generation — URLs never change regardless of language
const CATEGORY_SLUG_BASES = [
  "Dret Penal",
  "Criminologia",
  "Trànsit i Circulació",
  "Seguretat Ciutadana",
  "Procediments Policials",
  "Ciberseguretat",
  "Altres Temàtiques",
  "ACTIC i Anglès",
  "Criminalística",
];

const CoursesGrid = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll(".scroll-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="cursos" className="py-24 bg-muted" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <span className="inline-block bg-accent/10 text-accent font-body font-semibold text-xs uppercase tracking-[0.15em] px-5 py-2 rounded-full mb-5">
            {t.coursesGrid.badge}
          </span>
          <h2 className="font-display font-black text-3xl md:text-[42px] text-foreground mb-4 leading-tight">
            {t.coursesGrid.title}
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-[15px] leading-relaxed">
            {t.coursesGrid.desc}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {t.coursesGrid.courses.map((course, i) => (
            <Link
              key={i}
              to={`/${toSlug(CATEGORY_SLUG_BASES[i])}`}
              className="c-card scroll-reveal group bg-card rounded-2xl border border-border overflow-hidden cursor-pointer"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Image */}
              <div className="c-img relative h-[210px] overflow-hidden">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Body */}
              <div className="p-6">
                <span className="font-body text-accent text-[11px] uppercase tracking-[0.15em] font-semibold">
                  {t.coursesGrid.tag}
                </span>
                <h3 className="font-display font-bold text-[17px] text-foreground mt-1.5 mb-4">
                  {course.title}
                </h3>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <span className="font-display font-black text-primary text-lg">{t.coursesGrid.cta}</span>
                  <span className="inline-flex items-center gap-1.5 font-body font-semibold text-accent text-xs group-hover:gap-2.5 transition-all">
                    {t.coursesGrid.moreInfo} <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesGrid;
