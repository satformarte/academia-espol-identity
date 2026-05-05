import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import ProtectedRoute from "@/admin/ProtectedRoute";
import { AdminPageShell } from "@/admin/AdminPageShell";
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
import CourseComingSoon from "./pages/CourseComingSoon.tsx";
import ContactePage from "./pages/ContactePage.tsx";
import AvisLegalPage from "./pages/AvisLegalPage.tsx";
import PrivacitatPage from "./pages/PrivacitatPage.tsx";
import CookiesPage from "./pages/CookiesPage.tsx";
import DevolucionsPage from "./pages/DevolucionsPage.tsx";
import PacksPage from "./pages/PacksPage.tsx";

const AdminLogin = lazy(() => import("@/admin/AdminLogin"));
const AdminCourses = lazy(() => import("@/admin/AdminCourses"));
const AdminCourseForm = lazy(() => import("@/admin/AdminCourseForm"));
const AdminCategories = lazy(() => import("@/admin/AdminCategories"));
const AdminCategoryForm = lazy(() => import("@/admin/AdminCategoryForm"));
const AdminTrash = lazy(() => import("@/admin/AdminTrash"));
const AdminCategoriesTrash = lazy(() => import("@/admin/AdminCategoriesTrash"));
const AdminUsers = lazy(() => import("@/admin/AdminUsers"));
const AdminStatus = lazy(() => import("@/admin/AdminStatus"));

const queryClient = new QueryClient();

const App = () => (
  <AdminAuthProvider>
  <LanguageProvider>
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
          <Route path="/curs/espol26-055-001" element={<CourseComingSoon />} />
          <Route path="/curs/:slug" element={<CourseDetail />} />
          <Route path="/alumnes-ispc" element={<AlumnesISPCPage />} />
          <Route path="/:categoria" element={<CategoryPage />} />
          <Route path="/nosaltres" element={<NosaltresPage />} />
          <Route path="/oposicions/guardia-urbana" element={<GuardiaUrbana />} />
          <Route path="/oposicions/guardia-urbana/:slug" element={<CourseComingSoon />} />
          <Route path="/oposicions/mossos-desquadra" element={<MossosEsquadra />} />
          <Route path="/oposicions/mossos-desquadra/:slug" element={<CourseComingSoon />} />
          <Route path="/contacte" element={<ContactePage />} />
          <Route path="/avis-legal" element={<AvisLegalPage />} />
          <Route path="/privacitat" element={<PrivacitatPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/devolucions" element={<DevolucionsPage />} />
          <Route path="/packs" element={<PacksPage />} />
          {/* Admin */}
          <Route path="/admin/login" element={<Suspense fallback={null}><AdminLogin /></Suspense>} />
          <Route path="/admin" element={<Suspense fallback={<AdminPageShell />}><ProtectedRoute><AdminCourses /></ProtectedRoute></Suspense>} />
          <Route path="/admin/courses/new" element={<Suspense fallback={<AdminPageShell />}><ProtectedRoute><AdminCourseForm /></ProtectedRoute></Suspense>} />
          <Route path="/admin/courses/:id" element={<Suspense fallback={<AdminPageShell />}><ProtectedRoute><AdminCourseForm /></ProtectedRoute></Suspense>} />
          <Route path="/admin/categories" element={<Suspense fallback={<AdminPageShell />}><ProtectedRoute><AdminCategories /></ProtectedRoute></Suspense>} />
          <Route path="/admin/categories/new" element={<Suspense fallback={<AdminPageShell />}><ProtectedRoute><AdminCategoryForm /></ProtectedRoute></Suspense>} />
          <Route path="/admin/categories/:id" element={<Suspense fallback={<AdminPageShell />}><ProtectedRoute><AdminCategoryForm /></ProtectedRoute></Suspense>} />
          <Route path="/admin/trash" element={<Suspense fallback={<AdminPageShell />}><ProtectedRoute><AdminTrash /></ProtectedRoute></Suspense>} />
          <Route path="/admin/categories/trash" element={<Suspense fallback={<AdminPageShell />}><ProtectedRoute><AdminCategoriesTrash /></ProtectedRoute></Suspense>} />
          <Route path="/admin/users" element={<Suspense fallback={<AdminPageShell />}><ProtectedRoute><AdminUsers /></ProtectedRoute></Suspense>} />
          <Route path="/admin/status" element={<Suspense fallback={<AdminPageShell />}><ProtectedRoute><AdminStatus /></ProtectedRoute></Suspense>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </LanguageProvider>
  </AdminAuthProvider>
);

export default App;