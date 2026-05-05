import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export default function AdminHeader({ actions }: { actions?: React.ReactNode }) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const navCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? "bg-white/15 text-white"
        : "text-slate-400 hover:text-white hover:bg-white/10"
    }`;

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 sticky top-0 z-20 shadow-md">
      <div className="max-w-screen-2xl mx-auto px-4 h-12 flex items-center gap-3">

        {/* Brand */}
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition shrink-0">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="font-bold text-white text-sm hidden lg:block">Acadèmia ESPOL</span>
        </a>

        {/* Divider */}
        <div className="h-5 w-px bg-white/10 shrink-0" />

        {/* Nav */}
        <nav className="flex items-center gap-0.5">
          <NavLink to="/admin" end className={navCls} title="Cursos">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="hidden lg:inline">Cursos</span>
          </NavLink>
          <NavLink to="/admin/categories" className={navCls} title="Categories">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="hidden lg:inline">Categories</span>
          </NavLink>
          <NavLink to="/admin/users" className={navCls} title="Usuaris">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="hidden lg:inline">Usuaris</span>
          </NavLink>
          <NavLink to="/admin/status" className={navCls} title="Monitor">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="hidden lg:inline">Monitor</span>
          </NavLink>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions slot */}
        {actions && <div className="flex items-center gap-0.5">{actions}</div>}

        {/* Divider */}
        {actions && <div className="h-5 w-px bg-white/10 shrink-0" />}

        {/* Logout */}
        <button
          onClick={() => { logout().finally(() => navigate("/admin/login")); }}
          title="Sortir"
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/10 px-2.5 py-1.5 rounded-lg transition shrink-0">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden lg:block">Sortir</span>
        </button>

      </div>
    </header>
  );
}
