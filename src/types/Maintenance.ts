// src/types/maintenance.ts
export interface MaintenanceDevice {
  id: string;
  nodeCode: string;
  location: string;
  purchaseDate: string; // Format: YYYY-MM-DD
}

/**
 * Fungsi untuk menghitung selisih hari menuju batas 3 bulan (90 hari) dari tanggal pembelian
 * Menggunakan tanggal saat ini (Mei 2026) sebagai acuan dinamis
 */
export const calculateMaintenanceDays = (purchaseDateStr: string) => {
  const purchaseDate = new Date(purchaseDateStr);
  const currentDate = new Date(); // Hari ini (Sistem otomatis membaca waktu real 2026)
  
  // Hitung tanggal jatuh tempo maintenance (Pembelian + 90 Hari / 3 Bulan)
  const dueDate = new Date(purchaseDate.getTime() + (90 * 24 * 60 * 60 * 1000));
  
  // Selisih milidetik antara jatuh tempo dan hari ini
  const diffTime = dueDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return {
    daysRemaining: diffDays,
    isOverdue: diffDays <= 0,
    dueDateStr: dueDate.toISOString().split('T')[0]
  };
};