"use client";

import { useState } from "react";
import { Loader2, Store, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useEventBooths, useEventDetail } from "@/services/features/events/hooks";
import { BOOTH_SELECTION_CONTENT, BOOTH_CATEGORIES } from "./constant";
import { Booth, BoothStatus } from "@/services/shared";
import { formatCurrency } from "@/lib/utils/format";

interface BoothSelectionProps {
  eventId: string;
}

export function BoothSelection({ eventId }: BoothSelectionProps) {
  const { data: boothsData, isLoading: isBoothsLoading } = useEventBooths(eventId);
  const booths = boothsData?.data || [];
  
  const { data: eventData, isLoading: isEventLoading } = useEventDetail(eventId);
  const event = eventData?.data;
  
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleBoothClick = (booth: Booth) => {
    if (booth.status !== BoothStatus.AVAILABLE) return;
    setSelectedBooth(booth);
    setIsSheetOpen(true);
  };

  const getBoothCategory = (price: number) => {
    return BOOTH_CATEGORIES.find((cat) => price >= cat.threshold) || BOOTH_CATEGORIES[1];
  };

  if (isBoothsLoading || isEventLoading) {
    return (
      <div className="w-full py-24 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  // Calculate available stats
  const availableCount = booths.filter(b => b.status === BoothStatus.AVAILABLE).length;

  return (
    <section id="booth-selection" className="w-full py-20 bg-slate-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-none px-4 py-1.5 rounded-full mb-2">
            Floor Plan
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            {BOOTH_SELECTION_CONTENT.heading}
          </h2>
          <p className="max-w-2xl text-slate-600 font-plus-jakarta md:text-lg">
            {BOOTH_SELECTION_CONTENT.description}
          </p>
          <div className="mt-2 text-sm font-medium text-slate-500">
            Status: <span className="text-indigo-600 font-bold">{availableCount} Booth Tersedia</span> dari total {booths.length}
          </div>
        </div>

        {/* Event Map Image */}
        {event?.eventBoothMap && (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-4 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 overflow-hidden">
            <h3 className="text-xl font-bold font-heading text-slate-900 mb-6 text-center">Denah Acara / Event Map</h3>
            <div className="relative w-full aspect-video sm:aspect-[21/9] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={event.eventBoothMap} 
                alt={`Peta Booth ${event?.eventName}`}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 animate-in fade-in duration-1000 delay-150">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-200"></div>
            <span className="text-sm font-medium text-slate-600 font-plus-jakarta">{BOOTH_SELECTION_CONTENT.legendAvailable}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-slate-200 border border-slate-300"></div>
            <span className="text-sm font-medium text-slate-600 font-plus-jakarta">{BOOTH_SELECTION_CONTENT.legendBooked}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-yellow-50 border-2 border-indigo-600"></div>
            <span className="text-sm font-medium text-slate-600 font-plus-jakarta">{BOOTH_SELECTION_CONTENT.legendSelected}</span>
          </div>
        </div>

        {/* Booth Grid Area */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          
          {booths.length === 0 ? (
            <div className="text-center py-16">
              <Store className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-plus-jakarta">Belum ada data denah booth untuk event ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {booths.map((booth) => {
                const isAvailable = booth.status === BoothStatus.AVAILABLE;
                const isSelected = selectedBooth?.id === booth.id;
                
                return (
                  <button
                    key={booth.id}
                    disabled={!isAvailable}
                    onClick={() => handleBoothClick(booth)}
                    className={`
                      relative flex flex-col items-center justify-center p-4 h-28 rounded-2xl transition-all duration-300 font-plus-jakarta group
                      ${!isAvailable ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed" : ""}
                      ${isAvailable && !isSelected ? "bg-indigo-50/50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-100 cursor-pointer" : ""}
                      ${isSelected ? "bg-yellow-50 text-indigo-900 border-2 border-[#6366f1] scale-105 shadow-xl shadow-indigo-100/50 ring-4 ring-indigo-500/20" : ""}
                    `}
                  >
                    <span className={`text-xl font-bold font-heading ${!isAvailable ? "text-slate-400" : "text-slate-800"}`}>
                      {booth.boothCode}
                    </span>
                    <span className="text-xs font-medium mt-1">
                      {isAvailable ? "Tersedia" : "Booked"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Side Drawer (Cinema-Style Selection) */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-md bg-white border-l-0 shadow-2xl font-plus-jakarta overflow-y-auto">
          <SheetHeader className="text-left space-y-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3 pr-8">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Tersedia
              </Badge>
              {selectedBooth && (
                <Badge variant="outline" className="text-slate-600 border-slate-200">
                  {selectedBooth.type}
                </Badge>
              )}
            </div>
            <div>
              <SheetTitle className="text-3xl font-extrabold font-heading text-slate-900">
                Booth {selectedBooth?.boothCode}
              </SheetTitle>
              <SheetDescription className="text-base text-slate-500 mt-2">
                Pilihan lokasi strategis yang cocok untuk mengembangkan visibilitas brand Anda di event ini.
              </SheetDescription>
            </div>
          </SheetHeader>
          
          <div className="py-8 space-y-6 pb-24">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <p className="text-sm text-slate-500 font-medium">Harga Sewa Per Hari</p>
              <p className="text-3xl font-bold text-indigo-600">
                {selectedBooth ? formatCurrency(selectedBooth.pricePerDay) : "Rp 0"}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
              <h4 className="font-semibold text-slate-900">Informasi Booth:</h4>
              <ul className="space-y-3">
                {selectedBooth?.size && (
                  <li className="flex items-center text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3 shrink-0"></div>
                    Luas area: {selectedBooth.size} meter
                  </li>
                )}
                {selectedBooth?.description && (
                  <li className="flex items-center text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3 shrink-0"></div>
                    {selectedBooth.description}
                  </li>
                )}
                {!selectedBooth?.size && !selectedBooth?.description && (
                  <li className="text-sm text-slate-500 italic">
                    Tidak ada informasi tambahan.
                  </li>
                )}
              </ul>
            </div>
          </div>

          <SheetFooter className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-slate-100 mt-auto">
            <Button size="lg" className="w-full h-14 text-lg rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-lg shadow-indigo-500/25 transition-all border-none">
              Pesan Booth Ini
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </section>
  );
}
