# 📝 Inventory Management System - Frontend

Sistem Frontend Inventory berbasis **React + TypeScript + Chakra UI v3** yang menyediakan antarmuka pengguna untuk pengelolaan barang seperti persediaan, permintaan, pengeluaran, daftar barang, hingga laporan lengkap dengan visualisasi yang interaktif.

---

## 📑 Daftar Isi

## 📑 Daftar Isi

- [Tujuan Project](#-tujuan-project)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan di frontend](#️-teknologi-yang-digunakan-di-frontend)
- [Instalasi & Setup](#-instalasi--setup)
- [Clone Repository](#-clone-repository)
- [Setup Backend](#-setup-backend-postgresql)
- [Struktur Folder Frontend](#-struktur-folder-frontend)
- [Pembuat](#-pembuat)

---

## 🎯 Tujuan Project

- Menyediakan **interface user-friendly** untuk admin & departemen dalam pengelolaan barang
- Memudahkan **visualisasi data** inventory secara real-time
- Mencatat alur barang dari **permintaan, penerimaan, hingga pengeluaran** dengan tampilan yang interaktif
- Menjadi sarana pembelajaran pembuatan **frontend modern** menggunakan React + TypeScript + Chakra UI
- Menjadi sarana pembelajaran pembuatan \*_backend CRUD Full API_ menggunakan Express + PostgreSQL

---

## 📂 Fitur Utama

### 🔐 **Authentication & Authorization**

- Login & Register dengan JWT token
- Protected routes dengan authentication guard
- Role-based access control (Admin & User)
- Auto-redirect jika tidak authenticated

### 👥 **User Management**

- CRD users (khusus admin)
- Role admin (keseluruhan halaman)
  users (halaman purchase requests)

### 📦 **Items Management**

- Tampilan tabel items dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Menjadi Acuan dalam stockbarang inventory

### 📝 **Purchase Request (PR)**

- Tampilan tabel items dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Status (Open->procces->completed)
- Status tracking dengan berbeda warna
- Print dokumen PR dengan format standar perusahaan

### 📋 **PR Items**

- Tampilan tabel items dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- digunakan hanya sebagai backup pencatatan data PR

### 🧾 **Market List**

- Tampilan tabel items dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Tabel daftar barang yang perlu dibeli digunakan sebagai keranjang kalau di shope mah
- warna tabel merah jika o.date dan e.date berdekatan

### 📥 **Receiving**

- Tampilan tabel items dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Form pencatatan barang masuk dari pengiriman supllier
- Upload dokumentasi (foto/file) sebagai bukti barang datang
- Status accepted = barang diterima
- Status rejected = barang salah kirim atau return
- Auto-update ke items qty sebagai stock barang masuk dengan catatan name harus sama

### 📥 **Receiving Items**

- Tampilan tabel dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Sebagai backup catatan dari receiving akan tetapi jika di r.items ini bisa dari supllier bisa juga dari manual (atau barang apa yang ingin dimasukan ke dalam items/stock tapi bukan dari suplier)
- Detail item penerimaan dengan qty & kondisi
- Link ke Purchase Request terkait

### 🏬 **Service Request (S-Request / Store Request)**

- Tampilan tabel dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Form permintaan barang internal dari store atau gudang untuk di salurkan ke beberapa departemen
- Dynamic item rows (tambah/hapus items) halaman list untuk beberapa item dan qty
- Print halaman

### 📋 **SR Items**

- Tampilan tabel dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Digunakan hanya untuk backup dan catatan tambahan dari Sr

### 📤 **Issuing**

- Tampilan tabel dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Sebetulnya fungsi asli nya digunakan sebagai pengeluaran barang misal barang yang expired rusak dan sebgaainya akan tetapi karena waktu nya belum cukup maka saya gunakan sebagai pencataan untuk pembelajaran

### 📤 **Issuing Items**

- Tampilan tabel dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Digunakan hanya untuk backup dan catatan tambahan dari issuings

### 📊 **Stock Balance Report**

--Halaman laporan/report tentang keseluruhan inventory seperti
-Tota keseluruhan stock di hitung dari qty items
-Total receiving
-Total issuing
-Total pengeluaran / expences
-Pie chart Suplier performance
-Distribution performance

### 🚪 **Logout**

- Mengakhiri sesi dengan aman
- Clear token & redirect ke login
- Animation logout button

---

## 🛠️ Teknologi yang Digunakan di frontend

| Teknologi                   | Versi  | Deskripsi                                                 |
| --------------------------- | ------ | --------------------------------------------------------- |
| ⚡ **Express.js**           |
| 🟩 **Node.js**              |
| 🐘 **PosgreSql**            |
| 📡 **Rest**                 |
| ⚛️ **React**                | 19.2+  | Library UI modern dengan hooks                            |
| 🔷 **TypeScript**           | 5.9+   | Type-safe JavaScript untuk development yang lebih aman    |
| 🎨 **Chakra UI**            | v3.29+ | Component library modern dengan dark mode & theming       |
| 🛣️ **React Router DOM**     | v7.9+  | Client-side routing dan navigation                        |
| 📡 **Axios**                | 1.13+  | HTTP client untuk API calls                               |
| 🎭 **Framer Motion**        | 12.23+ | Animasi & transitions yang smooth untuk sidebar & buttons |
| 🎯 **TanStack React Table** | v8.21+ | Headless table dengan sorting, filtering & pagination     |
| 🔄 **TanStack React Query** | v5.90+ | Data fetching, caching, dan state management              |
| 🖨️ **React-to-Print**       | 3.2+   | Print functionality                                       |
| 📄 **jsPDF & html2canvas**  | Latest | PDF generation dari HTML                                  |
| 🎨 **React Icons**          | 5.5+   | Icon library untuk sidebar navigation                     |
| ⚡ **Vite**                 | 7.2+   | Build tool & dev server yang super cepat                  |

---

## 🗃️ Struktur Folder Backend

```
INVENTORY-PROJECT/
├── backend-inventory/
│   ├── dist/
│   ├── node_modules/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── app.ts
│   ├── test/
│   ├── uploads/
│   ├── .env
│   ├── nodemon.json
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── Readme.md
│   └── tsconfig.json
```

## 🗃️ Struktur Folder Frontend

```
frontend-inventory/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── pages/
│   │   ├── components/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Table.tsx
│   │   ├── items/
│   │   │   ├── Table_items.tsx
│   │   │   ├── Create_items.tsx
│   │   │   └── Update_items.tsx
│   │   ├── purchaseRequest/
│   │   │   ├── Table_purchaseRequest.tsx
│   │   │   ├── Create_purchaseRequest.tsx
│   │   │   ├── Update_purchaseRequest.tsx
│   │   │   └── PRPrint.tsx
│   │   ├── pr_items/
│   │   │   ├── Table_pr_items.tsx
│   │   │   ├── Create_pr_items.tsx
│   │   │   └── Update_pr_items.tsx
│   │   ├── marketlist/
│   │   │   ├── Table_marketlist.tsx
│   │   │   ├── Create_marketlist.tsx
│   │   │   └── Update_marketlist.tsx
│   │   ├── receivings/
│   │   │   ├── Table_receiving.tsx
│   │   │   ├── Create_receiving.tsx
│   │   │   └── Update_receiving.tsx
│   │   ├── receiving_items/
│   │   │   ├── Table_receiving_items.tsx
│   │   │   ├── Create_receiving_items.tsx
│   │   │   └── Update_receiving_items.tsx
│   │   ├── s_request/
│   │   │   ├── Table_s_request.tsx
│   │   │   ├── Create_s_request.tsx
│   │   │   ├── Update_s_request.tsx
│   │   │   └── SRPrint.tsx
│   │   ├── sr_items/
│   │   │   ├── Table_sr_items.tsx
│   │   │   ├── Create_sr_items.tsx
│   │   │   └── Update_sr_items.tsx
│   │   ├── issuings/
│   │   │   ├── Table_issuings.tsx
│   │   │   ├── Create_issuings.tsx
│   │   │   └── Update_issuings.tsx
│   │   ├── issuing_items/
│   │   │   ├── Table_issuing_items.tsx
│   │   │   ├── Create_issuing_items.tsx
│   │   │   └── Update_issuing_items.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── utils/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── item.ts
│   │   ├── purchaseRequest.ts
│   │   ├── prItem.ts
│   │   ├── marketlist.ts
│   │   ├── receiving.ts
│   │   ├── receivingItem.ts
│   │   ├── sRequest.ts
│   │   ├── srItem.ts
│   │   ├── issuing.ts
│   │   └── issuingItem.ts
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
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 🚀 Instalasi & Setup

### 📌 Clone Repository

```bash
# Clone repository
git clone <https://github.com/fauzanfullstack/Inventory_Frontend.git>
git clone <https://github.com/fauzanfullstack/Inventory_Backend.git>

# Install front end
npm install

# Install backend
pnpm install
```

### 📌 Setup Backend

Pastikan posgree anda v17 dan backend sudah running dengan konfigurasi:

```env
# Backend .env
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DATABASE=your_database new

PORT=5000
JWT_SECRET=your_secret_key
```

---

Dengan harapan dapat terus dikembangkan menjadi lebih baik ke depannya! 🚀

---

## 📝 Pembuat

---

-Nama: Fauzan Permana
-Jurusan : Pengembangan Perangkat Lunak dan Gim (PPLG)
-Sekolah : SMK Negeri 1 Garut

---

Happy coding! 🎉
