import { Link } from "react-router-dom";
import {
    ChevronRight, RefreshCw, CreditCard, UserCheck, Building2,
    AlertTriangle, BookLock, Clock, Mail, Phone,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DevolucionsPage = () => (
    <div className="min-h-screen bg-background">
        <Topbar />
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
            <div className="container mx-auto px-4 max-w-[1400px] py-3">
                <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                    <Link to="/" className="hover:text-accent transition-colors duration-150">Inici</Link>
                    <ChevronRight size={12} className="opacity-40" />
                    <span className="text-foreground">Política de Devolucions</span>
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
                        <p className="font-body text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">Informació legal</p>
                        <h1 className="font-display font-black text-3xl lg:text-4xl text-white uppercase tracking-tight">Política de Devolucions</h1>
                    </div>
                </div>
                <p className="font-body text-white/70 text-sm max-w-xl mt-4">
                    Condicions de pagament, cancel·lació i devolució dels cursos d'Acadèmia ESPOL.
                </p>
            </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-[900px] py-14 space-y-10">

            {/* Titular */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 bg-accent rounded-full" />
                    <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">Titular del servei</h2>
                </div>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="bg-primary px-6 py-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                            <Building2 size={22} className="text-white" />
                        </div>
                        <div>
                            <p className="font-body text-white/70 text-xs uppercase tracking-widest font-semibold mb-0.5">Titular del servei</p>
                            <h3 className="font-display font-black text-white text-base leading-tight">Acadèmia ESPOL</h3>
                            <p className="font-body text-white/60 text-xs mt-0.5">www.academiaespol.com</p>
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-muted/50 rounded-xl p-4">
                            <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Domicili fiscal</p>
                            <p className="font-body text-sm text-foreground font-semibold">C/ Entença 40, baixos · 08015 Barcelona</p>
                        </div>
                        <div className="bg-muted/50 rounded-xl p-4">
                            <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">NIF</p>
                            <p className="font-body text-sm text-foreground font-semibold">B66381252</p>
                        </div>
                        <a href="tel:+34936061032" className="bg-muted/50 rounded-xl p-4 flex items-start gap-2 hover:bg-accent/5 transition-colors group">
                            <Phone size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Telèfon</p>
                                <p className="font-body text-sm text-foreground font-semibold group-hover:text-accent transition-colors">+34 936 061 032</p>
                            </div>
                        </a>
                        <a href="mailto:academiaespol@academiaespol.es" className="bg-muted/50 rounded-xl p-4 flex items-start gap-2 hover:bg-accent/5 transition-colors group">
                            <Mail size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Correu electrònic</p>
                                <p className="font-body text-sm text-foreground font-semibold group-hover:text-accent transition-colors break-all">academiaespol@academiaespol.es</p>
                            </div>
                        </a>
                    </div>
                    <div className="border-t border-border px-6 py-4 bg-muted/30">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock size={13} className="text-accent flex-shrink-0" />
                            <p className="font-body font-bold text-[10px] text-muted-foreground uppercase tracking-wide">Horari d'atenció al client</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-body">
                            <div className="flex justify-between gap-2"><span className="text-muted-foreground">Dl – Dj</span><span className="font-semibold text-foreground">09–14h · 16–19h</span></div>
                            <div className="flex justify-between gap-2"><span className="text-muted-foreground">Divendres</span><span className="font-semibold text-foreground">09–14h</span></div>
                            <div className="flex justify-between gap-2"><span className="text-muted-foreground">Agost / Festius</span><span className="font-semibold text-foreground">Tancat</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Política de pagaments */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 bg-accent rounded-full" />
                    <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">Política de Pagaments</h2>
                </div>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                        <CreditCard size={16} className="text-accent flex-shrink-0" />
                        <p className="font-body text-sm text-muted-foreground">
                            El pagament es pot realitzar en <strong className="text-foreground">efectiu, targeta de crèdit o transferència bancària</strong>, segons la modalitat del curs.
                        </p>
                    </div>
                    <div className="divide-y divide-border">
                        {[
                            { title: "Pagament únic", desc: "Abans de l'inici del curs." },
                            { title: "Pagament fraccionat o mensual", desc: "La primera quota abans de l'inici del curs; la resta, com a màxim el dia 5 de cada mes natural." },
                        ].map(({ title, desc }) => (
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
                        <p>Qualsevol altra condició de pagament diferent es concretarà a la fitxa del curs, a l'apartat <em>Condicions Generals</em>.</p>
                        <p><strong className="text-foreground">La plaça només quedarà reservada quan es materialitzi el pagament de la primera quota.</strong> Si l'alumne no compleix els terminis de pagament establerts, perdrà el dret a continuar participant en el curs.</p>
                        <p>En cas que el centre hagi de suspendre una sessió per causes pròpies, es recuperarà el més aviat possible. Si la recuperació no fos possible, es retornarà la part proporcional corresponent.</p>
                    </div>
                </div>
            </section>

            {/* Política de devolucions */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 bg-accent rounded-full" />
                    <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">Política de Devolucions</h2>
                </div>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-6 py-5 space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
                        <p>
                            Si un alumne vol donar-se de baixa del curs, ha de comunicar-ho <strong className="text-foreground">10 dies abans de la finalització del mes</strong>. No es retornaran els pagaments realitzats amb anterioritat a la sol·licitud de baixa.
                        </p>
                        <p>Les cancel·lacions es poden fer:</p>
                        <div className="space-y-2 pl-2">
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                <span>De forma presencial al nostre centre.</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                <span>Per correu electrònic a <a href="mailto:academiaespol@academiaespol.es" className="text-accent hover:underline">academiaespol@academiaespol.es</a>, des de l'adreça indicada a la fitxa d'inscripció.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Drets alumne i centre */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 bg-accent rounded-full" />
                    <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">Drets i obligacions</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                            <UserCheck size={15} className="text-accent flex-shrink-0" />
                            <h3 className="font-display font-bold text-sm text-foreground">Drets de l'alumne</h3>
                        </div>
                        <p className="px-5 py-4 font-body text-sm text-muted-foreground leading-relaxed">
                            Les quotes donen dret a la docència dels professors, l'ús de les aules i el material docent cedit a través de les classes presencials i/o l'aula virtual del curs.
                        </p>
                    </div>
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                            <Building2 size={15} className="text-accent flex-shrink-0" />
                            <h3 className="font-display font-bold text-sm text-foreground">Drets del centre</h3>
                        </div>
                        <p className="px-5 py-4 font-body text-sm text-muted-foreground leading-relaxed">
                            Acadèmia ESPOL es reserva el dret a modificar els preus dels cursos abans del seu inici i a corregir errors involuntaris, sense afectar els alumnes ja acceptats. També es reserva el dret de suspendre un curs per motius justificats, amb avís previ de 24 hores i devolució econòmica de la part restant.
                        </p>
                    </div>
                </div>
            </section>

            {/* Propietat intel·lectual */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 bg-accent rounded-full" />
                    <h2 className="font-display font-black text-xl text-foreground uppercase tracking-tight">Propietat Intel·lectual</h2>
                </div>
                <div className="bg-card border border-border rounded-xl px-6 py-5 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BookLock size={16} />
                    </div>
                    <div className="space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
                        <p>
                            Tots els materials que componen els cursos són propietat intel·lectual d'<strong className="text-foreground">Acadèmia ESPOL</strong> i es posen a disposició de l'alumne de forma individual i personalitzada, únicament per al seu estudi personal.
                        </p>
                        <p className="flex items-start gap-2">
                            <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                            <span>
                                Queda <strong className="text-foreground">expressament prohibit</strong> cedir-los a tercers, fotocopiar-los, escanejar-los o reproduir-los total o parcialment per qualsevol mitjà. Qualsevol ús no autoritzat serà considerat una violació de les lleis internacionals de <em>copyright</em>.
                            </span>
                        </p>
                    </div>
                </div>
            </section>

        </div>

        <Footer />
    </div>
);

export default DevolucionsPage;
