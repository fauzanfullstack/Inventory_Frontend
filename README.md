# 📝 Inventory Management System - Frontend (Pengelolaan Barang)

Sistem Frontend Inventory berbasis **React + TypeScript + Chakra UI** yang menyediakan antarmuka pengguna untuk pengelolaan barang seperti persediaan, permintaan, pengeluaran, daftar barang, hingga laporan lengkap dengan visualisasi yang interaktif.

---

## 📑 Daftar Isi

- 🎯 [Tujuan Project](#-tujuan-project)
- 📂 [Fitur Utama](#-fitur-utama)
- 🛠️ [Teknologi yang Digunakan](#️-teknologi-yang-digunakan)
- 🚀 [Proses Frontend Singkat](#-proses-frontend-singkat)
- 🗃️ [Struktur Folder](#️-struktur-folder)
- 📡 [Contoh Routing](#-contoh-routing)
- 📸 [Dokumentasi Tampilan](#-dokumentasi-tampilan)

---

## 🎯 Tujuan Project

- Menyediakan **interface user-friendly** untuk admin & departemen lain dalam pengelolaan barang
- Memudahkan **visualisasi data** inventory secara real-time
- Mencatat alur barang dari **permintaan, penerimaan, hingga pengeluaran** dengan tampilan yang interaktif
- Menjadi sarana pembelajaran pembuatan **frontend modern** menggunakan React + TypeScript + Chakra UI

---

## 📂 Fitur Utama

### 🔐 **Auth & User Management**
- Login & Register dengan validasi form
- Protected routes dengan authentication
- Role-based access control (Admin & User)
- Session management dengan token

### 📦 **Items Management**
- Tampilan tabel items dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Upload foto barang dengan preview
- Form input dengan validasi lengkap
- Export data ke Excel/PDF

### 📝 **Purchase Request (PR)**
- Form pembuatan PR dengan multiple items
- Approval workflow (Pending → Approved → Rejected)
- Status tracking dengan badge warna
- Print dokumen PR dengan format profesional
- History & filtering berdasarkan tanggal

### 🛒 **PR Items**
- Dynamic form untuk menambah/hapus item
- Auto-calculate total price
- Qty & unit management
- Validation untuk prevent duplicate items

### 🧾 **Market List**
- Dashboard daftar barang yang perlu dibeli
- Prioritas berdasarkan urgency
- Update status secara real-time
- Filter & sort berdasarkan berbagai kriteria

### 📥 **Receiving**
- Form pencatatan barang masuk
- Upload dokumentasi (foto/file)
- Status: Pending → Received → Completed
- Auto-update stock saat status "Received"
- Preview & print receiving document

### 📥 **Receiving Items**
- Detail item penerimaan dengan qty & kondisi
- Notes field untuk catatan tambahan
- Image preview untuk dokumentasi
- Link ke Purchase Request terkait

### 🏬 **Service Request (S-Request)**
- Form permintaan barang internal
- Multiple items dalam satu request
- Workflow approval dengan notifikasi
- Print halaman dengan company logo
- Auto-deduct stock saat status "Approved"

### 📤 **Issuing**
- Form pengeluaran barang dari gudang
- Scan barcode/part number (optional)
- Stock validation sebelum issue
- Auto-decrease stock quantity
- Print issuing document

### 📤 **Issuing Items**
- Detail barang yang keluar
- Tracking purpose/destination
- Qty management dengan validation
- Notes & documentation

### 📊 **Stock Balance Report**
- Dashboard laporan stok terkini
- Grafik pergerakan stok (In/Out)
- Filter tanggal, jenis transaksi, item
- Export to Excel/PDF
- Print report dengan custom format


### 🚪 **Logout**
- Mengakhiri sesi dengan aman
- Clear token & redirect ke login
- Confirmation dialog

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Deskripsi |
|-----------|-----------|
| ⚛️ **React 18** | Library UI modern |
| 🔷 **TypeScript** | Type-safe JavaScript |
| 🎨 **Chakra UI v3** | Component library dengan dark mode support |
| 🛣️ **React Router v6** | Client-side routing |
| 📡 **Axios** | HTTP client untuk API calls |
| 🎭 **Framer Motion** | Animasi & transitions |
| 📊 **Recharts** | Data visualization |
| 🖨️ **React-to-Print** | Print functionality |
| 📄 **jsPDF & html2canvas** | PDF generation |
| 📅 **Date-fns** | Date manipulation |
| 🎯 **TanStack Table** | Advanced table with sorting & filtering |
| ⚡ **Vite** | Build tool & dev server |
| 🧪 **Vitest** | Testing framework |

---

## 🚀 Proses Frontend Singkat

### 📌 1. Instalasi

```bash
# Clone repository
git clone <repository-url>
cd frontend-inventory

# Install dependencies dengan npm
npm install

# Atau dengan pnpm (recommended)
pnpm install
```

### 📌 2. Konfigurasi Environment

Buat file `.env` di root folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_UPLOAD_URL=http://localhost:5000/uploads
```

### 📌 3. Jalankan Development Server

```bash
npm run dev
# atau
pnpm run dev
```

Akses aplikasi di: **http://localhost:5173**

### 📌 4. Build untuk Production

```bash
npm run build
# atau
pnpm run build
```

File hasil build ada di folder `dist/`

---

## 🗃️ Struktur Folder

```
INVENTORY-PROJECT/
├── frontend-inventory/
│   ├── node_modules/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/                  # Images, icons, static files
│   │   ├── components/              # Reusable components
│   │   │   ├── Table.tsx            # Generic table component
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   ├── Header.tsx           # Top header
│   │   │   └── ProtectedRoute.tsx   # Auth guard
│   │   ├── pages/                   # Page components
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── items/
│   │   │   │   ├── TableItems.tsx
│   │   │   │   ├── CreateItem.tsx
│   │   │   │   └── UpdateItem.tsx
│   │   │   ├── purchase_request/
│   │   │   │   ├── TablePR.tsx
│   │   │   │   ├── CreatePR.tsx
│   │   │   │   ├── UpdatePR.tsx
│   │   │   │   └── PrintPR.tsx
│   │   │   ├── receiving/
│   │   │   │   ├── TableReceiving.tsx
│   │   │   │   ├── CreateReceiving.tsx
│   │   │   │   └── UpdateReceiving.tsx
│   │   │   ├── s_request/
│   │   │   │   ├── TableSRequest.tsx
│   │   │   │   ├── CreateSRequest.tsx
│   │   │   │   ├── UpdateSRequest.tsx
│   │   │   │   └── PrintSRequest.tsx
│   │   │   ├── issuing/
│   │   │   ├── marketlist/
│   │   │   ├── stock_movements/
│   │   │   └── Dashboard.tsx
│   │   ├── utils/                   # Helper functions & API calls
│   │   │   ├── api.ts               # Axios instance
│   │   │   ├── auth.ts              # Auth utilities
│   │   │   ├── item.ts              # Items API
│   │   │   ├── purchaseRequest.ts
│   │   │   ├── receiving.ts
│   │   │   ├── sRequest.ts
│   │   │   ├── issuing.ts
│   │   │   └── stockMovement.ts
│   │   ├── types/                   # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── App.tsx                  # Main app component
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── .env                         # Environment variables
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── README.md
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
```

---

## 📡 Contoh Routing

### App.tsx (Main Routes)

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Items
import TableItems from "./pages/items/TableItems";
import CreateItem from "./pages/items/CreateItem";
import UpdateItem from "./pages/items/UpdateItem";

// Service Request
import TableSRequest from "./pages/s_request/TableSRequest";
import CreateSRequest from "./pages/s_request/CreateSRequest";
import UpdateSRequest from "./pages/s_request/UpdateSRequest";
import PrintSRequest from "./pages/s_request/PrintSRequest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          
          {/* Items Routes */}
          <Route path="/items" element={<TableItems />} />
          <Route path="/createitem" element={<CreateItem />} />
          <Route path="/updateitem/:id" element={<UpdateItem />} />
          
          {/* Service Request Routes */}
          <Route path="/srequest" element={<TableSRequest />} />
          <Route path="/createsrequest" element={<CreateSRequest />} />
          <Route path="/updatesrequest/:id" element={<UpdateSRequest />} />
          <Route path="/printsrequest/:id" element={<PrintSRequest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 📡 Contoh API Integration

### utils/api.ts (Axios Instance)

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### utils/sRequest.ts (Service Request API)

```typescript
import api from "./api";

export const getSRequests = async () => {
  const { data } = await api.get("/s-requests");
  return data;
};

export const createSRequest = async (payload: any) => {
  const { data } = await api.post("/s-requests", payload);
  return data;
};

export const updateSRequest = async (id: number, payload: any) => {
  const { data } = await api.put(`/s-requests/${id}`, payload);
  return data;
};
```

---

## 📊 Fitur Unggulan

### 🎨 **Modern UI/UX**
- Dark mode support
- Responsive design (mobile, tablet, desktop)
- Smooth animations dengan Framer Motion
- Consistent design system dengan Chakra UI

### ⚡ **Performance**
- Code splitting & lazy loading
- Optimized bundle size
- Efficient re-rendering dengan React
- Image optimization

### 🔒 **Security**
- Token-based authentication
- Protected routes
- Input validation & sanitization
- CSRF protection

### 📱 **Responsive**
- Mobile-first design
- Touch-friendly interface
- Adaptive layouts
- Progressive Web App ready

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage
```

---

## 📸 Dokumentasi Tampilan

### Login Page
![Login](./docs/screenshots/login.png)

### Dashboard
![Dashboard](./docs/screenshots/dashboard.png)

### Items Management
![Items](./docs/screenshots/items.png)

### Service Request Form
![Service Request](./docs/screenshots/service-request.png)

### Print Preview
![Print](./docs/screenshots/print.png)

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build
npm run build

# Deploy folder dist/
```

---

## 🤝 Kontribusi

Silakan buat pull request atau issue untuk improvement!

---

## 📌 Penutup

> "Saya **Fauzan Permana** menyadari bahwa frontend yang saya buat masih belum sepenuhnya kompleks dan belum dapat memenuhi seluruh aspek ideal sebuah sistem modern. Saya memohon maaf atas kekurangan tersebut. Dengan waktu pengerjaan yang cukup terbatas dan kemampuan yang masih terus saya pelajari, saya berusaha memberikan hasil terbaik yang saya bisa pada kondisi saat ini.
> 
> Sistem ini dibuat dengan fokus pada **fungsionalitas, user experience, dan maintainability**, dengan harapan dapat terus dikembangkan menjadi lebih baik ke depannya."

---

## 📝 License

MIT License - feel free to use for learning purposes

---

## 📞 Contact

**Fauzan Permana**
- GitHub: [@fauzanpermana]
- Email: fauzan@example.com

---

**⭐ Jangan lupa beri star jika project ini bermanfaat!**
