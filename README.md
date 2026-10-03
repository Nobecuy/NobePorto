# NobePorto — Modern Portfolio Website

Portofolio web modern yang dibangun dengan React, Vite, dan Tailwind CSS v4. Menampilkan proyek-proyek, skill timeline, dan sistem badge dinamis untuk mengkategorikan jenis build project.

---

## 🚀 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | UI Component Library |
| **Vite 8** | Build Tool & Dev Server |
| **Tailwind CSS v4** | Utility-first CSS Framework |
| **GSAP** | Advanced Animation Library |
| **Lenis** | Smooth Scroll Experience |
| **Vercel Blob** | Visitor Counter Storage |
| **Vercel Analytics** | Web Analytics |

---

## 🎯 Fitur Utama

- ✨ **Glassmorphism Design** — Border glow & backdrop blur effects
- 🎨 **Dark Mode** — Theme switcher dengan persistensi localStorage
- 🏷️ **Dynamic Badge System** — Kategorisasi proyek berdasarkan jenis build
- 📊 **Live Analytics** — Real-time visitor counter & performance metrics
- 🎭 **Smooth Animations** — GSAP scroll-triggered animations & Lenis smooth scroll
- 📱 **Fully Responsive** — Mobile-first design approach

---

## 🏷️ System Badge Proyek

Setiap proyek dapat diberi **satu atau lebih badge** untuk menandai karakteristik khusus dari build tersebut.

### Tipe Badge yang Tersedia

| Type | Label Contoh | Visual Style | Kegunaan |
| :--- | :--- | :--- | :--- |
| `ai` | "AI-Assisted Build" | 🟢 Emerald (Hijau) | Proyek yang dibangun dengan bantuan AI tools (Cursor, Claude) |
| `feature` | "Custom Interactive" | ⚪ Zinc (Abu-abu transparan) | Proyek dengan fitur interaktif atau animasi khusus |
| `speed` | "Rapid Prototype" | 🔵 Blue (Biru transparan) | Proyek yang dikerjakan dalam waktu singkat (rapid prototyping) |
| `null` | - | - | Tanpa badge (proyek standar) |

### Styling Badge (Tailwind Classes)

```javascript
// Type: ai
bg-emerald-500/10 text-emerald-400 border-emerald-500/20

// Type: feature
bg-white/5 text-zinc-300 border-white/10

// Type: speed
bg-blue-500/10 text-blue-400 border-blue-500/20
```

### Format Data Badge

**Single Badge:**
```javascript
badges: [{ text: "AI-Assisted Build", type: "ai" }]
```

**Multiple Badges (2 atau lebih):**
```javascript
badges: [
  { text: "AI-Assisted Build", type: "ai" },
  { text: "Rapid Prototype", type: "speed" }
]
```

**Tanpa Badge:**
```javascript
badges: null
```

---

## 📝 Cara Menambahkan Proyek Baru

### 1. Buka File Data Proyek

Navigasi ke `src/data/portfolioData.js`

### 2. Tambahkan Objek Proyek Baru

Tambahkan item baru di dalam array `projects`:

```javascript
{
  id: 6, // ID harus unik dan sequential
  slug: "nama-project-url-friendly",
  title: "Nama Project",
  description: "Deskripsi singkat yang menjelaskan apa yang dibangun dan teknologi yang digunakan.",
  tags: ["React", "Vite", "Tailwind", "GSAP"], // Stack teknologi
  image: "/screenshot-project.png", // Path gambar di folder public/
  github: "https://github.com/username/repo", // Link GitHub repo (opsional, gunakan "#" jika tidak ada)
  demo: "https://project-demo.vercel.app", // Link live demo
  featured: true, // true = tampil di halaman utama, false = hidden
  year: "2026", // Tahun pembuatan
  badge: { text: "AI-Assisted Build", type: "ai" } // Badge opsional (bisa null)
}
```

### 3. Contoh Lengkap: Proyek dengan 2 Badge

```javascript
{
  id: 7,
  slug: "portfolio-redesign",
  title: "Portfolio Redesign 2026",
  description: "Website portofolio modern dengan glassmorphism design, smooth scroll, dan dynamic badge system.",
  tags: ["React", "Vite", "Tailwind", "Lenis", "GSAP"],
  image: "/portfolio-preview.png",
  github: "https://github.com/nobecuy/portfolio-v2",
  demo: "https://nobeporto.vercel.app",
  featured: true,
  year: "2026",
  badges: [
    { text: "AI-Assisted Build", type: "ai" },
    { text: "Rapid Prototype", type: "speed" }
  ]
}
```

### 4. Contoh: Proyek dengan 1 Badge

```javascript
{
  id: 8,
  slug: "interactive-landing",
  title: "Interactive Landing Page",
  description: "Landing page dengan animasi GSAP dan scroll-triggered interactions.",
  tags: ["React", "Tailwind", "GSAP"],
  image: "/landing-preview.png",
  github: "#",
  demo: "https://landing-demo.vercel.app",
  featured: true,
  year: "2026",
  badges: [{ text: "Custom Interactive", type: "feature" }]
}
```

### 5. Contoh: Proyek Tanpa Badge

```javascript
{
  id: 9,
  slug: "simple-landing",
  title: "Simple Landing Page",
  description: "Landing page sederhana untuk bisnis lokal dengan desain clean dan minimalis.",
  tags: ["React", "Tailwind"],
  image: "/simple-landing.png",
  github: "#",
  demo: "https://simple-landing.vercel.app",
  featured: true,
  year: "2026",
  badges: null
}
```

### 6. Upload Gambar Preview

- Simpan screenshot/mockup proyek di folder `public/`
- Gunakan nama file yang deskriptif (misal: `portfolio-preview.png`)
- Referensi path gambar dengan `/nama-file.png` (tanpa `public/`)

### 7. Verify & Test

```bash
npm run dev
```

Buka browser dan pastikan proyek baru muncul di section **Projects**.

---

## 🛠️ Setup & Installation

### Prerequisites

- **Node.js** 18+ dan npm/yarn
- Git

### Clone Repository

```bash
git clone https://github.com/nobecuy/nobeporto.git
cd nobeporto
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📂 Struktur Folder

```
NobePorto/
├── public/               # Static assets (images, favicon, etc)
├── src/
│   ├── components/       # React components (Header, Hero, Projects, etc)
│   ├── data/
│   │   └── portfolioData.js  # ⭐ DATA UTAMA: Profile, Projects, Skills, Learning
│   ├── index.css         # Global styles & CSS variables (theme, animations)
│   ├── App.jsx           # Main app component (routing, theme, Lenis setup)
│   └── main.jsx          # Entry point
├── package.json
└── vite.config.js
```

---

## 🎨 Customization

### Mengubah Warna Theme

Edit CSS variables di `src/index.css`:

```css
/* Light mode */
@theme {
  --color-bg: #ffffff;
  --color-fg: #18181b;
  --color-accent: #3b82f6;
  /* ... */
}

/* Dark mode */
html[data-theme="dark"] {
  --color-bg: #0a0a0a;
  --color-fg: #fafafa;
  --color-accent: #60a5fa;
  /* ... */
}
```

### Menambahkan Tipe Badge Baru

Edit logika conditional di `src/components/Projects.jsx`:

```javascript
{project.badge && (
  <span className={`text-[10px] px-2 py-0.5 rounded-full border backdrop-blur-md ${
    project.badge.type === 'ai' 
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
      : project.badge.type === 'speed'
        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        : 'bg-white/5 text-zinc-300 border-white/10'
  }`}>
    {project.badge.text}
  </span>
)}
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import repository di [Vercel Dashboard](https://vercel.com)
3. Vercel akan auto-detect Vite config
4. Deploy!

### Environment Variables (Jika Diperlukan)

Jika menggunakan Vercel Blob untuk visitor counter, set:

```env
BLOB_READ_WRITE_TOKEN=your_token_here
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Credits

Built with ❤️ by **Achmad Nobe Anta Ananda**

- Portfolio: [nobeporto.vercel.app](https://nobeporto.vercel.app)
- GitHub: [@Nobecuy](https://github.com/Nobecuy)
- Contact: nobedes32@gmail.com

---

**💡 Tips:** Jika menggunakan struktur portofolio ini untuk project pribadi, silakan fork dan modifikasi sesuai kebutuhan. Appreciate jika bisa memberikan credit kecil 🙂
