// src/components/Sidebar.tsx
import React, { useState } from 'react';
import type { PageID, MenuItem } from '../types/Navigations';

interface SidebarProps {
  currentPage: PageID;
  onPageChange: (page: PageID) => void;
  onLogout: () => void;
  menuItems: MenuItem[]; // Membuat komponen ini regenerable & fleksibel
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, onLogout, menuItems }) => {
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  const handleMenuClick = (id: PageID) => {
    onPageChange(id);
    setIsOpenMobile(false); // Tutup drawer otomatis di mobile setelah klik
  };

  return (
    <>
      {/* 1. MOBILE TOP NAVIGATION BAR (Hanya muncul di bawah layar lg) */}
      <div className="lg:hidden w-full bg-brand-surface border-b border-brand-border/50 px-5 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-widest text-brand-accent">ZEUS</span>
          <span className="text-[9px] bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded font-mono">NODE-01</span>
        </div>
        <button 
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="text-brand-light hover:text-brand-accent focus:outline-none text-2xl"
        >
          {isOpenMobile ? '✕' : '☰'}
        </button>
      </div>

      {/* 2. SIDEBAR CONTAINER (Desktop Sidebar / Mobile Drawer Overlay) */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-brand-bg border-r border-brand-border/30 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isOpenMobile ? 'translate-x-0 pt-20 lg:pt-6' : '-translate-x-full'}
      `}>
        
        <div className="space-y-8">
          {/* Header Logo (Tersembunyi di mobile karena sudah ada di top-bar) */}
          <div className="hidden lg:block border-b border-brand-border/30 pb-5">
            <h1 className="text-3xl font-black tracking-widest text-brand-accent">ZEUS</h1>
            <p className="text-[10px] text-brand-muted tracking-widest uppercase mt-0.5">Utility Platform</p>
          </div>

          {/* Regenerable Menu Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`
                    w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer text-left
                    ${isActive 
                      ? 'bg-brand-interactive text-brand-light shadow-md shadow-brand-interactive/20 border border-brand-accent/20' 
                      : 'text-brand-muted hover:bg-brand-surface/40 hover:text-brand-light'}
                  `}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bagian Bawah: Tombol Aksi Logout */}
        <div className="border-t border-brand-border/30 pt-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-brand-error/80 hover:bg-brand-error/10 hover:text-brand-error transition-all cursor-pointer text-left"
          >
            <span>🗙</span>
            Keluar Sistem
          </button>
        </div>
      </div>

      {/* Backdrop penutup jika menu mobile terbuka */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}
    </>
  );
};