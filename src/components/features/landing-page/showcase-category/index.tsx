"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useEventCategoryList } from "@/services/features/event-categories/hooks";
import { CATEGORY_SHOWCASE_CONTENT } from "./constant";

export function ShowcaseCategory() {
  const { data, isLoading } = useEventCategoryList({ limit: 4 });
  const categories = data?.data || [];
  return (
    <section className="w-full py-16 md:py-24 bg-muted/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{CATEGORY_SHOWCASE_CONTENT.headline}</h2>
            <p className="text-muted-foreground md:text-lg">
              {CATEGORY_SHOWCASE_CONTENT.description}
            </p>
          </div>
          <Link href="/events" className="text-primary font-medium hover:underline hidden md:block whitespace-nowrap">
            {CATEGORY_SHOWCASE_CONTENT.ctaPrimary}
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 snap-x snap-mandatory hide-scrollbar">
            {categories.map((category, idx) => (
            <Link 
              key={category.id} 
              href={`/events?category=${category.id}`}
              className="group relative flex-none w-[280px] md:w-auto h-[320px] rounded-2xl overflow-hidden snap-center isolate cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={CATEGORY_SHOWCASE_CONTENT.fallbackImages[idx % CATEGORY_SHOWCASE_CONTENT.fallbackImages.length]} 
                alt={category.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 -z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent -z-10"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-2">
                  {category.description || "Temukan berbagai event menarik dalam kategori ini."}
                </p>
              </div>
            </Link>
          ))}
        </div>
        )}
        
        <div className="mt-4 text-center md:hidden">
          <Link href="/events" className="text-primary font-medium hover:underline">
            {CATEGORY_SHOWCASE_CONTENT.ctaPrimary}
          </Link>
        </div>
      </div>
    </section>
  );
}
