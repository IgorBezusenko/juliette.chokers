import Link from "next/link";
import { links, site } from "@/config/site";
import { Logo } from "./Brand";

export function Footer() {
  const telegram = links.telegram();
  return (
    <footer id="about" className="mt-10 scroll-mt-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-10 pt-6 text-center sm:px-6">
        <Logo width={110} />
        {/* TODO: Юля, если хочешь — замени на свою фразу */}
        <p className="mt-4 max-w-[18rem] font-serif text-lg italic leading-snug">
          Сияй! Важно не то, из чего сделано украшение, а то, как ты в нём себя чувствуешь
        </p>

        <nav className="mt-6 flex flex-wrap justify-center gap-x-6 text-sm" aria-label="Ссылки в подвале">
          <Link href="/catalog" className="flex min-h-11 items-center hover:text-gold">Каталог</Link>
          <Link href="/#how-to-order" className="flex min-h-11 items-center hover:text-gold">Как заказать</Link>
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center hover:text-gold">
            Instagram
          </a>
          {telegram && (
            <a href={telegram} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center hover:text-gold">
              Telegram
            </a>
          )}
        </nav>

        <p className="mt-4 text-[11px] text-muted">
          © {new Date().getFullYear()} juliette.chokers · {site.city}
        </p>
      </div>
    </footer>
  );
}
