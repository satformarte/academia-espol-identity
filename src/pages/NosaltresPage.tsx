import { useEffect, useRef } from "react";
import {
    ShieldCheck,
    BookOpen,
    Monitor,
    Users,
    MapPin,
    BadgeCheck,
    Award,
    Building2,
    CheckCircle2,
    GraduationCap,
    ChevronRight,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Data ─────────────────────────────────────────────────────────────────────

const stats = [
    { value: "+15", label: "Anys d'experiència" },
    { value: "+1.200", label: "Alumnes formats" },
    { value: "5", label: "Aules homologades" },
    { value: "100%", label: "Online i presencial" },
];

const principles = [
    {
        icon: <ShieldCheck size={20} />,
        title: "Formació operativa",
        desc: "Actualitzada i de màxima utilitat en el lloc de treball, orientada a l'operativitat real dels agents.",
    },
    {
        icon: <BadgeCheck size={20} />,
        title: "Qualitat i preus ajustats",
        desc: "Formació impartida per policies per a policies, amb un equip d'experts en cada matèria.",
    },
    {
        icon: <Monitor size={20} />,
        title: "Plataforma pròpia",
        desc: "E-learning certificada per UNE en accessibilitat, senzilla i intuïtiva per a tots els perfils.",
    },
    {
        icon: <Users size={20} />,
        title: "Atenció personalitzada",
        desc: "Equip de professionals disponible per a una atenció ràpida i personalitzada a cada alumne.",
    },
];

const accreditations = [
    "Centre acreditat per la DGT per impartir permisos B, C i D en totes les seves modalitats.",
    "Centre homologat pel SOC i el SEPE per a la impartició de Certificats de Professional.",
    "Centre examinador del ACTIC de la Generalitat de Catalunya.",
    "Centre homologat per Microsoft amb les especialitats MOS i MTA.",
    "Microsoft IT Academy per a cursos oficials i acreditats de Microsoft en totes les seves variants.",
    "Centre de Preparació d'Exàmens homologat per la Universitat de Cambridge (FCE, CAE, KET, PET, CPE).",
    "Centre acreditat amb la norma UNE54851 per a cursos de carretons elevadors fins a 10.000 kg.",
    "Centre acreditat per Foment per a totes les modalitats del CAP inicial i CAP renovació.",
    "Centre acreditat per la DGT per impartir cursos ADR renovació i inicial en totes les modalitats.",
];

// ── Scroll reveal hook ────────────────────────────────────────────────────────
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

// ── Component ─────────────────────────────────────────────────────────────────
const NosaltresPage = () => {
    useScrollReveal();

    return (
        <div className="min-h-screen bg-background">
            <Topbar />
            <Navbar />

            {/* ── Breadcrumbs ───────────────────────────────────────────────── */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <a href="/" className="hover:text-accent transition-colors duration-150">Inici</a>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">Nosaltres</span>
                    </nav>
                </div>
            </div>

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
                <div className="relative container mx-auto px-4 max-w-[1400px] py-16 lg:py-20">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
                            <Building2 size={10} />
                            Qui som
                        </span>
                        <h1 className="font-display font-black text-3xl lg:text-5xl text-white leading-tight mb-4">
                            Escola Superior<br />
                            <span className="text-accent">Policial</span>
                        </h1>
                        <p className="font-body text-white/75 text-base lg:text-lg leading-relaxed max-w-xl">
                            Una marca de Formar-te Espai de Futur S.L., especialitzada en la formació de les Forces i Cossos de Seguretat amb un equip de professors experts en cada matèria.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Stats ─────────────────────────────────────────────────────── */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
                        {stats.map((stat) => (
                            <div key={stat.label} className="py-8 px-6 text-center scroll-reveal">
                                <div className="font-display font-black text-3xl lg:text-4xl text-primary mb-1">{stat.value}</div>
                                <div className="font-body text-xs text-muted-foreground uppercase tracking-widest font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Qui som + Formació ────────────────────────────────────────── */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left — text */}
                        <div className="scroll-reveal">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-7 bg-accent rounded-full" />
                                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">Qui Som</h2>
                            </div>
                            <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                                <p>
                                    <strong className="text-foreground">Escola Superior Policial</strong> és una marca de l'empresa Formar-te Espai de Futur S.L., dedicada des de fa molt temps a la formació de diversos sectors, entre ells l'administració pública.
                                </p>
                                <p>
                                    En aquests anys ens hem professionalitzat en la formació de les Forces i Cossos de Seguretat, ajuntant un equip de professors especialitzats i experts en cada matèria, que ens ha permès arribar a realitzar preparacions d'un alt nivell i exigència.
                                </p>
                                <p>
                                    Ens venim consolidant com a centre referent de formació policial en el nostre territori, fet que ens ha permès realitzar cursos especialitzats d'alt nivell, cursos d'oposicions i també cursos a mesura per a entitats públiques de qualsevol abast territorial.
                                </p>
                                <p>
                                    Aquesta formació la complementem amb una <strong className="text-foreground">línia editorial</strong> pròpia, a través de la qual imprimim i distribuïm els nostres temaris, al mateix temps que comercialitzem tot tipus de llibres, manuals i materials de caràcter policial.
                                </p>
                            </div>
                        </div>

                        {/* Right — principles */}
                        <div className="scroll-reveal">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-7 bg-accent rounded-full" />
                                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">La Nostra Formació</h2>
                            </div>
                            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                                La nostra formació es basa en quatre principis bàsics i fonamentals:
                            </p>
                            <div className="space-y-4">
                                {principles.map((p, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-200">
                                            {p.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-display font-bold text-sm text-foreground mb-0.5">{p.title}</h3>
                                            <p className="font-body text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Instal·lacions ────────────────────────────────────────────── */}
            <section className="py-16 bg-muted border-t border-border">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="scroll-reveal">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-7 bg-accent rounded-full" />
                            <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">Instal·lacions</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Info card */}
                        <div className="scroll-reveal bg-card border border-border rounded-2xl overflow-hidden">
                            <div className="bg-primary px-6 py-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <Building2 size={22} className="text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-display font-black text-white text-base">Acadèmia ESPOL</h3>
                                    <p className="font-body text-white/60 text-xs mt-0.5">Centre propi a Barcelona</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin size={15} className="text-accent flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-body font-bold text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Adreça</p>
                                        <p className="font-body text-sm text-foreground">C/ Entença 40 baixos, Barcelona</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <GraduationCap size={15} className="text-accent flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-body font-bold text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Aules</p>
                                        <p className="font-body text-sm text-foreground">5 aules homologades i polivalents totalment equipades</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <BookOpen size={15} className="text-accent flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-body font-bold text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Espais</p>
                                        <p className="font-body text-sm text-foreground">Diversos espais auxiliars per a les formacions més adequades a les necessitats dels alumnes</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map placeholder */}
                        <div className="scroll-reveal rounded-2xl overflow-hidden border border-border h-64 lg:h-80">
                            <iframe
                                title="Ubicació Acadèmia ESPOL"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.3!2d2.1486!3d41.3785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f8b1b1b1b1%3A0x1!2sCarrer%20de%20l'Enten%C3%A7a%2C%2040%2C%2008015%20Barcelona!5e0!3m2!1sca!2ses!4v1"
                                className="w-full h-full border-0 grayscale"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Acreditacions ─────────────────────────────────────────────── */}
            <section className="py-16 bg-background border-t border-border">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="scroll-reveal flex items-center gap-3 mb-4">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">Acreditacions</h2>
                    </div>

                    <div className="scroll-reveal mb-10">
                        <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-2xl">
                            En la nostra aposta per la certificació com un alt valor afegit a la formació, disposem de les següents acreditacions:
                        </p>
                    </div>

                    {/* Logo acreditacions */}
                    <div className="scroll-reveal mb-10">
                        <img
                            src="https://www.academiaespol.com/wp-content/uploads/2016/09/acreditaciones.png"
                            alt="Acreditacions ESPOL"
                            className="max-w-full h-auto"
                        />
                    </div>

                    {/* Llista */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {accreditations.map((acc, i) => (
                            <div
                                key={i}
                                className="scroll-reveal flex items-start gap-3 bg-card border border-border rounded-xl p-4 group hover:border-accent/40 transition-colors duration-150"
                                style={{ transitionDelay: `${i * 40}ms` }}
                            >
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-150">
                                    <Award size={13} />
                                </div>
                                <p className="font-body text-xs text-muted-foreground leading-relaxed">{acc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default NosaltresPage;