// src/layouts/Template.tsx
import React from 'react';
import { Sidebar } from '../components/Sidebar';
import type { PageID, MenuItem } from '../types/Navigations';
import { LayoutDashboard, MonitorSmartphone, Store, Wrench, UserRoundCog } from 'lucide-react';

interface TemplateProps {
  currentPage: PageID;
  onPageChange: (page: PageID) => void;
  onLogout: () => void;
  children: React.ReactNode; // Tempat khusus untuk menampung page komponen
}

// Konfigurasi daftar menu kustom (Sangat mudah ditambah link baru di sini)
const APP_MENU: MenuItem[] = [
  { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'PERANGKAT', label: 'Perangkat', icon: MonitorSmartphone },
  { id: 'MAINTENANCE', label: 'Pemeliharaan', icon: Wrench },
  { id: 'SETTINGS', label: 'Pengaturan', icon: UserRoundCog }
];

export const Template: React.FC<TemplateProps> = ({ currentPage, onPageChange, onLogout, children }) => {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-light flex flex-col lg:flex-row font-sans overflow-x-hidden">
      
      {/* Sidebar Component Frame */}
      <Sidebar 
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLogout={onLogout}
        menuItems={APP_MENU}
      />

      {/* Main Viewport Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto h-auto lg:h-screen">
        <div className="max-w-7xl mx-auto animate-fadeIn">
          {children}
        </div>
      </main>

    </div>
  );
};