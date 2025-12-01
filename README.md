# 📝 Inventory Management System - Frontend

Sistem Frontend Inventory berbasis **React + TypeScript + Chakra UI v3** yang menyediakan antarmuka pengguna untuk pengelolaan barang seperti persediaan, permintaan, pengeluaran, daftar barang, hingga laporan lengkap dengan visualisasi yang interaktif.

---

## 📑 Daftar Isi

- [Tujuan Project](#-tujuan-project)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#%EF%B8%8F-teknologi-yang-digunakan)
- [Instalasi & Setup](#-instalasi--setup)
- [Struktur Folder](#%EF%B8%8F-struktur-folder)
- [Routing & Navigation](#-routing--navigation)
- [API Integration](#-api-integration)
- [Komponen Unggulan](#-komponen-unggulan)
- [Screenshots](#-screenshots)

---

## 🎯 Tujuan Project

- Menyediakan **interface user-friendly** untuk admin & departemen dalam pengelolaan barang
- Memudahkan **visualisasi data** inventory secara real-time
- Mencatat alur barang dari **permintaan, penerimaan, hingga pengeluaran** dengan tampilan yang interaktif
- Menjadi sarana pembelajaran pembuatan **frontend modern** menggunakan React + TypeScript + Chakra UI

---

## 📂 Fitur Utama

### 🔐 **Authentication & Authorization**
- Login & Register dengan JWT token
- Protected routes dengan authentication guard
- Role-based access control (Admin & User)
- Auto-redirect jika tidak authenticated

### 👥 **User Management**
- CRUD users (khusus admin)
- Role management
- User profile

### 📦 **Items Management**
- Tampilan tabel items dengan filter & search
- CRUD operations (Create, Read, Update, Delete)
- Upload foto barang dengan preview
- Form input dengan validasi lengkap

### 📝 **Purchase Request (PR)**
- Form pembuatan PR dengan multiple items
- Approval workflow (Pending → Approved → Rejected)
- Status tracking dengan badge warna
- Print dokumen PR dengan format profesional
- History & filtering berdasarkan tanggal

### 📋 **PR Items**
- Management detail item per PR
- CRUD operations untuk item
- Link ke Purchase Request parent

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

### 📥 **Receiving Items**
- Detail item penerimaan dengan qty & kondisi
- Notes field untuk catatan tambahan
- Link ke Purchase Request terkait

### 🏬 **Service Request (S-Request / Store Request)**
- Form permintaan barang internal dengan **multiple items dalam satu request**
- Dynamic item rows (tambah/hapus items)
- Workflow approval dengan status tracking
- **Collapsible items table** di halaman list dengan animasi
- Print halaman dengan company logo
- Filter dropdown untuk status, cost center, location, request by

### 📋 **SR Items**
- Management detail item per Service Request
- CRUD operations untuk item
- Link ke Service Request parent

### 📤 **Issuing**
- Form pengeluaran barang dari gudang
- Stock validation sebelum issue
- Auto-decrease stock quantity
- Print issuing document

### 📤 **Issuing Items**
- Detail barang yang keluar
- Tracking purpose/destination
- Qty management dengan validation

### 📊 **Stock Balance Report**
- Dashboard laporan stok terkini
- Grafik pergerakan stok (In/Out)
- Filter tanggal, jenis transaksi, item
- Export to Excel/PDF
- Print report dengan custom format

### 🚪 **Logout**
- Mengakhiri sesi dengan aman
- Clear token & redirect ke login
- Animation logout button

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| ⚛️ **React** | 19.2+ | Library UI modern dengan hooks |
| 🔷 **TypeScript** | 5.9+ | Type-safe JavaScript untuk development yang lebih aman |
| 🎨 **Chakra UI** | v3.29+ | Component library modern dengan dark mode & theming |
| 🛣️ **React Router DOM** | v7.9+ | Client-side routing dan navigation |
| 📡 **Axios** | 1.13+ | HTTP client untuk API calls |
| 🎭 **Framer Motion** | 12.23+ | Animasi & transitions yang smooth untuk sidebar & buttons |
| 📊 **Recharts** | 3.4+ | Library untuk data visualization |
| 🎯 **TanStack React Table** | v8.21+ | Headless table dengan sorting, filtering & pagination |
| 🔄 **TanStack React Query** | v5.90+ | Data fetching, caching, dan state management |
| 🖨️ **React-to-Print** | 3.2+ | Print functionality |
| 📄 **jsPDF & html2canvas** | Latest | PDF generation dari HTML |
| 🎨 **React Icons** | 5.5+ | Icon library untuk sidebar navigation |
| ⚡ **Vite** | 7.2+ | Build tool & dev server yang super cepat |

---

## 🚀 Instalasi & Setup

### 📌 Clone Repository

```bash
# Clone repository
git clone <repository-url>
cd frontend-inventory

# Install dependencies dengan npm
npm install

# Atau dengan pnpm (recommended untuk faster installation)
pnpm install
```

### 📌 Konfigurasi Environment

Buat file `.env` di root folder:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Optional: Port configuration
VITE_PORT=5173
```

### 📌 Setup Backend (PostgreSQL)

Pastikan backend sudah running dengan konfigurasi:

```env
# Backend .env
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DATABASE=inventory_db

PORT=5000
JWT_SECRET=your_secret_key
```

### 📌 Jalankan Development Server

```bash
npm run dev
# atau
pnpm run dev
```

Aplikasi akan berjalan di: **http://localhost:5173**

### 📌 Build untuk Production

```bash
# Build project
npm run build

# Preview production build
npm run preview
```

File hasil build ada di folder `dist/`

---

## 🗃️ Struktur Folder

```
frontend-inventory/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── pages/
│   │   ├── components/
│   │   │   ├── Sidebar.tsx           # Animated sidebar with hover
│   │   │   └── Table.tsx             # Custom table component
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
│   │   │   ├── Table_s_request.tsx   # With collapsible items
│   │   │   ├── Create_s_request.tsx  # Dynamic items form
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
│   │   ├── api.ts                    # Axios instance with interceptors
│   │   ├── auth.ts                   # Authentication API
│   │   ├── item.ts                   # Items API
│   │   ├── purchaseRequest.ts        # Purchase Request API
│   │   ├── prItem.ts                 # PR Items API
│   │   ├── marketlist.ts             # Market List API
│   │   ├── receiving.ts              # Receiving API
│   │   ├── receivingItem.ts          # Receiving Items API
│   │   ├── sRequest.ts               # Service Request API
│   │   ├── srItem.ts                 # SR Items API
│   │   ├── issuing.ts                # Issuing API
│   │   └── issuingItem.ts            # Issuing Items API
│   ├── ProtectedRoute.tsx            # Auth guard component
│   ├── TableUsers.tsx                # User management table
│   ├── stockbalance.tsx              # Stock balance report
│   ├── App.tsx                       # Main app with routing
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles
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

---

## 🛣️ Routing & Navigation

### Struktur Route

```typescript
// Public Routes
/login                          → Login page
/register                       → Register page

// Protected Routes (Semua butuh auth)
/                              → Redirect ke /dashboard
/dashboard                     → Dashboard (admin only)
/tableusers                    → User management (admin only)
/stockbalance                  → Stock balance report (admin only)

// Items
/tableitem                     → Items list
/createitem                    → Create new item
/updateitem/:id                → Update item

// Purchase Request
/tablepurchaserequests         → PR list (semua role)
/createpurchaserequests        → Create PR (semua role)
/updatepurchaserequests/:id    → Update PR (admin only)
/printpurchaserequests/:id     → Print PR

// PR Items
/pritems                       → PR items list
/createpritems                 → Create PR item
/updatepritems/:id             → Update PR item

// Market List
/tablemarketlist               → Market list
/createmarketlist              → Create market list
/updatemarketlist/:id          → Update market list

// Receiving
/tablereceiving                → Receiving list
/createreceiving               → Create receiving
/updatereceiving/:id           → Update receiving

// Receiving Items
/tablereceivingitems           → Receiving items list
/createreceivingitems          → Create receiving item
/updatereceivingitems/:id      → Update receiving item

// Service Request (Store Request)
/tablesrequests                → Store requests list
/createsrequest                → Create store request
/updatesrequest/:id            → Update store request
/printsrequest/:id             → Print store request

// SR Items
/tablesritems                  → Store items list
/createsritems                 → Create store item
/updatesritems/:id             → Update store item

// Issuing
/tableissuings                 → Issuings list
/createissuings                → Create issuing
/updateissuings/:id            → Update issuing

// Issuing Items
/tableissuingitem              → Issuing items list
/createissuingitem             → Create issuing item
/updateissuingitem/:id         → Update issuing item
```

### Protected Route Implementation

```typescript
// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Optional role checking
  if (allowedRoles) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
```

---

## 📡 API Integration

### Axios Configuration

```typescript
// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request interceptor - Add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Example API Utility (Service Request)

```typescript
// utils/sRequest.ts
import api from "./api";

export const getSRequests = async () => {
  const { data } = await api.get("/s-requests");
  return data;
};

export const getSRequestById = async (id: number | string) => {
  const { data } = await api.get(`/s-requests/${id}`);
  return data;
};

export const createSRequest = async (payload: any) => {
  const { data } = await api.post("/s-requests", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const updateSRequest = async (id: number | string, payload: any) => {
  const { data } = await api.put(`/s-requests/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const deleteSRequest = async (id: number | string) => {
  const { data } = await api.delete(`/s-requests/${id}`);
  return data;
};
```

---

## 🎨 Komponen Unggulan

### 1. Animated Sidebar

Sidebar dengan animasi hover menggunakan **Framer Motion**:

**Fitur:**
- Auto-expand on hover (60px → 240px)
- Animated logo & menu labels
- Role-based menu (Admin vs User)
- Smooth transitions dengan Framer Motion
- Active route highlighting
- Logout button dengan animasi

**Teknologi:**
- Framer Motion untuk animasi
- React Icons untuk icon set
- Chakra UI untuk styling
- React Router untuk navigation

**Preview:**
```
Collapsed (60px):          Expanded (240px):
┌────┐                     ┌────────────────────┐
│ 🏠 │                     │ 🏠  Dashboard       │
│ 📦 │                     │ 📦  Items          │
│ 📋 │  ←── Hover ──→      │ 📋  Purchase Req   │
│ 🚪 │                     │ 🚪  Logout         │
└────┘                     └────────────────────┘
```

### 2. Dynamic Items Form (Service Request)

Form dengan **dynamic item rows**:

**Fitur:**
- Tambah/hapus item secara dinamis
- Validation per item (name & qty required)
- Auto-generate unique item ID
- Table preview dengan styling
- RGB border animation untuk form card

**Teknologi:**
- React useState untuk state management
- Dynamic array manipulation
- Custom CSS animations

**Code Example:**
```typescript
const [items, setItems] = useState([
  { id: Date.now(), name: "", qty: 1 }
]);

const addItem = () => {
  setItems(prev => [...prev, { id: Date.now(), name: "", qty: 1 }]);
};

const removeItem = (id: number) => {
  if (items.length > 1) {
    setItems(prev => prev.filter(item => item.id !== id));
  }
};
```

### 3. Collapsible Items Table

Tabel dengan **collapsible rows** untuk menampilkan detail items:

**Fitur:**
- Click to expand/collapse
- Smooth fadeIn animation
- Badge untuk total items & quantity
- Nested table untuk detail items
- Color-coded status badges

**Teknologi:**
- React useState dengan Set untuk track expanded rows
- CSS @keyframes untuk fadeIn animation
- Chakra UI untuk styling

**Preview:**
```
┌──────────────────────────────────────────────────┐
│ SR-001 | Open | 2025-01-15 | [📦 3 Items ✓ 15] ▼│
├──────────────────────────────────────────────────┤
│  No  │ Item Name        │ Qty                    │
│  1   │ Laptop Dell XPS  │ 5                      │
│  2   │ Mouse Logitech   │ 10                     │
└──────────────────────────────────────────────────┘
```

### 4. Advanced Filtering System

**Multiple filter types:**
- **Global search** - Cari di semua kolom
- **Dropdown filters** - Filter per column (status, location, dll)
- **Reset filter button** dengan Framer Motion animation
- **Active filter badge** untuk visual feedback

**Code Example:**
```typescript
const [filters, setFilters] = useState<Record<string, string>>({});
const [searchQuery, setSearchQuery] = useState("");

const filteredData = useMemo(() => {
  return data.filter((item) => {
    // Filter by dropdowns
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(item[key]).toLowerCase().includes(value.toLowerCase());
    });

    // Filter by search
    const matchesSearch = searchQuery
      ? displayColumns.some((key) =>
          String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;

    return matchesFilters && matchesSearch;
  });
}, [filters, searchQuery, data]);
```

### 5. Status Badge System

Color-coded badges untuk status tracking:

```typescript
const getStatusColor = (status: string) => {
  const s = status?.toLowerCase();
  switch (s) {
    case "open":
      return { bg: "rgba(66,153,225,0.2)", color: "#2b6cb0" };
    case "waiting":
      return { bg: "rgba(246,173,85,0.2)", color: "#c05621" };
    case "approved":
      return { bg: "rgba(72,187,120,0.2)", color: "#2f855a" };
    case "purchase":
      return { bg: "rgba(214,188,250,0.4)", color: "#553c9a" };
    default:
      return { bg: "gray.200", color: "gray.700" };
  }
};
```

### 6. RGB Border Animation

Custom CSS animation untuk form card:

```css
@keyframes rgbBorder {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.rgb-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px;
  background: linear-gradient(
    270deg,
    red, orange, yellow, lime, cyan, blue, violet, red
  );
  background-size: 400% 400%;
  animation: rgbBorder 6s linear infinite;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}
```

---

## 🎯 Best Practices yang Diterapkan

### 1. **Component Organization**
- Separation of concerns (pages, components, utils)
- Reusable components (Table, Sidebar, ProtectedRoute)
- Clear folder structure per feature

### 2. **State Management**
- React useState untuk local state
- TanStack Query untuk server state (ready to use)
- useMemo untuk computed values & filtering

### 3. **Performance Optimization**
- useMemo untuk prevent unnecessary re-renders
- Lazy loading potential (belum implemented)
- Code splitting dengan React Router

### 4. **Type Safety**
- TypeScript untuk compile-time checking
- Proper typing untuk props & functions (bisa ditingkatkan)

### 5. **Error Handling**
- Try-catch untuk API calls
- User-friendly error messages
- Auto-redirect on 401 (Axios interceptor)

### 6. **UX/UI Design**
- Responsive design dengan Chakra UI
- Smooth animations dengan Framer Motion
- Clear visual feedback (loading, badges, colors)
- Intuitive navigation dengan sidebar

---

## 🚧 Area untuk Improvement

Beberapa area yang bisa ditingkatkan di masa depan:

### 1. **TypeScript Types**
- Buat interface/type definitions untuk semua entities
- Replace `any` dengan proper types
- Tambah folder `types/` untuk centralized types

### 2. **State Management**
- Implement TanStack Query lebih optimal (caching, refetch)
- Consider Zustand/Jotai untuk complex global state

### 3. **Testing**
- Unit tests untuk utility functions
- Component tests dengan React Testing Library
- E2E tests dengan Playwright/Cypress

### 4. **Performance**
- Implement virtualization untuk large tables
- Code splitting & lazy loading
- Image optimization

### 5. **Accessibility**
- ARIA labels yang lebih lengkap
- Keyboard navigation improvement
- Screen reader support

### 6. **Documentation**
- API documentation
- Component storybook
- Inline code comments

---

## 🧪 Testing & Quality

```bash
# Type checking
npm run build

# Linting
npm run lint

# Format code (bisa ditambah dengan Prettier)
# npm run format
```

**Testing belum diimplementasikan**, tapi setup untuk Vitest sudah bisa ditambahkan.

---

## 🚀 Deployment

### Build untuk Production

```bash
# Build
npm run build

# Preview build
npm run preview
```

### Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy ke Netlify

Drag & drop folder `dist/` ke Netlify dashboard, atau:

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Environment Variables

Jangan lupa set environment variables di platform deployment:

```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

---

## 📚 Resources & Documentation

- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Chakra UI v3 Documentation](https://www.chakra-ui.com/docs)
- [TanStack Table Documentation](https://tanstack.com/table)
- [TanStack Query Documentation](https://tanstack.com/query)
- [React Router Documentation](https://reactrouter.com)
- [Framer Motion Documentation](https://www.framer.com/motion)

---

## 📝 Changelog & Version History

### v1.0.0 (Current)
- ✅ Initial release
- ✅ Complete CRUD untuk semua entities
- ✅ Role-based authentication
- ✅ Animated sidebar dengan Framer Motion
- ✅ Dynamic items form untuk Service Request
- ✅ Collapsible items table dengan animasi
- ✅ Advanced filtering system
- ✅ Print functionality untuk PR & SR
- ✅ RGB border animation untuk form

---

## 📌 Penutup

Saya **Fauzan Permana** menyadari bahwa frontend yang saya buat masih belum sepenuhnya kompleks dan masih banyak area yang bisa ditingkatkan. Saya memohon maaf atas kekurangan tersebut. 

Dengan waktu pengerjaan yang cukup terbatas dan kemampuan yang masih terus saya pelajari, saya berusaha memberikan hasil terbaik yang saya bisa pada kondisi saat ini.

### Highlight Features:
- ⚡ **Vite** - Fast development experience
- 🎨 **Chakra UI v3** - Modern component library
- 🎭 **Framer Motion** - Smooth animations (sidebar, buttons)
- 📊 **TanStack Table** - Advanced table dengan filtering
- 🔄 **TanStack Query** - Ready untuk data fetching optimization
- 🎯 **Dynamic Forms** - Multiple items per request
- 📱 **Responsive** - Mobile-friendly design
- 🔒 **Secure** - JWT authentication dengan interceptors

### Tech Stack Summary:
```
Frontend: React 19 + TypeScript 5.9
Styling: Chakra UI v3 + Framer Motion
Routing: React Router DOM v7
State: React useState + TanStack Query
HTTP: Axios with interceptors
Build: Vite 7.2
Icons: React Icons 5.5
```

Dengan harapan dapat terus dikembangkan menjadi lebih baik ke depannya! 🚀

---

## 📝 License

MIT License - feel free to use for learning purposes

---

## 📞 Contact

**Fauzan Permana**
- GitHub: [@fauzanpermana](https://github.com/fauzanpermana)
- Email: fauzan@example.com

---

**⭐ Jangan lupa beri star jika project ini bermanfaat!**

---

## 🔧 Quick Start Checklist

- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Setup `.env` file
- [ ] Start backend server (PostgreSQL + Express)
- [ ] Run frontend (`npm run dev`)
- [ ] Login dengan akun admin
- [ ] Explore fitur-fitur yang tersedia

**Default Admin Credentials** (sesuaikan dengan backend):
```
Username: admin
Password: admin123
```

Happy coding! 🎉