// src/pages/DevicesPage.tsx
import React, { useState } from 'react';
import type { DeviceItem } from '../types/Devices'

export const DevicesPage: React.FC = () => {
  // Mock data awal: Daftar urutan perangkat yang sudah terhubung di sistem perusahaan
  const [devices, setDevices] = useState<DeviceItem[]>([
    { id: '1', nodeCode: 'ZEUS-ALPHA01', location: 'Lantai 1 - Lobi Utama', createdAt: '2026-05-10' },
    { id: '2', nodeCode: 'ZEUS-BETA02', location: 'Lantai 2 - Koridor Barat', createdAt: '2026-05-12' },
    { id: '3', nodeCode: 'ZEUS-GAMMA03', location: 'Area Basement - Kantin', createdAt: '2026-05-15' },
  ]);

  // Form States
  const [newNodeCode, setNewNodeCode] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Handler Tambah Perangkat Baru
  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validasi input
    if (!newNodeCode.trim() || !newLocation.trim()) {
      setError('Kode perangkat dan lokasi penempatan wajib diisi!');
      return;
    }

    if (!newNodeCode.toUpperCase().startsWith('ZEUS-')) {
      setError('Format kode tidak valid! Harus diawali dengan "ZEUS-" (Contoh: ZEUS-NODE99).');
      return;
    }

    // Cek duplikasi kode node keras
    if (devices.some(d => d.nodeCode.toUpperCase() === newNodeCode.toUpperCase())) {
      setError('Kode perangkat ini sudah terdaftar di klaster sistem Anda.');
      return;
    }

    const newDevice: DeviceItem = {
      id: Date.now().toString(), // Generator ID unik sederhana
      nodeCode: newNodeCode.toUpperCase().trim(),
      location: newLocation.trim(),
      createdAt: new Date().toISOString().split('T')[0], // Tanggal hari ini (YYYY-MM-DD)
    };

    setDevices([...devices, newDevice]);
    setSuccessMessage(`Unit ${newDevice.nodeCode} berhasil diaktifkan di ${newDevice.location}.`);
    
    // Reset form field
    setNewNodeCode('');
    setNewLocation('');
  };

  // Handler Hapus / Putuskan Koneksi Perangkat
  const handleRemoveDevice = (id: string, code: string) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin memutuskan tautkan perangkat ${code}? Janitor tidak akan menerima data dari titik ini lagi.`);
    
    if (confirmDelete) {
      setDevices(devices.filter(device => device.id !== id));
      setSuccessMessage(`Koneksi node ${code} berhasil diputus.`);
    }
  };

  return (
    <div className="space-y-6 my-10">
      {/* Header Halaman */}
      <div className="border-b border-brand-border/30 pb-4">
        <h1 className="text-4xl font-bold text-brand-light">Manajemen Perangkat</h1>
        <p className="text-xs text-brand-muted">Registrasi, deployment, dan monitoring lokasi sasis pintar ZEUS di seluruh area korporat.</p>
      </div>

      {/* Grid Layout: Kiri Form Tambah, Kanan Daftar Manifes Perangkat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* PANEL BARAT (Kiri): Form Registrasi Node Baru */}
        <div className="bg-brand-surface/30 border border-brand-border/40 p-5 rounded-xl h-fit">
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-accent border-b border-brand-border/20 pb-2 mb-4">
            + Registrasi Node Baru
          </h3>

          {error && (
            <div className="mb-4 p-2.5 bg-brand-error/10 border border-brand-error/30 text-brand-error text-xs rounded-lg font-medium">
              ⚠️ {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-2.5 bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-xs rounded-lg font-medium">
              ✓ {successMessage}
            </div>
          )}

          <form onSubmit={handleAddDevice} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-brand-muted uppercase mb-1.5 tracking-wider">Kode Node Perangkat</label>
              <input 
                type="text"
                className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-xs font-mono focus:outline-none focus:border-brand-accent uppercase"
                placeholder="Contoh: ZEUS-LNT10"
                value={newNodeCode}
                onChange={e => setNewNodeCode(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-brand-muted uppercase mb-1.5 tracking-wider">Lokasi Penempatan Fisik</label>
              <input 
                type="text"
                className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-xs focus:outline-none focus:border-brand-accent"
                placeholder="Misal: Gedung Olahraga - Pintu Sayap Kanan"
                value={newLocation}
                onChange={e => setNewLocation(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-brand-interactive hover:bg-brand-interactive/80 text-brand-light font-bold py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-all border border-brand-border/40 shadow-md"
            >
              Integrasikan Perangkat
            </button>
          </form>
        </div>

        {/* PANEL TIMUR (Kanan): Manifes Urutan Perangkat yang Terhubung */}
        <div className="lg:col-span-2 bg-brand-surface/20 border border-brand-border/30 rounded-xl overflow-hidden shadow-xl">
          <div className="px-5 py-4 bg-brand-surface/50 border-b border-brand-border/40 flex justify-between items-center">
            <h3 className="text-sm font-bold tracking-wide uppercase text-brand-accent">Manifes Urutan Perangkat Terpasang</h3>
            <span className="text-[11px] bg-brand-interactive/20 text-brand-light border border-brand-border px-2.5 py-0.5 rounded-full font-mono">
              Total: {devices.length} Nodes
            </span>
          </div>

          {devices.length === 0 ? (
            <div className="p-12 text-center text-brand-muted font-mono text-xs">
              [WARNING] Tidak ada perangkat terdaftar. Janitor tidak dapat menerima antrean data sampah harian.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-bg/40 text-brand-muted font-mono uppercase text-[10px] tracking-wider border-b border-brand-border/30">
                    <th className="p-4 w-16 text-center">No. Urut</th>
                    <th className="p-4">Kode Node Perangkat</th>
                    <th className="p-4">Lokasi Spesifik</th>
                    <th className="p-4 hidden sm:table-cell">Tanggal Pasang</th>
                    <th className="p-4 text-center">Aksi Operasional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/20">
                  {devices.map((device, index) => (
                    <tr key={device.id} className="hover:bg-brand-surface/20 transition-colors">
                      {/* Urutan Perangkat yang Ditambahkan */}
                      <td className="p-4 text-center font-mono font-bold text-brand-muted/70 bg-brand-bg/10">
                        {index + 1}
                      </td>
                      <td className="p-4 font-mono font-bold text-brand-accent tracking-wide">
                        {device.nodeCode}
                      </td>
                      <td className="p-4 text-brand-light font-medium">
                        {device.location}
                      </td>
                      <td className="p-4 text-brand-muted hidden sm:table-cell font-mono">
                        {device.createdAt}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveDevice(device.id, device.nodeCode)}
                          className="px-3 py-1 bg-brand-error/10 border border-brand-error/30 text-brand-error hover:bg-brand-error hover:text-brand-light rounded-md text-[11px] font-semibold cursor-pointer transition-all"
                        >
                          Putuskan Link
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};