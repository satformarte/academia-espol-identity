import { useEffect } from "react";
import { ChevronRight, Package, Users, UserCheck, User } from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";

const PACKS = [
  {
    id: "pack-5",
    label: "Pack",
    number: "5",
    suffix: "cursos",
    highlight: false,
    preus: [
      { tipus: "Preu General",    preu: 50  },
      { tipus: "Nou Afiliat",     preu: 25  },
      { tipus: "Afiliat",         preu: 20  },
    ],
  },
  {
    id: "pack-8",
    label: "Pack",
    number: "8",
    suffix: "cursos",
    highlight: true,
    preus: [
      { tipus: "Preu General",    preu: 320 },
      { tipus: "Nou Afiliat",     preu: 180 },
      { tipus: "Afiliat",         preu: 64  },
    ],
  },
  {
    id: "pack-25",
    label: "Pack",
    number: "25",
    suffix: "cursos",
    highlight: false,
    preus: [
      { tipus: "Preu General",    preu: 950 },
      { tipus: "Nou Afiliat",     preu: 495 },
      { tipus: "Afiliat",         preu: 195 },
    ],
  },
];

const TIER_ICONS = [
  <User size={14} />,
  <Users size={14} />,
  <UserCheck size={14} />,
];

const TIER_COLORS = [
  "bg-slate-100 text-slate-600",
  "bg-blue-100 text-blue-700",
  "bg-accent/15 text-accent",
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const PacksPage = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <Navbar />

      {/* Breadcrumbs */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-[1400px] py-3">
          <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
            <a href="/" className="hover:text-accent transition-colors duration-150">Inici</a>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-foreground">Packs de cursos</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative container mx-auto px-4 max-w-[1400px] py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
              <Package size={10} />
              Formació a mida
            </span>
            <h1 className="font-display font-black text-3xl lg:text-5xl text-white leading-tight mb-4">
              Packs de<br />
              <span className="text-accent">cursos puntuables</span>
            </h1>
            <p className="font-body text-white/75 text-base lg:text-lg leading-relaxed max-w-xl">
              Accedeix a múltiples cursos amb un sol pack i estalvia. Disponible per a particulars, nous afiliats i afiliats amb preus adaptats a cada perfil.
            </p>
          </div>
        </div>
      </div>

      {/* Pack cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-[1400px]">

          <div className="scroll-reveal flex items-center gap-3 mb-10">
            <div className="w-1 h-7 bg-accent rounded-full" />
            <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">Tria el teu pack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKS.map((pack, pi) => (
              <div
                key={pack.id}
                className={`scroll-reveal relative rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  pack.highlight
                    ? "border-accent shadow-lg shadow-accent/10"
                    : "border-border bg-card"
                }`}
                style={{ transitionDelay: `${pi * 80}ms` }}
              >
                {pack.highlight && (
                  <div className="bg-accent text-white text-[10px] font-body font-bold uppercase tracking-[0.12em] text-center py-1.5">
                    Més popular
                  </div>
                )}

                {/* Header */}
                <div className={`px-8 py-8 ${pack.highlight ? "bg-primary" : "bg-muted/50"}`}>
                  <div className="flex items-end gap-2 mb-1">
                    <span className={`font-display font-black text-6xl leading-none ${pack.highlight ? "text-white" : "text-primary"}`}>
                      {pack.number}
                    </span>
                    <div className="pb-2">
                      <p className={`font-body font-bold text-xs uppercase tracking-widest ${pack.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                        {pack.label}
                      </p>
                      <p className={`font-body font-bold text-xs uppercase tracking-widest ${pack.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                        {pack.suffix}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prices */}
                <div className="px-8 py-6 flex-1 flex flex-col gap-4 bg-card">
                  {pack.preus.map((p, i) => (
                    <div key={p.tipus} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${TIER_COLORS[i]}`}>
                          {TIER_ICONS[i]}
                        </span>
                        <span className="font-body text-sm text-muted-foreground">{p.tipus}</span>
                      </div>
                      <span className={`font-display font-black text-lg ${pack.highlight ? "text-accent" : "text-foreground"}`}>
                        {p.preu}€
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-8 pb-8 bg-card">
                  <Link
                    to="/contacte"
                    className={`block w-full text-center font-body font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-xl transition-all duration-200 ${
                      pack.highlight
                        ? "bg-accent text-white hover:bg-accent/90 shadow-md shadow-accent/20"
                        : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    Sol·licitar informació
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info section */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="scroll-reveal max-w-3xl mx-auto text-center">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-5">
              <Package size={22} />
            </div>
            <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight mb-4">
              Com funcionen els packs?
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              Els packs de cursos et permeten accedir a formació policial puntuable amb un descompte significatiu respecte a la compra individual. Tria els cursos que més t'interessen del nostre catàleg i aprofita el preu de pack.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {[
                { num: "01", title: "Tria el teu pack", desc: "Selecciona el nombre de cursos que vols realitzar." },
                { num: "02", title: "Contacta amb nosaltres", desc: "T'indiquem quins cursos estan disponibles i el procés de matrícula." },
                { num: "03", title: "Comença la formació", desc: "Accedeix als cursos al teu ritme des de qualsevol dispositiu." },
              ].map((step) => (
                <div key={step.num} className="bg-card border border-border rounded-xl p-5">
                  <span className="font-display font-black text-3xl text-accent/30 leading-none">{step.num}</span>
                  <h3 className="font-display font-bold text-sm text-foreground mt-2 mb-1">{step.title}</h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PacksPage;
