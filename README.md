# 📝 Inventory Management System

Sistem Inventory Management berbasis **React + TypeScript + Chakra UI v3** (Frontend) dan **Express.js + PostgreSQL** (Backend) yang menyediakan antarmuka pengguna lengkap untuk pengelolaan barang mulai dari persediaan, permintaan, penerimaan, pengeluaran, hingga laporan dengan visualisasi interaktif.

---

## 📑 Daftar Isi

- [Tujuan Project](#-tujuan-project)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#️-teknologi-yang-digunakan)
- [Instalasi & Setup](#-instalasi--setup)
- [Struktur Folder](#-struktur-folder)
- [Database Design](#-database-design)
- [Pembuat](#-pembuat)

---

## 🎯 Tujuan Project

- Menyediakan **interface user-friendly** untuk admin & departemen dalam pengelolaan barang
- Memudahkan **visualisasi data** inventory secara real-time
- Mencatat alur barang dari **permintaan, penerimaan, hingga pengeluaran** dengan tampilan yang interaktif
- Menjadi sarana pembelajaran pembuatan **fullstack application modern** menggunakan React + TypeScript + Express + PostgreSQL
- Implementasi **best practices** dalam development seperti authentication, authorization, dan API design

---

## 📂 Fitur Utama

### 🔐 **Authentication & Authorization**
- Login & Register dengan JWT token
- Protected routes dengan authentication guard
- Role-based access control (Admin & User)
- Auto-redirect jika tidak authenticated

### 👥 **User Management**
- CRD users (khusus admin)
- Role admin: akses ke seluruh halaman
- Role user: akses terbatas ke halaman purchase requests

### 📦 **Items Management**
- Tampilan tabel items dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Menjadi acuan dalam stock barang inventory

### 📝 **Purchase Request (PR)**
- Tampilan tabel dengan filter & search
- CRUD operations lengkap
- Status tracking: Open → Process → Completed
- Status tracking dengan indikator warna berbeda
- Print dokumen PR dengan format standar perusahaan

### 📋 **PR Items**
- Tampilan tabel dengan filter & search
- CRUD operations lengkap
- Digunakan sebagai backup pencatatan data PR

### 🧾 **Market List**
- Tampilan tabel dengan filter & search
- CRUD operations lengkap
- Daftar barang yang perlu dibeli (seperti keranjang belanja)
- Indikator warna merah jika order date dan expected date berdekatan

### 📥 **Receiving**
- Tampilan tabel dengan filter & search
- CRUD operations lengkap
- Form pencatatan barang masuk dari supplier
- Upload dokumentasi (foto/file) sebagai bukti barang datang
- Status accepted: barang diterima
- Status rejected: barang salah kirim atau return
- Auto-update qty items sebagai stock barang masuk (dengan catatan nama harus sama)

### 📥 **Receiving Items**
- Tampilan tabel dengan filter & search
- CRUD operations lengkap
- Backup catatan dari receiving
- Bisa mencatat barang dari supplier atau manual entry
- Detail item penerimaan dengan qty & kondisi
- Link ke Purchase Request terkait

### 🏬 **Service Request (S-Request / Store Request)**
- Tampilan tabel dengan filter & search
- CRUD operations lengkap
- Form permintaan barang internal dari store/gudang untuk disalurkan ke departemen
- Dynamic item rows (tambah/hapus items)
- Print halaman dokumen

### 📋 **SR Items**
- Tampilan tabel dengan filter & search
- CRUD operations lengkap
- Digunakan untuk backup dan catatan tambahan dari Service Request

### 📤 **Issuing**
- Tampilan tabel dengan filter & search
- CRUD operations lengkap
- Pencatatan pengeluaran barang (expired, rusak, dll)
- Digunakan sebagai pembelajaran pencatatan

### 📤 **Issuing Items**
- Tampilan tabel dengan filter & search
- CRUD operations lengkap
- Digunakan untuk backup dan catatan tambahan dari Issuing

### 📊 **Stock Balance Report**
Halaman laporan/report tentang keseluruhan inventory:
- Total keseluruhan stock (dihitung dari qty items)
- Total receiving
- Total issuing
- Total pengeluaran/expenses
- Pie chart supplier performance
- Distribution performance chart

### 🚪 **Logout**
- Mengakhiri sesi dengan aman
- Clear token & redirect ke login
- Animation logout button

---

## 🛠️ Teknologi yang Digunakan

### Backend
| Teknologi         | Versi   | Deskripsi                                    |
|-------------------|---------|----------------------------------------------|
| 🟩 **Node.js**    | 22.16.0 | JavaScript runtime environment               |
| ⚡ **Express.js**  | 4.19.2  | Web framework untuk Node.js                  |
| 🐘 **PostgreSQL** | 17      | Relational database management system        |
| 🔐 **JWT**        | Latest  | Authentication & authorization               |
| 📡 **REST API**   | -       | Architectural style untuk web services       |

### Frontend
| Teknologi                    | Versi  | Deskripsi                                              |
|------------------------------|--------|--------------------------------------------------------|
| ⚛️ **React**                 | 19.2+  | Library UI modern dengan hooks                         |
| 🔷 **TypeScript**            | 5.9+   | Type-safe JavaScript untuk development yang lebih aman |
| 🎨 **Chakra UI**             | v3.29+ | Component library modern dengan dark mode & theming    |
| 🛣️ **React Router DOM**      | v7.9+  | Client-side routing dan navigation                     |
| 📡 **Axios**                 | 1.13+  | HTTP client untuk API calls                            |
| 🎭 **Framer Motion**         | 12.23+ | Animasi & transitions yang smooth                      |
| 🎯 **TanStack React Table**  | v8.21+ | Headless table dengan sorting, filtering & pagination  |
| 🔄 **TanStack React Query**  | v5.90+ | Data fetching, caching, dan state management           |
| 🖨️ **React-to-Print**        | 3.2+   | Print functionality                                    |
| 📄 **jsPDF & html2canvas**   | Latest | PDF generation dari HTML                               |
| 🎨 **React Icons**           | 5.5+   | Icon library untuk navigasi                            |
| ⚡ **Vite**                  | 7.2+   | Build tool & dev server yang super cepat               |

---

## 🚀 Instalasi & Setup

### 📌 Clone Repository

```bash
# Clone repository
git clone https://github.com/fauzanfullstack/Inventory_Frontend.git
git clone https://github.com/fauzanfullstack/Inventory_Backend.git

# Masuk ke folder frontend
cd Inventory_Frontend
npm install

# Masuk ke folder backend
cd Inventory_Backend
pnpm install
```

### 📌 Setup Backend

1. Pastikan PostgreSQL v17 sudah terinstall
2. Buat database baru di PostgreSQL
3. Konfigurasi file `.env` di folder backend:

```env
# Backend .env
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DATABASE=inventory_db

PORT=5000
JWT_SECRET=your_secret_key_here
```

4. Jalankan backend:
```bash
pnpm run dev
```

### 📌 Setup Frontend

1. Konfigurasi file `.env` di folder frontend:
```env
VITE_API_URL=http://localhost:5000
```

2. Jalankan frontend:
```bash
npm run dev
```

3. Akses aplikasi di `http://localhost:5173`

---

## 🗃️ Struktur Folder

### Backend Structure
```
backend-inventory/
├── dist/                    # Compiled TypeScript files
├── node_modules/
├── src/
│   ├── controllers/         # Request handlers
│   ├── database/           # Database configuration
│   ├── middleware/         # Authentication & validation
│   ├── routes/             # API routes
│   └── app.ts              # Main application file
├── test/                   # Test files
├── uploads/                # Uploaded files storage
├── .env                    # Environment variables
├── nodemon.json
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```

### Frontend Structure
```
frontend-inventory/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── pages/
│   │   ├── components/          # Shared components
│   │   │   ├── Sidebar.tsx
│   │   │   └── Table.tsx
│   │   ├── items/              # Items management
│   │   ├── purchaseRequest/    # Purchase Request pages
│   │   ├── pr_items/           # PR Items pages
│   │   ├── marketlist/         # Market List pages
│   │   ├── receivings/         # Receiving pages
│   │   ├── receiving_items/    # Receiving Items pages
│   │   ├── s_request/          # Service Request pages
│   │   ├── sr_items/           # SR Items pages
│   │   ├── issuings/           # Issuing pages
│   │   ├── issuing_items/      # Issuing Items pages
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── utils/                  # API utility functions
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── ...
│   ├── ProtectedRoute.tsx
│   ├── TableUsers.tsx
│   ├── stockbalance.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📊 Database Design

### ERD (Entity Relationship Diagram)
![ERD Inventory System](./erd-ozan.png)

*Diagram menunjukkan relasi antar tabel dalam database inventory system*

### UML (Unified Modeling Language)
![UML Inventory System](./Untitled-Diagram.drawio.png)

*Diagram menunjukkan struktur dan alur sistem inventory management*

---

## 📝 Pembuat

**Nama:** Fauzan Permana  
**Jurusan:** Pengembangan Perangkat Lunak dan Gim (PPLG)  
**Sekolah:** SMK Negeri 1 Garut  
**GitHub:** [@fauzanfullstack](https://github.com/fauzanfullstack)

---

## 📄 Lisensi

Project ini dibuat untuk keperluan pembelajaran dan pengembangan portfolio.

---

## 🤝 Kontribusi

Kontribusi, issues, dan feature requests sangat diterima!  
Jangan ragu untuk membuka issue atau pull request.

---

**Happy Coding! 🚀**

*Dengan harapan project ini dapat terus dikembangkan menjadi lebih baik ke depannya!*