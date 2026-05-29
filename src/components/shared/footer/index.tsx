import Link from "next/link";
import { FOOTER_LINKS, FOOTER_SOCIALS, FOOTER_CONTACT } from "./constant";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 text-slate-300 py-16 md:py-20 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl leading-none">B</span>
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                Boothable
              </span>
            </Link>
            <p className="max-w-xs text-slate-400 leading-relaxed">
              Platform terpadu untuk mencari, memilih posisi strategis, dan mengelola sewa booth festival Anda tanpa ribet.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-white">Kontak Kami</p>
              <address className="not-italic text-sm text-slate-400 whitespace-pre-line leading-relaxed">
                {FOOTER_CONTACT.address}
              </address>
              <div className="text-sm text-slate-400 mt-2 space-y-1">
                <p>Email: <a href={`mailto:${FOOTER_CONTACT.email}`} className="hover:text-white transition-colors">{FOOTER_CONTACT.email}</a></p>
                <p>Phone: <a href={`tel:${FOOTER_CONTACT.phone}`} className="hover:text-white transition-colors">{FOOTER_CONTACT.phone}</a></p>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div>
            <h3 className="font-semibold text-white mb-6">Produk</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6">Perusahaan</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6">Legal</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Boothable. Hak Cipta Dilindungi.
          </p>
          <ul className="flex flex-wrap gap-6 items-center">
            {FOOTER_SOCIALS.map((social) => (
              <li key={social.label}>
                <a 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
