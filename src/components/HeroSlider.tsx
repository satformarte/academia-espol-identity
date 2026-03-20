import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import espolLogo from "@/assets/espol-logo.png";

const slides = [
  {
    badge: "✦ Matrícula oberta 2025",
    title: "La teva formació en <strong>seguretat</strong> i forces de l'ordre",
    desc: "Cursos especialitzats per a professionals de la seguretat pública i privada, amb certificació oficial i metodologia contrastada.",
    btn1: "Veure tots els cursos →",
    btn2: "Demana informació",
    img: "/images/hero-graduation-1.jpg",
  },
  {
    badge: "📋 Oposicions 2025",
    title: "Prepara les <strong>oposicions</strong> amb garanties reals",
    desc: "Temaris actualitzats, simulacres d'examen i professors en actiu que coneixen el procés selectiu de primera mà.",
    btn1: "Veure oposicions →",
    btn2: "Parla amb un assessor",
    img: "/images/hero-graduation-2.jpg",
  },
  {
    badge: "🎓 Formació especialitzada",
    title: "Expertesa en <strong>dret penal</strong> i ciberdelinqüència",
    desc: "Aprofundeix en les àrees més demandades del sector amb formació impartida per professionals en actiu.",
    btn1: "Explorar cursos →",
    btn2: "Saber-ne més",
    img: "/images/hero-graduation-3.jpg",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-[600px] md:h-[640px] overflow-hidden">
      {/* Background image with ken burns */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.img}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${i === current ? "scale-110" : "scale-100"}`}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/70 to-foreground/30 z-[1]" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      {/* Content */}
      <div className="relative z-[3] container mx-auto px-4 max-w-[1400px] h-full flex items-center">
        <div className="max-w-2xl">
          <span className="inline-block bg-accent/20 backdrop-blur-md text-primary-foreground text-xs font-body font-semibold px-5 py-2 rounded-full mb-6 border border-accent/30">
            {slide.badge}
          </span>
          <h1
            className="font-display font-black text-primary-foreground text-[30px] md:text-[48px] leading-[1.1] tracking-[-1.5px] mb-5"
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />
          <p className="font-body text-primary-foreground/70 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
            {slide.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#cursos" className="btn-hover bg-accent text-accent-foreground font-body font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl inline-block transition-all">
              {slide.btn1}
            </a>
            <a href="#contacte" className="btn-hover border-2 border-primary-foreground/30 text-primary-foreground font-body font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-primary-foreground/10 hidden md:inline-block backdrop-blur-sm transition-all">
              {slide.btn2}
            </a>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-primary-foreground/10 backdrop-blur-md flex items-center justify-center text-primary-foreground hover:bg-accent transition-all z-10 border border-primary-foreground/10"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Següent"
        className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-primary-foreground/10 backdrop-blur-md flex items-center justify-center text-primary-foreground hover:bg-accent transition-all z-10 border border-primary-foreground/10"
      >
        <ChevronRight size={20} />
      </button>

      {/* Progress bar dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "bg-accent w-10" : "bg-primary-foreground/30 w-4 hover:bg-primary-foreground/50"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
