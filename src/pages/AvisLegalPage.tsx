import { Link } from "react-router-dom";
import { ChevronRight, Building2, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const AvisLegalPage = () => {
    const { t } = useLanguage();
    const al = t.avisLegal;

    const infoFields = [
        { label: al.titularNIF, value: "B66381252" },
        { label: al.titularRegistre, value: "034148999" },
        { label: al.titularDomicili, value: "Carrer Entença 40, baixos, 08015 Barcelona" },
        { label: al.titularWeb, value: "www.academiaespol.com" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Topbar />
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <Link to="/" className="hover:text-accent transition-colors duration-150">{al.breadcrumbHome}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">{al.breadcrumb}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <div className="bg-primary">
                <div className="container mx-auto px-4 max-w-[1400px] py-12 lg:py-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                            <ShieldCheck size={22} className="text-white" />
                        </div>
                        <div>
                            <p className="font-body text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">{al.heroLabel}</p>
                            <h1 className="font-display font-black text-3xl lg:text-4xl text-white uppercase tracking-tight">{al.heroTitle}</h1>
                        </div>
                    </div>
                    <p className="font-body text-white/70 text-sm max-w-xl mt-4">{al.heroDesc}</p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-[900px] py-14 space-y-10">

                {/* Titular */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{al.titularTitle}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="bg-primary px-6 py-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                <Building2 size={22} className="text-white" />
                            </div>
                            <div>
                                <p className="font-body text-white/70 text-xs uppercase tracking-widest font-semibold mb-0.5">{al.titularCardLabel}</p>
                                <h3 className="font-display font-black text-white text-base leading-tight">Acadèmia ESPOL</h3>
                            </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {infoFields.map(({ label, value }) => (
                                <div key={label} className="bg-muted/50 rounded-xl p-4">
                                    <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
                                    <p className="font-body text-sm text-foreground font-semibold">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contacte */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{al.contacteTitle}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <a href="tel:+34936061032" className="bg-card border border-border rounded-xl p-5 flex items-start gap-3 hover:border-accent/40 transition-colors group">
                            <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Phone size={16} />
                            </div>
                            <div>
                                <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">{al.contacteTelLabel}</p>
                                <p className="font-body text-sm text-foreground font-semibold group-hover:text-accent transition-colors">936 061 032</p>
                            </div>
                        </a>
                        <a href="mailto:academiaespol@academiaespol.es" className="bg-card border border-border rounded-xl p-5 flex items-start gap-3 hover:border-accent/40 transition-colors group">
                            <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Mail size={16} />
                            </div>
                            <div className="min-w-0">
                                <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">{al.contacteEmailLabel}</p>
                                <p className="font-body text-sm text-foreground font-semibold group-hover:text-accent transition-colors break-all">academiaespol@academiaespol.es</p>
                            </div>
                        </a>
                        <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Clock size={16} />
                            </div>
                            <div>
                                <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-2">{al.contacteHorariLabel}</p>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="font-body text-xs text-muted-foreground">{al.horariDlDj}</span>
                                        <span className="font-body text-xs font-semibold text-foreground">09–14h · 16–19h</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="font-body text-xs text-muted-foreground">{al.horariDivendres}</span>
                                        <span className="font-body text-xs font-semibold text-foreground">09–14h</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="font-body text-xs text-muted-foreground">{al.horariAgost}</span>
                                        <span className="font-body text-xs font-semibold text-foreground">{al.horariTancat}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed bg-muted/40 border border-border rounded-xl px-5 py-4">
                        {al.contacteParaPre}{" "}
                        <Link to="/contacte" className="text-accent hover:underline">{al.contacteParaLink}</Link>{" "}
                        {al.contacteParaPost}
                    </p>
                </section>

                {/* Condicions d'ús */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{al.condicionsTit}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-xl px-6 py-5 space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                        <p>{al.condicions1}</p>
                        <p>{al.condicions2}</p>
                        <p>{al.condicions3}</p>
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    );
};

export default AvisLegalPage;
