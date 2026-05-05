import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { resolveImg } from "@/hooks/useCourses";
import AdminHeader from "./AdminHeader";
import ConfirmDialog from "./ConfirmDialog";

export default function AdminCategories() {
  const navigate = useNavigate();
  const [cats, setCats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState<{ title: string; description?: string; onConfirm: () => void } | null>(null);

  useEffect(() => {
    api.getCategories().then(setCats).finally(() => setLoading(false));
  }, []);

  const remove = (id: number, label: string) => {
    setConfirm({
      title: `Eliminar "${label}"?`,
      description: "La categoria anirà a la paperera i es podrà restaurar.",
      onConfirm: async () => {
        setConfirm(null);
        try {
          await api.deleteCategory(id);
          setCats((prev) => prev.filter((c) => c.id !== id));
          toast.success("Categoria eliminada");
        } catch (e: any) { toast.error(e.message); }
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader actions={
        <>
          <button onClick={() => navigate("/admin/categories/new")} title="Nova categoria"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden lg:inline">Nova categoria</span>
          </button>
          <button onClick={() => navigate("/admin/categories/trash")} title="Paperera de categories"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="hidden lg:inline">Paperera</span>
          </button>
        </>
      } />

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-800">Categories</h1>
          <p className="text-sm text-slate-400">{cats.length} categories</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 animate-pulse overflow-hidden">
                <div className="h-28 bg-slate-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cats.map((c) => (
              <div key={c.id}
                onClick={() => navigate(`/admin/categories/${c.id}`)}
                className="bg-white rounded-2xl border border-slate-200 transition overflow-hidden cursor-pointer hover:shadow-md hover:border-blue-200 group">

                {/* Thumbnail */}
                <div className="relative h-28 bg-slate-100">
                  {c.img ? (
                    <img src={resolveImg(c.img)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${c.color}`}>
                      <svg className="w-10 h-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
                    <a
                      href={`/${c.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Veure a la web"
                      className="p-1.5 rounded-lg bg-black/30 text-white hover:bg-blue-600 transition">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); remove(c.id, c.label_ca); }}
                      title="Eliminar"
                      className="p-1.5 rounded-lg bg-black/30 text-white hover:bg-red-600 transition">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex items-end justify-between gap-2">
                  <div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.color}`}>{c.label_ca}</span>
                    <p className="text-xs text-slate-400 font-mono mt-2">{c.slug}</p>
                  </div>
                  <p className="text-xs text-slate-400 shrink-0">
                    {c.course_count} curs{c.course_count !== 1 ? "os" : ""}
                  </p>
                </div>
              </div>
            ))}

            {cats.length === 0 && (
              <div className="col-span-3 bg-white rounded-2xl border border-slate-200 py-16 text-center">
                <p className="text-slate-400 text-sm">No hi ha categories. Crea'n una de nova.</p>
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
