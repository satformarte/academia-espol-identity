import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import espolLogo from "@/assets/espol-logo.png";

const toSlug = (cat: string) =>
  cat
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const cursosCategories = [
  "Dret Penal",
  "Criminologia",
  "Trànsit i Circulació",
  "Seguretat Ciutadana",
  "Procediments Policials",
  "Ciberdelinqüència",
  "Altres Temàtiques",
  "ACTIC i Anglès",
  "Criminalística",
];

const oposicionsCategories = [
  "Guardia Urbana",
  "Mossos d'Esquadra",
];

const navItems = [
  { label: "CONTACTE", href: "/contacte" },
  { label: "NOSALTRES", href: "/nosaltres" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [oposicionsDropdownOpen, setOposicionsDropdownOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileOposicionsOpen, setMobileOposicionsOpen] = useState(false);

  const cursosLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const oposicionsLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cursos handlers
  const handleCursosEnter = () => {
    if (cursosLeaveTimer.current) clearTimeout(cursosLeaveTimer.current);
    setDropdownOpen(true);
    setOposicionsDropdownOpen(false);
    if (oposicionsLeaveTimer.current) clearTimeout(oposicionsLeaveTimer.current);
  };
  const handleCursosLeave = () => {
    cursosLeaveTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  // Oposicions handlers
  const handleOposicionsEnter = () => {
    if (oposicionsLeaveTimer.current) clearTimeout(oposicionsLeaveTimer.current);
    setOposicionsDropdownOpen(true);
    setDropdownOpen(false);
    if (cursosLeaveTimer.current) clearTimeout(cursosLeaveTimer.current);
  };
  const handleOposicionsLeave = () => {
    oposicionsLeaveTimer.current = setTimeout(() => setOposicionsDropdownOpen(false), 120);
  };

  return (
    <nav
      className={`sticky top-0 z-[200] bg-card/95 backdrop-blur-lg border-b border-border transition-all duration-300 ${scrolled ? "shadow-[0_4px_30px_rgba(27,48,136,0.08)]" : ""
        }`}
    >
      <div className="container mx-auto px-4 max-w-[1400px] flex items-center justify-between h-[72px]">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={espolLogo} alt="Acadèmia ESPOL" className="h-12 w-auto" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-7">

          {/* ALUMNES ISPC */}
          <Link
            to="/alumnes-ispc"
            className="nav-link relative font-body font-bold text-[12px] text-muted-foreground uppercase tracking-[0.05em] hover:text-foreground transition-colors"
          >
            ALUMNES ISPC
          </Link>

          {/* OPOSICIONS — dropdown */}
          <div
            className="relative"
            onMouseEnter={handleOposicionsEnter}
            onMouseLeave={handleOposicionsLeave}
          >
            <button
              onClick={() => setOposicionsDropdownOpen(!oposicionsDropdownOpen)}
              className="nav-link relative font-body font-bold text-[12px] text-muted-foreground uppercase tracking-[0.05em] hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
              aria-expanded={oposicionsDropdownOpen}
              aria-haspopup="true"
            >
              OPOSICIONS
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${oposicionsDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Invisible bridge to prevent gap triggering mouseLeave */}
            <div className="absolute top-full left-0 w-full h-4" />

            <div
              className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-56 bg-card border border-border rounded-xl shadow-[0_8px_30px_rgba(27,48,136,0.12)] overflow-hidden transition-all duration-200 origin-top ${oposicionsDropdownOpen
                ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                }`}
              style={{ transformOrigin: "top center" }}
            >
              <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-l border-t border-border rotate-45" />
              <div className="py-2">
                {oposicionsCategories.map((cat, i) => (
                  <Link
                    key={cat}
                    to={`/oposicions/${toSlug(cat)}`}
                    onClick={() => setOposicionsDropdownOpen(false)}
                    className={`
                      group flex items-center gap-2 px-4 py-2.5
                      font-body font-semibold text-[11px] uppercase tracking-[0.05em]
                      text-muted-foreground hover:text-foreground hover:bg-accent/10
                      transition-all duration-150
                      ${i !== oposicionsCategories.length - 1 ? "border-b border-border/40" : ""}
                    `}
                  >
                    <span className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0" />
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CURSOS PUNTUABLES — dropdown */}
          <div
            className="relative"
            onMouseEnter={handleCursosEnter}
            onMouseLeave={handleCursosLeave}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="nav-link relative font-body font-bold text-[12px] text-muted-foreground uppercase tracking-[0.05em] hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              CURSOS PUNTUABLES
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Invisible bridge to prevent gap triggering mouseLeave */}
            <div className="absolute top-full left-0 w-full h-4" />

            <div
              className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-56 bg-card border border-border rounded-xl shadow-[0_8px_30px_rgba(27,48,136,0.12)] overflow-hidden transition-all duration-200 origin-top ${dropdownOpen
                ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                }`}
              style={{ transformOrigin: "top center" }}
            >
              <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-l border-t border-border rotate-45" />
              <div className="py-2">
                {cursosCategories.map((cat, i) => (
                  <Link
                    key={cat}
                    to={`/${toSlug(cat)}`}
                    onClick={() => setDropdownOpen(false)}
                    className={`
                      group flex items-center gap-2 px-4 py-2.5
                      font-body font-semibold text-[11px] uppercase tracking-[0.05em]
                      text-muted-foreground hover:text-foreground hover:bg-accent/10
                      transition-all duration-150
                      ${i !== cursosCategories.length - 1 ? "border-b border-border/40" : ""}
                    `}
                  >
                    <span className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0" />
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CONTACTE, NOSALTRES */}
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="nav-link relative font-body font-bold text-[12px] text-muted-foreground uppercase tracking-[0.05em] hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <a
            href="#"
            className="btn-hover bg-accent text-accent-foreground font-body font-bold text-xs uppercase px-6 py-2.5 rounded-xl hover:shadow-lg inline-block transition-all"
          >
            CAMPUS
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border px-4 py-5 space-y-1">

          {/* ALUMNES ISPC */}
          <Link
            to="/alumnes-ispc"
            className="block font-body font-bold text-sm text-foreground uppercase tracking-wide hover:text-accent transition-colors py-2"
            onClick={() => setMobileOpen(false)}
          >
            ALUMNES ISPC
          </Link>

          {/* OPOSICIONS accordion */}
          <div>
            <button
              className="w-full flex items-center justify-between font-body font-bold text-sm text-foreground uppercase tracking-wide hover:text-accent transition-colors py-2 bg-transparent border-none cursor-pointer"
              onClick={() => setMobileOposicionsOpen(!mobileOposicionsOpen)}
            >
              OPOSICIONS
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${mobileOposicionsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileOposicionsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <div className="pl-4 pb-2 space-y-0 border-l-2 border-accent/30 ml-1 mt-1">
                {oposicionsCategories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/oposicions/${toSlug(cat)}`}
                    className="block font-body font-semibold text-xs text-muted-foreground uppercase tracking-wide hover:text-accent transition-colors py-2 border-b border-border/30 last:border-0"
                    onClick={() => { setMobileOpen(false); setMobileOposicionsOpen(false); }}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CURSOS PUNTUABLES accordion */}
          <div>
            <button
              className="w-full flex items-center justify-between font-body font-bold text-sm text-foreground uppercase tracking-wide hover:text-accent transition-colors py-2 bg-transparent border-none cursor-pointer"
              onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
            >
              CURSOS PUNTUABLES
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${mobileCoursesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileCoursesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <div className="pl-4 pb-2 space-y-0 border-l-2 border-accent/30 ml-1 mt-1">
                {cursosCategories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/${toSlug(cat)}`}
                    className="block font-body font-semibold text-xs text-muted-foreground uppercase tracking-wide hover:text-accent transition-colors py-2 border-b border-border/30 last:border-0"
                    onClick={() => { setMobileOpen(false); setMobileCoursesOpen(false); }}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CONTACTE, NOSALTRES */}
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block font-body font-bold text-sm text-foreground uppercase tracking-wide hover:text-accent transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <a
            href="#"
            className="block bg-accent text-accent-foreground font-body font-bold text-sm uppercase px-4 py-2.5 rounded-xl text-center mt-3"
            onClick={() => setMobileOpen(false)}
          >
            CAMPUS
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;