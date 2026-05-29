"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquareText } from "lucide-react";
import { CONTACT_HERO_CONTENT } from "./constant";

export function ContactHero() {
  const scrollToForm = () => {
    const formSection = document.getElementById("inquiry-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 md:left-20 opacity-10 animate-bounce" style={{ animationDuration: "3s" }}>
        <Mail className="w-16 h-16 md:w-24 md:h-24 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 md:right-20 opacity-10 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
        <MessageSquareText className="w-20 h-20 md:w-28 md:h-28 text-secondary" />
      </div>
      <div className="absolute top-1/2 left-1/4 opacity-5 hidden lg:block">
        <div className="w-32 h-32 rounded-full bg-primary/30 blur-3xl"></div>
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-5 hidden lg:block">
        <div className="w-40 h-40 rounded-full bg-secondary/30 blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mx-auto mb-4">
            <MessageSquareText className="w-4 h-4" />
            <span>Hubungi Kami</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-heading">
            {CONTACT_HERO_CONTENT.headline}
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
            {CONTACT_HERO_CONTENT.tagline}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="w-full sm:w-auto font-semibold shadow-lg hover:shadow-primary/25 transition-all text-base h-12 px-8"
          >
            {CONTACT_HERO_CONTENT.ctaPrimary}
          </Button>
          <Button
            render={<Link href="/#faq" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto font-semibold text-base h-12 px-8"
          >
            {CONTACT_HERO_CONTENT.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
