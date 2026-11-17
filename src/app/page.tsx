import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { InstagramIcon } from "@/components/icons";
import { links, site } from "@/config/site";
import { categories, getProduct, products } from "@/data/products";

const steps = [
  { n: "01", title: "Выберите украшение", text: "Посмотрите каталог и откройте понравившуюся модель." },
  { n: "02", title: "Напишите нам", text: "Нажмите «Заказать» — откроется чат, текст заказа уже скопирован." },
  { n: "03", title: "Получите заказ", text: "Уточним длину, цвет и договоримся о доставке или встрече." },
];

export default function HomePage() {
  const hero = getProduct("sharlotta") ?? products[0];
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:pt-20">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-rose">Ручная работа · {site.city}</p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
            Украшения, <br />
            <span className="italic text-rose-dark">собранные вручную</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Чокеры, браслеты и серьги из жемчуга, гематита и стеклянных бусин. Каждое украшение
            Юля собирает сама — бусина за бусиной.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="rounded-full bg-ink px-8 py-3.5 text-sm text-pearl transition-colors hover:bg-rose-dark"
            >
              Смотреть каталог
            </Link>
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm text-ink transition-colors hover:border-rose hover:text-rose-dark"
            >
              <InstagramIcon className="h-4 w-4" />@{site.contacts.instagram}
            </a>
          </div>
        </div>

        <div className="relative isolate mx-auto w-full max-w-sm md:max-w-none">
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-blush/60 md:-inset-6" />
          <ProductImage product={hero} priority className="rounded-[2rem]" sizes="(min-width: 768px) 40vw, 90vw" />
          <div className="absolute -bottom-5 -left-3 rounded-2xl bg-pearl px-5 py-3 shadow-[0_10px_30px_-12px_rgba(58,46,44,0.25)] sm:-left-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Хит продаж</p>
            <p className="font-serif text-xl">{hero.name}</p>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-rose">Любимое</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Хиты продаж</h2>
          </div>
          <Link href="/catalog" className="shrink-0 text-sm text-ink underline-offset-4 hover:text-rose-dark hover:underline">
            Весь каталог →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
          {bestsellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 border-y border-line py-8">
          {categories
            .filter((c) => products.some((p) => p.category === c.id))
            .map((c) => (
              <Link key={c.id} href={`/catalog?c=${c.id}`} className="font-serif text-2xl italic text-ink/80 hover:text-rose-dark">
                {c.plural}
              </Link>
            ))}
        </div>
      </section>

      {/* How to order */}
      <section id="how-to-order" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-rose">Просто</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Как заказать</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-pearl p-7">
              <p className="font-serif text-3xl italic text-rose">{s.n}</p>
              <h3 className="mt-4 text-base font-medium">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
        <div className="rounded-[2rem] bg-blush/70 px-6 py-14 text-center sm:px-16">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-dark">О нас</p>
          {/* TODO: Юля, расскажи свою историю своими словами */}
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-snug sm:text-4xl">
            Juliette — это маленькая мастерская, где каждое украшение делается вручную и с любовью.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted">
            Мы подбираем бусины, жемчуг и подвески так, чтобы украшение хотелось носить каждый день.
            Новинки и процесс работы — в нашем Instagram.
          </p>
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm text-pearl transition-colors hover:bg-rose-dark"
          >
            <InstagramIcon className="h-4 w-4" />
            Подписаться
          </a>
        </div>
      </section>
    </>
  );
}
