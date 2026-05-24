// src/types/auth.ts
export interface SignUpData {
  username: string;
  namaPenanggungJawab: string;
  nomorTelepon: string;
  email: string;
  namaPerusahaan: string;
  password: string;
}

export interface SignInData {
  username: string;
  email: string;
  password: string;
}