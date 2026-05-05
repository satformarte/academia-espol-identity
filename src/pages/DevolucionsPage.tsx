import { Link } from "react-router-dom";
import {
    ChevronRight, RefreshCw, CreditCard, UserCheck, Building2,
    AlertTriangle, BookLock,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const DevolucionsPage = () => {
    const { t } = useLanguage();
    const dv = t.devolucions;

    return (
        <div className="min-h-screen bg-background">
            <Topbar />
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <Link to="/" className="hover:text-accent transition-colors duration-150">{dv.breadcrumbHome}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">{dv.breadcrumb}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <div className="bg-primary">
                <div className="container mx-auto px-4 max-w-[1400px] py-12 lg:py-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                            <RefreshCw size={22} className="text-white" />
                        </div>
                        <div>
                            <p className="font-body text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">{dv.heroLabel}</p>
                            <h1 className="font-display font-black text-3xl lg:text-4xl text-white uppercase tracking-tight">{dv.heroTitle}</h1>
                        </div>
                    </div>
                    <p className="font-body text-white/70 text-sm max-w-xl mt-4">{dv.heroDesc}</p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-[900px] py-14 space-y-10">

                {/* Política de pagaments */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{dv.pagamentsTitle}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                            <CreditCard size={16} className="text-accent flex-shrink-0" />
                            <p className="font-body text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: dv.pagamentsIntro }} />
                        </div>
                        <div className="divide-y divide-border">
                            {dv.pagamentTypes.map(({ title, desc }) => (
                                <div key={title} className="px-6 py-4 flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                    <div>
                                        <p className="font-body font-bold text-sm text-foreground mb-0.5">{title}</p>
                                        <p className="font-body text-sm text-muted-foreground">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-muted/40 border-t border-border px-6 py-4 space-y-2 font-body text-sm text-muted-foreground">
                            <p dangerouslySetInnerHTML={{ __html: dv.pagamentNote1 }} />
                            <p dangerouslySetInnerHTML={{ __html: dv.pagamentNote2 }} />
                            <p>{dv.pagamentNote3}</p>
                        </div>
                    </div>
                </section>

                {/* Política de devolucions */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{dv.devolucionsTitle}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="px-6 py-5 space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
                            <p dangerouslySetInnerHTML={{ __html: dv.devPara1 }} />
                            <p>{dv.devPara2}</p>
                            <div className="space-y-2 pl-2">
                                <div className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                    <span>{dv.devItem1}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                    <span>{dv.devItem2Pre}{" "}
                                        <a href="mailto:academiaespol@academiaespol.es" className="text-accent hover:underline">academiaespol@academiaespol.es</a>
                                        {dv.devItem2Post}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Drets alumne i centre */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{dv.dretsTitle}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-card border border-border rounded-xl overflow-hidden">
                            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                                <UserCheck size={15} className="text-accent flex-shrink-0" />
                                <h3 className="font-display font-bold text-sm text-foreground">{dv.dretsAlumneTitle}</h3>
                            </div>
                            <p className="px-5 py-4 font-body text-sm text-muted-foreground leading-relaxed">{dv.dretsAlumneDesc}</p>
                        </div>
                        <div className="bg-card border border-border rounded-xl overflow-hidden">
                            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                                <Building2 size={15} className="text-accent flex-shrink-0" />
                                <h3 className="font-display font-bold text-sm text-foreground">{dv.dretsCentreTitle}</h3>
                            </div>
                            <p className="px-5 py-4 font-body text-sm text-muted-foreground leading-relaxed">{dv.dretsCentreDesc}</p>
                        </div>
                    </div>
                </section>

                {/* Propietat intel·lectual */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{dv.propietatTitle}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-xl px-6 py-5 flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                            <BookLock size={16} />
                        </div>
                        <div className="space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
                            <p dangerouslySetInnerHTML={{ __html: dv.propietatPara1 }} />
                            <p className="flex items-start gap-2">
                                <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                                <span dangerouslySetInnerHTML={{ __html: dv.propietatPara2 }} />
                            </p>
                        </div>
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    );
};

export default DevolucionsPage;
