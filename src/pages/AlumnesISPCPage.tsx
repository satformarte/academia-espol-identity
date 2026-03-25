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
import WhatsAppButton from "@/components/WhatsAppButton";

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

      {/* Cursos disponibles - Grid 2x2 */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="text-center mb-12 scroll-reveal">
            <span className="inline-block bg-accent/10 text-accent font-body font-semibold text-xs uppercase tracking-[0.15em] px-5 py-2 rounded-full mb-5">
              📖 Cursos disponibles
            </span>
            <h2 className="font-display font-black text-2xl md:text-[36px] text-foreground mb-3 leading-tight">
              Tria el teu curs
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto text-[15px] leading-relaxed">
              Formació pràctica adaptada a les necessitats reals del servei policial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto">
            {cursos.map((c, i) => (
              <a
                key={i}
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="c-card scroll-reveal group bg-card rounded-2xl border border-border overflow-hidden cursor-pointer"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="c-img relative h-[200px] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.nom}
                    className="w-full h-full object-cover transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="font-body text-accent text-[11px] uppercase tracking-[0.15em] font-semibold">
                    {c.durada}
                  </span>
                  <h3 className="font-display font-bold text-[17px] text-foreground mt-1.5 mb-1">
                    {c.nom}
                  </h3>
                  {c.subtitol && (
                    <p className="font-body text-muted-foreground text-xs mb-3 leading-relaxed">{c.subtitol}</p>
                  )}
                  <div className="border-t border-border pt-4 mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-black text-primary text-lg">{c.preu}</span>
                      {c.afiliats !== "–" && (
                        <span className="font-body text-accent text-xs font-semibold bg-accent/10 px-2 py-0.5 rounded-full">
                          Afiliats: {c.afiliats}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-body font-semibold text-accent text-xs group-hover:gap-2.5 transition-all">
                      Inscripció <ExternalLink size={13} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pack Complet - Protagonista */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="max-w-4xl mx-auto scroll-reveal">
            <div className="relative bg-gradient-to-br from-primary via-secondary to-primary rounded-2xl overflow-hidden border-2 border-accent p-8 md:p-12">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-full">
                  <Star size={12} className="fill-current" />
                  Millor oferta
                </span>
              </div>
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground font-body font-semibold text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-4">
                  <Package size={13} />
                  Tots els cursos inclosos
                </span>
                <h2 className="font-display font-black text-3xl md:text-4xl text-primary-foreground mb-2">
                  Pack Complet
                </h2>
                <p className="font-body text-primary-foreground/70 text-sm max-w-md mx-auto">
                  Inclou Bulevard + Procediments + Tràfic i Transport + Armament
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-xl mx-auto">
                {packComplet.map((p, i) => (
                  <div key={i} className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-xl p-6 text-center">
                    <span className="font-body text-[10px] uppercase tracking-[0.12em] text-primary-foreground/60 font-semibold">{p.label}</span>
                    <p className="font-display font-black text-3xl text-primary-foreground my-2">{p.preu}</p>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground font-body font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors w-full justify-center mt-2"
                    >
                      Inscripció <ExternalLink size={11} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pack 2 Cursos */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 scroll-reveal">
              <span className="inline-block bg-accent/10 text-accent font-body font-semibold text-xs uppercase tracking-[0.15em] px-5 py-2 rounded-full mb-5">
                <Package size={13} className="inline mr-1.5 -mt-0.5" />
                Combina i estalvia
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl text-foreground mb-3">
                Packs de 2 Cursos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {packs2.map((p, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-6 scroll-reveal hover:border-accent/40 hover:-translate-y-1 transition-all duration-300" style={{ transitionDelay: `${i * 40}ms` }}>
                  <p className="font-body font-semibold text-sm text-foreground mb-4 min-h-[40px]">{p.descripcio}</p>
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <span className="font-display font-black text-xl text-primary">{p.preu}</span>
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
      <WhatsAppButton />
    </div>
  );
};

export default AlumnesISPCPage;
