import Link from "next/link";
import { Button } from "@/components/ui/button";
import { END_CTA_CONTENT } from "./constant";

export function EndCta() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 px-6 py-16 md:py-24 text-center shadow-2xl isolate">
          {/* Decorative elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-accent opacity-20 blur-3xl -z-10"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-accent opacity-20 blur-3xl -z-10"></div>
          
          <div className="mx-auto max-w-3xl space-y-8 relative z-10 text-primary-foreground">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              {END_CTA_CONTENT.headline}
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
              {END_CTA_CONTENT.description}
            </p>
            <div className="pt-4">
              <Button render={<Link href="/register" />} nativeButton={false} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8 text-lg font-bold shadow-xl hover:scale-105 transition-transform duration-300">
                {END_CTA_CONTENT.ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
