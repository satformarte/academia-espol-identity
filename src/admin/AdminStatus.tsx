import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import AdminHeader from "./AdminHeader";

type StatusData = {
  db:      { ok: boolean; latency_ms: number };
  uploads: { size_bytes: number; file_count: number };
  counts:  { courses: number; categories: number; users: number };
  memory:  { heap_used_bytes: number; heap_total_bytes: number; rss_bytes: number };
  runtime: { node_version: string; env: string };
  uptime_s: number;
  timestamp: string;
};

function fmtUptime(s: number): string {
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s % 60}s`;
}

function fmtSize(bytes: number): string {
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("ca-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

type Health = "ok" | "warn" | "crit";

function heapHealth(used: number): Health {
  const mb = used / (1024 * 1024);
  if (mb > 500) return "crit";
  if (mb > 300) return "warn";
  return "ok";
}

function rssHealth(bytes: number): Health {
  const mb = bytes / (1024 * 1024);
  if (mb > 500) return "crit";
  if (mb > 350) return "warn";
  return "ok";
}

function latencyHealth(ms: number): Health {
  if (ms > 200) return "crit";
  if (ms > 50)  return "warn";
  return "ok";
}

const HEALTH_BAR: Record<Health, string> = {
  ok:   "bg-emerald-500",
  warn: "bg-amber-400",
  crit: "bg-red-500",
};

const HEALTH_TEXT: Record<Health, string> = {
  ok:   "text-emerald-600",
  warn: "text-amber-600",
  crit: "text-red-600",
};

const HEALTH_BADGE: Record<Health, string> = {
  ok:   "text-emerald-600 bg-emerald-50",
  warn: "text-amber-600 bg-amber-50",
  crit: "text-red-600 bg-red-50",
};

const HEALTH_LABEL: Record<Health, string> = {
  ok:   "",
  warn: "Atenció",
  crit: "Crític",
};

function HealthBadge({ h }: { h: Health }) {
  if (h === "ok") return null;
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${HEALTH_BADGE[h]}`}>
      {HEALTH_LABEL[h]}
    </span>
  );
}

function LatencyBadge({ ms }: { ms: number }) {
  const h = latencyHealth(ms);
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${HEALTH_BADGE[h]}`}>{ms} ms</span>
  );
}

function StatusDot({ ok }: { ok: boolean }) {
  return (
    <span className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${ok ? "bg-emerald-500" : "bg-red-500"}`} />
  );
}

type Outage = { id: number; detected_at: string; resolved_at: string | null; duration_s: number | null };

export default function AdminStatus() {
  const [data, setData]       = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [outages, setOutages] = useState<Outage[]>([]);
  const intervalRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const errorSinceRef  = useRef<string | null>(null);
  const wasErrorRef    = useRef(false);

  const fetchStatus = useCallback(async (silent = false) => {
    if (!silent) setRefreshing(true);
    try {
      const d = await api.getStatus();
      if (wasErrorRef.current && errorSinceRef.current) {
        const resolved_at = new Date().toISOString();
        const duration_s  = Math.floor((Date.now() - new Date(errorSinceRef.current).getTime()) / 1000);
        try {
          await api.logOutage(errorSinceRef.current, resolved_at, duration_s);
          api.getOutages().then(setOutages).catch(() => {});
        } catch {}
        errorSinceRef.current = null;
      }
      wasErrorRef.current = false;
      setError(false);
      setData(d);
    } catch {
      if (!wasErrorRef.current) errorSinceRef.current = new Date().toISOString();
      wasErrorRef.current = true;
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    api.getOutages().then(setOutages).catch(() => {});
    intervalRef.current = setInterval(() => fetchStatus(true), 30_000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [fetchStatus]);

  const apiOk = !error && !!data;

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <div className="bg-white border-b border-slate-200 sticky top-12 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="font-semibold text-slate-800 text-sm">Monitor de salut</h1>
            {data && (
              <span className="text-xs text-slate-400">Actualitzat a les {fmtTime(data.timestamp)}</span>
            )}
          </div>
          <button
            onClick={() => fetchStatus()}
            disabled={refreshing || loading}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-xl transition disabled:opacity-40">
            <svg className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualitzar
          </button>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4">

        {/* Last known state banner */}
        {error && data && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-start gap-3">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-700">API no disponible</p>
              <p className="text-xs text-amber-600 mt-0.5">Mostrant últims valors coneguts a les {fmtTime(data.timestamp)}</p>
            </div>
          </div>
        )}

        {/* Status cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          {/* API */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">API</p>
              {loading ? <div className="w-2.5 h-2.5 rounded-full bg-slate-200 animate-pulse" /> : <StatusDot ok={apiOk} />}
            </div>
            <p className={`text-2xl font-bold ${apiOk ? "text-emerald-600" : "text-red-500"}`}>
              {loading ? "—" : apiOk ? "En línia" : "Fora de línia"}
            </p>
            {data && (
              <p className="text-xs text-slate-400 mt-1">Actiu fa {fmtUptime(data.uptime_s)}</p>
            )}
          </div>

          {/* DB */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Base de dades</p>
              {loading ? <div className="w-2.5 h-2.5 rounded-full bg-slate-200 animate-pulse" /> : <StatusDot ok={!!data?.db.ok} />}
            </div>
            <p className={`text-2xl font-bold ${data?.db.ok ? "text-emerald-600" : "text-red-500"}`}>
              {loading ? "—" : data?.db.ok ? "Connectada" : "Error"}
            </p>
            {data?.db.ok && (
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-slate-400">Latència</p>
                <LatencyBadge ms={data.db.latency_ms} />
              </div>
            )}
          </div>

          {/* Uploads */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Arxius pujats</p>
              <StatusDot ok={true} />
            </div>
            <p className="text-2xl font-bold text-slate-800">
              {loading ? "—" : fmtSize(data?.uploads.size_bytes ?? 0)}
            </p>
            {data && (
              <p className="text-xs text-slate-400 mt-1">{data.uploads.file_count} fitxer{data.uploads.file_count !== 1 ? "s" : ""}</p>
            )}
          </div>

        </div>

        {/* Process info */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Procés del servidor</h2>
          </div>
          <div className="divide-y divide-slate-100">

            {/* Memory */}
            <div className="px-6 py-4 flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-600">Memòria (heap)</p>
                  {data?.memory && <HealthBadge h={heapHealth(data.memory.heap_used_bytes)} />}
                </div>
                {data?.memory && (
                  <div className="mt-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{fmtSize(data.memory.heap_used_bytes)} usats</span>
                      <span>{fmtSize(data.memory.heap_total_bytes)} total</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${HEALTH_BAR[heapHealth(data.memory.heap_used_bytes)]} rounded-full transition-all`}
                        style={{ width: `${Math.min(100, (data.memory.heap_used_bytes / data.memory.heap_total_bytes) * 100).toFixed(1)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {data?.memory && <HealthBadge h={rssHealth(data.memory.rss_bytes)} />}
                <p className={`text-sm font-semibold shrink-0 ${data ? HEALTH_TEXT[rssHealth(data.memory.rss_bytes)] : "text-slate-800"}`}>
                  {loading ? "—" : fmtSize(data?.memory.rss_bytes ?? 0)}
                  <span className="text-xs text-slate-400 font-normal ml-1">RSS</span>
                </p>
              </div>
            </div>

            {/* Node version */}
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 flex-1">Node.js</p>
              <p className="text-sm font-semibold text-slate-800 font-mono">
                {loading ? "—" : data?.runtime.node_version ?? "—"}
              </p>
            </div>

            {/* Environment */}
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 flex-1">Entorn</p>
              {loading ? <span className="text-sm text-slate-400">—</span> : (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${data?.runtime.env === "production" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {data?.runtime.env ?? "—"}
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Outage history */}
        {outages.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800">Historial de caigudes</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {outages.map((o) => (
                <div key={o.id} className="flex items-center gap-3 px-6 py-3">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${o.resolved_at ? "bg-slate-300" : "bg-red-500 animate-pulse"}`} />
                  <p className="text-sm text-slate-600 flex-1">
                    {new Date(o.detected_at).toLocaleString("ca-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                  {o.duration_s != null && (
                    <span className="text-xs text-slate-400">{fmtUptime(o.duration_s)}</span>
                  )}
                  {o.resolved_at ? (
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Resolta</span>
                  ) : (
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">En curs</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Auto-refresh notice */}
        <p className="text-xs text-slate-400 text-center">S'actualitza automàticament cada 30 segons</p>

      </main>
    </div>
  );
}
