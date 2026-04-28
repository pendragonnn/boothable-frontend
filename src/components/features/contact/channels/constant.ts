export const CHANNELS_CONTENT = {
  title: "Hubungi Kami",
  headline: "Pilih Cara Terbaik untuk Menghubungi Tim Kami",
  description:
    "Kami menyediakan berbagai saluran komunikasi agar Anda bisa terhubung dengan tim Boothable secara cepat dan nyaman.",
};

export const CONTACT_CHANNELS = [
  {
    id: "whatsapp",
    icon: "MessageCircle",
    title: "WhatsApp Support",
    description: "Respon cepat untuk kendala teknis sewa booth.",
    detail: "+62 812-3456-7890",
    badge: "Respon Cepat < 1 Jam",
    href: "https://wa.me/6281234567890",
    action: "Chat Sekarang",
  },
  {
    id: "email",
    icon: "Mail",
    title: "Email Business",
    description: "Untuk penawaran kerja sama dan partnership strategis.",
    detail: "business@boothable.id",
    badge: "Partnership",
    href: "mailto:business@boothable.id",
    action: "Kirim Email",
  },
  {
    id: "office",
    icon: "MapPin",
    title: "Kantor Kami",
    description:
      "Tim kami beroperasi secara remote dari berbagai kota di Indonesia.",
    detail: "Jakarta, Indonesia (Remote Office)",
    badge: "Online",
    href: "#",
    action: "Lihat Lokasi",
  },
] as const;
