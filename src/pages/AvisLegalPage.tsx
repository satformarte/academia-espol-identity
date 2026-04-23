import { Link } from "react-router-dom";
import { ChevronRight, Building2, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AvisLegalPage = () => (
    <div className="min-h-screen bg-background">
        <Topbar />
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
            <div className="container mx-auto px-4 max-w-[1400px] py-3">
                <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                    <Link to="/" className="hover:text-accent transition-colors duration-150">Inici</Link>
                    <ChevronRight size={12} className="opacity-40" />
                    <span className="text-foreground">Avís Legal</span>
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
                        <p className="font-body text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">Informació legal</p>
                        <h1 className="font-display font-black text-3xl lg:text-4xl text-white uppercase tracking-tight">Avís Legal</h1>
                    </div>
                </div>
                <p className="font-body text-white/70 text-sm max-w-xl mt-4">
                    Informació sobre el titular del lloc web, condicions d'ús i dades de contacte.
                </p>
            </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-[900px] py-14 space-y-10">

            {/* Titular */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 bg-accent rounded-full" />
                    <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">Titular del lloc web</h2>
                </div>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="bg-primary px-6 py-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                            <Building2 size={22} className="text-white" />
                        </div>
                        <div>
                            <p className="font-body text-white/70 text-xs uppercase tracking-widest font-semibold mb-0.5">Empresa titular</p>
                            <h3 className="font-display font-black text-white text-base leading-tight">Acadèmia ESPOL</h3>
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: "NIF", value: "B66381252" },
                            { label: "Registre Mercantil", value: "034148999" },
                            { label: "Domicili fiscal", value: "Carrer Entença 40, baixos, 08015 Barcelona" },
                            { label: "Lloc web", value: "www.academiaespol.com" },
                        ].map(({ label, value }) => (
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
                    <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">Atenció al client</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <a href="tel:+34936061032" className="bg-card border border-border rounded-xl p-5 flex items-start gap-3 hover:border-accent/40 transition-colors group">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Phone size={16} />
                        </div>
                        <div>
                            <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Telèfon</p>
                            <p className="font-body text-sm text-foreground font-semibold group-hover:text-accent transition-colors">936 061 032</p>
                        </div>
                    </a>
                    <a href="mailto:academiaespol@academiaespol.es" className="bg-card border border-border rounded-xl p-5 flex items-start gap-3 hover:border-accent/40 transition-colors group">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Mail size={16} />
                        </div>
                        <div className="min-w-0">
                            <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Correu electrònic</p>
                            <p className="font-body text-sm text-foreground font-semibold group-hover:text-accent transition-colors break-all">academiaespol@academiaespol.es</p>
                        </div>
                    </a>
                    <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Clock size={16} />
                        </div>
                        <div>
                            <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-2">Horari</p>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="font-body text-xs text-muted-foreground">Dl – Dj</span>
                                    <span className="font-body text-xs font-semibold text-foreground">09–14h · 16–19h</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="font-body text-xs text-muted-foreground">Divendres</span>
                                    <span className="font-body text-xs font-semibold text-foreground">09–14h</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="font-body text-xs text-muted-foreground">Agost / Festius</span>
                                    <span className="font-body text-xs font-semibold text-foreground">Tancat</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed bg-muted/40 border border-border rounded-xl px-5 py-4">
                    També podeu contactar-nos a través del <Link to="/contacte" className="text-accent hover:underline">formulari de contacte</Link> d'aquest lloc web.
                </p>
            </section>

            {/* Condicions d'ús */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 bg-accent rounded-full" />
                    <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">Condicions d'ús</h2>
                </div>
                <div className="bg-card border border-border rounded-xl px-6 py-5 space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                    <p>
                        L'accés i ús d'aquest lloc web implica l'acceptació plena de les condicions recollides en aquest avís legal.
                    </p>
                    <p>
                        L'usuari es compromet a fer un ús adequat dels continguts i serveis oferts, i a no emprar-los per a activitats il·lícites, contràries a la bona fe o que vulnerin drets de tercers.
                    </p>
                    <p>
                        Acadèmia ESPOL es reserva el dret de modificar, en qualsevol moment i sense previ avís, la presentació i configuració del lloc web, així com les presents condicions legals.
                    </p>
                </div>
            </section>

        </div>

        <Footer />
    </div>
);

export default AvisLegalPage;
