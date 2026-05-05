import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, checking } = useAdminAuth();

  // Fix 1: esperar la verificación de la cookie antes de redirigir
  if (checking) return null;

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
