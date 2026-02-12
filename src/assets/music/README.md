# 🎵 Folder Musik Latar

Letakkan file musik MP3 Anda di folder ini untuk background music undangan.

## Cara Menggunakan:

1. Letakkan file MP3 di folder ini (misal: `backsound.mp3`)
2. Buka `src/config/wedding.ts`
3. Import musik di bagian atas file:

```ts
import bgMusic from "@/assets/music/backsound.mp3";
```

4. Ganti value `backgroundMusic`:

```ts
backgroundMusic: bgMusic,  // ganti null
```

## Tips:
- Gunakan file MP3 dengan ukuran kecil (< 5MB) agar loading cepat
- Pilih lagu instrumental atau nasheed yang lembut
- Musik akan otomatis diputar setelah tamu mengklik "Buka Undangan"

Format yang didukung: `.mp3`, `.ogg`, `.wav`
