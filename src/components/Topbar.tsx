import { MapPin, Mail, Phone } from "lucide-react";

const Topbar = () => (
  <div className="bg-foreground h-9 flex items-center text-primary-foreground/60 text-xs font-body">
    <div className="container mx-auto px-4 flex items-center justify-between max-w-[1400px]">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <MapPin size={12} />
          Acadèmia ESPOL
        </span>
        <span className="opacity-30">·</span>
        <a href="mailto:info@academiaespol.com" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
          <Mail size={12} />
          info@academiaespol.com
        </a>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <a
          href="https://www.instagram.com/academiaespol/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-pink-400 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
        <span className="opacity-30">|</span>
        <span className="flex items-center gap-1.5">
          <Phone size={12} />
          93 606 10 32
        </span>
        <a
          href="https://wa.me/34694234416"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent text-accent-foreground px-3 py-1 rounded-lg text-[11px] font-semibold hover:brightness-110 transition-all"
        >
          WhatsApp 694 234 416
        </a>
      </div>
    </div>
  </div>
);

export default Topbar;
