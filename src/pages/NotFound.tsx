import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <Navbar />

      <div className="flex-1 flex items-center justify-center bg-muted py-20">
        <div className="text-center max-w-lg px-4">

          {/* 404 number */}
          <span className="font-display font-black text-[120px] md:text-[160px] leading-none text-border/60 select-none block mb-6">
            404
          </span>

          {/* Message */}
          <h1 className="font-display font-black text-2xl md:text-3xl text-foreground mb-3">
            Pàgina no disponible
          </h1>
          <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
            La pàgina que estàs cercant no existeix o ha estat eliminada.<br />
            Comprova l'adreça o torna a l'inici.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-body font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl hover:shadow-lg transition-all"
          >
            <Home size={15} />
            Anar a l'inici
          </Link>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;