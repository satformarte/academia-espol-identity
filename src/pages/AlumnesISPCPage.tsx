import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  Clock,
  Users,
  BadgePercent,
  Package,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Star,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WHATSAPP_LINK = "https://wa.me/34694234416";

const cursos = [
  {
    nom: "Bulevard",
    durada: "6 sessions (18 hores)",
    preu: "180 €",
    afiliats: "150 €",
    img: "/images/ispc-bulevard.jpg",
  },
  {
    nom: "Procediments d'intervenció",
    subtitol: "Identificació, Esposar, Maneig de Persones Agressives/Conflictives",
    durada: "3 sessions (4,5 hores)",
    preu: "75 €",
    afiliats: "–",
    img: "/images/ispc-procediments.jpg",
  },
  {
    nom: "Tràfic i Transport",
    durada: "3 sessions (4,5 hores)",
    preu: "75 €",
    afiliats: "–",
    img: "/images/ispc-transit.jpg",
  },
  {
    nom: "Armament",
    durada: "2 sessions (4 hores)",
    preu: "50 €",
    afiliats: "–",
    img: "/images/ispc-armament.jpg",
  },
];

const packs2 = [
  { descripcio: "Bulevard + Procediments policials d'intervenció", preu: "210 €" },
  { descripcio: "Bulevard + Tràfic i Transport", preu: "210 €" },
  { descripcio: "Bulevard + Armament", preu: "210 €" },
  { descripcio: "Procediments + Tràfic i Transport", preu: "125 €" },
  { descripcio: "Procediments + Armament", preu: "110 €" },
  { descripcio: "Tràfic i Transport + Armament", preu: "110 €" },
];

const packComplet = [
  { label: "Afiliats/des", preu: "275 €" },
  { label: "Preu general", preu: "350 €" },
];

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

const AlumnesISPCPage = () => {
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
            <Link to="/" className="hover:text-accent transition-colors duration-150">Inici</Link>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-foreground">Alumnes ISPC</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary" />
        <div className="relative container mx-auto px-4 max-w-[1400px] py-14 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
              <GraduationCap size={11} />
              Inscripcions obertes!
            </span>
            <h1 className="font-display font-black text-3xl lg:text-5xl text-primary-foreground leading-tight mb-4">
              Cursos Alumnes ISPC
            </h1>
            <p className="font-body text-primary-foreground/80 text-sm lg:text-base leading-relaxed max-w-2xl mb-8">
              Aprofita els nostres cursos especialitzats per a completar la teva formació amb coneixements pràctics i adaptats a les necessitats reals del servei policial. Apunta't ara!
            </p>

            {/* Info pills */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-xl px-4 py-2.5">
                <CalendarDays size={15} className="text-accent" />
                <div>
                  <span className="block font-body text-[10px] uppercase tracking-wider text-primary-foreground/60">Data d'inici</span>
                  <span className="font-display font-bold text-sm text-primary-foreground">16 de març de 2026</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-xl px-4 py-2.5">
                <MapPin size={15} className="text-accent" />
                <div>
                  <span className="block font-body text-[10px] uppercase tracking-wider text-primary-foreground/60">Lloc</span>
                  <span className="font-display font-bold text-sm text-primary-foreground">Instal·lacions GAMS (Martorelles)</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-xl px-4 py-2.5">
                <Clock size={15} className="text-accent" />
                <div>
                  <span className="block font-body text-[10px] uppercase tracking-wider text-primary-foreground/60">Modalitat</span>
                  <span className="font-display font-bold text-sm text-primary-foreground">Presencial – 2 torns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horaris */}
      <section className="py-10 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 bg-muted rounded-2xl p-5 scroll-reveal">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Clock size={22} className="text-accent" />
              </div>
              <div>
                <span className="font-body text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">Grup de Matí</span>
                <p className="font-display font-black text-lg text-foreground">10:00 h – 13:00 h</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-muted rounded-2xl p-5 scroll-reveal" style={{ transitionDelay: "60ms" }}>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Clock size={22} className="text-accent" />
              </div>
              <div>
                <span className="font-body text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">Grup de Tarda</span>
                <p className="font-display font-black text-lg text-foreground">16:00 h – 19:00 h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Taula de cursos */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="flex items-center gap-3 mb-8 scroll-reveal">
            <div className="w-1 h-7 bg-accent rounded-full" />
            <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">
              Cursos disponibles
            </h2>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden scroll-reveal">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="font-display font-bold text-[12px] uppercase tracking-wider text-left px-6 py-4">Curs</th>
                    <th className="font-display font-bold text-[12px] uppercase tracking-wider text-left px-6 py-4">Durada</th>
                    <th className="font-display font-bold text-[12px] uppercase tracking-wider text-center px-6 py-4">Preu</th>
                    <th className="font-display font-bold text-[12px] uppercase tracking-wider text-center px-6 py-4">Afiliats</th>
                    <th className="font-display font-bold text-[12px] uppercase tracking-wider text-center px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cursos.map((c, i) => (
                    <tr key={i} className="border-t border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-body font-semibold text-sm text-foreground max-w-[280px]">{c.nom}</td>
                      <td className="px-6 py-4 font-body text-sm text-muted-foreground whitespace-nowrap">{c.durada}</td>
                      <td className="px-6 py-4 font-display font-black text-base text-foreground text-center">{c.preu}</td>
                      <td className="px-6 py-4 font-display font-black text-base text-accent text-center">{c.afiliats}</td>
                      <td className="px-6 py-4 text-center">
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground font-body font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-lg transition-colors"
                        >
                          Inscripció <ExternalLink size={11} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Preus afiliats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 scroll-reveal">
              <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent font-body font-semibold text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-4">
                <BadgePercent size={13} />
                Preus especials per afiliats/des
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl text-foreground mb-3">
                Ets afiliat/da a CCOO?
              </h2>
              <p className="font-body text-muted-foreground text-sm max-w-lg mx-auto">
                Gaudeix dels següents avantatges exclusius:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 scroll-reveal">
              <div className="flex items-start gap-3 bg-muted rounded-2xl p-5">
                <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-display font-bold text-sm text-foreground">1 sessió de Bulevard GRATIS</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">Per a tots els afiliats/des de CCOO.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-muted rounded-2xl p-5">
                <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-display font-bold text-sm text-foreground">15% de descompte en packs</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">Descompte acumulable en packs de cursos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packs */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="flex items-center gap-3 mb-8 scroll-reveal">
            <div className="w-1 h-7 bg-accent rounded-full" />
            <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">
              Packs Especials
            </h2>
          </div>
          <p className="font-body text-muted-foreground text-sm mb-8 scroll-reveal">
            Aprofita els nostres packs i estalvia més!
          </p>

          {/* Pack 2 Cursos */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden mb-8 scroll-reveal">
            <div className="bg-secondary px-6 py-3">
              <h3 className="font-display font-bold text-sm text-secondary-foreground uppercase tracking-wider flex items-center gap-2">
                <Package size={15} />
                Pack 2 Cursos
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="font-display font-bold text-[11px] uppercase tracking-wider text-left px-6 py-3 text-muted-foreground">Descripció</th>
                    <th className="font-display font-bold text-[11px] uppercase tracking-wider text-center px-6 py-3 text-muted-foreground">Preu</th>
                    <th className="font-display font-bold text-[11px] uppercase tracking-wider text-center px-6 py-3 text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {packs2.map((p, i) => (
                    <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-body font-semibold text-sm text-foreground">{p.descripcio}</td>
                      <td className="px-6 py-4 font-display font-black text-base text-foreground text-center">{p.preu}</td>
                      <td className="px-6 py-4 text-center">
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground font-body font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-lg transition-colors"
                        >
                          Inscripció <ExternalLink size={11} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pack Complet */}
          <div className="bg-card rounded-2xl border-2 border-accent overflow-hidden scroll-reveal">
            <div className="bg-accent px-6 py-3 flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-accent-foreground uppercase tracking-wider flex items-center gap-2">
                <Star size={15} className="fill-current" />
                Pack Complet
              </h3>
              <span className="font-body text-[10px] text-accent-foreground/80 uppercase tracking-wider font-bold">Millor oferta</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packComplet.map((p, i) => (
                  <div key={i} className="flex items-center justify-between bg-muted rounded-xl p-4">
                    <span className="font-body font-semibold text-sm text-foreground">{p.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-display font-black text-xl text-foreground">{p.preu}</span>
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground font-body font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-lg transition-colors"
                      >
                        Inscripció <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Per què triar-nos */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <h2 className="font-display font-black text-2xl md:text-3xl text-foreground mb-8">
              Per què triar-nos?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
              <div className="flex items-start gap-3 bg-muted rounded-2xl p-5">
                <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-foreground">Formació especialitzada per a professionals del sector.</p>
              </div>
              <div className="flex items-start gap-3 bg-muted rounded-2xl p-5">
                <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-foreground">En col·laboració amb GAMS, especialistes en equipament policial i militar d'èlit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-14 bg-primary">
        <div className="container mx-auto px-4 max-w-[1400px] text-center">
          <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground mb-3 scroll-reveal">
            No perdis aquesta oportunitat!
          </h2>
          <p className="font-body text-primary-foreground/75 text-sm mb-7 scroll-reveal">
            Reserva la teva plaça ara i comença la teva formació especialitzada.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-display font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl transition-colors scroll-reveal"
          >
            Reserva la teva plaça
            <ExternalLink size={15} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AlumnesISPCPage;
