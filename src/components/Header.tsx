import Link from "next/link";
import { links } from "@/config/site";
import { Logo } from "./Brand";
import { InstagramIcon } from "./icons";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
        <nav className="flex items-center gap-6 text-sm" aria-label="Основное меню">
          <Link href="/catalog" className="flex min-h-11 items-center transition-colors hover:text-gold">
            Каталог
          </Link>
          <Link href="/#how-to-order" className="hidden min-h-11 items-center transition-colors hover:text-gold md:flex">
            Как заказать
          </Link>
        </nav>

        <Link href="/" aria-label="На главную">
          <Logo width={84} />
        </Link>

        <div className="flex justify-end">
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center transition-colors hover:text-gold"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
