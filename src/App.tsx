import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CourseDetail from "./pages/CourseDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "@/components/ScrollToTop";
import NosaltresPage from "@/pages/NosaltresPage";
import AlumnesISPCPage from "@/pages/AlumnesISPCPage";
import CategoryPage from "./pages/CategoryPage.tsx";
import AlumnesISPC from "./pages/AlumnesISPC.tsx";
import AlumnesISPCDetail from "./pages/Alumnesispcdetail.tsx";
import GuardiaUrbana from "./pages/GuardiaUrbana.tsx";
import MossosEsquadra from "./pages/MossosEsquadra.tsx";
import ContactePage from "./pages/ContactePage.tsx";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/alumnes-ispc" element={<AlumnesISPC />} />
          <Route path="/alumnes-ispc/:slug" element={<AlumnesISPCDetail />} />
          <Route path="/curs/:slug" element={<CourseDetail />} />
          <Route path="/alumnes-ispc" element={<AlumnesISPCPage />} />
          <Route path="/:categoria" element={<CategoryPage />} />
          <Route path="/nosaltres" element={<NosaltresPage />} />
          <Route path="/oposicions/guardia-urbana" element={<GuardiaUrbana />} />
          <Route path="/oposicions/mossos-desquadra" element={<MossosEsquadra />} />
          <Route path="/contacte" element={<ContactePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;