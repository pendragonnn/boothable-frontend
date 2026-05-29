import Image from "next/image";
import { STORY_CONTENT } from "./constant";

export function Story() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm">
              {STORY_CONTENT.title}
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tighter text-foreground">
              {STORY_CONTENT.headline}
            </h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
              {STORY_CONTENT.description}
            </p>
          </div>
          
          <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={STORY_CONTENT.image} 
              alt="Boothable Story" 
              className="absolute inset-0 object-cover w-full h-full hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
