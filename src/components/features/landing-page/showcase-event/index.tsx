import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SHOWCASE_EVENTS } from "./constant";

export function ShowcaseEvent() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Event Pilihan Mendatang</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Temukan festival atau bazaar terbaik untuk mempromosikan bisnis Anda. Segera amankan booth strategis sebelum kehabisan!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWCASE_EVENTS.map((event) => (
            <Card key={event.id} className="overflow-hidden group hover:border-primary/50 transition-colors duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <Badge 
                  variant={event.statusColor as any} 
                  className="absolute top-4 right-4 shadow-md bg-accent text-accent-foreground border-none"
                >
                  {event.status}
                </Badge>
              </div>
              <CardHeader className="p-5">
                <CardTitle className="text-xl line-clamp-1">{event.title}</CardTitle>
                <CardDescription className="flex flex-col gap-2 mt-2">
                  <span className="flex items-center text-sm">
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {event.date}
                  </span>
                  <span className="flex items-center text-sm">
                    <MapPinIcon className="mr-2 h-4 w-4 text-primary" />
                    {event.location}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-5 pt-0">
                <Button render={<Link href={`/events/${event.id}`} />} nativeButton={false} className="w-full" variant="outline">
                  Lihat Denah Booth
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Button render={<Link href="/events" />} nativeButton={false} variant="ghost" className="text-primary hover:text-primary/80">
            Lihat Semua Event &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
}
