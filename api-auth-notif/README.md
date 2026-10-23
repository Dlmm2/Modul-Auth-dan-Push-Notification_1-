# Modul Auth dan Push Notification

## 1. Persiapan Backend (`api-auth-notif`)
1. Buat database MySQL baru, contoh: `db_mobile_auth`.
2. Masuk ke folder backend: `cd api-auth-notif`.
3. Buat file `.env` dan isi konfigurasi database & JWT:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=db_mobile_auth
   JWT_SECRET=supersecretkey