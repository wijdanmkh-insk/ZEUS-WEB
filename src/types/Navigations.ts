// src/types/navigation.ts
export type PageID = 'DASHBOARD' | 'PERANGKAT' | 'MARKETPLACE' | 'MAINTENANCE' | 'PENGATURAN';

export interface MenuItem {
  id: PageID;
  label: string;
  icon: string; // Kita gunakan string emoji/icon representatif sederhana
}