# Proyek: Web Undangan Pernikahan (Astro Edition)

## Wajib dibaca sebelum mengerjakan apa pun
- prd.md (apa yang dibangun — arsitektur Astro, single event card, scope nirkoneksi database)
- design.md (desain sistem Midnight Navy & Starlight Gold, token, motion GSAP + Lenis)
- src/data/content.json (satu-satunya sumber konten teks & data acara)

## Tech Stack & Perintah Kerja
- **Framework**: Astro 5 (Static Site Generation / Island Architecture) + React 18 (`@astrojs/react`)
- **Visual & UI**: Tailwind CSS + React Bits (`ClickSpark`, `ShinyText`)
- **Animasi & Motion**: GSAP 3 + ScrollTrigger + Lenis Smooth Scroll
- **Audio & Sound**: Web Audio API Synthesized Effects (Wax seal pop, Card flip whoosh, Chime) + Background Instrumental Fade-In
- **Development**: `npm run dev` (buka di `http://localhost:4321`)
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Aturan Kerja & Standar Kualitas
- Mulai dengan menjelaskan rencana singkat sebelum menulis kode.
- Semua warna, font, spacing, durasi, dan easing HARUS dari token di design.md. Dilarang hardcode warna hex sembarangan di luar palet.
- **ANTI-SLOP RULES (Dilarang Keras)**:
  - Tanpa gradien neon ungu-pink.
  - Tanpa emoji sebagai ikon UI (gunakan SVG monoline emas murni).
  - Tanpa font generik (Inter/Poppins). Gunakan DM Serif Display / Amiri / DM Sans.
  - Tanpa glassmorphism tebal / blur berlebihan yang membuat kusam.
  - Tanpa animasi membal (bouncy) murah. Gunakan kurva editorial (`power3.out`, `expo.out`).
- Animasi hanya pada transform dan opacity. Wajib ada fallback `prefers-reduced-motion`.
- Mobile-first: uji di lebar 360px dulu, baru tablet dan desktop.
- Kode rapi: komponen modular Astro, nama jelas, zero dead code.

## Selesai Milestone Berarti:
1. `npm run build` berhasil tanpa error/warning.
2. Ringkasan file yang diubah + apa yang perlu dicek di browser (termasuk parameter `?to=Nama+Tamu`).
3. Jujur terhadap evaluasi kesesuaian design.md.
