"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Image, Upload, Check, X, AlertCircle } from "lucide-react";

export default function AdminLogoPage() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setResult(null);
    if (!f.type.startsWith("image/")) {
      setResult({ type: "error", message: "Only image files are allowed." });
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setResult({ type: "error", message: "File is too large. Maximum 5MB." });
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("logo", file);

    try {
      const res = await fetch("/api/upload/logo", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setResult({ type: "success", message: data.message });
        setFile(null);
        setPreview(null);
      } else {
        setResult({ type: "error", message: data.error || "Upload failed." });
      }
    } catch {
      setResult({ type: "error", message: "Network error. Please try again." });
    }
    setUploading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Image className="text-red-bright" size={28} />
        <h1 className="font-anton text-3xl text-ink">Logo</h1>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-surface border border-line p-6">
          <h2 className="font-semibold text-ink mb-1">Upload Logo</h2>
          <p className="text-sm text-muted mb-5">
            Upload your store logo (PNG or SVG, max 5MB).
          </p>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed p-10 text-center cursor-pointer transition ${
              dragOver
                ? "border-red-bright bg-red/10"
                : "border-line hover:border-muted bg-surface-2"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/svg+xml,image/jpeg,image/webp"
              onChange={handleInput}
              className="hidden"
            />
            {preview ? (
              <div className="space-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-32 mx-auto object-contain"
                />
                <p className="text-sm text-muted">{file?.name}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setPreview(null);
                  }}
                  className="text-xs text-red-bright hover:text-red underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="mx-auto text-muted" size={36} />
                <p className="text-sm text-muted">
                  Drop your logo here or click to browse
                </p>
                <p className="text-xs text-muted">PNG or SVG · Max 5MB</p>
              </div>
            )}
          </div>

          {file && !uploading && (
            <button
              onClick={handleUpload}
              className="mt-4 w-full bg-red hover:bg-red-bright text-white py-3 font-semibold uppercase tracking-wider text-sm transition flex items-center justify-center gap-2"
            >
              <Upload size={18} />
              Upload Logo
            </button>
          )}

          {uploading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-bright" />
              Uploading...
            </div>
          )}

          {result && (
            <div
              className={`mt-4 flex items-start gap-3 p-4 text-sm ${
                result.type === "success"
                  ? "bg-green-900/30 text-green-400 border border-green-900"
                  : "bg-red/10 text-red-bright border border-red/30"
              }`}
            >
              {result.type === "success" ? (
                <Check size={18} className="shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
              )}
              <span>{result.message}</span>
            </div>
          )}
        </div>

        <div className="bg-surface border border-line p-6">
          <h2 className="font-semibold text-ink mb-3">Current Logo</h2>
          <div className="bg-surface-2 p-6 flex items-center justify-center border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/logo.png?t=${Date.now()}`}
              alt="Current logo"
              className="max-h-24 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `/logo.svg?t=${Date.now()}`;
              }}
            />
          </div>
          <p className="text-xs text-muted mt-2 text-center">
            Displayed as /logo.png site-wide
          </p>
        </div>
      </div>
    </div>
  );
}