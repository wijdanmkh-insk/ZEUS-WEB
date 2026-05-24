// src/types/device.ts
export interface DeviceItem {
  id: string;          // ID unik internal untuk key React (UUID/Timestamp)
  nodeCode: string;    // Kode hardware (Contoh: ZEUS-NODE01)
  location: string;    // Lokasi penempatan fisik di perusahaan
  createdAt: string;   // Tanggal integrasi perangkat
}