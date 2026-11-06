# ✨ Undangan Pernikahan Digital — Haute-Couture Edition

Undangan pernikahan digital berbasis **Astro (Static Site Generation)** dengan tema visual **Midnight Navy & Starlight Gold**. Dirancang khusus untuk dibagikan via WhatsApp dengan URL personalisasi `?to=Nama+Tamu`.

Dibangun dengan prinsip **Anti-AI Slop**: mengutamakan tipografi serif berwibawa, ornamen monoline emas murni, kaligrafi Arab sakral, partikel starlight interaktif, dan animasi taktil berbasis Web Audio API.

---

## 🌟 Fitur Unggulan

- **Cinematic Studio Title Sequence & Shutter Curtain Lift**: SplashScreen bertema *Luxury Editorial Film* (A24 Movie Intro) dengan studio title card `"A TRUE LOVE STORY PRESENTATION"`, kaligrafi Basmalah sakral, optical blur-to-sharp focus monogram `"AD"`, anamorphic lens flare sweep emas, dan dolly zoom judul film `"ARYA & DIAN"` yang membuka ke atas bak tirai film saat hitungan selesai (atau saat layar disentuh).
- **21:9 Widescreen Cinema Letterbox Framing**: Bingkai letterbox sinematik atas dan bawah dengan running film metadata (`24 FPS • 2.39:1 WIDESCREEN`, `35MM COLOR GRADE`, `12.12.2026`) yang membingkai keseluruhan visual dengan nuansa film layar lebar haute-couture.
- **Cinematic Scene Chapters**: Pembagian alur babak film bertahap dengan slug anamorphic lens flare:
  - `SCENE 01 // PROLOGUE`: Hero pembuka dengan kartu sambutan tamu terhormat personal (`?to=Nama+Tamu`).
  - `THE SACRED COVENANT`: Surah Ar-Rum ayat 21 dengan starlight reveal dan sekat emas memekar dari tengah.
  - `SCENE 02 // THE PROTAGONISTS`: Kartu kedua mempelai yang meluncur simetris dari kiri dan kanan, dilengkapi interaktivitas 3D card flip.
  - `SCENE 03 // THE CEREMONY`: Grand Cathedral Arched Frame dengan cincin ganda bercahaya untuk Akad & Resepsi.
  - `SCENE 04 // THE CHRONOMETER`: Hitung mundur waktu sakral dengan animasi elastic pop-in stagger.
  - `SCENE 05 // THE MEMOIR`: Kisah cinta dengan SVG Golden Thread of Destiny yang terlukis dinamis mengikuti laju scroll (*parallax scrub*).
  - `SCENE 06 // THE BENEDICTION`: Kartu ucapan WhatsApp personal terintegrasi nama tamu.
  - `EPILOGUE // ETERNAL DEVOTION`: Penutup sakral dan tanda tangan kedua mempelai.
- **Atmospheric Celestial Canvas & 35mm Grain**: Kanvas partikel debu bintang starlight interaktif dan tekstur fine 35mm film grain yang hidup.
- **Continuous Editorial Smooth Scroll & Top Progress Bar**: Pengalaman membaca mengalir vertikal mulus tanpa hentakan slide PPT kaku menggunakan Lenis momentum smooth scroll dan GSAP ScrollTrigger terkalibrasi. Scrollbar browser di-hide rapi dan digantikan starlight gold progress indicator tepat di bawah bilah letterbox atas.
- **Web Audio API Tactile Sound Effects & Instrumental Crescendo**: Denting harmonis lonceng emas (*chime sound*), desir halus pembalikan kartu 3D, dan musik latar instrumental yang memudar masuk lembut (*crescendo*).
- **Nir-Backend / Zero Dead Code**: 100% statis, tanpa database, tanpa form RSVP rumit, tanpa amplop digital/rekening. Super cepat, privat, dan aman.

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
