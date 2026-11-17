import Image from "next/image";
import Link from "next/link";
import { Card, Logo, Pearls, Price, SectionTitle } from "@/components/Brand";
import { ProductCard } from "@/components/ProductCard";
import { InstagramIcon } from "@/components/icons";
import { links, priceParts, site } from "@/config/site";
import { products } from "@/data/products";

const steps = [
  "Выберите украшение в каталоге",
  "Нажмите «Заказать» — откроется чат с готовым текстом заказа",
  "Договоримся о доставке или встрече",
];

export default function HomePage() {
  const hits = products.filter((p) => p.bestseller);
  // на десктопе 4 колонки — добираем до 8, чтобы ряды были полными
  const featured = [...hits, ...products.filter((p) => !p.bestseller)].slice(0, 8);
  const [left, right] = [products.find((p) => p.slug === "sharlotta") ?? hits[0], hits.find((p) => p.slug !== "sharlotta") ?? hits[1]];
  const from = priceParts(Math.min(...products.map((p) => p.price)));

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 pb-8 pt-4 sm:space-y-8 sm:px-6 sm:pt-8">
      {/* Главный экран: сертификат по центру, на десктопе по бокам — два хита, как карточки на столе */}
      <section className="lg:grid lg:grid-cols-[minmax(0,1fr)_28rem_minmax(0,1fr)] lg:items-center lg:gap-8">
      {left && (
        <div className="hidden lg:block">
          <ProductCard product={left} priority />
        </div>
      )}
      <Card hole className="mx-auto max-w-md px-6 pb-6 pt-5 text-center sm:px-10 sm:pb-8 lg:max-w-none">
        <Logo width={150} className="mx-auto mt-8" />
        <p className="mt-2 text-[11px] tracking-[0.06em] text-muted">украшения ручной работы</p>

        <div className="mt-9">
          <SectionTitle as="h1" script="новая">
            Коллекция
          </SectionTitle>
        </div>
        <Pearls count={5} size={12} className="mt-4" />
        <div className="mt-2">
          <Price prefix="от" value={from.value} currency={from.currency} size="xl" />
        </div>

        <p className="mx-auto mt-5 max-w-[17rem] text-[13px] leading-relaxed">
          Чокеры, браслеты и серьги из жемчуга, гематита и стеклянных бусин. Каждое украшение
          собрано вручную.
        </p>
        <Link
          href="/catalog"
          className="mt-6 inline-flex min-h-12 items-center bg-ink px-8 text-[13px] tracking-[0.04em] text-cream transition-colors hover:bg-gold"
        >
          Смотреть каталог
        </Link>

        <div className="mt-8 flex items-center gap-3 text-left">
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Image src="/brand/qr-instagram.svg" alt="QR-код Instagram @juliette.chokers" width={56} height={56} />
          </a>
          <div className="text-[11px] leading-relaxed">
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gold">
              <InstagramIcon className="h-3 w-3" />@{site.contacts.instagram}
            </a>
            <p className="font-normal text-gold">{site.city}</p>
            <p className="text-[10px] text-muted">*доставка и встреча по договорённости</p>
          </div>
        </div>
      </Card>
      {right && (
        <div className="hidden lg:block">
          <ProductCard product={right} priority />
        </div>
      )}
      </section>

      {/* Хиты */}
      <section className="pt-6 lg:pt-12">
        <SectionTitle script="любимое">Хиты продаж</SectionTitle>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/catalog"
            className="inline-flex min-h-11 items-center border border-ink/30 px-7 text-[13px] transition-colors hover:border-gold hover:text-gold"
          >
            Весь каталог
          </Link>
        </div>
      </section>

      {/* Как заказать — карточка */}
      <Card
        as="section"
        id="how-to-order"
        className="scroll-mt-24 px-6 py-8 text-center sm:px-10 sm:py-10"
      >
        <SectionTitle script="просто">Как заказать</SectionTitle>
        <ol className="mt-7 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {steps.map((text, i) => (
            <li key={text}>
              <span className="font-display text-gold text-[40px] leading-none">{i + 1}</span>
              <p className="mx-auto mt-1 max-w-[15rem] text-[13px] leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
