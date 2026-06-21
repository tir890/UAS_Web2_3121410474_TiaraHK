# E-Report - Sistem Pelaporan Pengaduan Layanan Masyarakat 🏛️

Proyek ini dibangun sebagai tugas proyek akhir Ujian Akhir Semester (UAS) mata kuliah **Pemrograman Web 2**. Aplikasi ini menggunakan **Decoupled Architecture** (Arsitektur Terpisah) yang memisahkan secara penuh antara server backend (API) dan klien frontend (SPA).

## 👤 Identitas Mahasiswa
- **Nama:** Tiara Hayatul Khoir
- **NIM:** 312410474
- **Kelas:** TI.24.A5

---

## 🛠️ Ekosistem Teknologi
- **Backend Engine:** PHP Framework CodeIgniter 4 (RESTful API Server)
- **Frontend Engine:** VueJS 3 SPA dengan Vue Router via CDN
- **UI Framework:** TailwindCSS via CDN
- **Data Transfer:** Axios HTTP Library (Asynchronous Request & Token Interceptors)
- **Basis Data:** MySQL / MariaDB

---

## 🚀 Fitur Tambahan & Pengembangan Mandiri (Value-Added Features)
Selain memenuhi seluruh kriteria dasar kompetensi teknis yang diwajibkan dalam panduan tugas, aplikasi ini telah dikembangkan lebih lanjut secara mandiri dengan menambahkan fitur krusial guna meningkatkan validitas data pelaporan:
1. **Sistem Klasifikasi Kategori Aduan:** Warga dapat memilih jenis pengaduan (Infrastruktur, Keamanan, Lingkungan, Sosial) melalui dropdown dinamis untuk mempermudah manajemen arsip petugas.
2. **Gambar Bukti Otomatis (URL Render):** Penambahan fitur penyertaan bukti foto fisik di lapangan menggunakan metode pengiriman *Direct URL Tautan Gambar*. Metode ini sengaja dipilih guna menjaga efisiensi penyimpanan database serta mengamankan lalu lintas data dari potensi gangguan *CORS file preflight policy* pada arsitektur terpisah.

---

## 📂 Pengorganisasian Folder

```text
UAS_Web2_NIM_Nama/
├── backend-api/
│   ├── app/
│   │   ├── Config/
│   │   │   ├── Database.php
│   │   │   ├── Filters.php
│   │   │   └── Routes.php
│   │   ├── Controllers/
│   │   │   ├── Auth.php
│   │   │   ├── Pengaduan.php
│   │   │   └── Tanggapan.php
│   │   ├── Filters/
│   │   │   ├── AuthFilter.php
│   │   │   └── CorsFilter.php
│   │   └── Models/
│   │       ├── PengaduanModel.php
│   │       ├── TanggapanModel.php
│   │       └── UserModel.php
│   ├── public/
│   │   └── index.php
│   ├── system/
│   ├── writable/
│   └── .env
│
├── frontend-spa/
│   ├── assets/
│   │   └── js/
│   │       ├── components/
│   │       │   ├── Dashboard.js
│   │       │   ├── Landing.js
│   │       │   └── Login.js
│   │       └── app.js
│   ├── index.html
│   └── style.css
│
├── uas_ereport.sql
└── README.md

```

---

## 🗄️ Skema Relasi Database

Aplikasi ini menggunakan 3 tabel yang saling berelasi (`users`, `pengaduan`, dan `tanggapan`) menggunakan *Foreign Key* dan fitur *ON DELETE CASCADE*.

![skema relasi](https://github.com/tir890/UAS_Web2_3121410474_TiaraHK/blob/fe27602a726a0d340172c5da841e3b308d37a529/frontend-spa/assets/img/skema-relasi-database.png)

---

## 🔒 Server-Side Security & Postman API Test (Error 401)

Semua jalur mutasi data Admin (`PUT` dan `DELETE`) diproteksi ketat oleh `AuthFilter` di tingkat server. Jika request tidak membawa *Authorization Bearer Token* yang valid, server akan menolak akses secara otomatis dengan respon **Error 401 Unauthorized**.

![test api postman](https://github.com/tir890/UAS_Web2_3121410474_TiaraHK/blob/fe27602a726a0d340172c5da841e3b308d37a529/frontend-spa/assets/img/ujicoba-postman.jpeg)

---

## 🖥️ Antarmuka Aplikasi (UI Showcase)

### 1. Halaman Utama Warga (Landing Page)

Masyarakat dapat mengirimkan laporan pengaduan secara publik tanpa perlu melakukan login terlebih dahulu.

![halaman pengaduan warga](https://github.com/tir890/UAS_Web2_3121410474_TiaraHK/blob/cdc8e717e109745cec61b969e09aeb4cf65d892d/frontend-spa/assets/img/halaman-pengaduan.png)

### 2. Portal Login Petugas / Admin

Form otentikasi aman untuk memverifikasi akun petugas sebelum masuk ke sistem kontrol data.

![halaman login](https://github.com/tir890/UAS_Web2_3121410474_TiaraHK/blob/cdc8e717e109745cec61b969e09aeb4cf65d892d/frontend-spa/assets/img/login-admin.png)

### 3. Dashboard Kontrol Admin (Bertenaga TailwindCSS & Chart.js)

Panel khusus administrator untuk melihat analitik laporan berbentuk grafik, memperbarui status aduan, maupun menghapus laporan.

![halaman dashboard admin](https://github.com/tir890/UAS_Web2_3121410474_TiaraHK/blob/cdc8e717e109745cec61b969e09aeb4cf65d892d/frontend-spa/assets/img/halaman-admin.png)

### 4. Penambahan Fitur Bukti Gambar

Menggunakan link url untuk menambahkan gambar sebagai bukti pengaduan.

![bukti gambar]()

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

```


5. Buka terminal di dalam folder `backend-api`, lalu jalankan server CodeIgniter:
```bash
php spark serve

```


*Backend akan berjalan di alamat `http://localhost:8080*`

### B. Persiapan Frontend (SPA Client)

1. Buka folder `frontend-spa`.
2. Pastikan file `assets/js/app.js` sudah mengarah ke URL backend yang benar (`apiUrl: 'http://localhost:8080'`).
3. Jalankan file `index.html` menggunakan ekstensi **Live Server** di VS Code.
*Frontend akan berjalan di alamat default `http://127.0.0.1:5500/index.html*`

---

## 🔗 Link Tautan Penting

* **Link Video Presentasi Proyek (YouTube):** [Link Video Youtube]
