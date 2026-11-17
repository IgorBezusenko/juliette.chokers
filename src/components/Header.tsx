import Link from "next/link";
import { links, site } from "@/config/site";
import { InstagramIcon } from "./icons";

const nav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/#how-to-order", label: "Как заказать" },
  { href: "/#about", label: "О нас" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-1.5" aria-label="На главную">
          <span className="font-serif text-2xl italic text-ink">{site.name}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted">{site.tagline}</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm sm:gap-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-ink/80 transition-colors hover:text-rose-dark ${item.href === "/catalog" ? "" : "hidden sm:inline"}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/80 transition-colors hover:text-rose-dark"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
