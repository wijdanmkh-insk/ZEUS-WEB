// src/pages/DashboardOverview.tsx
import React from 'react';

export const DashboardOverview: React.FC = () => {
  // Mock Data untuk Visualisasi Status Tempat Sampah Perusahaan
  const dataSampahHarian = [
    { hari: 'Senin', organik: '45kg', anorganik: '12kg', total: 57, status: 'NORMAL' },
    { hari: 'Selasa', organik: '50kg', anorganik: '18kg', total: 68, status: 'NORMAL' },
    { hari: 'Rabu', organik: '75kg', anorganik: '40kg', total: 115, status: 'PENUH' },
    { hari: 'Kamis', organik: '40kg', anorganik: '15kg', total: 55, status: 'NORMAL' },
    { hari: 'Jumat', organik: '65kg', anorganik: '30kg', total: 95, status: 'WARNING' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-brand-border/30 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-light">Log Akumulasi Sampah Harian</h2>
          <p className="text-xs text-brand-muted">Metrik klasifikasi Edge AI YOLOv8 untuk optimalisasi rute janitor.</p>
        </div>
        <div className="text-xs bg-brand-surface border border-brand-border/60 px-3 py-1.5 rounded-lg text-brand-accent font-mono">
          Live Sync State: Connected
        </div>
      </div>

      {/* Grid Kartu Indikator Cepat */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-brand-surface/40 border border-brand-border/50 p-4 rounded-xl">
          <span className="text-xs font-semibold text-brand-muted uppercase">Rata-rata Volume / Hari</span>
          <p className="text-3xl font-black text-brand-accent mt-1">78.2 <span className="text-sm font-normal text-brand-light">Kg</span></p>
        </div>
        <div className="bg-brand-surface/40 border border-brand-border/50 p-4 rounded-xl">
          <span className="text-xs font-semibold text-brand-muted uppercase">Titik Kontainer Kritis</span>
          <p className="text-3xl font-black text-brand-warning mt-1">1 <span className="text-sm font-normal text-brand-light">Unit</span></p>
        </div>
        <div className="bg-brand-surface/40 border border-brand-border/50 p-4 rounded-xl">
          <span className="text-xs font-semibold text-brand-muted uppercase">Efisiensi Waktu Janitor</span>
          <p className="text-3xl font-black text-brand-light mt-1">+42%</p>
        </div>
      </div>

      {/* Tabel Data Akumulasi */}
      <div className="bg-brand-surface/30 border border-brand-border/40 rounded-xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 bg-brand-surface/70 border-b border-brand-border/40">
          <h3 className="text-sm font-bold tracking-wide uppercase text-brand-accent">Rincian Klaster Hari Ini</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-brand-bg/50 text-brand-muted font-mono uppercase text-[11px] tracking-wider border-b border-brand-border/30">
                <th className="p-4">Hari</th>
                <th className="p-4">Klaster Organik</th>
                <th className="p-4">Klaster Anorganik</th>
                <th className="p-4">Total Berat</th>
                <th className="p-4 text-center">Status Kontainer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/20">
              {dataSampahHarian.map((row, index) => (
                <tr key={index} className="hover:bg-brand-surface/20 transition-colors">
                  <td className="p-4 font-bold text-brand-light">{row.hari}</td>
                  <td className="p-4 text-brand-muted">{row.organik}</td>
                  <td className="p-4 text-brand-muted">{row.anorganik}</td>
                  <td className="p-4 font-semibold text-brand-accent">{row.total} Kg</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                      row.status === 'PENUH' ? 'bg-brand-error/10 border-brand-error text-brand-error' :
                      row.status === 'WARNING' ? 'bg-brand-warning/10 border-brand-warning text-brand-warning' :
                      'bg-brand-accent/10 border-brand-accent text-brand-accent'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};