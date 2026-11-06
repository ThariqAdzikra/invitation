# PRD — Web Undangan Pernikahan (Astro Edition)

**Versi:** 2.0 (Astro Rebuild — Midnight Navy & Starlight Gold)  
**Tanggal:** 6 November 2026  
**Status:** Approved via /grill-me  

---

## 1. Ringkasan Produk & Tujuan

Web undangan pernikahan ini adalah **single landing page berbasis Astro (SSG)** dengan konsep **Haute-Couture Editorial Magazine** berpalet **Midnight Navy & Starlight Gold**. Dirancang khusus untuk dibagikan via WhatsApp dengan URL personalisasi `?to=Nama+Tamu`.

Situs mengutamakan performa tinggi (0 KB JS default dari Astro Islands), tanpa foto pengantin, mengandalkan tipografi serif yang berwibawa (*DM Serif Display*), kaligrafi Arab klasik (*Amiri*), ornamen monoline emas, dan animasi taktil berbasis **GSAP 3, ScrollTrigger, dan Lenis Smooth Scroll**.

Situs beroperasi **100% tanpa backend/database** (tanpa form RSVP, tanpa amplop digital/rekening) untuk menjamin kecepatan maksimal, privasi, dan keandalan tinggi di semua smartphone tamu undangan.

---

## 2. Target User & Karakteristik Akses

| Aspek | Deskripsi |
|---|---|
| **Audience** | Keluarga, sahabat, kerabat kedua mempelai (usia 18–65 tahun). |
| **Akses Dominan** | 90%+ membuka dari tautan WhatsApp di smartphone (in-app browser Chrome/Safari). |
| **Target Performa** | Mobile Lighthouse score ≥ 95, First Contentful Paint < 0.8s, CLS = 0. |

---

## 3. Arsitektur Komponen Astro & Struktur Halaman

```
src/
├── layouts/
│   └── Layout.astro         # HTML Shell, Meta OG, Font preload, Lenis & Global Motion
├── components/
│   ├── reactbits/
│   │   ├── ClickSpark.tsx   # React Bits: Interactive Starlight Gold Click Burst
│   │   ├── ShinyText.tsx    # React Bits: Metallic Gold Foil Shimmer
│   │   └── SoundEffects.ts  # Web Audio API Synthesized Sound Effects
│   ├── Cover.astro          # Sampul Amplop 3D Midnight Navy + Starlight Gold Wax Seal
│   ├── Hero.astro           # Tipografi Majalah Asimetris & Split-Text Reveal
│   ├── Opening.astro        # Bismillah, Ayat Ar-Rum 21 (Amiri), Kata Sambutan
│   ├── Couple.astro         # 3D Flip Card Profil Mempelai Pria & Wanita
│   ├── UnifiedEvent.astro   # Grand Cathedral Arched Frame (Akad & Resepsi 1 Tanggal/Venue)
│   ├── Countdown.astro      # Countdown Timer Tabular Emas Luminous
│   ├── LoveStory.astro      # Timeline Asimetris dengan Jalur SVG Scroll-Drawn
│   ├── AudioPlayer.astro    # Floating Gold Audio Control (Smooth Fade-in)
│   ├── SectionNav.astro     # Interactive Vertical Floating Section Navigator
│   └── Closing.astro        # Doa Penutup, Hormat Kami, & Copyright
├── data/
│   └── content.json         # Single Source of Truth
├── styles/
│   └── global.css           # Tailwind directives + Desain Token Midnight & Gold
└── pages/
    └── index.astro          # Komposisi Utama
```

---

## 4. Spesifikasi Fitur Utama

### 4.1 Cover: 3D Wax Seal on Midnight Navy Velvet
- Tamu disambut amplop fisik Midnight Navy (`#0B1320`) bertekstur lembut dengan nama tamu dari parameter `?to=`.
- Interaksi sentuhan utama: **Segel Lilin Emas 3D (Starlight Gold Wax Seal)** dengan monogram ampersand timbul.
- Saat segel diketuk: animasi tekan taktil, tutup amplop atas terbuka secara 3D (`rotateX: 180deg`), segel larut, dan *aperture clip-path* membuka halaman undangan secara dramatis.
- Audio otomatis menyala dengan *volume fade-in* (0 ke 0.65 selama 2 detik).

### 4.2 Hero Section
- Tipografi nama mempelai pria & wanita disusun secara asimetris ala majalah editorial.
- Split-text reveal yang muncul bertahap (*staggered*) saat cover terbuka.
- Monogram watermark emas mengambang lembut di latar belakang dengan efek *parallax scrub*.

### 4.3 Profil Mempelai: 3D Flip Cards (Interaktif)
- Kartu mempelai pria dan wanita dapat diklik/tap untuk berputar secara 3D (*perspective 1200px*).
- **Sisi Depan**: Monogram inisial emas monoline, sebutan gelar, nama lengkap, dan nama orang tua.
- **Sisi Belakang**: Kutipan cinta personal, pesan khusus mempelai, dan tautan Instagram elegan.

### 4.4 Rangkaian Acara: Grand Cathedral Arched Frame (Unified Event Card)
- Karena **Akad Nikah dan Resepsi diadakan di hari dan lokasi yang sama**, acara disatukan dalam **satu kartu kubah katedral emas terpadu**:
  - Tanggal utama terpusat: `Sabtu, 12 Desember 2026`.
  - Dua pilar waktu simetris berdampingan: **Akad Nikah (08.00 - 10.00 WIB)** dan **Resepsi (11.00 - Selesai)** dipisahkan garis vertikal emas tipis.
  - Nama gedung & alamat venue disebut sekali saja secara jelas dan terhormat.
  - Dua tombol aksi terintegrasi di bagian bawah: **"Buka Google Maps"** dan **"Simpan ke Kalender"** (.ics).

### 4.5 Countdown Timer
- Angka hitung mundur berukuran proporsional dengan `font-variant-numeric: tabular-nums` untuk mencegah layout shift.
- Digit berganti dengan micro-interaction tick halus.

### 4.6 Love Story Timeline
- Milestone perjalanan cinta kedua mempelai dalam tata letak asimetris.
- Garis vertikal monoline SVG tergambar secara dinamis mengikuti posisi scroll (*ScrollTrigger*).

### 4.7 Continuous Editorial Flow & Starlight Gold Reading Progress Bar
- Scroll mengalir alami dari atas ke bawah tanpa penguncian kaku ala slide presentasi/PPT.
- Scrollbar default browser disembunyikan sepenuhnya di seluruh browser (Chrome, Safari, Edge, Firefox).
- Progress bar emas tipis 3px di bagian paling atas viewport dengan starlight sparkle indicator yang meluncur mengikuti posisi baca.
- Transisi kinetis berkecepatan editorial (`power3.out`) dengan staggered unveil saat elemen memasuki layar.

---

## 5. Parameter URL & Sanitasi XSS

- Parameter: `?to=Nama+Tamu`
- Default jika kosong: `Tamu Undangan Terhormat`.
- Sanitasi: Tag stripping regex ketat, pencegahan karakter injeksi (`<`, `>`, `"`, `'`, `/`, `\`, dll.), dipotong maksimal 75 karakter, di-inject murni via text node. Font otomatis mengecil jika karakter > 28 huruf.

---

## 6. Non-Requirements (Scope Boundaries)
- Tanpa backend, tanpa Google Sheets, tanpa database.
- Tanpa form RSVP, tanpa buku tamu / ucapan komentar.
- Tanpa nomor rekening / amplop digital / pengiriman kado.
- Tanpa foto pengantin (100% tipografi serif, monogram emas, dan ornamen botanik monoline).
