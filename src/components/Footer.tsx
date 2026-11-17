import Link from "next/link";
import { links, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-pearl">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-serif text-2xl italic">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted">Украшения ручной работы. {site.city}.</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Магазин</p>
          <ul className="space-y-2">
            <li><Link href="/catalog" className="hover:text-rose-dark">Каталог</Link></li>
            <li><Link href="/#how-to-order" className="hover:text-rose-dark">Как заказать</Link></li>
            <li><Link href="/#about" className="hover:text-rose-dark">О нас</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Связаться</p>
          <ul className="space-y-2">
            <li>
              <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-rose-dark">
                Instagram @{site.contacts.instagram}
              </a>
            </li>
            {links.telegram() && (
              <li>
                <a href={links.telegram()} target="_blank" rel="noopener noreferrer" className="hover:text-rose-dark">
                  Telegram @{site.contacts.telegram}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted">© {new Date().getFullYear()} {site.name} chokers</p>
    </footer>
  );
}
