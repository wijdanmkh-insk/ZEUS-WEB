// src/pages/MaintenancePage.tsx
import React, { useState } from 'react';
import type { MaintenanceDevice } from '../types/Maintenance';
import { calculateMaintenanceDays } from '../types/Maintenance';

export const MaintenancePage: React.FC = () => {
  // Mock Data: Manifes perangkat keras ZEUS beserta tanggal pembeliannya
  const [maintenanceList, setMaintenanceList] = useState<MaintenanceDevice[]>([
    { id: '1', nodeCode: 'ZEUS-ALPHA01', location: 'Lantai 1 - Lobi Utama', purchaseDate: '2026-02-10' }, // Sudah > 90 hari (Kritis)
    { id: '2', nodeCode: 'ZEUS-BETA02', location: 'Lantai 2 - Koridor Barat', purchaseDate: '2026-02-20' }, // Sudah > 90 hari (Kritis)
    { id: '3', nodeCode: 'ZEUS-GAMMA03', location: 'Area Basement - Kantin', purchaseDate: '2026-04-01' }, // Masih aman (< 90 hari)
    { id: '4', nodeCode: 'ZEUS-DELTA04', location: 'Gedung C - Lab Edge AI', purchaseDate: '2026-05-15' },  // Sangat baru
  ]);

  // Handler simulasi klik tombol "Selesai Maintenance" (Mereset siklus ke hari ini)
  const handleMarkAsMaintained = (id: string, nodeCode: string) => {
    const confirmAction = window.confirm(`Apakah Anda sudah selesai melakukan kalibrasi sensor visi komputer pada node ${nodeCode}?`);
    if (confirmAction) {
      const todayStr = new Date().toISOString().split('T')[0];
      setMaintenanceList(prevList => 
        prevList.map(device => 
          device.id === id ? { ...device, purchaseDate: todayStr } : device
        )
      );
    }
  };

  return (
    <div className="space-y-6 my-10">
      {/* Header Deskripsi */}
      <div className="border-b border-brand-border/30 pb-4">
        <h2 className="text-4xl font-bold text-brand-light">Sistem Pemeliharaan Berkala</h2>
        <p className="text-s text-brand-muted pt-4">
          Sesuai SOP teknis, sasis Edge AI ZEUS wajib dikalibrasi dan dibersihkan setiap <b>3 bulan (90 hari)</b> guna menjaga akurasi deteksi model YOLOv8.
        </p>
      </div>

      {/* Grid Status Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-brand-error/10 border border-brand-error/30 p-4 rounded-xl flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold text-brand-muted uppercase">Node Perlu Pemeliharaan</span>
            <p className="text-2xl font-black text-brand-error mt-0.5">
              {maintenanceList.filter(d => calculateMaintenanceDays(d.purchaseDate).isOverdue).length} Perangkat
            </p>
          </div>
          <span className="text-2xl">⚠️</span>
        </div>
        
        <div className="bg-brand-accent/10 border border-brand-accent/30 p-4 rounded-xl flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold text-brand-muted uppercase">Node Kondisi Prima</span>
            <p className="text-2xl font-black text-brand-accent mt-0.5">
              {maintenanceList.filter(d => !calculateMaintenanceDays(d.purchaseDate).isOverdue).length} Perangkat
            </p>
          </div>
          <span className="text-2xl">✓</span>
        </div>
      </div>

      {/* Tabel Utama Manifes Kontrol Teknis */}
      <div className="bg-brand-surface/20 border border-brand-border/30 rounded-xl overflow-hidden shadow-xl">
        <div className="px-5 py-4 bg-brand-surface/50 border-b border-brand-border/40">
          <h3 className="text-sm font-bold tracking-wide uppercase text-brand-accent">
            Jadwal Kronologis & Hitung Mundur Siklus Perangkat
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-brand-bg/40 text-brand-muted font-mono uppercase text-[10px] tracking-wider border-b border-brand-border/30">
                <th className="p-4">Kode Node</th>
                <th className="p-4">Lokasi Penempatan</th>
                <th className="p-4 hidden sm:table-cell">Tanggal Baseline/Beli</th>
                <th className="p-4">Estimasi Batas Akhir</th>
                <th className="p-4 text-center">Status & Hitungan Hari</th>
                <th className="p-4 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/20">
              {maintenanceList.map((device) => {
                const { daysRemaining, isOverdue, dueDateStr } = calculateMaintenanceDays(device.purchaseDate);

                return (
                  <tr key={device.id} className={`hover:bg-brand-surface/20 transition-colors ${isOverdue ? 'bg-brand-error/5' : ''}`}>
                    <td className="p-4 font-mono font-bold text-brand-light tracking-wide">
                      {device.nodeCode}
                    </td>
                    <td className="p-4 text-brand-muted font-medium">
                      {device.location}
                    </td>
                    <td className="p-4 text-brand-muted/70 hidden sm:table-cell font-mono">
                      {device.purchaseDate}
                    </td>
                    <td className="p-4 text-brand-light font-mono">
                      {dueDateStr}
                    </td>
                    
                    {/* Status & Perhitungan Waktu Hari */}
                    <td className="p-4 text-center">
                      {isOverdue ? (
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 bg-brand-error/20 border border-brand-error text-brand-error text-[10px] font-bold rounded-md uppercase tracking-wider">
                            CRITICAL / PERLU MAINTENANCE
                          </span>
                          <p className="text-[11px] text-brand-error font-mono font-bold">
                            Terlambat {Math.abs(daysRemaining)} hari!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 bg-brand-accent/20 border border-brand-accent text-brand-accent text-[10px] font-bold rounded-md uppercase tracking-wider">
                            OPERASIONAL AMAN
                          </span>
                          <p className="text-[11px] text-brand-accent font-mono font-medium">
                            Sisa {daysRemaining} hari lagi
                          </p>
                        </div>
                      )}
                    </td>

                    {/* Tombol Eksekusi Reset Siklus Teknis */}
                    <td className="p-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleMarkAsMaintained(device.id, device.nodeCode)}
                        className={`px-3 py-1.5 font-bold rounded-lg text-[11px] uppercase tracking-wider cursor-pointer transition-all border shadow-sm ${
                          isOverdue
                            ? 'bg-brand-accent hover:bg-brand-accent/80 text-brand-bg border-brand-accent/20'
                            : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-light'
                        }`}
                      >
                        {isOverdue ? '🛠 Kalibrasi Sekarang' : '✓ Reset Siklus'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};