// src/pages/DashboardPage.tsx
import { useState } from 'react';
import { Template } from '../layout/Template';
import { DashboardOverview } from '../components/DashboardOverview';
import type { PageID } from '../types/Navigations';

interface DashboardPageProps {
  onLogout: () => void;
}

export default function DashboardPage({ onLogout }: DashboardPageProps) {
  const [activePage, setActivePage] = useState<PageID>('DASHBOARD');

  return (
    <Template 
      currentPage={activePage} 
      onPageChange={(page) => setActivePage(page)}
      onLogout={onLogout}
    >
      {/* Render halaman secara kondisional berdasarkan activePage state */}
      {activePage === 'DASHBOARD' && <DashboardOverview />}
      
      {activePage === 'PERANGKAT' && (
        <div className="p-4 bg-brand-surface/20 rounded-lg border border-brand-border">
          <h2 className="text-xl font-bold">Node Hardware Status</h2>
          <p className="text-sm text-brand-muted mt-1">Halaman manajemen perangkat keras.</p>
        </div>
      )}
      
      {/* Fallback halaman placeholder lainnya */}
      {['MARKETPLACE', 'MAINTENANCE', 'PENGATURAN'].includes(activePage) && (
        <div className="p-8 text-center text-brand-muted font-mono text-xs">
          [INFO] Komponen modul {activePage} dalam tahap pengembangan frontend...
        </div>
      )}
    </Template>
  );
}