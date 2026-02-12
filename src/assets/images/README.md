# 📸 Folder Gambar Undangan

Letakkan foto-foto Anda di folder ini, lalu import di `src/config/wedding.ts`.

## Foto yang Dibutuhkan:

| File | Keterangan | Ukuran Disarankan |
|------|-----------|-------------------|
| `bride.jpg` | Foto mempelai wanita | 500x500px |
| `groom.jpg` | Foto mempelai pria | 500x500px |
| `couple.jpg` | Foto bersama (hero) | 800x1000px |
| `story-1.jpg` | Love story - Awal Bertemu | 500x500px |
| `story-2.jpg` | Love story - Menjalin Kasih | 500x500px |
| `story-3.jpg` | Love story - Lamaran | 500x500px |
| `story-4.jpg` | Love story - Menuju Pelaminan | 500x500px |
| `gallery-1.jpg` | Galeri foto 1 | 800x800px |
| `gallery-2.jpg` | Galeri foto 2 | 800x800px |
| `gallery-3.jpg` | Galeri foto 3 | 800x800px |
| `gallery-4.jpg` | Galeri foto 4 | 800x800px |
| `gallery-5.jpg` | Galeri foto 5 | 800x800px |
| `gallery-6.jpg` | Galeri foto 6 | 800x800px |

## Cara Menggunakan:

1. Letakkan file foto di folder ini
2. Buka `src/config/wedding.ts`
3. Import foto di bagian atas file:

```ts
import bridePhoto from "@/assets/images/bride.jpg";
import groomPhoto from "@/assets/images/groom.jpg";
import couplePhoto from "@/assets/images/couple.jpg";
// ... dst
```

4. Ganti value placeholder dengan variable import:

```ts
bride: {
  photo: bridePhoto, // ganti "/placeholder.svg"
},
```

Format yang didukung: `.jpg`, `.jpeg`, `.png`, `.webp`
