import type { Metadata } from "next";
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
    <section className="mx-auto max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
      <p className="text-xs uppercase tracking-[0.3em] text-rose">Juliette</p>
      <h1 className="mt-3 font-serif text-5xl sm:text-6xl">Каталог</h1>
      <p className="mb-10 mt-4 max-w-lg text-sm leading-relaxed text-muted">
        Каждая модель собирается вручную, поэтому оттенок бусин может немного отличаться.
        Нужен другой цвет или длина — просто напишите.
      </p>
      <CatalogGrid key={initial} initial={initial} />
    </section>
  );
}
