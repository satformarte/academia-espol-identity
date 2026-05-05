import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { resolveImg } from "@/hooks/useCourses";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminHeader from "./AdminHeader";
import ConfirmDialog from "./ConfirmDialog";

type StatusFilter = "all" | "active" | "inactive";
type SortKey = "id_desc" | "id_asc" | "title_asc" | "title_desc";

export default function AdminCourses() {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const [searchParams] = useSearchParams();

  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [trashCount, setTrashCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  // Filtre per categoria des de la URL: /admin?cat=criminologia
  const [category, setCategory] = useState(searchParams.get("cat") ?? "all");
  const [sortBy, setSortBy] = useState<SortKey>("id_desc");
  const [confirm, setConfirm] = useState<{ title: string; description?: string; onConfirm: () => void } | null>(null);


  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
    // Obtenir el recompte de la paperera per mostrar la insígnia
    api.getDeletedCourses().then((d) => setTrashCount(d.length)).catch(() => {});
    api.getCourses()
      .then(setCourses)
      .catch((err) => {
        if (err.message.includes("401") || err.message.toLowerCase().includes("token")) {
          logout().finally(() => navigate("/admin/login"));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: number, title: string) => {
    setConfirm({
      title: `Eliminar "${title}"?`,
      description: "El curs anirà a la paperera. El podràs recuperar des d'allà.",
      onConfirm: async () => {
        setConfirm(null);
        try {
          await api.deleteCourse(id);
          setCourses((prev) => prev.filter((c) => c.id !== id));
          toast.success("Curs mogut a la paperera");
        } catch (e: any) { toast.error(e.message); }
      },
    });
  };

  const handleDuplicate = async (c: any) => {
    const newSlug = `${c.slug}-copia-${Math.random().toString(36).slice(2, 7)}`;
    const payload = { ...c, slug: newSlug, title_ca: `${c.title_ca} (còpia)`, title_es: c.title_es ? `${c.title_es} (copia)` : "", active: false };
    delete payload.id; delete payload.created_at; delete payload.updated_at;
    const toastId = toast.loading("Duplicant curs...");
    try {
      const { id: newId } = await api.createCourse(payload);
      toast.success("Curs duplicat", { id: toastId });
      navigate(`/admin/courses/${newId}`);
    } catch (e: any) { toast.error(e.message, { id: toastId }); }
  };

  const isProximament = (d: string | null | undefined) => {
    if (!d) return false;
    const lower = d.toLowerCase();
    return lower.includes("pròximament") || lower.includes("proximament");
  };

  const parseStartDate = (d: string | null | undefined): number => {
    if (!d) return -1;
    let day: string, m: string, y: string;
    if (d.includes("/")) { [day, m, y] = d.split("/"); }
    else { [y, m, day] = d.split("-"); }
    const ts = new Date(`${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`).getTime();
    return isNaN(ts) ? -1 : ts;
  };

  const filtered = courses
    .filter((c) => {
      if (search && !c.title_ca?.toLowerCase().includes(search.toLowerCase()) && !c.slug?.includes(search.toLowerCase())) return false;
      if (status === "active" && !c.active) return false;
      if (status === "inactive" && !!c.active) return false;
      if (category !== "all" && c.categoria_slug !== category) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "id_desc" || sortBy === "id_asc") {
        const proxA = isProximament(a.grid_start_date);
        const proxB = isProximament(b.grid_start_date);
        if (proxA && !proxB) return -1;
        if (!proxA && proxB) return 1;
        if (proxA && proxB) return 0;
        const da = parseStartDate(a.grid_start_date);
        const db = parseStartDate(b.grid_start_date);
        const noA = da === -1, noB = db === -1;
        if (noA && noB) return 0;
        if (noA) return 1;
        if (noB) return -1;
        return sortBy === "id_desc" ? da - db : db - da;
      }
      if (sortBy === "title_asc") return (a.title_ca ?? "").localeCompare(b.title_ca ?? "");
      if (sortBy === "title_desc") return (b.title_ca ?? "").localeCompare(a.title_ca ?? "");
      return 0;
    });

  const hasFilters = status !== "all" || category !== "all" || sortBy !== "id_desc";

  const stats = [
    { label: "Total cursos", value: courses.length,                              icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "text-blue-600 bg-blue-50" },
    { label: "Actius",       value: courses.filter((c) => !!c.active).length,    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-emerald-600 bg-emerald-50" },
    { label: "Pròximament",  value: courses.filter((c) => !!c.coming_soon).length, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-amber-600 bg-amber-50" },
    { label: "Inactius",     value: courses.filter((c) => !c.active).length,     icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-slate-500 bg-slate-100" },
    { label: "Categories",   value: categories.length,                           icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z", color: "text-violet-600 bg-violet-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader actions={
        <>
          <Link to="/admin/courses/new"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden lg:inline">Nou curs</span>
          </Link>
          <Link to="/admin/trash"
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="hidden lg:inline">Paperera</span>
            {!!trashCount && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {trashCount > 99 ? "99+" : trashCount}
              </span>
            )}
          </Link>
        </>
      } />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="space-y-3">
          {/* Search row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Cerca per títol o slug..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
            <p className="text-sm text-slate-400 shrink-0 hidden sm:block">{filtered.length} cursos</p>
          </div>

          {/* Filter row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status pills */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 gap-0.5">
              {(["all", "active", "inactive"] as StatusFilter[]).map((s) => {
                const labels = { all: "Tots", active: "Actius", inactive: "Inactius" };
                return (
                  <button key={s} onClick={() => setStatus(s)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition ${status === s ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}>
                    {labels[s]}
                  </button>
                );
              })}
            </div>

            {/* Category select */}
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition max-w-[160px] sm:max-w-none">
              <option value="all">Totes les categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.label_ca}</option>
              ))}
            </select>

            {/* Sort select */}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition max-w-[140px] sm:max-w-none">
              <option value="id_desc">Inici més proper</option>
              <option value="id_asc">Inici més llunyà</option>
              <option value="title_asc">A → Z</option>
              <option value="title_desc">Z → A</option>
            </select>

            {/* Clear filters */}
            {hasFilters && (
              <button onClick={() => { setStatus("all"); setCategory("all"); setSortBy("id_desc"); }}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-red-600 transition">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Netejar filtres
              </button>
            )}
          </div>
        </div>

        {/* Course list */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                <div className="h-36 bg-slate-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-5 bg-slate-100 rounded w-1/3 mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => {
              const cat = categories.find((x) => x.slug === c.categoria_slug);
              const fmtDate = (d: string) => {
                if (!d) return null;
                const months = ["gen","feb","mar","abr","mai","jun","jul","ago","set","oct","nov","des"];
                let day: string, m: string, y: string;
                if (d.includes("/")) { [day, m, y] = d.split("/"); }
                else                 { [y, m, day] = d.split("-"); }
                const mi = parseInt(m) - 1;
                if (isNaN(parseInt(day)) || mi < 0 || mi > 11) return d;
                return `${parseInt(day)} ${months[mi]} ${y}`;
              };
              const startFmt = c.grid_start_date ? fmtDate(c.grid_start_date) : null;
              const endFmt   = c.grid_end_date   ? fmtDate(c.grid_end_date)   : null;

              return (
                <Link key={c.id}
                  to={`/admin/courses/${c.id}`}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition group flex flex-col overflow-hidden cursor-pointer">

                  {/* Thumbnail */}
                  <div className="relative h-36 bg-slate-100 shrink-0">
                    {c.grid_img ? (
                      <img src={resolveImg(c.grid_img)} alt="" className={`w-full h-full object-cover ${!c.active ? "grayscale" : ""}`} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {/* View on site button */}
                    <a
                      href={`/curs/${c.slug}`} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Veure a la web"
                      className="absolute top-2 right-[72px] p-1.5 rounded-lg bg-black/30 text-white hover:bg-slate-600 opacity-0 group-hover:opacity-100 transition">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    {/* Duplicate button */}
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDuplicate(c); }}
                      title="Duplicar curs"
                      className="absolute top-2 right-10 p-1.5 rounded-lg bg-black/30 text-white hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(c.id, c.title_ca); }}
                      title="Eliminar curs"
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/30 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    {/* Active status badge */}
                    <div className={`absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm ${!!c.active ? "bg-emerald-500 text-white" : "bg-slate-700 text-white"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${!!c.active ? "bg-white/80" : "bg-slate-400"}`} />
                      {!!c.active ? "Actiu" : "Inactiu"}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-4 flex flex-col gap-2">
                    <p className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">{c.title_ca}</p>
                    <p className="text-xs text-slate-400 font-mono truncate">{c.slug}</p>

                    {/* Date */}
                    {(startFmt || endFmt) && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {startFmt && endFmt ? `${startFmt} → ${endFmt}` : startFmt ?? endFmt}
                      </div>
                    )}

                    {c.updated_at && (
                      <p className="text-xs text-slate-400">
                        Modificat: {new Date(c.updated_at).toLocaleDateString("ca-ES", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 flex-wrap mt-auto pt-2">
                      {cat && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat.color}`}>
                          {cat.label_ca}
                        </span>
                      )}
                      {!!c.coming_soon && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Pròximament</span>}
                      {!!c.is_new && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Nou</span>}
                    </div>

                  </div>
                </Link>
              );
            })}

            {filtered.length === 0 && (
              <div className="col-span-3 bg-white rounded-2xl border border-slate-200 py-16 text-center">
                <svg className="w-10 h-10 text-slate-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-slate-400 text-sm">{search ? "Cap resultat per aquesta cerca." : "No hi ha cursos."}</p>
              </div>
            )}
          </div>
        )}
      </main>

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.title ?? ""}
        description={confirm?.description}
        confirmLabel="Eliminar"
        danger
        onConfirm={() => confirm?.onConfirm()}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}
