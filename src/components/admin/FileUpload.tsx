"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";

export function FileUpload({
  label,
  accept,
  endpoint,
  onSuccess,
  hint,
  extraFormData,
}: {
  label: string;
  accept: string;
  endpoint: string;
  onSuccess: (url: string) => void;
  hint?: string;
  extraFormData?: Record<string, string>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    if (extraFormData) {
      Object.entries(extraFormData).forEach(([k, v]) => formData.append(k, v));
    }

    const res = await fetch(endpoint, { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);

    if (!res.ok) {
      setError(data.error || "Upload failed");
      return;
    }

    onSuccess(data.url);
  }

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-white">{label}</legend>
      {hint && <p className="text-xs text-[var(--color-muted)]">{hint}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <button
        type="button"
        className="btn-secondary text-sm"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        <Upload size={16} />
        {uploading ? "Uploading…" : "Choose file"}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </fieldset>
  );
}
