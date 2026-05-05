import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import AdminHeader from "./AdminHeader";
import ConfirmDialog from "./ConfirmDialog";

function fmtDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("ca-ES", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [pwdUser, setPwdUser] = useState<any | null>(null);
  const [newPwd, setNewPwd] = useState("");
  const [savingPwd, setSavingPwd] = useState(false);
  const [confirm, setConfirm] = useState<{ title: string; description?: string; danger?: boolean; onConfirm: () => void } | null>(null);

  useEffect(() => {
    api.getUsers()
      .then(setUsers)
      .catch((e: any) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { id } = await api.createUser(username.trim(), password);
      setUsers((prev) => [...prev, { id, username: username.trim().toLowerCase(), active: true, created_at: new Date().toISOString() }]);
      setUsername(""); setPassword(""); setShowForm(false);
      toast.success("Usuari creat");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (user: any) => {
    const action = user.active ? "Desactivar" : "Activar";
    setConfirm({
      title: `${action} "${user.username}"?`,
      danger: user.active,
      onConfirm: async () => {
        setConfirm(null);
        try {
          const { active } = await api.toggleUser(user.id);
          setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, active } : u));
          toast.success(active ? "Usuari activat" : "Usuari desactivat");
        } catch (e: any) { toast.error(e.message); }
      },
    });
  };

  const handleDelete = (user: any) => {
    setConfirm({
      title: `Eliminar "${user.username}"?`,
      description: "Aquesta acció no es pot desfer.",
      danger: true,
      onConfirm: async () => {
        setConfirm(null);
        try {
          await api.deleteUser(user.id);
          setUsers((prev) => prev.filter((u) => u.id !== user.id));
          toast.success("Usuari eliminat");
        } catch (e: any) { toast.error(e.message); }
      },
    });
  };

  const handleChangePwd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwdUser) return;
    setSavingPwd(true);
    try {
      await api.changeUserPassword(pwdUser.id, newPwd);
      toast.success("Contrasenya actualitzada");
      setPwdUser(null); setNewPwd("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSavingPwd(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <div className="bg-white border-b border-slate-200 sticky top-12 z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="font-semibold text-slate-800 text-sm">Gestió d'usuaris admin</h1>
            {!loading && (
              <span className="text-xs text-slate-400">{users.length} usuari{users.length !== 1 ? "s" : ""}</span>
            )}
          </div>
          <button
            onClick={() => { setShowForm((s) => !s); setUsername(""); setPassword(""); }}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-1.5 rounded-xl transition shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Nou usuari
          </button>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-4">

        {/* Create form */}
        {showForm && (
          <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-blue-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-800">Nou usuari admin</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Nom d'usuari</label>
                <input
                  type="text" required minLength={3} value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="nom_usuari"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Contrasenya</label>
                <input
                  type="password" required minLength={6} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínim 6 caràcters"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)}
                className="text-sm text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-xl transition">
                Cancel·lar
              </button>
              <button type="submit" disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-sm disabled:opacity-50">
                {saving ? "Creant..." : "Crear usuari"}
              </button>
            </div>
          </form>
        )}

        {/* Users list */}
        {loading ? (
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 h-16 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-4 px-5 py-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${user.active ? "bg-blue-100" : "bg-slate-100"}`}>
                  <svg className={`w-4 h-4 ${user.active ? "text-blue-600" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{user.username}</p>
                  <p className="text-xs text-slate-400">Creat el {fmtDate(user.created_at)}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${user.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {user.active ? "Actiu" : "Inactiu"}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Change password */}
                  <button
                    onClick={() => { setPwdUser(user); setNewPwd(""); }}
                    title="Canviar contrasenya"
                    className="p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </button>
                  {/* Toggle active */}
                  <button
                    onClick={() => handleToggle(user)}
                    title={user.active ? "Desactivar" : "Activar"}
                    className={`p-1.5 rounded-lg transition ${user.active ? "text-slate-300 hover:text-amber-500 hover:bg-amber-50" : "text-slate-300 hover:text-emerald-500 hover:bg-emerald-50"}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {user.active
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      }
                    </svg>
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(user)}
                    title="Eliminar usuari"
                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <p className="px-6 py-8 text-sm text-slate-400 text-center">No hi ha usuaris registrats.</p>
            )}
          </div>
        )}

        {/* Change password modal */}
        {pwdUser && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <form onSubmit={handleChangePwd} className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
              <h2 className="font-semibold text-slate-800">Canviar contrasenya</h2>
              <p className="text-xs text-slate-500 font-mono">{pwdUser.username}</p>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Nova contrasenya</label>
                <input
                  type="password" required minLength={6} autoFocus value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="Mínim 6 caràcters"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button type="button" onClick={() => { setPwdUser(null); setNewPwd(""); }}
                  className="text-sm text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-xl transition">
                  Cancel·lar
                </button>
                <button type="submit" disabled={savingPwd}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-sm disabled:opacity-50">
                  {savingPwd ? "Guardant..." : "Canviar"}
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.title ?? ""}
        description={confirm?.description}
        confirmLabel="Confirmar"
        danger={confirm?.danger ?? false}
        onConfirm={() => confirm?.onConfirm()}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}
