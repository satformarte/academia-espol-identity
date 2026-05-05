import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/lib/api";
import { resolveImg } from "@/hooks/useCourses";
import AdminHeader from "./AdminHeader";
import ConfirmDialog from "./ConfirmDialog";
import ImageUpload from "./ImageUpload";

const COLOR_OPTIONS = [
  { value: "bg-violet-100 text-violet-700",   label: "Violeta",   preview: "bg-violet-400" },
  { value: "bg-red-100 text-red-700",         label: "Vermell",   preview: "bg-red-400" },
  { value: "bg-amber-100 text-amber-700",     label: "Ambre",     preview: "bg-amber-400" },
  { value: "bg-cyan-100 text-cyan-700",       label: "Cian",      preview: "bg-cyan-400" },
  { value: "bg-blue-100 text-blue-700",       label: "Blau",      preview: "bg-blue-400" },
  { value: "bg-emerald-100 text-emerald-700", label: "Verd",      preview: "bg-emerald-400" },
  { value: "bg-rose-100 text-rose-700",       label: "Rosa",      preview: "bg-rose-400" },
  { value: "bg-slate-100 text-slate-600",     label: "Gris",      preview: "bg-slate-400" },
  { value: "bg-indigo-100 text-indigo-700",   label: "Índigo",    preview: "bg-indigo-400" },
  { value: "bg-orange-100 text-orange-700",   label: "Taronja",   preview: "bg-orange-400" },
  { value: "bg-teal-100 text-teal-700",       label: "Teal",      preview: "bg-teal-400" },
  { value: "bg-pink-100 text-pink-700",       label: "Rosa fort", preview: "bg-pink-400" },
];

const EMPTY = { slug: "", label_ca: "", label_es: "", color: COLOR_OPTIONS[0].value, img: "" };

const inputCls = "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function AdminCategoryForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ ...EMPTY });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const savedSlug = useRef("");

  useEffect(() => {
    if (!isEdit) return;
    api.getCategories().then((list: any[]) => {
      const c = list.find((x: any) => String(x.id) === id);
      if (!c) { navigate("/admin/categories"); return; }
      savedSlug.current = c.slug ?? "";
      setForm({
        slug:     c.slug     ?? "",
        label_ca: c.label_ca ?? "",
        label_es: c.label_es ?? "",
        color:    c.color    ?? COLOR_OPTIONS[0].value,
        img:      c.img      ?? "",
      });
      setLoading(false);
      api.getCourses().then((all: any[]) => {
        setCourses(all.filter((co: any) => co.categoria_slug === c.slug));
      }).catch(() => {});
    }).catch(() => navigate("/admin/categories"));
  }, [id]);

  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(""), 2000);
    return () => clearTimeout(t);
  }, [successMsg]);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug.trim() || !form.label_ca.trim()) { setError("El slug i el nom (CA) són obligatoris."); return; }
    setError(""); setSaving(true);
    try {
      if (isEdit) {
        await api.updateCategory(Number(id), form);
        savedSlug.current = form.slug;
        setSuccessMsg("Canvis guardats");
      } else {
        await api.createCategory(form);
        setSuccessMsg("Categoria creada");
        navigate("/admin/categories");
      }
    } catch (e: any) {
      setError(e.message ?? "Error desconegut");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleteConfirm(false);
    try {
      await api.deleteCategory(Number(id));
      navigate("/admin/categories");
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-400">Carregant...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      {/* Sticky top bar */}
      <div className="bg-white border-b border-slate-200 sticky top-12 z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/admin/categories")}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="font-semibold text-slate-800 text-sm">{isEdit ? "Editar categoria" : "Nova categoria"}</h1>
            {isEdit && <p className="text-xs text-slate-400 font-mono truncate">{form.slug}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isEdit && form.slug && (
              <a href={`/${form.slug}`} target="_blank" rel="noopener noreferrer"
                title="Veure a la web"
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            <button form="cat-form" type="submit" disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-sm disabled:opacity-50">
              {saving ? "Guardant..." : isEdit ? "Guardar" : "Crear"}
            </button>
            {isEdit && (
              <button type="button" onClick={() => setDeleteConfirm(true)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                title="Eliminar categoria">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <form id="cat-form" onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        <Section title="Identificació">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug" required>
              <input
                className={`${inputCls} ${form.slug && !/^[a-z0-9-]+$/.test(form.slug) ? "border-red-400 focus:ring-red-400" : ""}`}
                placeholder="nom-de-categoria"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                required
              />
              {form.slug && !/^[a-z0-9-]+$/.test(form.slug) && (
                <p className="text-xs text-red-500 mt-1">Només lletres minúscules, números i guions</p>
              )}
            </Field>
            <Field label="Color">
              <div className="flex gap-2 flex-wrap pt-1">
                {COLOR_OPTIONS.map((o) => (
                  <button key={o.value} type="button" onClick={() => set("color", o.value)}
                    title={o.label}
                    className={`w-7 h-7 rounded-full ${o.preview} transition ring-offset-2 ${form.color === o.value ? "ring-2 ring-blue-500" : "hover:ring-2 ring-slate-300"}`} />
                ))}
              </div>
            </Field>
            <Field label="Nom (CA)" required>
              <input className={inputCls} placeholder="Nom en català" value={form.label_ca}
                onChange={(e) => set("label_ca", e.target.value)} required />
            </Field>
            <Field label="Nom (ES)">
              <input className={inputCls} placeholder="Nombre en castellano" value={form.label_es}
                onChange={(e) => set("label_es", e.target.value)} />
            </Field>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-slate-500">Previsualització:</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${form.color}`}>
              {form.label_ca || "Nom de categoria"}
            </span>
          </div>
        </Section>

        <Section title="Imatge">
          <ImageUpload value={form.img} onChange={(url) => set("img", url)} />
        </Section>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Courses list */}
        {isEdit && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Cursos</h2>
              <span className="text-xs text-slate-400">{courses.length} curs{courses.length !== 1 ? "os" : ""}</span>
            </div>
            {courses.length === 0 ? (
              <p className="px-6 py-8 text-sm text-slate-400 text-center">Cap curs assignat a aquesta categoria.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {courses.map((co) => (
                  <div key={co.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 shrink-0 overflow-hidden">
                      {(co.grid_img || co.img) ? (
                        <img src={resolveImg(co.grid_img || co.img)} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{co.title_ca}</p>
                      <p className="text-xs text-slate-400 font-mono truncate">{co.slug}</p>
                    </div>
                    {!co.active && (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full shrink-0">Inactiu</span>
                    )}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a href={`/curs/${co.slug}`} target="_blank" rel="noopener noreferrer"
                        title="Veure a la web"
                        className="p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <button type="button" onClick={() => navigate(`/admin/courses/${co.id}`)}
                        title="Editar curs"
                        className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="pb-8" />
      </form>

      <ConfirmDialog
        open={!!successMsg}
        title={successMsg}
        success
        onConfirm={() => setSuccessMsg("")}
      />

      <ConfirmDialog
        open={deleteConfirm}
        title="Eliminar aquesta categoria?"
        description="Els cursos que l'utilitzen quedaran sense categoria."
        confirmLabel="Eliminar"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(false)}
      />
    </div>
  );
}
