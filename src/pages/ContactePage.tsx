import { Link } from "react-router-dom";
import {
    ChevronRight,
    Mail,
    Phone,
    MapPin,
    Clock,
    MessageSquare,
    ArrowRight,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const WHATSAPP_LINK = "https://wa.me/34694234416";
const EMAIL_CONTACT = "cursos@academiaespol.es";

const ContactePage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Topbar />
            <Navbar />

            {/* Breadcrumbs */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 max-w-[1400px] py-3">
                    <nav className="flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <Link to="/" className="hover:text-accent transition-colors duration-150">Inici</Link>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-foreground">Contacte</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
                <div className="relative container mx-auto px-4 max-w-[1400px] py-12 lg:py-16">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent-foreground font-body font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-5">
                            <MessageSquare size={10} />
                            Estem aquí per ajudar-te
                        </span>
                        <h1 className="font-display font-black text-3xl lg:text-4xl text-white leading-tight mb-3">
                            Contacte
                        </h1>
                        <p className="font-body text-white/75 text-sm lg:text-base leading-relaxed max-w-xl">
                            Tens alguna pregunta sobre els nostres cursos o oposicions? Posa't en contacte amb nosaltres i et respondrem el més aviat possible.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main */}
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <div className="max-w-3xl mx-auto space-y-5">

                        {/* Email CTA — destacat */}
                        <div className="bg-card border-2 border-accent rounded-2xl p-8 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-5">
                                <Mail size={26} />
                            </div>
                            <h2 className="font-display font-black text-2xl text-foreground mb-2">
                                Escriu-nos per correu
                            </h2>
                            <p className="font-body text-muted-foreground text-sm max-w-md mx-auto mb-6 leading-relaxed">
                                Per a qualsevol consulta sobre cursos, oposicions, preus o inscripcions, envia'ns un correu i et respondrem en menys de 24 hores.
                            </p>
                            <a
                                href={`mailto:${EMAIL_CONTACT}`}
                                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-body font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl hover:shadow-lg transition-all group"
                            >
                                {EMAIL_CONTACT}
                                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Horaris */}
                        <div className="bg-card border border-border rounded-2xl p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                                    <Clock size={18} />
                                </div>
                                <p className="font-display font-bold text-sm text-foreground">Horari d'atenció</p>
                            </div>
                            <div className="space-y-2.5">
                                {[
                                    { dia: "Dilluns – Divendres", hora: "9:00 – 18:00 h" },
                                    { dia: "Dissabte", hora: "10:00 – 14:00 h" },
                                    { dia: "Diumenge", hora: "Tancat" },
                                ].map(({ dia, hora }) => (
                                    <div key={dia} className="flex items-center justify-between border-b border-border/50 last:border-0 pb-2.5 last:pb-0">
                                        <span className="font-body text-xs text-muted-foreground">{dia}</span>
                                        <span className="font-body font-semibold text-xs text-foreground">{hora}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20b558] text-white font-body font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all hover:shadow-lg"
                        >
                            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 flex-shrink-0">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Escriu-nos per WhatsApp
                        </a>

                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default ContactePage;