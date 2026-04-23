import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HERO_CONTENT } from "./constant";

export function Hero() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <div className="container px-4 md:px-6 mx-auto max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {HERO_CONTENT.headline}
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
            {HERO_CONTENT.tagline}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button render={<Link href="/events" />} nativeButton={false} size="lg" className="w-full sm:w-auto font-semibold shadow-lg hover:shadow-primary/25 transition-all text-base h-12 px-8">
            {HERO_CONTENT.ctaPrimary}
          </Button>
          <Button render={<Link href="/about" />} nativeButton={false} variant="outline" size="lg" className="w-full sm:w-auto font-semibold text-base h-12 px-8">
            {HERO_CONTENT.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
