"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon, Loader2, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EVENT_HERO_CONTENT } from "./constant";
import { useEventDetail } from "@/services/features/events/hooks";
import { formatDate } from "@/lib/utils/format";

interface EventHeroProps {
  eventId: string;
}

export function EventHero({ eventId }: EventHeroProps) {
  const { data, isLoading } = useEventDetail(eventId);
  const event = data?.data;

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-slate-900">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!event) return null;

  const bgImage = event.eventCover || EVENT_HERO_CONTENT.fallbackCover;
  const tagline = `${event.eventName}: ${EVENT_HERO_CONTENT.defaultTagline}`;

  return (
    <div className="relative w-full  flex items-center justify-center isolate overflow-hidden group">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt={event.eventName}
        fill
        className="object-cover -z-20 scale-105"
        priority
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-slate-950/70 via-slate-900/80 to-slate-900/90 -z-10" />

      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center mt-16">
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 px-4 py-1.5 text-sm rounded-full backdrop-blur-md">
            {/* @ts-ignore */}
            {event.category?.name || "Event"}
          </Badge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight drop-shadow-md">
            {event.eventName}
          </h1>

          <p className="text-xl md:text-2xl font-plus-jakarta text-indigo-200 font-medium max-w-2xl mx-auto">
            {tagline}
          </p>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {event.description || EVENT_HERO_CONTENT.narrative}
          </p>

          {/* Glassmorphism Info Card */}
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl mt-8">
            <div className="flex items-center gap-3 text-slate-200">
              <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-400">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div className="text-left font-plus-jakarta">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Tanggal Event</p>
                <p className="font-medium">{formatDate(event.startDate)} - {formatDate(event.endDate)}</p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            
            <div className="flex items-center gap-3 text-slate-200">
              <div className="p-3 rounded-full bg-pink-500/20 text-pink-400">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <div className="text-left font-plus-jakarta">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Lokasi</p>
                <p className="font-medium line-clamp-1 max-w-[200px]">{event.location}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 pb-8 mb-8">
            <Button size="lg" className="bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl h-14 px-8 text-lg w-full sm:w-auto shadow-lg shadow-indigo-500/30 border-none">
              <Link href="#booth-selection">
                {EVENT_HERO_CONTENT.ctaPrimary}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white rounded-xl h-14 px-8 text-lg w-full sm:w-auto whitespace-nowrap">
              <Link href="#about-event" className="flex items-center justify-center">
                <InfoIcon className="w-5 h-5 mr-2" />
                {EVENT_HERO_CONTENT.ctaSecondary}
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
