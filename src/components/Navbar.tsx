import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import espolLogo from "@/assets/espol-logo.png";

// Genera el slug de cada categoria: "Trànsit i Circulació" → "/cursos/transit-i-circulacio"
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

const navItems = [
  "ALUMNES ISPC",
  "OPOSICIONS",
  "CONTACTE",
  "NOSALTRES",
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* CURSOS PUNTUABLES — dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
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

            {/* Dropdown panel */}
            <div
              onMouseLeave={() => setDropdownOpen(false)}
              className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-56 bg-card border border-border rounded-xl shadow-[0_8px_30px_rgba(27,48,136,0.12)] overflow-hidden transition-all duration-200 origin-top ${dropdownOpen
                ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                }`}
              style={{ transformOrigin: "top center" }}
            >
              {/* Small arrow/caret */}
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

          {/* Rest of nav items */}
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="nav-link relative font-body font-bold text-[12px] text-muted-foreground uppercase tracking-[0.05em] hover:text-foreground transition-colors"
            >
              {item}
            </a>
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
          <a
            href="#"
            className="block font-body font-bold text-sm text-foreground uppercase tracking-wide hover:text-accent transition-colors py-2"
            onClick={() => setMobileOpen(false)}
          >
            ALUMNES ISPC
          </a>

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

            {/* Accordion content */}
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
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileCoursesOpen(false);
                    }}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Rest of nav items */}
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="block font-body font-bold text-sm text-foreground uppercase tracking-wide hover:text-accent transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
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
