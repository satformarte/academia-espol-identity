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
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";

const PRINCIPLE_ICONS = [
    <ShieldCheck size={20} />,
    <BadgeCheck size={20} />,
    <Monitor size={20} />,
    <Users size={20} />,
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

const NosaltresPage = () => {
    const { t } = useLanguage();
    const n = t.nosaltres;
    useScrollReveal();

    return (
        <div className="min-h-screen bg-background">
            <Topbar />
            <Navbar />

            {/* Breadcrumbs */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <a href="/" className="hover:text-accent transition-colors duration-150">{n.breadcrumbHome}</a>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">{n.breadcrumb}</span>
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
                            <Building2 size={10} />
                            {n.heroBadge}
                        </span>
                        <h1 className="font-display font-black text-3xl lg:text-5xl text-white leading-tight mb-4">
                            {n.heroTitle}<br />
                            <span className="text-accent">{n.heroTitleAccent}</span>
                        </h1>
                        <p className="font-body text-white/75 text-base lg:text-lg leading-relaxed max-w-xl">
                            {n.heroDesc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
                        {n.statsItems.map((stat) => (
                            <div key={stat.value} className="py-8 px-6 text-center scroll-reveal">
                                <div className="font-display font-black text-3xl lg:text-4xl text-primary mb-1">{stat.value}</div>
                                <div className="font-body text-xs text-muted-foreground uppercase tracking-widest font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Qui som + Formació */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left — text */}
                        <div className="scroll-reveal">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-7 bg-accent rounded-full" />
                                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{n.quiSomTitle}</h2>
                            </div>
                            <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                                <p>
                                    <strong className="text-foreground">{n.quiSomStrongName}</strong>{" "}{n.quiSomP1}
                                </p>
                                <p>{n.quiSomP2}</p>
                                <p>{n.quiSomP3}</p>
                                <p>
                                    {n.quiSomP4Prefix}{" "}
                                    <strong className="text-foreground">{n.quiSomStrongEditorial}</strong>{" "}
                                    {n.quiSomP4Suffix}
                                </p>
                            </div>
                        </div>

                        {/* Right — principles */}
                        <div className="scroll-reveal">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-7 bg-accent rounded-full" />
                                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{n.nostraFormacioTitle}</h2>
                            </div>
                            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                                {n.nostraFormacioIntro}
                            </p>
                            <div className="space-y-4">
                                {n.principles.map((p, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-200">
                                            {PRINCIPLE_ICONS[i]}
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

            {/* Instal·lacions */}
            <section className="py-16 bg-muted border-t border-border">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="scroll-reveal">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-7 bg-accent rounded-full" />
                            <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{n.installacionsTitle}</h2>
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
                                    <h3 className="font-display font-black text-white text-base">{n.installacionsCardTitle}</h3>
                                    <p className="font-body text-white/60 text-xs mt-0.5">{n.installacionsCardSubtitle}</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin size={15} className="text-accent flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-body font-bold text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{n.adrecaLabel}</p>
                                        <p className="font-body text-sm text-foreground">{n.adrecaValue}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <GraduationCap size={15} className="text-accent flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-body font-bold text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{n.aulesLabel}</p>
                                        <p className="font-body text-sm text-foreground">{n.aulesValue}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <BookOpen size={15} className="text-accent flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-body font-bold text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{n.espaisLabel}</p>
                                        <p className="font-body text-sm text-foreground">{n.espaisValue}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="scroll-reveal rounded-2xl overflow-hidden border border-border h-64 lg:h-80">
                            <iframe
                                title={n.mapTitle}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.3!2d2.1486!3d41.3785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f8b1b1b1b1%3A0x1!2sCarrer%20de%20l'Enten%C3%A7a%2C%2040%2C%2008015%20Barcelona!5e0!3m2!1sca!2ses!4v1"
                                className="w-full h-full border-0 grayscale"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Acreditacions */}
            <section className="py-16 bg-background border-t border-border">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="scroll-reveal flex items-center gap-3 mb-4">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">{n.acreditacionsTitle}</h2>
                    </div>

                    <div className="scroll-reveal mb-10">
                        <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-2xl">
                            {n.acreditacionsIntro}
                        </p>
                    </div>

                    {/* Logo acreditacions */}
                    <div className="scroll-reveal mb-10">
                        <img
                            src="/images/acreditaciones.png"
                            alt={n.acreditacionsAlt}
                            className="max-w-full h-auto"
                        />
                    </div>

                    {/* Llista */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {n.accreditations.map((acc, i) => (
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
            <WhatsAppButton />
        </div>
    );
};

export default NosaltresPage;
