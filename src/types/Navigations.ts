// src/types/navigation.ts
import { type LucideIcon } from 'lucide-react';
export type PageID = 'DASHBOARD' | 'PERANGKAT' | 'MAINTENANCE' | 'SETTINGS';


export interface MenuItem {
  id: PageID;
  label: string;
  icon: LucideIcon; // Kita gunakan komponen LucideIcon sebagai representasi ikon
}