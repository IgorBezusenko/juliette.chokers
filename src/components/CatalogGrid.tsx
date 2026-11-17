"use client";

import { useMemo, useState } from "react";
import { categories, products, type Category } from "@/data/products";
import { ProductCard } from "./ProductCard";

type Filter = Category | "all";

export function CatalogGrid({ initial = "all" }: { initial?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initial);

  const available = categories.filter((c) => products.some((p) => p.category === c.id));
  const items = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  const tabs: { id: Filter; label: string }[] = [{ id: "all", label: "Все" }, ...available.map((c) => ({ id: c.id, label: c.plural }))];

  return (
    <>
      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0" role="tablist">
        {tabs.map((t) => {
          const active = filter === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(t.id)}
              className={`min-h-11 shrink-0 border px-5 py-2 text-sm transition-colors ${
                active ? "border-ink bg-ink text-cream" : "border-line bg-cream text-ink hover:border-gold hover:text-gold"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 3} />
        ))}
      </div>
    </>
  );
}
