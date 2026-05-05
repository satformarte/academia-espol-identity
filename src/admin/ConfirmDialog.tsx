import { useEffect } from "react";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  danger?: boolean;
  success?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ConfirmDialog({ open, title, description, confirmLabel, danger = false, success = false, onConfirm, onCancel }: Props) {
  const label = confirmLabel ?? (success ? "D'acord" : "Confirmar");

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") (onCancel ?? onConfirm)(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel, onConfirm]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel ?? onConfirm} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${danger ? "bg-red-100" : success ? "bg-emerald-100" : "bg-blue-100"}`}>
          {danger ? (
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ) : success ? (
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        {/* Text */}
        <div className="text-center space-y-1.5">
          <h2 className="font-bold text-slate-800 text-base">{title}</h2>
          {description && <p className="text-sm text-slate-500 leading-relaxed">{description}</p>}
        </div>

        {/* Actions */}
        <div className={`flex gap-2 pt-1 ${success ? "justify-center" : ""}`}>
          {!success && onCancel && (
            <button onClick={onCancel}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
              Cancel·lar
            </button>
          )}
          <button onClick={onConfirm}
            className={`px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition ${success ? "bg-emerald-600 hover:bg-emerald-700 min-w-[120px]" : danger ? "flex-1 bg-red-600 hover:bg-red-700" : "flex-1 bg-blue-600 hover:bg-blue-700"}`}>
            {label}
          </button>
        </div>
      </div>
    </div>
  );
}
