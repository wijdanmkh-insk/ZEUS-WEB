// src/pages/AuthContainer.tsx
import React, { useState } from 'react';
import type { SignUpData, SignInData } from '../types/auth/Auth';

type AuthStep = 'SIGN_IN' | 'SIGN_UP' | 'PRODUCT_REGISTRATION' | 'SUCCESS_DASHBOARD';

export interface AuthContainerProps {
  onAuthSuccess: () => void;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({ onAuthSuccess }) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('SIGN_IN');
  const [error, setError] = useState<string>('');
  
  // Tambahkan di atas bersama tipe lainnya
  type SyncStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';

  // Masukkan di dalam fungsi AuthContainer Anda:
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('IDLE');
  const [countdown, setCountdown] = useState<number>(5);

  // State Penyimpanan Sementara (Mock)
  const [registeredUser, setRegisteredUser] = useState<SignUpData | null>(null);
  const [hasRegisteredProduct, setHasRegisteredProduct] = useState<boolean>(false);

  // Form States
  const [signUpForm, setSignUpForm] = useState<SignUpData>({
    username: '',
    namaPenanggungJawab: '',
    nomorTelepon: '',
    email: '',
    namaPerusahaan: '',
    password: ''
  });

  const [signInForm, setSignInForm] = useState<SignInData>({
    username: '',
    email: '',
    password: ''
  });

  const [productCode, setProductCode] = useState<string>('');

  // Handlers
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (Object.values(signUpForm).some(val => !val.trim())) {
      setError('Semua baris formulir wajib diisi.');
      return;
    }

    setRegisteredUser(signUpForm);
    setCurrentStep('PRODUCT_REGISTRATION');
  };

  const handleProductRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 1. Validasi awal format input sebelum menembak "server"
    if (!productCode.trim()) {
      setError('Kode produk tidak boleh kosong.');
      return;
    }

    // Masuk ke mode loading sinkronisasi
    setCurrentStep('SUCCESS_DASHBOARD'); // Pindahkan view ke panel status
    setSyncStatus('LOADING');

    setTimeout(() => {
      // Simulasi validasi: Anggap benar jika kodenya mengandung kata 'ZEUS'
      if (productCode.toUpperCase().includes('ZEUS') && productCode.length >= 6) {
        setSyncStatus('SUCCESS');
        setHasRegisteredProduct(true);
        setCountdown(5); // Reset hitung mundur ke 5 detik
      } else {
        setSyncStatus('FAILED');
      }
    }, 2000); // Menunggu simulasi jabat tangan (handshake) hardware selama 2 detik
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!registeredUser || signInForm.username !== registeredUser.username) {
      setError('Akun tidak ditemukan. Silakan sign up terlebih dahulu.');
      return;
    }

    if (!hasRegisteredProduct) {
      setError('Akses ditolak. Akun Anda belum menautkan perangkat ZEUS.');
      setCurrentStep('PRODUCT_REGISTRATION');
      return;
    }

    setCurrentStep('SUCCESS_DASHBOARD');
    setSyncStatus('SUCCESS');
    setCountdown(5); // Reset countdown for login transition
  };

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (currentStep === 'SUCCESS_DASHBOARD' && syncStatus === 'SUCCESS') {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        onAuthSuccess();
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, syncStatus, currentStep, onAuthSuccess]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-light flex flex-col lg:grid lg:grid-cols-2 font-sans">
      
      {/* SISI KIRI: Branding & Informasi Filosofi Perangkat (Atas pada Mobile) */}
      <div className="flex flex-col justify-center items-center lg:items-start p-8 lg:p-16 bg-gradient-to-br from-brand-bg to-brand-surface/30 border-b lg:border-b-0 lg:border-r border-brand-border/40 text-center lg:text-left min-h-[30vh] lg:min-h-screen">
        <div className="max-w-md space-y-4">
          <h1 className="text-5xl lg:text-7xl font-black tracking-widest text-brand-accent drop-shadow-md">
            ZEUS
          </h1>
          <p className="text-sm lg:text-base text-brand-muted font-medium tracking-wide uppercase">
            Zero Emission Utility System
          </p>
          <p className="text-xs lg:text-sm text-brand-muted/80 leading-relaxed pt-2 hidden sm:block text-justify">
            Sistem otomasi manajemen sanitasi modern. Memanfaatkan klasifikasi berbasis visi komputer untuk memotong jalur pemantauan manual, mencegah penumpukan sampah tercampur, dan mengoptimalkan penjemputan berkala bagi janitor secara *real-time*.
          </p>
        </div>
      </div>

      {/* SISI KANAN: Kontainer Autentikasi / Form Interaktif (Bawah pada Mobile) */}
      <div className="flex-1 flex justify-center items-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md bg-brand-surface border border-brand-border/60 rounded-xl p-6 sm:p-8 shadow-2xl transition-all duration-300">
          
          {/* Tampilan Pesan Error */}
          {error && (
            <div className="mb-6 p-3 bg-brand-error/10 border border-brand-error/40 text-brand-error text-xs sm:text-sm rounded-lg font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* STEP 1: SIGN IN */}
          {currentStep === 'SIGN_IN' && (
            <form onSubmit={handleSignInSubmit} className="space-y-5">
              <h2 className="text-xl font-bold border-b border-brand-border/40 pb-2 text-brand-accent">Sign In Portal</h2>
              
              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-2 tracking-wider">Username</label>
                <input 
                  type="text"
                  className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                  placeholder="Masukkan username perusahaan"
                  value={signInForm.username}
                  onChange={e => setSignInForm({...signInForm, username: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-2 tracking-wider">Password</label>
                <input 
                  type="password"
                  className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                  placeholder="Masukkan password perusahaan"
                  value={signInForm.password}
                  onChange={e => setSignInForm({...signInForm, password: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-2 tracking-wider">Email Korporat</label>
                <input 
                  type="email"
                  className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                  placeholder="name@company.com"
                  value={signInForm.email}
                  onChange={e => setSignInForm({...signInForm, email: e.target.value})}
                />
              </div>

              <button type="submit" className="w-full bg-brand-interactive hover:bg-brand-interactive/80 text-brand-light font-bold py-2.5 px-4 rounded-lg text-sm uppercase tracking-wider cursor-pointer transition-all border border-brand-border/40 shadow-md">
                Akses Dashboard
              </button>

              <p className="text-xs text-center text-brand-muted mt-4">
                Belum mendaftarkan lini perusahaan Anda?{' '}
                <button type="button" onClick={() => { setError(''); setCurrentStep('SIGN_UP'); }} className="text-brand-accent hover:underline font-medium cursor-pointer">
                  Sign Up Di Sini
                </button>
              </p>
            </form>
          )}

          {/* STEP 2: SIGN UP */}
          {currentStep === 'SIGN_UP' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <h2 className="text-xl font-bold border-b border-brand-border/40 pb-2 text-brand-accent">Registrasi Korporat</h2>
              
              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-1 tracking-wider">Nama Perusahaan</label>
                <input 
                  type="text"
                  className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-sm focus:outline-none focus:border-brand-accent transition-all"
                  placeholder="PT. Sinergi Hijau Internasional"
                  value={signUpForm.namaPerusahaan}
                  onChange={e => setSignUpForm({...signUpForm, namaPerusahaan: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-1 tracking-wider">Username Sistem</label>
                <input 
                  type="text"
                  className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-sm focus:outline-none focus:border-brand-accent transition-all"
                  placeholder="admin_zeus_pusat"
                  value={signUpForm.username}
                  onChange={e => setSignUpForm({...signUpForm, username: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-1 tracking-wider">Nama Penanggung Jawab (PIC)</label>
                <input 
                  type="text"
                  className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-sm focus:outline-none focus:border-brand-accent transition-all"
                  placeholder="Nama Lengkap Penanggung Jawab"
                  value={signUpForm.namaPenanggungJawab}
                  onChange={e => setSignUpForm({...signUpForm, namaPenanggungJawab: e.target.value})}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-muted uppercase mb-1 tracking-wider">Nomor Telepon</label>
                  <input 
                    type="tel"
                    className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-sm focus:outline-none focus:border-brand-accent transition-all"
                    placeholder="081234567890"
                    value={signUpForm.nomorTelepon}
                    onChange={e => setSignUpForm({...signUpForm, nomorTelepon: e.target.value})}
                  />
                </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-1 tracking-wider">Email Resmi</label>
                  <input 
                    type="email"
                    className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2 text-sm focus:outline-none focus:border-brand-accent transition-all"
                    placeholder="admin@perusahaan.com"
                    value={signUpForm.email}
                    onChange={e => setSignUpForm({...signUpForm, email: e.target.value})}
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-brand-interactive hover:bg-brand-interactive/80 text-brand-light font-bold py-2.5 px-4 rounded-lg text-sm uppercase tracking-wider cursor-pointer transition-all border border-brand-border/40 mt-2 shadow-md">
                Lanjut ke Validasi Node Hardware
              </button>

              <p className="text-xs text-center text-brand-muted mt-2">
                Sudah mengonfigurasi akun?{' '}
                <button type="button" onClick={() => { setError(''); setCurrentStep('SIGN_IN'); }} className="text-brand-accent hover:underline font-medium cursor-pointer">
                  Sign In
                </button>
              </p>
            </form>
          )}

          {/* STEP 3: HARDWARE PRODUCT REGISTRATION */}
          {currentStep === 'PRODUCT_REGISTRATION' && (
            <form onSubmit={handleProductRegister} className="space-y-5">
              <div className="border-b border-brand-border/40 pb-2 flex justify-between items-center">
                <h2 className="text-xl font-bold text-brand-accent">Aktivasi Node ZEUS</h2>
                <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded font-mono border border-brand-accent/30 animate-pulse">Hardware Link</span>
              </div>
              
              <p className="text-xs text-brand-muted leading-relaxed">
                Akses ditangguhkan sebelum otentikasi node dilakukan. Masukkan **Kode Produksi Perangkat** yang tertera pada modul Edge AI kontainer Anda untuk sinkronisasi antrean janitor.
              </p>

              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase mb-2 tracking-wider">Kode Produksi Perangkat</label>
                <input 
                  type="text"
                  className="w-full bg-brand-bg/60 border border-brand-border text-brand-light rounded-lg p-2.5 text-sm font-mono focus:outline-none focus:border-brand-accent text-center uppercase tracking-widest"
                  placeholder="ZEUS-XXXXX"
                  value={productCode}
                  onChange={e => setProductCode(e.target.value)}
                />
                <span className="text-[10px] text-brand-muted/70 mt-1.5 block leading-normal">
                  *Periksa label barcode perak sistem produksi pada panel kompartemen mikrokontroler internal.
                </span>
              </div>

              <div className="flex flex-row gap-3 mt-2">
                {/* Tombol Kembali - Diubah menjadi type="button" agar tidak memicu submit form */}
                <button 
                  type="button" 
                  onClick={() => {
                    setError(''); // Bersihkan error lama jika ada
                    setCurrentStep('SIGN_UP'); // Mundur ke langkah registrasi korporat
                  }}
                  className="w-full bg-brand-interactive hover:bg-brand-interactive/80 text-brand-light font-bold py-2 px-4 rounded-lg text-sm uppercase tracking-wider cursor-pointer transition-all border border-brand-border/40 shadow-md text-center"
                >
                  Kembali
                </button>
                
                {/* Tombol Tautkan - Tetap sebagai submit utama untuk memproses form */}
                <button 
                  type="submit" 
                  className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-bg font-bold py-2 px-4 rounded-lg text-sm uppercase tracking-wider cursor-pointer transition-all shadow-md"
                >
                  Tautkan
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: ADAPTIVE SYNC STATE PANEL */}
          {currentStep === 'SUCCESS_DASHBOARD' && (
            <div className="text-center space-y-5 py-4 transition-all duration-300">
              
              {/* KONDISI A: SEDANG SINKRONISASI (LOADING) */}
              {syncStatus === 'LOADING' && (
                <div className="space-y-4">
                  {/* Spinner Animasi Aksen Hijau */}
                  <div className="w-12 h-12 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin mx-auto"></div>
                  <h2 className="text-lg font-bold text-brand-light tracking-wide animate-pulse">Menghubungkan ke Node Perangkat...</h2>
                  <p className="text-xs text-brand-muted px-4">
                    Mengirim paket enkripsi jabat tangan ke sistem produksi untuk memvalidasi klaster visi komputer **{productCode.toUpperCase()}**.
                  </p>
                </div>
              )}

              {/* KONDISI B: SINKRONISASI BERHASIL (SUCCESS) */}
              {syncStatus === 'SUCCESS' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-brand-accent/10 border-2 border-brand-accent rounded-full flex items-center justify-center mx-auto text-brand-accent text-2xl font-bold shadow-lg shadow-brand-accent/10">
                    ✓
                  </div>
                  <h2 className="text-xl font-bold text-brand-light">Sinkronisasi Berhasil!</h2>
                  <p className="text-xs sm:text-sm text-brand-muted">
                    Klaster perangkat **{productCode.toUpperCase()}** resmi tertaut dengan akun korporat **{registeredUser?.namaPerusahaan}**.
                  </p>
                  
                  {/* Kotak Telemetri Terminal */}
                  <div className="p-4 bg-brand-bg/80 rounded-lg border border-brand-border/40 text-left text-xs font-mono space-y-1 text-brand-muted">
                    <span className="text-brand-accent">[OK]</span> Computer vision model: YOLOv8 active.<br />
                    <span className="text-brand-accent">[OK]</span> Pipeline telemetri janitor terinisialisasi.<br />
                    <span className="text-brand-accent">[OK]</span> Mengalihkan halaman dalam <span className="text-brand-accent font-bold text-sm">{countdown}</span> detik...
                  </div>

                  <div className="text-[11px] text-brand-muted italic animate-pulse">
                    Membuka gerbang dashboard utama otomasi...
                  </div>
                </div>
              )}

              {/* KONDISI C: SINKRONISASI GAGAL (FAILED) */}
              {syncStatus === 'FAILED' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-brand-error/10 border-2 border-brand-error rounded-full flex items-center justify-center mx-auto text-brand-error text-2xl font-bold">
                    ✕
                  </div>
                  <h2 className="text-xl font-bold text-brand-error">Otentikasi Perangkat Gagal</h2>
                  <p className="text-xs sm:text-sm text-brand-muted px-2">
                    Kode produksi **{productCode.toUpperCase()}** tidak terdaftar di database sistem produksi atau unit belum diaktivasi pabrik.
                  </p>

                  <div className="p-3 bg-brand-bg/50 border border-brand-border/30 rounded-lg text-left text-xs font-mono text-brand-error/90">
                    <span className="font-bold">[ERR_NODE_NOT_FOUND]:</span> Sinkronisasi gagal. Pastikan sasis hardware ZEUS terhubung ke daya dan internet saat registrasi.
                  </div>

                  {/* Tombol Interaktif untuk Mengulangi Proses */}
                  <button 
                    type="button"
                    onClick={() => {
                      setCurrentStep('PRODUCT_REGISTRATION');
                      setSyncStatus('IDLE');
                    }}
                    className="w-full bg-brand-interactive hover:bg-brand-interactive/80 text-brand-light font-bold py-2 px-4 rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-all border border-brand-border/40 shadow-md"
                  >
                    ← Coba Kode Lain / Perbaiki Input
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};