// src/components/ConfirmModal.tsx
import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary' | 'success';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  variant = 'primary',
  onConfirm,
  onCancel,
}) => {
  // Jika modal tidak aktif, jangan render apapun
  if (!isOpen) return null;

  // Tentukan skema warna berdasarkan varian aksi
  const buttonStyles = {
    danger: 'bg-brand-error hover:bg-brand-error/80 text-brand-light',
    success: 'bg-brand-accent hover:bg-brand-accent/80 text-brand-bg',
    primary: 'bg-brand-interactive hover:bg-brand-interactive/80 text-brand-light',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Lapisan Belakang Gelap */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onCancel}
      />

      {/* Kontainer Kotak Modal */}
      <div className="relative w-full max-w-md bg-brand-surface border border-brand-border rounded-xl p-6 shadow-2xl animate-fadeIn z-10 text-center sm:text-left">
        
        {/* Header Title */}
        <div className="flex items-center gap-3 border-b border-brand-border/30 pb-3 mb-4 justify-center sm:justify-start">
          {variant === 'danger' && <span className="text-xl">⚠️</span>}
          {variant === 'success' && <span className="text-xl">✓</span>}
          <h3 className="text-base font-bold text-brand-light tracking-wide">{title}</h3>
        </div>

        {/* Konten Pesan */}
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
          {message}
        </p>

        {/* Tombol Aksi Pilihan */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 font-semibold">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-brand-bg/60 border border-brand-border text-brand-muted hover:text-brand-light text-xs uppercase tracking-wider cursor-pointer transition-all"
          >
            {cancelLabel}
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            className={`w-full sm:w-auto px-5 py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-all shadow-md ${buttonStyles[variant]}`}
          >
            {confirmLabel}
          </button>
        </div>

      </div>
    </div>
  );
};