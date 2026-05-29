import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@/services/shared/types";
import { formatDate } from "@/lib/utils/format";
import { CARD_GRADIENTS } from "./constant";

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  // Placeholder status logic (could check date or available booths if we had it)
  const isAvailable = true; 
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <Link href={`/events/${event.id}`}>
      <Card className="overflow-hidden group h-full cursor-pointer border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white flex flex-col">
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          {event.eventCover && (
            <Image
              src={event.eventCover}
              alt={event.eventName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 z-10"
            />
          )}
          <div className="absolute top-3 right-3 z-20">
            <Badge className={isAvailable ? "bg-yellow-400 hover:bg-yellow-500 text-slate-900 border-none font-semibold shadow-md" : "bg-slate-500"}>
              {isAvailable ? "Tersedia" : "Penuh"}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-5 flex-grow space-y-3">
          <h3 className="font-heading font-bold text-xl text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
            {event.eventName}
          </h3>
          
          <div className="space-y-2 text-sm text-slate-500 font-plus-jakarta">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary shrink-0" />
              <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-5 pb-5 pt-0 border-t border-slate-100 mt-auto">
          <div className="w-full flex justify-between items-center pt-4">
             <div className="flex flex-col">
               <span className="text-xs text-slate-500 font-plus-jakarta">Kategori</span>
               <span className="font-semibold text-primary text-sm line-clamp-1">
                 {event.category?.name || "Event"}
               </span>
             </div>
             <div className="text-primary group-hover:translate-x-1 transition-transform">
               <ArrowRight className="w-5 h-5" />
             </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
