# E-Report - Sistem Pelaporan Pengaduan Layanan Masyarakat 🏛️

Proyek ini dibangun sebagai tugas proyek akhir Ujian Akhir Semester (UAS) mata kuliah **Pemrograman Web 2**. Aplikasi ini menggunakan **Decoupled Architecture** (Arsitektur Terpisah) yang memisahkan secara penuh antara server backend (API) dan klien frontend (SPA).

## 👤 Identitas Mahasiswa
- **Nama:** Tiara Hayatul Khoir
- **NIM:** 312410474
- **Kelas:** TI.24.A5 / I241E

---

## 🛠️ Ekosistem Teknologi
- **Backend Engine:** PHP Framework CodeIgniter 4 (Dikonfigurasi sebagai RESTful API Server).
- **Frontend Engine:** VueJS 3 SPA dengan Vue Router berbasis CDN.
- **UI Framework:** TailwindCSS via CDN untuk standardisasi tampilan *utility-first*.
- **Data Transfer:** Axios HTTP Library (Asynchronous Request & Token Interceptors).
- **Basis Data:** MySQL / MariaDB.

---

## 🗄️ Skema Relasi Database
Aplikasi ini menggunakan minimal 3 tabel yang saling berelasi (`users`, `pengaduan`, dan `tanggapan`) menggunakan *Foreign Key* dan fitur *ON DELETE CASCADE*.

![Skema Relasi Database](https://link-ke-foto-designer-phpmyadmin.com/image.png)
*(Catatan: Ganti URL di atas dengan link screenshot menu Desainer database phpMyAdmin kamu. Kamu bisa upload gambar ke GitHub lalu ambil link-nya)*

---

## 🔒 Server-Side Security & Postman API Test (Error 401)
Semua jalur mutasi data Admin (`PUT` dan `DELETE`) diproteksi ketat oleh `AuthFilter` di tingkat server. Jika request tidak membawa *Authorization Bearer Token* yang valid, server akan menolak akses secara otomatis dengan respon **Error 401 Unauthorized**.

![Uji Coba Postman Gagal 401](https://link-ke-foto-postman-401.com/image.png)
*(Catatan: Ganti URL di atas dengan screenshot Postman saat kamu menembak api/pengaduan dengan metode PUT/DELETE TANPA token)*

---

## 🖥️ Antarmuka Aplikasi (UI Showcase)

### 1. Halaman Utama Warga (Landing Page)
Masyarakat dapat mengirimkan laporan pengaduan secara publik tanpa perlu melakukan login terlebih dahulu.
![Landing Page](https://link-ke-foto-landing.com/image.png)

### 2. Portal Login Petugas / Admin
Form otentikasi aman untuk memverifikasi akun petugas sebelum masuk ke sistem kontrol data.
![Halaman Login](https://link-ke-foto-login.com/image.png)

### 3. Dashboard Kontrol Admin (Bertenaga TailwindCSS & Chart.js)
Panel khusus administrator untuk melihat analitik laporan berbentuk grafik, memperbarui status aduan, maupun menghapus laporan.
![Dashboard Admin](https://link-ke-foto-dashboard.com/image.png)

---

## 🚀 Petunjuk Instalasi & Cara Menjalankan Aplikasi

### A. Persiapan Backend (API Server)
1. Pindahkan folder `backend-api` ke dalam direktori XAMPP kamu (`xampp/htdocs/`).
2. Buka **phpMyAdmin**, buat database baru bernama `uas_ereport`.
3. Import file `uas_ereport.sql` yang tersedia di root repositori ini ke database tersebut.
4. Pastikan file `.env` sudah diatur konfigurasi databasenya:
   ```env
   database.default.hostname = 127.0.0.1
   database.default.database = uas_ereport
   database.default.username = root
   database.default.password =
