import type { Metadata } from "next";
import { Pearls, SectionTitle } from "@/components/Brand";
import { CatalogGrid } from "@/components/CatalogGrid";
import { categories, type Category } from "@/data/products";

export const metadata: Metadata = {
  title: "Каталог",
  description: "Чокеры, колье, браслеты, серьги и наборы ручной работы.",
};

type Props = { searchParams: Promise<{ c?: string }> };

export default async function CatalogPage({ searchParams }: Props) {
  const { c } = await searchParams;
  const initial = categories.some((cat) => cat.id === c) ? (c as Category) : "all";

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
      <SectionTitle as="h1" script="вся">
        Коллекция
      </SectionTitle>
      <Pearls count={3} size={11} className="mt-4" />
      <p className="mx-auto mb-8 mt-5 max-w-md text-center text-[13px] leading-relaxed text-muted">
        Каждая модель собирается вручную, поэтому оттенок бусин может немного отличаться.
        Нужен другой цвет или длина — просто напишите.
      </p>
      <CatalogGrid key={initial} initial={initial} />
    </section>
  );
}
