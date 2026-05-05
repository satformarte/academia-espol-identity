import { Link } from "react-router-dom";
import { ChevronRight, Lock, Building2, Phone, Mail, Target, Clock, Share2, Scale, CheckCircle2, UserCheck } from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacitatPage = () => {
    const { t } = useLanguage();
    const pv = t.privacitat;

    return (
        <div className="min-h-screen bg-background">
            <Topbar />
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <Link to="/" className="hover:text-accent transition-colors duration-150">{pv.breadcrumbHome}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">{pv.breadcrumb}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <div className="bg-primary">
                <div className="container mx-auto px-4 max-w-[1400px] py-12 lg:py-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                            <Lock size={22} className="text-white" />
                        </div>
                        <div>
                            <p className="font-body text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">{pv.heroLabel}</p>
                            <h1 className="font-display font-black text-3xl lg:text-4xl text-white uppercase tracking-tight">{pv.heroTitle}</h1>
                        </div>
                    </div>
                    <p className="font-body text-white/70 text-sm max-w-xl mt-4">{pv.heroDesc}</p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-[900px] py-14 space-y-10">

                {/* Responsable */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{pv.responsableTitle}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="bg-primary px-6 py-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                <Building2 size={22} className="text-white" />
                            </div>
                            <div>
                                <p className="font-body text-white/70 text-xs uppercase tracking-widest font-semibold mb-0.5">{pv.responsableCardLabel}</p>
                                <h3 className="font-display font-black text-white text-base leading-tight">FORMAR-TE ESPAI DE FUTUR, S.L.</h3>
                                <p className="font-body text-white/60 text-xs mt-0.5">NIF: B66381252</p>
                            </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-muted/50 rounded-xl p-4">
                                <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">{pv.responsableDomiciliLabel}</p>
                                <p className="font-body text-sm text-foreground font-semibold">C/ Entença 40, baixos · 08015 Barcelona</p>
                            </div>
                            <a href="tel:+34936061032" className="bg-muted/50 rounded-xl p-4 flex items-start gap-2 hover:bg-accent/5 transition-colors group">
                                <Phone size={14} className="text-accent mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">{pv.responsableTelLabel}</p>
                                    <p className="font-body text-sm text-foreground font-semibold group-hover:text-accent transition-colors">936 061 032</p>
                                </div>
                            </a>
                            <a href="mailto:cursos@academiaespol.es" className="bg-muted/50 rounded-xl p-4 flex items-start gap-2 hover:bg-accent/5 transition-colors group">
                                <Mail size={14} className="text-accent mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">{pv.responsableEmailLabel}</p>
                                    <p className="font-body text-sm text-foreground font-semibold group-hover:text-accent transition-colors break-all">cursos@academiaespol.es</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Finalitat */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{pv.finalitatTitle}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                            <Target size={16} className="text-accent flex-shrink-0" />
                            <p className="font-body text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: pv.finalitatIntro }} />
                        </div>
                        <ul className="divide-y divide-border">
                            {pv.purposes.map((p) => (
                                <li key={p} className="flex items-start gap-3 px-6 py-3">
                                    <CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" />
                                    <span className="font-body text-sm text-muted-foreground">{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Quines dades */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{pv.quinedadesTitle}</h2>
                    </div>
                    <div className="space-y-3">
                        {pv.dataTypes.map(({ title, desc }) => (
                            <div key={title} className="bg-card border border-border rounded-xl px-6 py-4">
                                <p className="font-display font-bold text-sm text-foreground mb-1">{title}</p>
                                <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Conservació */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{pv.conservacioTitle}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-xl px-6 py-5 flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Clock size={16} />
                        </div>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{pv.conservacioDesc}</p>
                    </div>
                </section>

                {/* Cessió */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{pv.cessioTitle}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-xl px-6 py-5 flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Share2 size={16} />
                        </div>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: pv.cessioDesc }} />
                    </div>
                </section>

                {/* Legitimació */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{pv.legitimacioTitle}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-xl px-6 py-5 flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Scale size={16} />
                        </div>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: pv.legitimacioDesc }} />
                    </div>
                </section>

                {/* Drets */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{pv.dretsTitle}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-xl overflow-hidden mb-4">
                        <ul className="divide-y divide-border">
                            {pv.rights.map((r) => (
                                <li key={r} className="flex items-start gap-3 px-6 py-3">
                                    <UserCheck size={14} className="text-accent flex-shrink-0 mt-0.5" />
                                    <span className="font-body text-sm text-muted-foreground">{r}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-muted/40 border border-border rounded-xl px-5 py-4 mb-4 font-body text-sm text-muted-foreground">
                        {pv.dretsNote}{" "}
                        <a href="https://www.academiaespol.es/aviso-legal-y-politica-de-privacidad/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                            {pv.dretsNoteLink}
                        </a>.
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="mailto:lopd@academiaespol.es" className="bg-card border border-border rounded-xl px-5 py-4 flex items-start gap-3 hover:border-accent/40 transition-colors group">
                            <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                                <Mail size={16} />
                            </div>
                            <div>
                                <p className="font-body font-bold text-xs text-foreground mb-0.5">{pv.dretsExercirLabel}</p>
                                <p className="font-body text-xs text-muted-foreground group-hover:text-accent transition-colors">lopd@academiaespol.es</p>
                            </div>
                        </a>
                        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-xl px-5 py-4 flex items-start gap-3 hover:border-accent/40 transition-colors group">
                            <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                                <Scale size={16} />
                            </div>
                            <div>
                                <p className="font-body font-bold text-xs text-foreground mb-0.5">{pv.dretsAEPDLabel}</p>
                                <p className="font-body text-xs text-muted-foreground group-hover:text-accent transition-colors">www.aepd.es</p>
                            </div>
                        </a>
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    );
};

export default PrivacitatPage;
