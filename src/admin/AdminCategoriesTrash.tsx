import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { resolveImg } from "@/hooks/useCourses";
import AdminHeader from "./AdminHeader";
import ConfirmDialog from "./ConfirmDialog";

export default function AdminCategoriesTrash() {
  const [cats, setCats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState<{ title: string; description?: string; confirmLabel?: string; danger?: boolean; onConfirm: () => void } | null>(null);

  useEffect(() => {
    api.getDeletedCategories()
      .then(setCats)
      .catch((e: any) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRestore = (id: number, label: string) => {
    setConfirm({
      title: `Restaurar "${label}"?`,
      confirmLabel: "Restaurar",
      onConfirm: async () => {
        setConfirm(null);
        try {
          await api.restoreCategory(id);
          setCats((prev) => prev.filter((c) => c.id !== id));
          toast.success("Categoria restaurada");
        } catch (e: any) { toast.error(e.message); }
      },
    });
  };

  const handlePermanentDelete = (id: number, label: string) => {
    setConfirm({
      title: `Eliminar definitivament "${label}"?`,
      description: "Aquesta acció no es pot desfer.",
      confirmLabel: "Eliminar definitivament",
      danger: true,
      onConfirm: async () => {
        setConfirm(null);
        try {
          await api.permanentDeleteCategory(id);
          setCats((prev) => prev.filter((c) => c.id !== id));
          toast.success("Categoria eliminada definitivament");
        } catch (e: any) { toast.error(e.message); }
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <div className="bg-white border-b border-slate-200 sticky top-12 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link to="/admin/categories"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h1 className="font-semibold text-slate-800 text-sm">Paperera de categories</h1>
            {!loading && (
              <span className="text-xs text-slate-400">{cats.length} categoria{cats.length !== 1 ? "es" : ""}</span>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 h-16 animate-pulse" />
            ))}
          </div>
        ) : cats.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">
            <svg className="w-12 h-12 text-slate-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <p className="text-slate-400 text-sm">La paperera està buida.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {cats.map((c) => {
              const deletedDate = c.deleted_at
                ? new Date(c.deleted_at).toLocaleDateString("ca-ES", { day: "numeric", month: "short", year: "numeric" })
                : "";
              return (
                <div key={c.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-10 h-10 rounded-xl shrink-0 overflow-hidden">
                    {c.img ? (
                      <img src={resolveImg(c.img)} alt="" className="w-full h-full object-cover grayscale opacity-50" />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${c.color ?? "bg-slate-100"}`}>
                        <svg className="w-5 h-5 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{c.label_ca}</p>
                    <p className="text-xs text-slate-400 font-mono">{c.slug}</p>
                  </div>
                  {deletedDate && (
                    <p className="text-xs text-slate-400 shrink-0 hidden sm:block">Eliminat el {deletedDate}</p>
                  )}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleRestore(c.id, c.label_ca)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Restaurar
                    </button>
                    <button
                      onClick={() => handlePermanentDelete(c.id, c.label_ca)}
                      title="Eliminar definitivament"
                      className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.title ?? ""}
        description={confirm?.description}
        confirmLabel={confirm?.confirmLabel ?? "Confirmar"}
        danger={confirm?.danger ?? false}
        onConfirm={() => confirm?.onConfirm()}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}
