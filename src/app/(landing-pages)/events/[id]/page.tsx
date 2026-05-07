import { Metadata } from "next";
import { EventHero, BoothSelection } from "@/components/features/event-detail";

export const metadata: Metadata = {
  title: "Detail Event | Boothable",
  description: "Pilih dan pesan booth untuk event terbaik di Boothable.",
};

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <main className="w-full flex min-h-screen flex-col bg-slate-50 font-plus-jakarta">
      <EventHero eventId={resolvedParams.id} />
      <BoothSelection eventId={resolvedParams.id} />
    </main>
  );
}
