// src/pages/SettingsPage.tsx
import React, { useState } from 'react';

type SettingsTab = 'PROFIL' | 'KEAMANAN';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('PROFIL');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // 1. States Form Profil Perusahaan (Data Awal Mock)
  const [companyProfile, setCompanyProfile] = useState({
    namaPerusahaan: 'PT. Sinergi Hijau Internasional',
    usernameSistem: 'admin_zeus_pusat',
    namaPIC: 'Wijdan Dan',
    nomorTelepon: '081234567890',
    emailOperasional: 'admin@perusahaan.com',
    alamatKantor: 'Jl. Telekomunikasi No. 1, Bandung, Jawa Barat'
  });

  // 2. States Form Ganti Password
  const [passwordForm, setPasswordForm] = useState({
    passwordLama: '',
    passwordBaru: '',
    konfirmasiPasswordBaru: ''
  });

  // Handler Simpan Perubahan Profil
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (Object.values(companyProfile).some(val => !val.trim())) {
      setError('Semua kolom data profil perusahaan wajib diisi.');
      return;
    }

    // Simulasi Save API
    setSuccess('Data profil korporat berhasil diperbarui di database utama ZEUS.');
  };

  // Handler Eksekusi Ganti Password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { passwordLama, passwordBaru, konfirmasiPasswordBaru } = passwordForm;

    // Validasi Keamanan Kode
    if (!passwordLama || !passwordBaru || !konfirmasiPasswordBaru) {
      setError('Seluruh kolom password wajib diisi untuk verifikasi keamanan.');
      return;
    }

    if (passwordBaru.length < 6) {
      setError('Sandi baru terlalu lemah. Minimal harus terdiri dari 6 karakter.');
      return;
    }

    if (passwordBaru !== konfirmasiPasswordBaru) {
      setError('Konfirmasi sandi baru tidak cocok. Silakan periksa kembali.');
      return;
    }

    // Simulasi Sukses Ganti Password
    setSuccess('Kredensial keamanan berhasil diperbarui. Gunakan password baru pada sesi masuk berikutnya.');
    setPasswordForm({ passwordLama: '', passwordBaru: '', konfirmasiPasswordBaru: '' });
  };

  return (
    <div className="space-y-6 my-10">
      {/* Header Halaman */}
      <div className="border-b border-brand-border/30 pb-4">
        <h2 className="text-5xl font-bold text-brand-light">Pengaturan Sistem</h2>
        <p className="text-sm text-brand-muted pt-8">Konfigurasi data legalitas perusahaan dan otentikasi keamanan administrator.</p>
      </div>

      {/* Tampilan Pesan Feedback */}
      {error && (
        <div className="p-3 bg-brand-error/10 border border-brand-error/30 text-brand-error text-xs rounded-lg font-medium animate-fadeIn">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-xs rounded-lg font-medium animate-fadeIn">
          ✓ {success}
        </div>
      )}

      {/* Main Layout Grid: Kiri Navigasi Tab, Kanan Panel Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* SISI KIRI: Menu Sub-Tab (Sticky Navigation) */}
        <div className="flex flex-row md:flex-col gap-2 md:col-span-1">
          <button
            type="button"
            onClick={() => { setActiveTab('PROFIL'); setError(''); setSuccess(''); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'PROFIL'
                ? 'bg-brand-surface text-brand-accent border border-brand-border/60'
                : 'text-brand-muted hover:bg-brand-surface/20 hover:text-brand-light'
            }`}
          >
            🏢 Profil Perusahaan
          </button>
          
          <button
            type="button"
            onClick={() => { setActiveTab('KEAMANAN'); setError(''); setSuccess(''); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'KEAMANAN'
                ? 'bg-brand-surface text-brand-accent border border-brand-border/60'
                : 'text-brand-muted hover:bg-brand-surface/20 hover:text-brand-light'
            }`}
          >
            🔒 Keamanan Akun
          </button>
        </div>

        {/* SISI KANAN: Form Content Dynamic Area */}
        <div className="md:col-span-3 bg-brand-surface/20 border border-brand-border/30 rounded-xl p-6 shadow-xl">
          
          {/* TAB PANEL 1: PROFIL PERUSAHAAN */}
          {activeTab === 'PROFIL' && (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <h3 className="text-base font-bold text-brand-accent border-b border-brand-border/20 pb-1.5 mb-2">Identitas Korporat</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-brand-muted uppercase mb-1 tracking-wider">Nama Perusahaan</label>
                  <input 
                    type="text"
                    className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-brand-accent"
                    value={companyProfile.namaPerusahaan}
                    onChange={e => setCompanyProfile({...companyProfile, namaPerusahaan: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-brand-muted uppercase mb-1 tracking-wider">Username Klaster (Sistem)</label>
                  <input 
                    type="text"
                    className="w-full bg-brand-bg/10 border border-brand-border/40 text-brand-muted/70 rounded-lg p-2 text-xs font-mono disabled:cursor-not-allowed"
                    value={companyProfile.usernameSistem}
                    disabled // Username dikunci dari sisi arsitektur database
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-brand-muted uppercase mb-1 tracking-wider">Nama Penanggung Jawab (PIC)</label>
                  <input 
                    type="text"
                    className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-xs focus:outline-none focus:border-brand-accent"
                    value={companyProfile.namaPIC}
                    onChange={e => setCompanyProfile({...companyProfile, namaPIC: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-brand-muted uppercase mb-1 tracking-wider">Nomor Kontak / WA</label>
                  <input 
                    type="text"
                    className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-xs focus:outline-none focus:border-brand-accent"
                    value={companyProfile.nomorTelepon}
                    onChange={e => setCompanyProfile({...companyProfile, nomorTelepon: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-brand-muted uppercase mb-1 tracking-wider">Email Korespondensi Operasional</label>
                <input 
                  type="email"
                  className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-xs focus:outline-none focus:border-brand-accent"
                  value={companyProfile.emailOperasional}
                  onChange={e => setCompanyProfile({...companyProfile, emailOperasional: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-brand-muted uppercase mb-1 tracking-wider">Alamat Fisik Kantor Pusat</label>
                <textarea 
                  rows={3}
                  className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-xs focus:outline-none focus:border-brand-accent resize-none"
                  value={companyProfile.alamatKantor}
                  onChange={e => setCompanyProfile({...companyProfile, alamatKantor: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                className="bg-brand-interactive hover:bg-brand-interactive/80 text-brand-light font-bold py-2.5 px-6 rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-all border border-brand-border/40 shadow-md mt-2"
              >
                Simpan Pembaruan Profil
              </button>
            </form>
          )}

          {/* TAB PANEL 2: GANTI PASSWORD */}
          {activeTab === 'KEAMANAN' && (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <h3 className="text-base font-bold text-brand-accent border-b border-brand-border/20 pb-1.5 mb-2">Kredensial Otentikasi</h3>
              
              <div className="space-y-3 max-w-md">
                <div>
                  <label className="block text-[11px] font-semibold text-brand-muted uppercase mb-1 tracking-wider">Password Saat Ini</label>
                  <input 
                    type="password"
                    className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-xs focus:outline-none focus:border-brand-accent"
                    placeholder="••••••••"
                    value={passwordForm.passwordLama}
                    onChange={e => setPasswordForm({...passwordForm, passwordLama: e.target.value})}
                  />
                </div>

                <hr className="border-brand-border/20 my-4" />

                <div>
                  <label className="block text-[11px] font-semibold text-brand-muted uppercase mb-1 tracking-wider">Password Baru</label>
                  <input 
                    type="password"
                    className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-xs focus:outline-none focus:border-brand-accent"
                    placeholder="Minimal 6 karakter"
                    value={passwordForm.passwordBaru}
                    onChange={e => setPasswordForm({...passwordForm, passwordBaru: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-brand-muted uppercase mb-1 tracking-wider">Konfirmasi Password Baru</label>
                  <input 
                    type="password"
                    className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-xs focus:outline-none focus:border-brand-accent"
                    placeholder="Ulangi sandi baru"
                    value={passwordForm.konfirmasiPasswordBaru}
                    onChange={e => setPasswordForm({...passwordForm, konfirmasiPasswordBaru: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="bg-brand-accent hover:bg-brand-accent/90 text-brand-bg font-bold py-2.5 px-6 rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-all shadow-md mt-2"
              >
                Perbarui Kata Sandi
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};