"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon, Loader2 } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEventList } from "@/services/features/events/hooks";
import { formatDate } from "@/lib/utils/format";
import { EVENT_SHOWCASE_CONTENT } from "./constant";

export function ShowcaseEvent() {
  const { data, isLoading } = useEventList({ limit: 3, sort: "upcoming" });
  const events = data?.data || [];
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{EVENT_SHOWCASE_CONTENT.headline}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            {EVENT_SHOWCASE_CONTENT.description}
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, idx) => (
            <Card key={event.id} className="overflow-hidden group hover:border-primary/50 transition-colors duration-300">
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={event.eventCover || EVENT_SHOWCASE_CONTENT.fallbackImages[idx % EVENT_SHOWCASE_CONTENT.fallbackImages.length]} 
                  alt={event.eventName} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader className="p-5">
                <CardTitle className="text-xl line-clamp-1">{event.eventName}</CardTitle>
                <CardDescription className="flex flex-col gap-2 mt-2">
                  <span className="flex items-center text-sm font-plus-jakarta">
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {formatDate(event.startDate)} - {formatDate(event.endDate)}
                  </span>
                  <span className="flex items-center text-sm font-plus-jakarta">
                    <MapPinIcon className="mr-2 h-4 w-4 text-primary" />
                    {event.location}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-5 pt-0">
                <Button className="w-full" variant="outline">
                  <Link href={`/events/${event.id}`}>
                    {EVENT_SHOWCASE_CONTENT.ctaSecondary}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        )}
        
        <div className="flex justify-center mt-10">
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            <Link href="/events">{EVENT_SHOWCASE_CONTENT.ctaPrimary}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
