"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAVBAR_MENUS } from "./constant";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-primary-foreground font-bold text-xl leading-none">B</span>
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-foreground">
            Boothable
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {NAVBAR_MENUS.map((menu) => (
              <li key={menu.label}>
                <Link
                  href={menu.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 border-l pl-6 border-border">
            <Button render={<Link href="/login" />} nativeButton={false} variant="ghost" className="font-semibold">
              Masuk
            </Button>
            <Button render={<Link href="/register" />} nativeButton={false} className="font-semibold">
              Daftar
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="hover:bg-muted" />}>
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col">
              <SheetTitle className="sr-only">Navigasi Utama</SheetTitle>
              <div className="flex items-center gap-2 mb-8 mt-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl leading-none">B</span>
                </div>
                <span className="font-heading font-bold text-xl tracking-tight text-foreground">
                  Boothable
                </span>
              </div>
              <ul className="flex flex-col gap-6">
                {NAVBAR_MENUS.map((menu) => (
                  <li key={menu.label}>
                    <Link
                      href={menu.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors block"
                    >
                      {menu.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 mt-auto mb-8">
                <Button render={<Link href="/login" />} nativeButton={false} variant="outline" className="w-full justify-center h-12 text-base font-semibold" onClick={() => setIsOpen(false)}>
                  Masuk
                </Button>
                <Button render={<Link href="/register" />} nativeButton={false} className="w-full justify-center h-12 text-base font-semibold" onClick={() => setIsOpen(false)}>
                  Daftar
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
