import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import espolLogo from "@/assets/espol-logo.png";
import { courses } from "@/data/courses";

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
  "Ciberseguretat",
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

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const cursosLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const oposicionsLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const closeSearch = () => { setSearchOpen(false); setSearchQuery(""); };

  const searchResults = (searchOpen || mobileOpen) && searchQuery.trim().length > 1
    ? courses.filter((c) => {
      const q = searchQuery.toLowerCase();
      return (
        c.titleBase.toLowerCase().includes(q) ||
        (c.titleAccent?.toLowerCase().includes(q) ?? false) ||
        c.categoriaLabel.toLowerCase().includes(q)
      );
    })
    : [];

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

        {/* Search + CTA */}
        <div className="hidden lg:flex items-center gap-3">

          {/* Search */}
          <div ref={searchRef} className="relative">
            <div className="flex items-center gap-2">
              <div
                className={`overflow-hidden transition-all duration-250 ease-in-out ${searchOpen ? "w-52 opacity-100" : "w-0 opacity-0"}`}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cerca cursos..."
                  className="font-body text-sm text-foreground bg-muted border border-border rounded-xl px-4 py-2 w-52 outline-none focus:border-accent transition-colors"
                  onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                />
              </div>
              <button
                onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(""); }}
                className="w-9 h-9 rounded-xl bg-muted/60 hover:bg-accent/10 text-muted-foreground hover:text-accent flex items-center justify-center transition-all duration-150 cursor-pointer"
                aria-label="Cercar"
              >
                {searchOpen ? <X size={16} /> : <Search size={16} />}
              </button>
            </div>

            {/* Results dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-[calc(100%+8px)] right-0 w-[354px] bg-card border border-border rounded-xl shadow-[0_8px_30px_rgba(27,48,136,0.12)] overflow-hidden z-50">
                <div className="py-2 overflow-y-auto max-h-[340px]">
                  {searchResults.map((c, i) => (
                    <Link
                      key={c.slug}
                      to={`/curs/${c.slug}`}
                      onClick={closeSearch}
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-accent/10 transition-colors group ${i !== searchResults.length - 1 ? "border-b border-border/40" : ""}`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-muted">
                        <img src={c.gridImg} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-bold text-xs text-foreground truncate group-hover:text-accent transition-colors">{c.titleBase} {c.titleAccent}</p>
                        <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">{c.categoriaLabel}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {searchOpen && searchQuery.trim().length > 1 && searchResults.length === 0 && (
              <div className="absolute top-[calc(100%+8px)] right-0 w-72 bg-card border border-border rounded-xl shadow-[0_8px_30px_rgba(27,48,136,0.12)] overflow-hidden z-50">
                <div className="px-4 py-5 text-center">
                  <Search size={20} className="text-muted-foreground mx-auto mb-2 opacity-40" />
                  <p className="font-body text-sm text-muted-foreground">Cap curs trobat per "<strong>{searchQuery}</strong>"</p>
                </div>
              </div>
            )}
          </div>

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
          onClick={() => { setMobileOpen(!mobileOpen); setSearchQuery(""); }}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border px-4 py-5 space-y-1">

          {/* Mobile Search */}
          <div className="relative mb-3">
            <div className="relative flex items-center">
              <Search size={14} className="absolute left-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca cursos..."
                className="w-full font-body text-sm text-foreground bg-muted border border-border rounded-xl pl-9 pr-9 py-2.5 outline-none focus:border-accent transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {searchQuery.trim().length > 1 && (
              <div className="mt-2 bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                {searchResults.length > 0 ? (
                  <div className="overflow-y-auto max-h-[320px]">
                    {searchResults.map((c, i) => (
                      <Link
                        key={c.slug}
                        to={`/curs/${c.slug}`}
                        onClick={() => { setMobileOpen(false); closeSearch(); }}
                        className={`flex items-center gap-3 px-4 py-2.5 hover:bg-accent/10 transition-colors group ${i !== searchResults.length - 1 ? "border-b border-border/40" : ""}`}
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg overflow-hidden bg-muted">
                          <img src={c.gridImg} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-bold text-xs text-foreground truncate group-hover:text-accent transition-colors">{c.titleBase} {c.titleAccent}</p>
                          <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">{c.categoriaLabel}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-4 text-center">
                    <p className="font-body text-sm text-muted-foreground">Cap curs trobat</p>
                  </div>
                )}
              </div>
            )}
          </div>

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