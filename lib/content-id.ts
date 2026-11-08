import type { ProjectContent } from "@/lib/content";

export const projectId: Record<string, Partial<ProjectContent>> = {
  juanrouter: {
    title:
      "Akses AI multi-model, dari integrasi API hingga pembayaran dalam Rupiah.",
    description:
      "Mendirikan dan menjalankan platform AI yang menghubungkan gateway multi-model, penagihan sesuai pemakaian, pembayaran lokal, dan pemenuhan otomatis, sekaligus menangani pemasaran dan komunitas Telegram.",
    detail:
      "JuanRouter membantu developer dan pengguna AI di Indonesia mengakses model pihak ketiga melalui klien API atau chat. Sebagai pendiri tunggal, saya menangani strategi produk, engineering, harga, operasional, pemasaran, konten, dan komunitas. Gateway dan chat menggunakan fondasi new-api dan LibreChat, dengan bantuan Codex dan Claude Code dalam pengembangan.",
    highlights: [
      "Juan Topup: pembayaran Midtrans dalam Rupiah, voucher PAYG, langganan, invoice, dan pemenuhan otomatis.",
      "Wallet Rupiah prabayar, atribusi affiliate, dan pembagian kredit komunitas; saldo wallet terpisah dari kredit AI Router.",
      "Juan Chat menggunakan API key Router masing-masing pengguna. Akun Router, Topup, dan Chat terpisah.",
      "Verifikasi pembayaran, bukti transaksi, dan alur pemulihan untuk percobaan ulang atau hasil pemenuhan yang belum pasti.",
      "AI Helper Bot di Telegram menggunakan dokumentasi produk dan data layanan yang relevan untuk membantu pengguna.",
    ],
    role: "Pendiri Tunggal & Product Engineer",
    status: "Aktif",
    meta: "Pendiri Tunggal & Product Engineer • Aktif",
    imageAlt:
      "Toko Juan Topup dengan paket kredit AI dan pembayaran Rupiah untuk JuanRouter",
  },
  sakura: {
    title:
      "Server Minecraft yang menggabungkan sistem multiplayer dan AI multimodal.",
    description:
      "Membangun mode permainan dan empat plugin Java, dengan bantuan AI untuk membangun, penilaian Build Battle berbasis vision, serta sistem pertandingan dan ekonomi virtual.",
    detail:
      "Saya mendirikan dan mengembangkan Sakura dengan menggabungkan gameplay Java dan Skript serta plugin pihak ketiga di Paper. Pekerjaan saya mencakup desain game, integrasi AI, sistem multiplayer, dan operasional cloud Linux. Empat plugin Java kustomnya adalah SakuraAI, SakuraBuildBattle, SakuraGames, dan SakuraVoiceAuth.",
    highlights: [
      "SakuraAI mengubah teks atau gambar referensi menjadi rencana blok yang divalidasi, dengan konfirmasi admin, pengerjaan bertahap, dan undo sementara.",
      "Build Battle mengambil snapshot plot, merender lima sudut melalui Python/Chunky, dan memvalidasi skor model vision sebelum hasil ditampilkan.",
      "SakuraGames mengatur antrean, pengecekan kesiapan, penggunaan arena eksklusif, dan escrow mata uang virtual yang dapat dipulihkan.",
      "Gameplay mencakup PvP, balap perahu es, parkour, progression, dan ekonomi, bersama integrasi Survival dan OneBlock.",
      "Operasional mencakup deployment, backup off-host yang diverifikasi, migrasi world, dan pemulihan data pemain secara selektif.",
    ],
    role: "Pendiri & Pengembang Sistem Game",
    status: "Berjalan",
    meta: "Pendiri & Pengembang Sistem Game • Berjalan",
    imageAlt:
      "Diagram arsitektur Sakura yang menghubungkan plugin Java, sistem multiplayer, dan worker AI",
  },
  "tfe-erp": {
    title:
      "Sistem ERP yang menyesuaikan skala bisnis, dari tim kecil hingga perusahaan.",
    description:
      "Membangun ERP dengan dashboard tugas, pelacakan progres, pembagian tugas, dan catatan rapat untuk memudahkan alur kerja.",
    detail:
      "TFE ERP adalah sistem operasional modular dengan papan tugas, pelacakan progres, pembagian tugas, dan catatan rapat dalam satu tempat.",
    role: "Full Stack Developer",
    status: "Dalam Pengembangan",
    meta: "Full Stack Developer • Dalam Pengembangan",
    imageAlt:
      "Dashboard TFE ERP yang menampilkan pelacakan progres dan manajemen tugas",
  },
  "smarthome-ai": {
    title:
      "Ekosistem SmartHome AIoT dengan asisten AI langsung untuk kontrol rumah pintar.",
    description:
      "Membangun sistem rumah pintar yang menggabungkan asisten AI, kendali perangkat online, dan interaksi AI secara real-time.",
    detail:
      "Sistem rumah pintar menyeluruh dengan asisten AI langsung, kendali perangkat, dan prototipe perangkat keras ESP32-S3.",
    role: "AI & IoT Engineer",
    status: "Dalam Pengembangan",
    meta: "AI & IoT Engineer • Dalam Pengembangan",
    imageAlt:
      "Prototipe perangkat keras SmartHome AI Assistant dengan ESP32-S3",
  },
  nevada: {
    title:
      "Perangkat IoT hidroponik dengan pemantauan real-time dan pengelolaan nutrisi otomatis.",
    description:
      "Mengembangkan sistem hidroponik dengan dashboard, kontrol otomatisasi, dan pemantauan nutrisi melalui sensor.",
    detail:
      "Nevada menghubungkan sensor, otomatisasi, dan dashboard untuk memantau kualitas air, nutrisi, dan perkembangan tanaman hidroponik.",
    role: "IoT Developer",
    status: "Selesai",
    meta: "IoT Developer • Selesai",
    imageAlt:
      "Dashboard hidroponik Nevada menampilkan perkembangan tanaman dan kualitas air",
  },
  putu: {
    title:
      "Pusat tugas untuk mengatur tugas kuliah, jadwal mata kuliah, dan informasi kelas.",
    description:
      "Membuat pengelola akademik mobile-first untuk membantu mahasiswa mengatur tenggat, jadwal, dan tugas kuliah.",
    detail:
      "PuTu adalah pusat akademik mobile-first untuk tugas, jadwal, dan informasi kelas yang mudah dipahami mahasiswa.",
    role: "Frontend Developer",
    status: "Selesai",
    meta: "Frontend Developer • Selesai",
    imageAlt:
      "Dashboard aplikasi mobile PuTu yang menampilkan tugas dan jadwal",
  },
  "portable-sensor": {
    title:
      "Alat portabel untuk konfigurasi dan troubleshooting sensor industri Modbus.",
    description:
      "Membangun alat embedded untuk membantu teknisi memberi label, mengubah, memeriksa, dan mereset alamat sensor di lapangan.",
    detail:
      "Alat Modbus untuk membantu teknisi memberi label, mengubah alamat, memeriksa, dan mereset sensor, berdasarkan kebutuhan lapangan di Chickin.",
    role: "Embedded Engineer",
    status: "Selesai",
    meta: "Embedded Engineer • Selesai",
    imageAlt:
      "Diagram rangkaian Portable Sensor Tool dengan ESP32 dan layar LCD",
  },
  "sif-skaneka": {
    title:
      "Teknologi pertanian terpadu dengan pemberian pakan, penyiraman, dan daur ulang air akuaponik otomatis.",
    description:
      "Mengembangkan sistem pertanian berbasis IoT dengan jadwal pakan, penyiraman berdasarkan kondisi tanah, dan dashboard pemantauan real-time.",
    detail:
      "Smart Integrated Farming menggabungkan pemberian pakan otomatis, penyiraman berdasarkan kondisi tanah, daur ulang akuaponik, dan pemantauan.",
    role: "IoT Developer",
    status: "Selesai",
    meta: "IoT Developer • Selesai",
    imageAlt: "Sistem Smart Integrated Farming dipresentasikan dalam pameran",
  },
  "example-umkm": {
    title:
      "Template website modern untuk membantu UMKM membangun kehadiran online.",
    description:
      "Membuat website bisnis responsif dengan etalase produk, informasi usaha, dan kontak untuk UMKM Indonesia.",
    detail:
      "Template landing page UMKM yang menampilkan produk, cerita usaha, dan cara menghubungi bisnis.",
    role: "Frontend Developer",
    status: "Selesai",
    meta: "Frontend Developer • Selesai",
    imageAlt: "Tampilan template website bisnis UMKM",
  },
  "example-kost": {
    title:
      "Website kost untuk membantu pemilik menampilkan kamar secara online.",
    description:
      "Merancang website properti responsif dengan daftar kamar, fasilitas, harga, dan formulir kontak calon penyewa.",
    detail:
      "Website daftar kost dengan informasi kamar, fasilitas, harga, dan kontak untuk pemilik properti.",
    role: "Frontend Developer",
    status: "Selesai",
    meta: "Frontend Developer • Selesai",
    imageAlt: "Website daftar kost dengan informasi kamar",
  },
  "example-warung-makan": {
    title:
      "Template website warung makan untuk menjangkau lebih banyak pelanggan.",
    description:
      "Membuat website bisnis kuliner yang menampilkan menu, jam buka, lokasi, dan tombol pemesanan.",
    detail:
      "Template warung dengan menu, jam buka, lokasi, dan tombol pemesanan untuk usaha kuliner lokal.",
    role: "Frontend Developer",
    status: "Selesai",
    meta: "Frontend Developer • Selesai",
    imageAlt: "Template website warung makan dengan menu dan kontak",
  },
};

export const experienceId: Record<
  string,
  {
    role: string;
    period: string;
    description: string;
    detail: string;
    highlights: string[];
  }
> = {
  juanrouter: {
    role: "Pendiri Tunggal & Product Engineer",
    period: "Jul 2026 – Sekarang",
    description:
      "Mendirikan dan menjalankan platform AI multi-model untuk pengguna Indonesia. Menangani strategi produk, engineering, pembayaran, harga, operasional, pemasaran, dan komunitas.",
    detail:
      "Membangun produk di atas fondasi open-source new-api dan LibreChat, menghubungkan akses API, penagihan sesuai pemakaian, pembayaran Rupiah, langganan, dan pemenuhan otomatis. Saya menjalankan bisnis dan infrastruktur, membuat konten, mengelola komunitas Telegram, dan membangun AI Helper Bot. Codex dan Claude Code membantu pengembangan; keputusan produk dan operasional tetap menjadi tanggung jawab saya.",
    highlights: [
      "Akses API multi-model dan penagihan sesuai pemakaian",
      "Pembayaran Rupiah dan pemenuhan kredit otomatis",
      "Pemasaran produk, komunitas Telegram, dan dukungan AI",
    ],
  },
  sakura: {
    role: "Pendiri & Pengembang Sistem Game",
    period: "Jun 2026 – Sekarang",
    description:
      "Mendirikan dan mengembangkan server Minecraft dengan mode multiplayer kustom, empat plugin Java, asisten AI, bantuan membangun, dan penilaian Build Battle.",
    detail:
      "Merancang gameplay dan mengembangkan sistem Java/Skript bersama plugin pihak ketiga. Pekerjaan saya mencakup antrean pertandingan, kepemilikan arena, escrow mata uang virtual, alur AI, dan operasional cloud Linux, termasuk deployment, backup, migrasi world, dan pemulihan data pemain.",
    highlights: [
      "SakuraAI, SakuraBuildBattle, SakuraGames, dan SakuraVoiceAuth",
      "Alur AI multimodal dengan hasil tervalidasi",
      "Siklus multiplayer, pemulihan data, dan operasional cloud",
    ],
  },
  chickin: {
    role: "Magang AIoT",
    period: "2024",
    description:
      "Mempelajari dan menerapkan AI dan IoT di industri. Merancang alat konfigurasi sensor portabel dan menjadi PIC penerapan deteksi berbasis AI di peternakan mitra.",
    detail:
      "Bekerja langsung dengan sensor industri, penerapan lapangan, dan sistem deteksi AI untuk peternakan mitra. Mengembangkan alat Modbus portabel untuk teknisi dan mengoordinasikan penerapan di lapangan.",
    highlights: [
      "Alat konfigurasi sensor portabel",
      "PIC penerapan deteksi AI",
      "Penerapan AIoT industri di lapangan",
    ],
  },
};

export const educationId: Record<
  string,
  { degree: string; period: string; detail: string }
> = {
  polinema: {
    degree: "Sistem Informasi Bisnis",
    period: "2025 – Sekarang",
    detail:
      "Mempelajari Sistem Informasi Bisnis dengan fokus pada penerapan AI, perangkat lunak, dan pemikiran sistem untuk masalah bisnis dan industri.",
  },
  smkn: {
    degree: "Teknik Jaringan Komputer dan Telekomunikasi",
    period: "2022 – 2025",
    detail:
      "Membangun dasar jaringan, telekomunikasi, dan pemecahan masalah teknis yang berkembang ke IoT, sistem embedded, dan pengembangan full-stack.",
  },
};

export const certificationId: Record<
  string,
  { title: string; detail: string }
> = {
  "iot-intern": {
    title: "Program Magang IoT",
    detail:
      "Program magang industri tentang sistem IoT, sensor, dan penerapan teknologi peternakan di lapangan.",
  },
  inovaks: {
    title: "Expo Inovasi Vokasi (INOVAKS)",
    detail:
      "Partisipasi dalam pameran inovasi vokasi untuk menampilkan proyek dan solusi teknologi terapan.",
  },
  anbim: {
    title: "Sharing Session Strategi Mahasiswa Mandiri",
    detail:
      "Sesi mengenai strategi pengembangan diri dan karier mahasiswa secara mandiri.",
  },
  "maspion-ai": {
    title: "Workshop ERP & Teknologi Masa Depan Artificial Intelligence",
    detail:
      "Workshop tentang sistem ERP dan teknologi AI untuk kebutuhan perusahaan dan perangkat lunak masa depan.",
  },
  "modbus-nodered": {
    title: "Industrial IoT: Modbus RTU/TCP dengan MQTT & Node-RED",
    detail:
      "Pelatihan praktik protokol Modbus, MQTT, dan otomatisasi alur Node-RED.",
  },
  ardumeka: {
    title: "Peserta Podcast Ardumeka",
    detail:
      "Partisipasi podcast membahas pengalaman embedded, IoT, dan teknologi maker.",
  },
};

export const skillId: Record<string, { label: string; detail: string }> = {
  "product-ownership": {
    label: "Pengembangan & Operasional Produk",
    detail:
      "Membawa produk dari ide hingga operasional: engineering, harga, pembayaran, deployment, pemasaran, dan dukungan komunitas melalui JuanRouter.",
  },
  "game-systems": {
    label: "Sistem Multiplayer & Game",
    detail:
      "Plugin Java dan Skript, state machine pertandingan, kepemilikan arena, transaksi mata uang virtual yang dapat dipulihkan, dan alur AI untuk Sakura.",
  },
  "ai-systems": {
    label: "Sistem & Agen AI",
    detail:
      "Merancang alur agen, asisten yang menggunakan tools, dan layanan AI untuk produk serta operasional.",
  },
  "ai-automation": {
    label: "Otomatisasi AI",
    detail:
      "Mengotomatisasi pekerjaan berulang dengan LLM, pipeline, dan integrasi.",
  },
  "ai-assistants": {
    label: "Asisten AI",
    detail:
      "Asisten suara/teks dan copilot untuk rumah, tim, dan perangkat lapangan.",
  },
  aiot: {
    label: "AIoT & Edge AI",
    detail:
      "Menggabungkan sensor, perangkat edge, dan inferensi AI untuk sistem offline dan lapangan.",
  },
  fullstack: {
    label: "Pengembangan Full Stack",
    detail:
      "Aplikasi web menyeluruh: API, dashboard, autentikasi, model data, dan deployment.",
  },
  api: {
    label: "API & Layanan Backend",
    detail:
      "Backend, REST/realtime API, dan batas layanan untuk produk yang dapat berkembang.",
  },
  iot: {
    label: "IoT & Sistem Embedded",
    detail:
      "ESP32, sensor, firmware, serta penghubung perangkat keras dan perangkat lunak.",
  },
  modbus: {
    label: "Sensor Industri / Modbus",
    detail:
      "Alat Modbus RTU/TCP, pengalamatan, dan troubleshooting untuk teknisi lapangan dan pabrik.",
  },
  "smart-infra": {
    label: "Infrastruktur Cerdas",
    detail:
      "Sistem hidroponik, pertanian, dan otomatisasi rumah dengan pemantauan serta kontrol.",
  },
};
