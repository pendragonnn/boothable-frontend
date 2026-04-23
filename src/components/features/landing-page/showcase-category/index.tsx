import Image from "next/image";
import Link from "next/link";
import { SHOWCASE_CATEGORIES } from "./constant";

export function ShowcaseCategory() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Eksplorasi Kategori Event</h2>
            <p className="text-muted-foreground md:text-lg">
              Dari festival makanan pedas hingga pameran fashion lokal, temukan audiens yang tepat untuk produk Anda.
            </p>
          </div>
          <Link href="/events" className="text-primary font-medium hover:underline hidden md:block whitespace-nowrap">
            Lihat Semua Kategori &rarr;
          </Link>
        </div>
        
        {/* Horizontal scroll container on mobile, grid on desktop */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 snap-x snap-mandatory hide-scrollbar">
          {SHOWCASE_CATEGORIES.map((category) => (
            <Link 
              key={category.id} 
              href={`/events?category=${category.id}`}
              className="group relative flex-none w-[280px] md:w-auto h-[320px] rounded-2xl overflow-hidden snap-center isolate cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={category.image} 
                alt={category.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 -z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent -z-10"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-2">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 text-center md:hidden">
          <Link href="/events" className="text-primary font-medium hover:underline">
            Lihat Semua Kategori &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
