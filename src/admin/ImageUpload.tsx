import { useEffect, useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { API_BASE as API } from "@/lib/api";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState(false);

  useEffect(() => { setImgError(false); }, [value]);

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API}/api/uploads`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al pujar");
      onChange(data.url);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    // Si és un fitxer pujat al servidor, l'eliminem també del disc
    if (value.startsWith("/uploads/")) {
      const filename = value.split("/").pop();
      await fetch(`${API}/api/uploads/${filename}`, {
        method: "DELETE",
        credentials: "include",
      }).catch(() => {});
    }
    onChange("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>}

      {value && !imgError && (
        <div className="relative w-full h-36 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
          <img
            src={value.startsWith("/uploads/") ? `${API}${value}` : value}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          <button
            type="button"
            onClick={handleRemove}
            title="Treure imatge"
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <div
        className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            Pujant...
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <Upload size={20} />
            <span className="text-xs">Clica o arrossega una imatge</span>
            <span className="text-[10px]">JPG, PNG, WEBP, SVG · màx 5MB</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <ImageIcon size={13} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="O enganxa una URL directament"
          className="flex-1 text-xs border border-gray-200 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}
