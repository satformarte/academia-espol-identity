import { Link } from "react-router-dom";
import { ChevronRight, Cookie, Settings, MessageSquare, Play, SlidersHorizontal } from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cookieTypes = [
    {
        icon: <Settings size={18} />,
        title: "Cookies tècniques i funcionals",
        badge: "Necessàries",
        badgeColor: "bg-emerald-100 text-emerald-700",
        desc: "Imprescindibles per al funcionament del lloc web. No requereixen consentiment.",
        items: [
            { name: "Cookie temporal de verificació", duration: "S'elimina en tancar el navegador" },
            { name: "Cookies d'accés", duration: '2 dies (o 2 setmanes amb "Recorda\'m")' },
            { name: "Cookies de preferències de pantalla", duration: "1 any" },
            { name: "Cookie d'edició d'articles", duration: "1 dia · sense dades personals" },
        ],
    },
    {
        icon: <MessageSquare size={18} />,
        title: "Cookies de comentaris",
        badge: "Opcionals",
        badgeColor: "bg-amber-100 text-amber-700",
        desc: "Si deixeu un comentari, podeu optar per desar el vostre nom, correu electrònic i web per a futures visites.",
        items: [
            { name: "Preferències de comentaris", duration: "1 any" },
        ],
    },
    {
        icon: <Play size={18} />,
        title: "Cookies de contingut incrustat",
        badge: "Tercers",
        badgeColor: "bg-blue-100 text-blue-700",
        desc: "El contingut de tercers (vídeos, mapes, etc.) pot instal·lar les seves pròpies cookies segons les seves pròpies polítiques de privacitat.",
        items: [],
    },
];

const CookiesPage = () => (
    <div className="min-h-screen bg-background">
        <Topbar />
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
            <div className="container mx-auto px-4 max-w-[1400px] py-3">
                <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                    <Link to="/" className="hover:text-accent transition-colors duration-150">Inici</Link>
                    <ChevronRight size={12} className="opacity-40" />
                    <span className="text-foreground">Política de Cookies</span>
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
                        <p className="font-body text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">Informació legal</p>
                        <h1 className="font-display font-black text-3xl lg:text-4xl text-white uppercase tracking-tight">Política de Cookies</h1>
                    </div>
                </div>
                <p className="font-body text-white/70 text-sm max-w-xl mt-4">
                    Informació sobre l'ús de cookies en aquest lloc web.
                </p>
            </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-[900px] py-14 space-y-10">

            {/* Què són */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 bg-accent rounded-full" />
                    <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">Què són les cookies?</h2>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed bg-card border border-border rounded-xl px-6 py-5">
                    Les cookies són petits fitxers de text que els llocs web emmagatzemen al vostre dispositiu quan els visiteu. Serveixen per recordar les vostres preferències, millorar la navegació i analitzar l'ús del lloc.
                </p>
            </section>

            {/* Tipus de cookies */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 bg-accent rounded-full" />
                    <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">Quines cookies utilitzem?</h2>
                </div>
                <div className="space-y-4">
                    {cookieTypes.map((type) => (
                        <div key={type.title} className="bg-card border border-border rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 flex items-center gap-3 border-b border-border">
                                <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                                    {type.icon}
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
                    <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">Com gestionar les cookies?</h2>
                </div>
                <div className="bg-card border border-border rounded-xl px-6 py-5 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <SlidersHorizontal size={16} />
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        Podeu configurar el vostre navegador per bloquejar o eliminar les cookies en qualsevol moment.{" "}
                        <strong className="text-foreground">Desactivar certes cookies pot afectar el funcionament del lloc web.</strong>
                    </p>
                </div>
            </section>

        </div>

        <Footer />
    </div>
);

export default CookiesPage;
