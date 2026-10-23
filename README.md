# Modul Auth & Push Notification

Repositori ini berisi proyek aplikasi mobile berbasis **React Native (Expo)** yang terintegrasi dengan **Backend Node.js/Express** serta fitur autentikasi dan *push notification*.
---

## 📁 Stuktur Proyek

```text
Modul Auth dan Push Notification_1/
├── api-auth-notif/       # Backend API (Express.js & MySQL)
├── mobile-auth-notif/    # Frontend Mobile App (React Native Expo)
├── db_mobile_auth.sql    # Database Dump / Schema
└── README.md

## 📋 Prasyarat Sistem
Sebelum menjalankan proyek ini, pastikan komputer Anda telah terinstal:
* **Node.js** (Versi LTS direkomendasikan)
* **Git**
* **XAMPP / MySQL Server** (untuk manajemen database)
* **Expo Go** di perangkat seluler atau emulator Android/iOS

---

## 🗄️ 1. Membuat dan Menyiapkan Database
1. Nyalakan layanan **Apache** dan **MySQL** melalui XAMPP Control Panel.
2. Buka browser dan akses `http://localhost/phpmyadmin`.
3. Buat database baru dengan nama:
   ```text
   db_mobile_auth

⚙️ 2. Menyiapkan dan Menjalankan Backend (api-auth-notif)
Buka terminal (Git Bash / PowerShell) di direktori utama proyek.

Masuk ke folder backend:
cd api-auth-notif

3. Buat atau sesuaikan file .env di dalam folder api-auth-notif dengan konfigurasi database Anda:

Code snippet
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=db_mobile_auth

4. Instal dependensi dan jalankan server backend:

npm install
npm run dev

📱 3. Konfigurasi Environment & Menjalankan Expo (mobile-auth-notif)
1. Buka tab atau jendela terminal baru.
2. Masuk ke folder frontend/mobile:

cd mobile-auth-notif

3. Periksa atau buat file .env di dalam folder mobile-auth-notif. Penting: Ubah alamat IP pada variabel URL backend sesuai dengan alamat IP jaringan komputer Anda (atau gunakan IP lokal Wi-Fi agar bisa diakses oleh HP fisik via Expo Go):

EXPO_PUBLIC_API_URL=http://<IP_KOMPUTER_ANDA>:3000
(Contoh: EXPO_PUBLIC_API_URL=http://192.168.1.15:3000)

4. Instal dependensi frontend:

npm install

5. Jalankan aplikasi Expo dengan membersihkan cache:

npx expo start -c

Pindai (scan) QR Code yang muncul di terminal menggunakan aplikasi Expo Go di ponsel Anda, atau tekan huruf a di terminal untuk membuka emulator Android.
