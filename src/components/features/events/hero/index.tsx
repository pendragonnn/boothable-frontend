"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Sparkles, CalendarDays, MapPin, Store } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import { useEventList } from "@/services/features/events/hooks";
import { formatDate } from "@/lib/utils/format";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EVENTS_HERO_CONTENT, SLIDE_GRADIENTS } from "./constant";

export function EventsHero() {
  const { data, isLoading } = useEventList({ limit: 5 });
  const plugin = useRef(
    Autoplay({ delay: 5000 })
  );

  const events = data?.data || [];

  if (isLoading || events.length === 0) {
    return (
      <div className="w-full h-[500px] md:h-[600px] bg-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white">
            {EVENTS_HERO_CONTENT.headline}
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto font-plus-jakarta">
            {EVENTS_HERO_CONTENT.tagline}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
        className="w-full group"
      >
        <CarouselContent>
          {events.map((event, index) => {
            const fallbackGradient = SLIDE_GRADIENTS[index % SLIDE_GRADIENTS.length];
            return (
              <CarouselItem key={event.id} className="relative w-full h-[500px] md:h-[600px] xl:h-[700px]">
                {/* Background Image or Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient}`}>
                  {event.eventCover && (
                    <Image
                      src={event.eventCover}
                      alt={event.eventName}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  )}
                  {/* Overlay gradasi gelap */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/30" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8 pt-10">
                  <div className="max-w-4xl space-y-6">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-yellow-400 font-medium text-sm mb-2">
                      <Sparkles className="w-4 h-4 inline-block mr-2" />
                      {EVENTS_HERO_CONTENT.badge}
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white drop-shadow-lg leading-tight">
                      {event.eventName}
                    </h1>
                    
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-white/90 text-sm md:text-lg font-plus-jakarta mb-4">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="w-5 h-5 text-yellow-400" />
                        {formatDate(event.startDate)} - {formatDate(event.endDate)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-5 h-5 text-yellow-400" />
                        {event.location}
                      </span>
                    </div>

                    <p className="text-xl md:text-2xl text-yellow-400 font-plus-jakarta font-medium drop-shadow-md pb-4 max-w-2xl mx-auto">
                      {EVENTS_HERO_CONTENT.tagline}
                    </p>
                    
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button  size="lg" className="bg-primary hover:bg-primary/90 text-white min-w-[200px] text-lg h-14 rounded-xl">
                        <Link href={`/events/${event.id}`}>
                          {EVENTS_HERO_CONTENT.ctaPrimary}
                        </Link>
                      </Button>
                      <Button  size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:text-white min-w-[200px] text-lg h-14 rounded-xl">
                        <Link href="#event-list">
                          {EVENTS_HERO_CONTENT.ctaSecondary}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
       
      </Carousel>
    </div>
  );
}
