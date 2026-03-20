import { useEffect, useRef } from "react";
import { GraduationCap, CheckCircle, Users, FileText } from "lucide-react";

const features = [
  {
    icon: <GraduationCap size={28} />,
    title: "+12 anys d'experiència",
    desc: "Formant professionals des de 2012 amb metodologia contrastada i resultats demostrables.",
  },
  {
    icon: <CheckCircle size={28} />,
    title: "98% de satisfacció",
    desc: "La major valoració entre els nostres alumnes matriculats en totes les convocatòries.",
  },
  {
    icon: <Users size={28} />,
    title: "Professors especialistes",
    desc: "Professionals en actiu amb experiència real al sector de la seguretat i les forces de l'ordre.",
  },
  {
    icon: <FileText size={28} />,
    title: "Certificació oficial",
    desc: "Cursos acreditats i puntuables per a l'expedient ISPC i processos selectius.",
  },
];

const WhyUs = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".scroll-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    items.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="text-center mb-16 scroll-reveal">
          <span className="inline-block bg-primary/10 text-primary font-body font-semibold text-xs uppercase tracking-[0.15em] px-5 py-2 rounded-full mb-5">
            🏆 Per què ESPOL
          </span>
          <h2 className="font-display font-black text-3xl md:text-[42px] text-foreground mb-4 leading-tight">
            Per què escollir-nos
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="scroll-reveal group text-center p-8 rounded-2xl border border-transparent hover:border-border hover:bg-muted transition-all duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-[15px] text-foreground mb-2">{f.title}</h3>
              <p className="font-body text-[13.5px] text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
