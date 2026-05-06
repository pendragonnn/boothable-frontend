export const EVENT_LIST_CONTENT = {
  title: "Katalog Event",
  headline: "Jelajahi Event Terbaik",
  description:
    "Temukan event yang sesuai dengan kebutuhan bisnis Anda dan pesan booth di lokasi strategis.",
  searchPlaceholder: "Cari nama event atau lokasi...",
  allCategories: "Semua",
  emptyTitle: "Belum Ada Event",
  emptyDescription:
    "Tidak ada event yang cocok dengan filter Anda. Coba ubah kata kunci pencarian atau kategori.",
  errorTitle: "Gagal Memuat Event",
  errorDescription: "Terjadi kesalahan saat mengambil data. Silakan coba lagi.",
  retryButton: "Coba Lagi",
  boothAvailable: "booth tersedia",
  showPerPage: "Tampilkan",
};

export const SORT_OPTIONS = [
  { value: "newest", label: "Terbaru" },
  { value: "upcoming", label: "Paling Dekat" },
  { value: "name_asc", label: "Nama (A-Z)" },
  { value: "name_desc", label: "Nama (Z-A)" },
] as const;

export const LIMIT_OPTIONS = [12, 24, 48] as const;

/**
 * Card gradient backgrounds (used when no event image)
 */
export const CARD_GRADIENTS = [
  "from-violet-500/80 to-indigo-600/80",
  "from-amber-400/80 to-orange-500/80",
  "from-emerald-400/80 to-teal-500/80",
  "from-rose-400/80 to-pink-500/80",
  "from-sky-400/80 to-blue-500/80",
  "from-fuchsia-400/80 to-purple-500/80",
] as const;
