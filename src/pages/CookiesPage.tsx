import { Link } from "react-router-dom";
import { ChevronRight, Cookie, Settings, MessageSquare, Play, SlidersHorizontal } from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const COOKIE_ICONS = [
    <Settings size={18} />,
    <MessageSquare size={18} />,
    <Play size={18} />,
];

const CookiesPage = () => {
    const { t } = useLanguage();
    const cp = t.cookiesPage;

    return (
        <div className="min-h-screen bg-background">
            <Topbar />
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <Link to="/" className="hover:text-accent transition-colors duration-150">{cp.breadcrumbHome}</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">{cp.breadcrumb}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <div className="bg-primary">
                <div className="container mx-auto px-4 max-w-[1400px] py-12 lg:py-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                            <Cookie size={22} className="text-white" />
                        </div>
                        <div>
                            <p className="font-body text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">{cp.heroLabel}</p>
                            <h1 className="font-display font-black text-3xl lg:text-4xl text-white uppercase tracking-tight">{cp.heroTitle}</h1>
                        </div>
                    </div>
                    <p className="font-body text-white/70 text-sm max-w-xl mt-4">{cp.heroDesc}</p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-[900px] py-14 space-y-10">

                {/* Què són */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{cp.queSonTitle}</h2>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed bg-card border border-border rounded-xl px-6 py-5">
                        {cp.queSonDesc}
                    </p>
                </section>

                {/* Tipus de cookies */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{cp.quinesTitle}</h2>
                    </div>
                    <div className="space-y-4">
                        {cp.cookieTypes.map((type, i) => (
                            <div key={type.title} className="bg-card border border-border rounded-2xl overflow-hidden">
                                <div className="px-6 py-4 flex items-center gap-3 border-b border-border">
                                    <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                                        {COOKIE_ICONS[i]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-display font-bold text-sm text-foreground">{type.title}</h3>
                                            <span className={`font-body font-bold text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${type.badgeColor}`}>
                                                {type.badge}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-4">
                                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{type.desc}</p>
                                    {type.items.length > 0 && (
                                        <div className="space-y-2">
                                            {type.items.map((item) => (
                                                <div key={item.name} className="flex items-start justify-between gap-4 bg-muted/50 rounded-lg px-4 py-3">
                                                    <span className="font-body text-xs text-foreground font-semibold">{item.name}</span>
                                                    <span className="font-body text-xs text-muted-foreground whitespace-nowrap">{item.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Com gestionar */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-7 bg-accent rounded-full" />
                        <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">{cp.comGestionarTitle}</h2>
                    </div>
                    <div className="bg-card border border-border rounded-xl px-6 py-5 flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                            <SlidersHorizontal size={16} />
                        </div>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">
                            {cp.comGestionarDesc}{" "}
                            <strong className="text-foreground">{cp.comGestionarStrong}</strong>
                        </p>
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    );
};

export default CookiesPage;
