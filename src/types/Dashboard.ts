// src/types/dashboard.ts
export type ActiveView = 'DASHBOARD' | 'PERANGKAT' | 'MAINTENANCE' | 'PENGATURAN';

export interface SidebarMenuItem {
  id: ActiveView;
  label: string;
  icon: string; // Menggunakan string emoji/karakter sebagai representasi icon agar mandiri tanpa dependensi external
}