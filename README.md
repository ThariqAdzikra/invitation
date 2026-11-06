# ✨ Undangan Pernikahan Digital — Haute-Couture Edition

Undangan pernikahan digital berbasis **Astro (Static Site Generation)** dengan tema visual **Midnight Navy & Starlight Gold**. Dirancang khusus untuk dibagikan via WhatsApp dengan URL personalisasi `?to=Nama+Tamu`.

Dibangun dengan prinsip **Anti-AI Slop**: mengutamakan tipografi serif berwibawa, ornamen monoline emas murni, kaligrafi Arab sakral, partikel starlight interaktif, dan animasi taktil berbasis Web Audio API.

---

## 🌟 Fitur Unggulan

- **3D Wax Seal Unboxing**: Sampul amplop fisik *Midnight Navy Velvet* dengan cap lilin emas 3D. Mengetuk segel akan memicu animasi pecah lilin, flap amplop terbuka 3D (`rotateX: 180deg`), dan *aperture clip-path* membuka halaman undangan.
- **Atmospheric Celestial Canvas**: Kanvas partikel debu bintang emas starlight yang bergerak perlahan di latar belakang dan merespons gerakan kursor/sentuhan jari.
- **Royal Gold Filigree Frame**: Bingkai ganda garis emas tipis dengan ukiran sudut filigree daun zaitun di 4 sudut layar.
- **3D Flip Card Profil Mempelai**: Kartu mempelai pria dan wanita yang dapat diklik/tap untuk berputar 3D memperlihatkan kutipan romantis dan tautan Instagram.
- **Grand Cathedral Arched Frame (Unified Event)**: Kartu kubah katedral emas terpadu untuk Akad Nikah & Resepsi (1 tanggal, 2 sesi waktu simetris, 1 venue terpusat, tombol Google Maps & Simpan ke Kalender `.ics`).
- **React Bits Integration**:
  - `ClickSpark`: Letupan partikel kilau emas starlight saat menyentuh layar.
  - `ShinyText`: Sapuan cahaya emas metalik (*gold foil shimmer*) pada judul dan overline.
- **Web Audio API Tactile Sound Effects**:
  - Suara retakan fisik segel lilin (*wax seal pop*).
  - Desir halus pembalikan kertas (*card flip whoosh*).
  - Denting harmonis lonceng emas (*chime sound*).
  - Musik instrumental latar dengan *volume fade-in* otomatis.
- **Full-Page Section Snapping (`100dvh`)**: Setiap bab acara mengunci presisi 1 layar penuh dengan CSS Scroll Snap dan navigator titik starlight gold di sisi kanan layar.
- **Nir-Backend / Zero Dead Code**: Tanpa database, tanpa form RSVP rumit, tanpa amplop digital/rekening. 100% cepat, privat, dan aman.

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation / Island Architecture)
- **UI & Interactivity**: [React 18](https://react.dev/) (`@astrojs/react`)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + Custom CSS Design Tokens
- **Motion Engine**: [GSAP 3](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Audio Engine**: Web Audio API (Synthesized Effects)

---

## 🚀 Memulai Proyek di Lokal

### 1. Kloning Repository
```bash
git clone -b feat/astro-midnight-gold https://github.com/ThariqAdzikra/invitation.git
cd invitation
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser di:
- Tampilan default: `http://localhost:4321`
- Tampilan nama tamu personal: `http://localhost:4321/?to=Budi+Santoso`
- Tampilan nama panjang/gelar: `http://localhost:4321/?to=Prof.+Dr.+Raden+Mas+Haryo+Kusumo,+M.Sc.`

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build statis tersimpan di folder `dist/` dan siap di-deploy ke hosting statis mana pun.

### 5. Preview Hasil Build
```bash
npm run preview
```

---

## 📂 Struktur Folder

```
undangan/
├── src/
│   ├── layouts/
│   │   └── Layout.astro         # HTML Shell, Meta OG, Lenis & GSAP setup
│   ├── components/
│   │   ├── reactbits/
│   │   │   ├── CelestialCanvas.tsx # Kanvas debu bintang emas starlight
│   │   │   ├── ClickSpark.tsx      # Letupan partikel emas saat klik/tap
│   │   │   ├── ShinyText.tsx       # Teks kilau emas metalik
│   │   │   └── SoundEffects.ts     # Synthesizer efek suara Web Audio API
│   │   ├── Cover.astro          # Sampul amplop 3D Wax Seal
│   │   ├── Hero.astro           # Tipografi majalah editorial asimetris
│   │   ├── Opening.astro        # Bismillah & Ayat Ar-Rum 21 (Amiri Script)
│   │   ├── Couple.astro         # 3D Flip Card Profil Mempelai
│   │   ├── UnifiedEvent.astro   # Grand Cathedral Arched Frame (Akad & Resepsi)
│   │   ├── Countdown.astro      # Countdown timer tabular presisi
│   │   ├── LoveStory.astro      # Timeline asimetris dengan garis SVG dinamis
│   │   ├── SectionNav.astro     # Navigator titik vertikal melayang
│   │   ├── BotanicalCrest.astro # Karangan daun zaitun monoline emas
│   │   ├── OrnateFrame.astro    # Bingkai filigree sudut emas kerajaan
│   │   ├── FiligreeDivider.astro# Pembatas berornamen bintang emas 8-penjuru
│   │   ├── AudioPlayer.astro    # Floating audio controller
│   │   └── Closing.astro        # Doa penutup, hormat kami, & copyright
│   ├── data/
│   │   └── content.json         # Single source of truth teks & data acara
│   ├── styles/
│   │   └── global.css           # Desain token Midnight & Gold, 3D physics, linen grain
│   └── pages/
│       └── index.astro          # Halaman utama
├── public/                      # Favicon, assets audio & gambar Open Graph
├── _legacy/                     # Backup file versi vanilla HTML/CSS/JS
├── prd.md                       # Product Requirements Document v2.0
├── design.md                    # Design System & Motion Specification v2.0
└── CLAUDE.md                    # Panduan kerja & workflow developer
```

---

## 📝 Mengubah Data & Konten

Seluruh teks undangan (nama mempelai, jadwal acara, tempat, kutipan, dan tautan) dikelola terpusat pada satu file:
👉 **[`src/data/content.json`](src/data/content.json)**

Cukup ubah nilai di dalam file tersebut dan jalankan `npm run build`.

---

## 🌐 Panduan Deploy

Karena menghasilkan HTML statis murni di folder `dist/`, situs ini dapat di-deploy secara gratis ke:
- **Cloudflare Pages**: Hubungkan repo GitHub, pilih framework *Astro*, build command `npm run build`, output directory `dist`.
- **Vercel**: Import repository, Vercel akan otomatis mengenali Astro.
- **Netlify**: Pilih folder root, build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: Gunakan GitHub Actions bawaan Astro untuk deploy otomatis ke GitHub Pages.

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan undangan pernikahan digital pribadi. Silakan disesuaikan untuk keperluan pernikahan Anda.
