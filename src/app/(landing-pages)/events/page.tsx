import { Suspense } from "react";
import { EventsHero, EventList } from "@/components/features/events";

export const metadata = {
  title: "Katalog Event | Boothable",
  description: "Eksplorasi ratusan event festival dan pameran untuk memperluas jangkauan bisnis Anda.",
};

export default function EventsPage() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <EventsHero />
      <Suspense
        fallback={
          <div className="py-24 bg-slate-50 flex justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        }
      >
        <EventList />
      </Suspense>
    </main>
  );
}
