// src/pages/DashboardPage.tsx
import React from 'react';

// Mock Data Node Kontainer ZEUS berbasis data sensor HC-SR04 dan counter YOLOv8
const klasterPerangkatZEUS = [
  { 
    nodeCode: 'ZEUS-ALPHA01', 
    location: 'Lantai 1 - Lobi Utama', 
    jarakSensor: '15 cm', 
    kapasitasTerisi: 85, // Persentase volume terisi
    counterOrganik: 142, // Jumlah sampah masuk terdeteksi
    counterAnorganik: 89,
    status: 'PENUH' 
  },
  { 
    nodeCode: 'ZEUS-BETA02', 
    location: 'Lantai 2 - Koridor Barat', 
    jarakSensor: '42 cm', 
    kapasitasTerisi: 58, 
    counterOrganik: 95, 
    counterAnorganik: 110,
    status: 'NORMAL' 
  },
  { 
    nodeCode: 'ZEUS-GAMMA03', 
    location: 'Area Basement - Kantin', 
    jarakSensor: '23 cm', 
    kapasitasTerisi: 77, 
    counterOrganik: 230, 
    counterAnorganik: 185,
    status: 'WARNING' 
  },
];

export const DashboardPage: React.FC = () => {
  // Kalkulasi agregasi total untuk widget indikator cepat
  const totalOrganikSistem = klasterPerangkatZEUS.reduce((sum, item) => sum + item.counterOrganik, 0);
  const totalAnorganikSistem = klasterPerangkatZEUS.reduce((sum, item) => sum + item.counterAnorganik, 0);
  const kontainerKritis = klasterPerangkatZEUS.filter(item => item.kapasitasTerisi >= 75).length;

  return (
    <>
        <div className="space-y-6 my-10">
          {/* Top Title */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-brand-border/30 pb-4">
            <div>
              <h1 className="text-5xl font-bold text-brand-light">Dashboard</h1>
              <p className="text-sm text-brand-muted pt-8">Untuk melihat kapasitas tempat sampah saat ini, silahkan lihat semuanya disini</p>
            </div>
          </div>

          {/* Grid Kartu Indikator Cepat (Logger Global Akumulatif) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-brand-surface/40 border border-brand-border/50 p-4 rounded-xl">
              <span className="text-xs font-semibold text-brand-muted uppercase">Total Item Organik Masuk</span>
              <p className="text-3xl font-black text-brand-accent mt-1">
                {totalOrganikSistem} <span className="text-xs font-normal text-brand-light">objek</span>
              </p>
            </div>
            <div className="bg-brand-surface/40 border border-brand-border/50 p-4 rounded-xl">
              <span className="text-xs font-semibold text-brand-muted uppercase">Total Item Anorganik Masuk</span>
              <p className="text-3xl font-black text-brand-interactive mt-1">
                {totalAnorganikSistem} <span className="text-xs font-normal text-brand-light">objek</span>
              </p>
            </div>
            <div className="bg-brand-surface/40 border border-brand-border/50 p-4 rounded-xl">
              <span className="text-xs font-semibold text-brand-muted uppercase">Bin Kritis (Kapasitas &ge; 75%)</span>
              <p className="text-3xl font-black text-brand-warning mt-1">
                {kontainerKritis} <span className="text-xs font-normal text-brand-light">Node</span>
              </p>
            </div>
          </div>

          {/* Tabel Manifes Logger Kapasitas & Penghitung Sampah Masuk */}
          <div className="bg-brand-surface/30 border border-brand-border/40 rounded-xl overflow-hidden shadow-lg">
            <div className="px-5 py-4 bg-brand-surface/70 border-b border-brand-border/40">
              <h3 className="text-sm font-bold tracking-wide uppercase text-brand-accent">Status Real-Time Node Produksi</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-bg/50 text-brand-muted font-mono uppercase text-[10px] tracking-wider border-b border-brand-border/30">
                    <th className="p-4">Kode Node</th>
                    <th className="p-4">Lokasi Penempatan</th>
                    <th className="p-4 text-center">Jarak Pantulan (Sisa Ruang)</th>
                    <th className="p-4">Kapasitas Terisi (%)</th>
                    <th className="p-4 text-center">Logger Organik</th>
                    <th className="p-4 text-center">Logger Anorganik</th>
                    <th className="p-4 text-center">Status Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/20">
                  {klasterPerangkatZEUS.map((node, index) => (
                    <tr key={index} className="hover:bg-brand-surface/20 transition-colors">
                      <td className="p-4 font-mono font-bold text-brand-light">{node.nodeCode}</td>
                      <td className="p-4 text-brand-muted">{node.location}</td>
                      {/* Jarak Sensor ultrasonik ke tumpukan sampah */}
                      <td className="p-4 text-center font-mono text-brand-muted">{node.jarakSensor}</td>
                      
                      {/* Kapasitas Persentase Terisi + Progress Bar Minimalis */}
                      <td className="p-4 w-48">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-brand-light min-w-[32px] text-right">{node.kapasitasTerisi}%</span>
                          <div className="w-full bg-brand-bg/60 rounded-full h-2 overflow-hidden border border-brand-border/30">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                node.kapasitasTerisi >= 80 ? 'bg-brand-error' :
                                node.kapasitasTerisi >= 70 ? 'bg-brand-warning' : 'bg-brand-accent'
                              }`}
                              style={{ width: `${node.kapasitasTerisi}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Cacah item yang masuk berdasarkan klasifikasi model AI */}
                      <td className="p-4 text-center font-mono text-brand-accent font-semibold">{node.counterOrganik}x</td>
                      <td className="p-4 text-center font-mono text-brand-interactive font-semibold">{node.counterAnorganik}x</td>
                      
                      {/* Status Kontainer untuk Panduan Janitor */}
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                          node.status === 'PENUH' ? 'bg-brand-error/10 border-brand-error text-brand-error animate-pulse' :
                          node.status === 'WARNING' ? 'bg-brand-warning/10 border-brand-warning text-brand-warning' :
                          'bg-brand-accent/10 border-brand-accent text-brand-accent'
                        }`}>
                          {node.status === 'PENUH' ? '🚨 COBA AMBIL' : node.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

    </>
  );
}