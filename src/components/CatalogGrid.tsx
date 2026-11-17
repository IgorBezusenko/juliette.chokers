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
      <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist">
        {tabs.map((t) => {
          const active = filter === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(t.id)}
              className={`shrink-0 rounded-full border px-5 py-2 text-sm transition-colors ${
                active ? "border-ink bg-ink text-pearl" : "border-line bg-pearl text-ink hover:border-rose"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
        {items.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 3} />
        ))}
      </div>
    </>
  );
}
