// Wedding Configuration - Edit this file to customize your wedding invitation
// 
// 📸 CARA MENAMBAHKAN FOTO:
// 1. Letakkan foto di src/assets/images/
// 2. Import di sini: import bridePhoto from "@/assets/images/bride.jpg"
// 3. Ganti "/placeholder.svg" atau URL dengan variable import
//
// 🎵 CARA MENAMBAHKAN MUSIK:
// 1. Letakkan file MP3 di src/assets/music/
// 2. Import di sini: import bgMusic from "@/assets/music/backsound.mp3"
// 3. Ganti null di backgroundMusic dengan variable import

export const weddingConfig = {
  // Background Image for Opening Screen
  welcomeBackground: "/assets/images/weding.jpg",

  // Couple Information
  bride: {
    name: "Novi",
    fullName: "Novi Ramadaniawati",
    father: "Bapak Sastra Wijaya",
    mother: "Ibu Ai Santi",
    photo: "/assets/images/novi.jpg",
  },
  groom: {
    name: "Haikal",
    fullName: "Haikal Muhammad Kurniawan",
    father: "Bapak Jimmi Kurniawan, S.Pd.I., M.Pd",
    mother: "Ibu Yanti Nuryanti, S.Pd.I",
    photo: "/assets/images/haikal.jpg",
  },

  // Wedding Date
  weddingDate: new Date("2026-04-26T08:00:00+07:00"),

  // Events
  akad: {
    date: "Minggu, 26 April 2026",
    time: "09:00 - 11:00 WIB",
    venue: "Gedung Islamic Centre Cisaat",
    address: "Komplek Alun - Alun, Jl. Raya Cisaat No.KM 5, Cisaat, Kec. Cisaat, Kabupaten Sukabumi, Jawa Barat 43152",
    mapsLink: "https://www.google.com/maps/place/Islamic+Centre/@-6.9081343,106.890217,96m/data=!3m1!1e3!4m6!3m5!1s0x2e683635d84c11d5:0x1453752e7bc18f5c!8m2!3d-6.908236!4d106.8904073!16s%2Fg%2F11bc7q7lbz?entry=ttu&g_ep=EgoyMDI2MDIwOS4wIKXMDSoASAFQAw%3D%3D",
  },
  resepsi: {
    date: "Minggu, 26 April 2026",
    time: "11:00 - 15:00 WIB",
    venue: "Gedung Islamic Centre Cisaat",
    address: "Komplek Alun - Alun, Jl. Raya Cisaat No.KM 5, Cisaat, Kec. Cisaat, Kabupaten Sukabumi, Jawa Barat 43152",
    mapsLink: "https://www.google.com/maps/place/Islamic+Centre/@-6.9081343,106.890217,96m/data=!3m1!1e3!4m6!3m5!1s0x2e683635d84c11d5:0x1453752e7bc18f5c!8m2!3d-6.908236!4d106.8904073!16s%2Fg%2F11bc7q7lbz?entry=ttu&g_ep=EgoyMDI2MDIwOS4wIKXMDSoASAFQAw%3D%3D",
  },

  // Love Story Timeline
  loveStory: [
    {
      title: "Awal Bertemu",
      date: "Januari 2023",
      description: "Pertemuan pertama kami di facebook. Saat itu, tanpa disadari takdir mulai mempertemukan kami.",
      photo: "/placeholder.svg",
    },
    {
      title: "Menjalin Kasih",
      date: "Desember 2025",
      description: "Setelah beberapa bulan saling mengenal, kami memutuskan untuk menjalin hubungan yang lebih serius.",
      photo: "/placeholder.svg",
    },
    {
      title: "Lamaran",
      date: "Februari 2026",
      description: "Dengan restu kedua orang tua, kami memutuskan untuk melangkah ke jenjang yang lebih serius.",
      photo: "/placeholder.svg",
    },
    {
      title: "Menuju Pelaminan",
      date: "Maret 2026",
      description: "Hari bahagia yang kami nantikan, menyatukan cinta dalam ikatan suci pernikahan.",
      photo: "/placeholder.svg",
    },
    {
      title: "Syukuran",
      date: "April 2026",
      description: "Syukuran sebagai ungkapan rasa syukur atas kelancaran dan keberkahan dalam perjalanan kami.",
      photo: "/placeholder.svg",
    },
  ],

  // Gallery Photos
  gallery: [
    "/assets/images/g1.jpg",
    "/assets/images/g2.jpg",
    "/assets/images/g3.jpg",
    "/assets/images/g4.jpg",
    "/assets/images/g5.jpg",
    "/assets/images/g6.jpg",
    "/assets/images/g7.jpg", 
    "/assets/images/g8.jpg", 
  ],

  // Couple Main Photo
  couplePhoto: "/assets/images/weding.jpg",

  // Wedding Gift / Bank Accounts (4 akun)
  bankAccounts: [
    {
      bank: "Bank BCA",
      accountNumber: "3771853232",
      accountName: "Haikal Muhammad Kurniawan",
    },
    {
      bank: "Seabank",
      accountNumber: "901565136605",
      accountName: "Haikal Muhammad Kurniawan",
    },
    {
      bank: "Dana",
      accountNumber: "083808283542",
      accountName: "Haikal Muhammad Kurniawan",
    },
    {
      bank: "Bank BNI",
      accountNumber: "0205030942",
      accountName: "Yanti Nuryanti",
    },
  ],

  // Gift Address
  giftAddress: [
    {
      name: "Novi",
      address: "Kp. Bitung Rt20/04 Desa Cicareuh Kecamatan Cikidang Kabupaten Sukabumi",
      phone: "+6282321564814",
    },
    {
      name: "Haikal",
      address: "Kp. Cimahipeuntas Rt.033/007 Desa Cibolang Kaler Kecamatan Cisaat Kabupaten Sukabumi",
      phone: "+6283808283542",
    },
  ],

  // Background Music
  backgroundMusic: "/assets/music/lagu.mp3",

  // Quran Quote
  quranQuote: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    translation: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
    surah: "QS. Ar-Rum: 21",
  },
};

export type WeddingConfig = typeof weddingConfig;
