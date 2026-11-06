# Design System & Motion Specification — Midnight Navy & Starlight Gold (Astro)

**Versi:** 2.0  
**Konsep Visual:** Haute-Couture Editorial Magazine & Sacred Celestial Luxury  
**Prinsip Utama:** Anti-AI Slop, Kontras Tajam, Tipografi Berwibawa, Animasi Taktil  

---

## 1. Anti-AI Slop Manifesto

Situs undangan ini menolak seluruh klise template generator AI murahan:
- ❌ **Dilarang**: Gradien neon ungu-pink (*purple-blue AI slop*).
- ❌ **Dilarang**: Emoji warna-warni sebagai ikon dekorasi UI (💍, 💌, 🕌). Wajib menggunakan SVG monoline emas murni 1–1.5px.
- ❌ **Dilarang**: Font generik startup (Inter, Poppins, Roboto).
- ❌ **Dilarang**: Glassmorphism tebal / blur berlebihan yang membuat teks sulit terbaca dan layar terlihat kusam.
- ❌ **Dilarang**: Animasi membal (bouncy arcade physics). Wajib menggunakan kurva percepatan editorial (*luxury deceleration curve*).

---

## 2. Palet Warna (Midnight Navy & Starlight Gold)

```css
:root {
  /* Latar Belakang & Bidang */
  --color-bg-base: #070D17;         /* Deep Cosmic Midnight Navy */
  --color-bg-surface: #0E1726;      /* Rich Surface Navy untuk kartu */
  --color-bg-elevated: #142035;     /* Raised Card / Flip Card Back */
  --color-bg-envelope: #0B1320;     /* Velvet Navy untuk amplop cover */

  /* Tipografi */
  --color-text-primary: #F8F9FA;    /* Pearl Off-White (Kontras WCAG AAA) */
  --color-text-secondary: #9BA9BF;  /* Muted Silver Blue untuk body text */
  --color-text-muted: #64748B;      /* Hairline metadata / captions */

  /* Aksen Emas (Starlight & Antique Gold Foil) */
  --color-accent-gold: #C5A059;         /* Luminous Champagne Gold */
  --color-accent-gold-bright: #E2C98A;  /* Highlight & Wax Seal Rim */
  --color-accent-gold-soft: #8A6D3B;    /* Hairline border & dividers */
  --color-accent-gold-deep: #4A3A1D;    /* Inner shadows & stamp depths */

  /* Garis & Border */
  --color-border-hairline: rgba(197, 160, 89, 0.22);
  --color-border-subtle: rgba(197, 160, 89, 0.12);
}
```

---

## 3. Tipografi & Hierarki Font

| Peran | Font Family | Gaya & Bobot | Karakter |
|---|---|---|---|
| **Display / Judul** | `'DM Serif Display', Georgia, serif` | 400, Italic / Regular | Klasik, editorial, mewah |
| **Ayat Suci / Bismillah**| `'Amiri', serif` | 400, 700, Naskh RTL | Sakral, elegan, otentik |
| **Body & UI Interface** | `'DM Sans', system-ui, sans-serif` | 400, 500, 600 | Modern, bersih, keterbacaan tinggi |

### Fluid Type Scale
- `text-display`: `clamp(2.75rem, 7vw + 1rem, 5.5rem)` (Nama Mempelai Hero)
- `text-h1`: `clamp(2rem, 4vw + 0.5rem, 3.25rem)` (Nama Tamu Cover)
- `text-h2`: `clamp(1.75rem, 3vw + 0.25rem, 2.5rem)` (Judul Section)
- `text-h3`: `clamp(1.25rem, 1.8vw + 0.25rem, 1.65rem)` (Nama Mempelai Profil)
- `text-body`: `clamp(0.95rem, 0.5vw + 0.75rem, 1.05rem)`
- `text-overline`: `0.75rem`, letter-spacing `0.22em`, text-transform uppercase

---

## 4. Spesifikasi Arsitektur Komponen

### 4.1 3D Wax Seal Unboxing
- Amplop 3D dengan perspektif `1200px`.
- Segel lilin emas organik (SVG) dengan efek kilau emas (*metallic sheen gradient*).
- Flap amplop atas memiliki `transform-origin: top center` dan membuka `rotateX(180deg)` secara mulus.
- Segel ditekan (`scale: 0.9`), meleleh/pecah (`scale: 1.15, filter: blur(3px), opacity: 0`), diikuti *circular aperture reveal*.

### 4.2 3D Flip Card Profil Mempelai
- Dua kartu terpisah untuk Mempelai Pria dan Wanita.
- Memiliki dua sisi: `.card-front` dan `.card-back` dengan `transform-style: preserve-3d` dan `backface-visibility: hidden`.
- Saat diklik atau disentuh: kartu berputar `rotateY(180deg)` dengan durasi 0.7s dan easing `power3.out`.
- Dilengkapi lencana mikro: *"Ketuk untuk membalik"* yang memudar saat kartu aktif.

### 4.3 Grand Cathedral Arched Frame (Unified Event Card)
- Siluet kubah arsitektural di atas kartu dengan `border-radius: clamp(100px, 32vw, 140px) clamp(100px, 32vw, 140px) 0 0`.
- Garis ganda emas (*double hairline border*) menggunakan pseudo-elemen `::before`.
- Dua kolom waktu simetris: Akad Nikah (Kiri) dan Resepsi (Kanan), dipisahkan oleh garis hairline vertikal emas.
- Informasi venue dan tombol aksi (Google Maps & Simpan ke Kalender) tersusun rapi di bagian bawah.

---

## 5. Spesifikasi Motion & Easing

- **Easing Utama**:
  - `var(--ease-editorial)`: `cubic-bezier(0.16, 1, 0.3, 1)` (Expo Out)
  - `var(--ease-smooth)`: `cubic-bezier(0.25, 1, 0.5, 1)` (Power3 Out)
- **Lenis Smooth Scroll**:
  - Durasi: 1.1s, easing: exponential deceleration.
- **Prefers-reduced-motion**:
  - Seluruh transform dan parallax dimatikan; transisi disederhanakan menjadi opacity fade seketika.

---

## 6. React Bits & Tactile Sound Engine

### 6.1 React Bits Components
- **ClickSpark (`ClickSpark.tsx`)**: Menembakkan kilau partikel bintang emas starlight (`#E2C98A`) secara radial setiap kali layar disentuh/diklik, memberikan feedback mikro yang hidup dan mewah.
- **ShinyText (`ShinyText.tsx`)**: Kilau emas metalik dinamis (*gold foil light sweep*) yang bergerak anggun melintasi teks overline dan badge.

### 6.2 Web Audio API Sound Effects (Zero Latency)
- **Wax Seal Pop (`playWaxSealSound`)**: Suara retakan fisik lilin yang ditekan dan pecah saat membuka amplop.
- **Card Flip Whoosh (`playCardFlipSound`)**: Desir halus kertas satin saat kartu profil mempelai dibalik secara 3D.
- **Harmonic Chime (`playChimeSound`)**: Denting lonceng emas lembut saat tombol kalender disentuh.
- **Background Music**: Fading in lembut otomatis dari 0 hingga 0.65 saat sampul terbuka.

---

## 7. Full-Page Section Snapping & Inter-Section Transitions

- **Viewport Dimension**: Tiap section memiliki tinggi penuh layar `min-h-[100dvh]` dan dipusatkan secara vertikal (`flex flex-col justify-center items-center`).
- **CSS Scroll Snapping**: `scroll-snap-type: y mandatory` dengan `scroll-snap-align: start`, memberikan pengalaman pergeseran antar section yang presisi dan mengunci tepat pada frame konten.
- **Kinetic Section Transition (GSAP)**:
  - Transisi skala dan opasitas dinamis (`scale: 0.97 -> 1`, `opacity: 0.35 -> 1`, `y: 25 -> 0`) saat section memasuki dan meninggalkan viewport.
- **Floating Section Navigator (`SectionNav.astro`)**:
  - 7 dot starlight gold di sisi kanan layar dengan pelacakan section aktif (*IntersectionObserver*), tooltip nama section, dan efek suara denting harmonis saat diklik.
- **Scroll Prompt**: Indikator panah terapung halus di bawah tiap slide untuk memandu tamu menggulir ke slide berikutnya.

---

## 8. Atmosphere, Ornaments & Textures

- **Celestial Stardust Canvas (`CelestialCanvas.tsx`)**: Kanvas partikel debu bintang emas starlight yang bergerak perlahan melayang di langit Midnight Navy dan merespons gerakan kursor/sentuhan secara organik.
- **Nebula Atmosphere Glow**: Dua bola cahaya nebula kosmik sapphire dan warm gold yang berdenyut lambat di kedalaman latar belakang.
- **Film Grain / Linen Paper Texture**: Tekstur kertas rabaan mewah (*tactile paper noise*) menggunakan filter SVG mikroskopis untuk menghilangkan kesan digital flat.
- **Royal Gold Filigree Frame (`OrnateFrame.astro`)**: Bingkai ganda garis emas tipis dengan ukiran sudut filigree botanik di 4 sudut layar.
- **Botanical Olive Crest (`BotanicalCrest.astro`)**: Karangan daun zaitun monoline emas membingkai inisial mempelai.
- **Filigree Dividers (`FiligreeDivider.astro`)**: Pembatas beraksen bintang 8-penjuru (*8-point celestial starlight*) dan garis gradasi emas.
