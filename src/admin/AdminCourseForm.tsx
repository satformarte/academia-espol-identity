import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/lib/api";
import AdminHeader from "./AdminHeader";
import ConfirmDialog from "./ConfirmDialog";
import ImageUpload from "./ImageUpload";

// ─── Types ────────────────────────────────────────────────────────────────────

type Module = { title: string; topics: string[] };
type FaqItem = { q: string; a: string };
type AudienceItem = { title: string; desc: string };
type HeroStat = { label: string };
type MetaItem = { label_ca: string; label_es: string; value: string };
type PlanFeature = { text: string; included: boolean };
type Plan = { name: string; subtitle: string; price: number; originalPrice: number | null; highlight: boolean; badge: string | null; features: PlanFeature[] };

interface CourseForm {
  slug: string; categoria_slug: string; title_ca: string; title_es: string;
  img: string; grid_img: string;
  price: string; price_nuevo_afiliado: string; price_no_afiliado: string; original_price: string;
  grid_hours: string; grid_start_date: string; grid_end_date: string;
  is_new: boolean; coming_soon: boolean; active: boolean;
  enrollment_url: string;
  modules_ca: Module[]; modules_es: Module[];
  faq_ca: FaqItem[]; faq_es: FaqItem[];
  audience_ca: AudienceItem[]; audience_es: AudienceItem[];
  hero_stats: HeroStat[]; meta_items: MetaItem[]; plans_ca: Plan[]; plans_es: Plan[];
}

const EMPTY: CourseForm = {
  slug: "", categoria_slug: "", title_ca: "", title_es: "",
  img: "", grid_img: "", price: "", price_nuevo_afiliado: "", price_no_afiliado: "",
  original_price: "", grid_hours: "", grid_start_date: "", grid_end_date: "",
  is_new: false, coming_soon: false, active: true,
  enrollment_url: "",
  modules_ca: [], modules_es: [], faq_ca: [], faq_es: [],
  audience_ca: [], audience_es: [], hero_stats: [], meta_items: [], plans_ca: [], plans_es: [],
};

const CATEGORIAS = [
  { value: "criminologia",           label: "Criminologia" },
  { value: "dret-penal",             label: "Dret Penal" },
  { value: "transit-i-circulacio",   label: "Trànsit i Circulació" },
  { value: "ciberseguretat",         label: "Ciberseguretat" },
  { value: "procediments-policials", label: "Procediments Policials" },
  { value: "seguretat-ciutadana",    label: "Seguretat Ciutadana" },
  { value: "criminalistica",         label: "Criminalística" },
  { value: "altres-tematiques",      label: "Altres Temàtiques" },
  { value: "actic-i-angles",         label: "ACTIC i Anglès" },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputCls = "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white";
const textareaCls = `${inputCls} min-h-[80px] resize-y`;

// ─── UI primitives ────────────────────────────────────────────────────────────

function Section({ title, children, collapsible = false, defaultOpen = true }: {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div
        className={`flex items-center justify-between px-6 py-4 ${collapsible ? "cursor-pointer select-none hover:bg-slate-50 transition-colors" : ""}`}
        onClick={collapsible ? () => setOpen((o) => !o) : undefined}
      >
        <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">{title}</h2>
        {collapsible && (
          <svg className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
      {(!collapsible || open) && (
        <div className="px-6 pb-6 space-y-4">{children}</div>
      )}
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

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-slate-200"}`}>
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
      </div>
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}

function AddBtn({ onClick, label = "Afegir" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick}
      className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium transition">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
      </svg>
      {label}
    </button>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="p-1 text-slate-300 hover:text-red-500 transition rounded shrink-0">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

// ─── Editors ──────────────────────────────────────────────────────────────────

function ModulesEditor({ value, onChange }: { value: Module[]; onChange: (v: Module[]) => void }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(value.length === 0 ? [] : []));

  const add = () => {
    const idx = value.length;
    onChange([...value, { title: "", topics: [""] }]);
    setOpen((prev) => new Set([...prev, idx]));
  };
  const remove = (i: number) => {
    onChange(value.filter((_, j) => j !== i));
    setOpen((prev) => { const s = new Set(prev); s.delete(i); return s; });
  };
  const toggle = (i: number) => setOpen((prev) => {
    const s = new Set(prev);
    s.has(i) ? s.delete(i) : s.add(i);
    return s;
  });
  const setTitle = (i: number, t: string) => onChange(value.map((m, j) => j === i ? { ...m, title: t } : m));
  const addTopic = (i: number) => onChange(value.map((m, j) => j === i ? { ...m, topics: [...m.topics, ""] } : m));
  const removeTopic = (i: number, k: number) => onChange(value.map((m, j) => j === i ? { ...m, topics: m.topics.filter((_, l) => l !== k) } : m));
  const setTopic = (i: number, k: number, t: string) => onChange(value.map((m, j) => j === i ? { ...m, topics: m.topics.map((tp, l) => l === k ? t : tp) } : m));

  return (
    <div className="space-y-2">
      {value.map((mod, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            {/* Header row — always visible */}
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span className="text-xs font-bold text-slate-400 w-5 shrink-0">{i + 1}.</span>
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-blue-700 placeholder-slate-400"
                placeholder="Títol del mòdul"
                value={mod.title}
                onChange={(e) => setTitle(i, e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="text-xs text-slate-400 shrink-0">{mod.topics.length} tema{mod.topics.length !== 1 ? "s" : ""}</span>
              <button type="button" onClick={() => toggle(i)}
                className="p-1 rounded-lg hover:bg-slate-200 transition text-slate-400 hover:text-slate-600 shrink-0">
                <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <RemoveBtn onClick={() => remove(i)} />
            </div>

            {/* Collapsible topics */}
            {isOpen && (
              <div className="border-t border-slate-200 px-4 py-3 space-y-2 bg-white">
                {mod.topics.map((tp, k) => (
                  <div key={k} className="flex items-center gap-2">
                    <span className="text-slate-300 text-xs">·</span>
                    <input className={inputCls} placeholder={`Tema ${k + 1}`} value={tp} onChange={(e) => setTopic(i, k, e.target.value)} />
                    <RemoveBtn onClick={() => removeTopic(i, k)} />
                  </div>
                ))}
                <AddBtn onClick={() => addTopic(i)} label="Afegir tema" />
              </div>
            )}
          </div>
        );
      })}
      <AddBtn onClick={add} label="Afegir mòdul" />
    </div>
  );
}

function FaqEditor({ value, onChange }: { value: FaqItem[]; onChange: (v: FaqItem[]) => void }) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const add = () => {
    const idx = value.length;
    onChange([...value, { q: "", a: "" }]);
    setOpen((prev) => new Set([...prev, idx]));
  };
  const remove = (i: number) => {
    onChange(value.filter((_, j) => j !== i));
    setOpen((prev) => { const s = new Set(prev); s.delete(i); return s; });
  };
  const toggle = (i: number) => setOpen((prev) => {
    const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s;
  });
  const set = (i: number, field: "q" | "a", v: string) => onChange(value.map((item, j) => j === i ? { ...item, [field]: v } : item));

  return (
    <div className="space-y-2">
      {value.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            {/* Header row */}
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span className="text-xs font-bold text-slate-400 w-5 shrink-0">{i + 1}.</span>
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-blue-700 placeholder-slate-400"
                placeholder="Pregunta"
                value={item.q}
                onChange={(e) => set(i, "q", e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              <button type="button" onClick={() => toggle(i)}
                className="p-1 rounded-lg hover:bg-slate-200 transition text-slate-400 hover:text-slate-600 shrink-0">
                <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <RemoveBtn onClick={() => remove(i)} />
            </div>
            {/* Collapsible answer */}
            {isOpen && (
              <div className="border-t border-slate-200 px-4 py-3 bg-white">
                <textarea className={textareaCls} placeholder="Resposta" value={item.a} onChange={(e) => set(i, "a", e.target.value)} />
              </div>
            )}
          </div>
        );
      })}
      <AddBtn onClick={add} label="Afegir pregunta" />
    </div>
  );
}

function AudienceEditor({ value, onChange }: { value: AudienceItem[]; onChange: (v: AudienceItem[]) => void }) {
  const add = () => onChange([...value, { title: "", desc: "" }]);
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  const set = (i: number, field: "title" | "desc", v: string) => onChange(value.map((item, j) => j === i ? { ...item, [field]: v } : item));

  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50">
          <div className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <input className={inputCls} placeholder="Títol del públic" value={item.title} onChange={(e) => set(i, "title", e.target.value)} />
              <textarea className={textareaCls} placeholder="Descripció" value={item.desc} onChange={(e) => set(i, "desc", e.target.value)} />
            </div>
            <RemoveBtn onClick={() => remove(i)} />
          </div>
        </div>
      ))}
      <AddBtn onClick={add} label="Afegir públic" />
    </div>
  );
}

function HeroStatsEditor({ value, onChange }: { value: HeroStat[]; onChange: (v: HeroStat[]) => void }) {
  const add = () => onChange([...value, { label: "" }]);
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  const set = (i: number, v: string) => onChange(value.map((item, j) => j === i ? { label: v } : item));

  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input className={inputCls} placeholder="Ex: 100% online" value={item.label} onChange={(e) => set(i, e.target.value)} />
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn onClick={add} label="Afegir estadística" />
    </div>
  );
}

function MetaItemsEditor({ value, onChange }: { value: MetaItem[]; onChange: (v: MetaItem[]) => void }) {
  const add = () => onChange([...value, { label_ca: "", label_es: "", value: "" }]);
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  const set = (i: number, field: keyof MetaItem, v: string) => onChange(value.map((item, j) => j === i ? { ...item, [field]: v } : item));

  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="space-y-1.5 border border-slate-200 rounded-xl p-3 bg-slate-50">
          <div className="flex items-center gap-2">
            <input className={inputCls} placeholder="Etiqueta (CA)" value={item.label_ca} onChange={(e) => set(i, "label_ca", e.target.value)} />
            <input className={inputCls} placeholder="Etiqueta (ES)" value={item.label_es} onChange={(e) => set(i, "label_es", e.target.value)} />
            <RemoveBtn onClick={() => remove(i)} />
          </div>
          <input className={inputCls} placeholder="Valor" value={item.value} onChange={(e) => set(i, "value", e.target.value)} />
        </div>
      ))}
      <AddBtn onClick={add} label="Afegir element" />
    </div>
  );
}

const DEFAULT_FEATURES_CA: PlanFeature[] = [
  { text: "Accés a tots els mòduls",                    included: true },
  { text: "Material didàctic PDF",                      included: true },
  { text: "Tutories en línia",                          included: true },
  { text: "Accés il·limitat durant la durada del curs", included: true },
];
const DEFAULT_FEATURES_ES: PlanFeature[] = [
  { text: "Acceso a todos los módulos",                      included: true },
  { text: "Material didáctico PDF",                          included: true },
  { text: "Tutorías en línea",                               included: true },
  { text: "Acceso ilimitado durante la duración del curso",  included: true },
];

function makeDefaultPlansCa(pNou: number, pAfil: number, pNoAfil: number): Plan[] {
  return [
    { name: "Nou afiliat/da",  subtitle: "",                                                              price: pNou,    originalPrice: null, highlight: false, badge: null,          features: [...DEFAULT_FEATURES_CA] },
    { name: "Afiliats/ades",   subtitle: "Afiliat/da + 6 mesos i alumnes en pràctiques afiliats",        price: pAfil,   originalPrice: null, highlight: true,  badge: "Afiliats/ades", features: [...DEFAULT_FEATURES_CA] },
    { name: "No afiliat/da",   subtitle: "",                                                              price: pNoAfil, originalPrice: null, highlight: false, badge: null,          features: [...DEFAULT_FEATURES_CA] },
  ];
}
function makeDefaultPlansEs(pNou: number, pAfil: number, pNoAfil: number): Plan[] {
  return [
    { name: "Nuevo afiliado/a", subtitle: "",                                                                   price: pNou,    originalPrice: null, highlight: false, badge: null,           features: [...DEFAULT_FEATURES_ES] },
    { name: "Afiliados/as",     subtitle: "Afiliado/a + 6 meses y alumnos en prácticas afiliados",             price: pAfil,   originalPrice: null, highlight: true,  badge: "Afiliados/as", features: [...DEFAULT_FEATURES_ES] },
    { name: "No afiliado/a",    subtitle: "",                                                                   price: pNoAfil, originalPrice: null, highlight: false, badge: null,           features: [...DEFAULT_FEATURES_ES] },
  ];
}

function PlansEditor({ value, onChange, lang, formPrices }: { value: Plan[]; onChange: (v: Plan[]) => void; lang: "ca" | "es"; formPrices: { pNou: number; pAfil: number; pNoAfil: number } }) {
  const set = (i: number, field: keyof Plan, v: any) => onChange(value.map((p, j) => j === i ? { ...p, [field]: v } : p));
  const addFeature = (i: number) => onChange(value.map((p, j) => j === i ? { ...p, features: [...p.features, { text: "", included: true }] } : p));
  const removeFeature = (i: number, k: number) => onChange(value.map((p, j) => j === i ? { ...p, features: p.features.filter((_, l) => l !== k) } : p));
  const setFeature = (i: number, k: number, field: keyof PlanFeature, v: any) =>
    onChange(value.map((p, j) => j === i ? { ...p, features: p.features.map((f, l) => l === k ? { ...f, [field]: v } : f) } : p));
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  const makeDefaults = () => lang === "ca"
    ? makeDefaultPlansCa(formPrices.pNou, formPrices.pAfil, formPrices.pNoAfil)
    : makeDefaultPlansEs(formPrices.pNou, formPrices.pAfil, formPrices.pNoAfil);

  if (value.length === 0) return (
    <div className="text-center py-6 space-y-3">
      <p className="text-sm text-slate-400">Sense plans definits.</p>
      <button type="button" onClick={() => onChange(makeDefaults())}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Generar plans per defecte
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      {value.map((plan, i) => (
        <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Pla {i + 1}</span>
            <RemoveBtn onClick={() => remove(i)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Nom</label>
              <input className={inputCls} value={plan.name} onChange={(e) => set(i, "name", e.target.value)} placeholder={lang === "ca" ? "Nou afiliat/da" : "Nuevo afiliado/a"} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Badge (opcional)</label>
              <input className={inputCls} value={plan.badge ?? ""} onChange={(e) => set(i, "badge", e.target.value || null)} placeholder={lang === "ca" ? "Afiliats/ades" : "Afiliados/as"} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Subtítol (opcional)</label>
            <input className={inputCls} value={plan.subtitle} onChange={(e) => set(i, "subtitle", e.target.value)} placeholder={lang === "ca" ? "Afiliat/da + 6 mesos i alumnes..." : "Afiliado/a + 6 meses y alumnos..."} />
          </div>
          <Toggle label="Pla destacat" checked={plan.highlight} onChange={(v) => set(i, "highlight", v)} />
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Característiques</label>
            {plan.features.map((f, k) => (
              <div key={k} className="flex items-center gap-2">
                <input type="checkbox" checked={f.included} onChange={(e) => setFeature(i, k, "included", e.target.checked)} className="w-4 h-4 accent-blue-600 shrink-0" />
                <input className={inputCls} value={f.text} onChange={(e) => setFeature(i, k, "text", e.target.value)} placeholder="Característica" />
                <RemoveBtn onClick={() => removeFeature(i, k)} />
              </div>
            ))}
            <AddBtn onClick={() => addFeature(i)} label="Afegir característica" />
          </div>
        </div>
      ))}
      <AddBtn onClick={() => onChange([...value, { name: "", subtitle: "", price: 0, originalPrice: null, highlight: false, badge: null, features: [] }])} label="Afegir pla" />
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

function safeParse(val: any, fallback: any[] = []) {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") { try { return JSON.parse(val); } catch { return fallback; } }
  return fallback;
}

function normalizePlans(raw: any[]): Plan[] {
  return raw.map((p) => ({
    name:         p.name         ?? "",
    subtitle:     p.subtitle     ?? "",
    price:        p.price        ?? 0,
    originalPrice: p.originalPrice ?? null,
    highlight:    p.highlight    ?? false,
    badge:        p.badge        ?? null,
    features: (p.features ?? []).map((f: any) => ({
      text:     f.text     ?? "",
      included: f.included ?? true,
    })),
  }));
}

function migrateMetaItems(raw: any[]): MetaItem[] {
  return raw.map((m) => ({
    label_ca: m.label_ca ?? m.label ?? "",
    label_es: m.label_es ?? "",
    value:    m.value    ?? "",
  }));
}

type Tab = "general" | "ca" | "es";

export default function AdminCourseForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<CourseForm>(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<{ slug: string; label_ca: string }[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("general");

  useEffect(() => {
    api.getCategories().then((cats) => setCategories(cats)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(""), 2000);
    return () => clearTimeout(t);
  }, [successMsg]);

  useEffect(() => {
    if (!isEdit) return;
    api.getCourses().then((list) => {
      const c = list.find((x: any) => String(x.id) === id);
      if (!c) { navigate("/admin"); return; }
      setForm({
        slug: c.slug ?? "",
        categoria_slug: c.categoria_slug ?? "",
        title_ca: c.title_ca ?? "",
        title_es: c.title_es ?? "",
        img: c.img ?? "",
        grid_img: c.grid_img ?? "",
        price: c.price ?? "",
        price_nuevo_afiliado: c.price_nuevo_afiliado ?? "",
        price_no_afiliado: c.price_no_afiliado ?? "",
        original_price: c.original_price ?? "",
        grid_hours: c.grid_hours ?? "",
        grid_start_date: c.grid_start_date ?? "",
        grid_end_date: c.grid_end_date ?? "",
        is_new: !!c.is_new,
        coming_soon: !!c.coming_soon,
        active: !!c.active,
        enrollment_url: c.enrollment_url ?? "",
        modules_ca: safeParse(c.modules_ca),
        modules_es: safeParse(c.modules_es),
        faq_ca: safeParse(c.faq_ca),
        faq_es: safeParse(c.faq_es),
        audience_ca: safeParse(c.audience_ca),
        audience_es: safeParse(c.audience_es),
        hero_stats: safeParse(c.hero_stats),
        meta_items: migrateMetaItems(safeParse(c.meta_items)),
        plans_ca: normalizePlans(safeParse(c.plans_ca)),
        plans_es: normalizePlans(safeParse(c.plans_es)),
      });
      setLoading(false);
    }).catch(() => navigate("/admin"));
  }, [id]);

  const set = (key: keyof CourseForm, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: form.price === "" ? null : Number(form.price),
        price_nuevo_afiliado: form.price_nuevo_afiliado === "" ? null : Number(form.price_nuevo_afiliado),
        price_no_afiliado: form.price_no_afiliado === "" ? null : Number(form.price_no_afiliado),
        original_price: form.original_price === "" ? null : form.original_price,
      };
      if (isEdit) {
        await api.updateCourse(Number(id), payload);
        setSuccessMsg("Canvis guardats");
      } else {
        const { id: newId } = await api.createCourse(payload);
        setSuccessMsg("Curs creat");
        navigate(`/admin/courses/${newId}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleteConfirm(false);
    try {
      await api.deleteCourse(Number(id));
      navigate("/admin");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-400">Carregant...</div>
    </div>
  );

  const tabs: { id: Tab; label: string }[] = [
    { id: "general", label: "General" },
    { id: "ca",      label: "Català" },
    { id: "es",      label: "Castellà" },
  ];

  const formPrices = { pNou: Number(form.price_nuevo_afiliado) || 0, pAfil: Number(form.price) || 0, pNoAfil: Number(form.price_no_afiliado) || 0 };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      {/* Sticky top bar */}
      <div className="bg-white border-b border-slate-200 sticky top-12 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/admin")}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="font-semibold text-slate-800 text-sm">{isEdit ? "Editar curs" : "Nou curs"}</h1>
            {isEdit && <p className="text-xs text-slate-400 font-mono truncate">{form.slug}</p>}
          </div>
          {isEdit && form.slug && (
            <a href={`/curs/${form.slug}`} target="_blank" rel="noopener noreferrer"
              title={!form.active ? "El curs és inactiu i no és visible al públic" : "Veure el curs a la web"}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition shrink-0 ${
                form.active
                  ? "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                  : "text-amber-600 hover:text-amber-700 hover:bg-amber-50"
              }`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {form.active ? "Anar al curs" : "Inactiu · Vista prèvia"}
            </a>
          )}
          <div className="flex items-center gap-2 shrink-0">
            <button form="course-form" type="submit" disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-sm disabled:opacity-50">
              {saving ? "Guardant..." : isEdit ? "Guardar" : "Crear curs"}
            </button>
            {isEdit && (
              <button type="button" onClick={() => setDeleteConfirm(true)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                title="Eliminar curs">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-1 -mb-px">
          {tabs.map((t) => (
            <button key={t.id} type="button" onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === t.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <form id="course-form" onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* ── Tab: General ─────────────────────────────────────────────── */}
        {activeTab === "general" && (
          <div className="space-y-5">
            <Section title="Identificació">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Slug" required>
                  <input
                    className={`${inputCls} ${form.slug && !/^[a-z0-9-]+$/.test(form.slug) ? "border-red-400 focus:ring-red-400" : ""}`}
                    value={form.slug}
                    onChange={(e) => set("slug", e.target.value)}
                    required
                    placeholder="espol26-000-001"
                  />
                  {form.slug && !/^[a-z0-9-]+$/.test(form.slug) && (
                    <p className="text-xs text-red-500 mt-1">Només lletres minúscules, números i guions</p>
                  )}
                </Field>
                <Field label="Categoria">
                  <select className={inputCls} value={form.categoria_slug} onChange={(e) => set("categoria_slug", e.target.value)}>
                    <option value="">— Selecciona —</option>
                    {(categories.length > 0 ? categories : CATEGORIAS.map(c => ({ slug: c.value, label_ca: c.label }))).map((c) => (
                      <option key={c.slug} value={c.slug}>{c.label_ca}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </Section>

            <Section title="Imatge i inscripció">
              <Field label="Imatge del curs">
                <ImageUpload value={form.img} onChange={(url) => { set("img", url); set("grid_img", url); }} />
              </Field>
              <Field label="URL inscripció">
                <input className={inputCls} value={form.enrollment_url} onChange={(e) => set("enrollment_url", e.target.value)} placeholder="https://formar-te.iformalia.es/..." />
              </Field>
            </Section>

            <Section title="Preus (€)">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Field label="Nou afiliat/ada">
                  <input type="number" className={inputCls} value={form.price_nuevo_afiliado} onChange={(e) => set("price_nuevo_afiliado", e.target.value)} placeholder="30" />
                </Field>
                <Field label="Afiliat/ada">
                  <input type="number" className={inputCls} value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="25" />
                </Field>
                <Field label="No afiliat/ada">
                  <input type="number" className={inputCls} value={form.price_no_afiliado} onChange={(e) => set("price_no_afiliado", e.target.value)} placeholder="50" />
                </Field>
                <Field label="Preu original tatxat">
                  <input className={inputCls} value={form.original_price} onChange={(e) => set("original_price", e.target.value)} placeholder="60" />
                </Field>
              </div>
            </Section>

            <Section title="Dates, hores i estat">
              <div className="grid grid-cols-3 gap-3">
                <Field label="Hores">
                  <input className={inputCls} value={form.grid_hours} onChange={(e) => set("grid_hours", e.target.value)} placeholder="30h" />
                </Field>
                <Field label="Data inici">
                  <input className={inputCls} value={form.grid_start_date} onChange={(e) => set("grid_start_date", e.target.value)} placeholder="16/06/2026" />
                </Field>
                <Field label="Data fi">
                  <input className={inputCls} value={form.grid_end_date} onChange={(e) => set("grid_end_date", e.target.value)} placeholder="17/07/2026" />
                </Field>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <Toggle label="Actiu" checked={form.active} onChange={(v) => set("active", v)} />
                <Toggle label="Nou" checked={form.is_new} onChange={(v) => set("is_new", v)} />
                <Toggle label="Pròximament" checked={form.coming_soon} onChange={(v) => set("coming_soon", v)} />
              </div>
            </Section>

            <Section title="Estadístiques hero" collapsible defaultOpen={false}>
              <HeroStatsEditor value={form.hero_stats} onChange={(v) => set("hero_stats", v)} />
            </Section>
            <Section title="Meta items (sidebar)" collapsible defaultOpen={false}>
              <MetaItemsEditor value={form.meta_items} onChange={(v) => set("meta_items", v)} />
            </Section>
          </div>
        )}

        {/* ── Tab: Català ──────────────────────────────────────────────── */}
        {activeTab === "ca" && (
          <div className="space-y-5">
            <Section title="Títol">
              <Field label="Títol (CA)" required>
                <input className={inputCls} value={form.title_ca} onChange={(e) => set("title_ca", e.target.value)} required />
              </Field>
            </Section>
            <Section title="Mòduls" collapsible>
              <ModulesEditor value={form.modules_ca} onChange={(v) => set("modules_ca", v)} />
            </Section>
            <Section title="Preguntes freqüents" collapsible>
              <FaqEditor value={form.faq_ca} onChange={(v) => set("faq_ca", v)} />
            </Section>
            <Section title="Públic objectiu" collapsible defaultOpen={false}>
              <AudienceEditor value={form.audience_ca} onChange={(v) => set("audience_ca", v)} />
            </Section>
            <Section title="Plans" collapsible defaultOpen={false}>
              <p className="text-xs text-slate-400 -mt-2">Els preus s'actualitzen des de la pestanya "General".</p>
              <PlansEditor value={form.plans_ca} lang="ca" onChange={(v) => set("plans_ca", v)} formPrices={formPrices} />
            </Section>
          </div>
        )}

        {/* ── Tab: Castellà ────────────────────────────────────────────── */}
        {activeTab === "es" && (
          <div className="space-y-5">
            <Section title="Títol">
              <Field label="Títol (ES)" required>
                <input className={inputCls} value={form.title_es} onChange={(e) => set("title_es", e.target.value)} required />
              </Field>
            </Section>
            <Section title="Mòduls" collapsible>
              <ModulesEditor value={form.modules_es} onChange={(v) => set("modules_es", v)} />
            </Section>
            <Section title="Preguntes freqüents" collapsible>
              <FaqEditor value={form.faq_es} onChange={(v) => set("faq_es", v)} />
            </Section>
            <Section title="Públic objectiu" collapsible defaultOpen={false}>
              <AudienceEditor value={form.audience_es} onChange={(v) => set("audience_es", v)} />
            </Section>
            <Section title="Plans" collapsible defaultOpen={false}>
              <p className="text-xs text-slate-400 -mt-2">Els preus s'actualitzen des de la pestanya "General".</p>
              <PlansEditor value={form.plans_es} lang="es" onChange={(v) => set("plans_es", v)} formPrices={formPrices} />
            </Section>
          </div>
        )}


        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-600 flex gap-2 items-start">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
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
        title="Eliminar aquest curs?"
        description="Aquesta acció no es pot desfer."
        confirmLabel="Eliminar"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(false)}
      />
    </div>
  );
}
