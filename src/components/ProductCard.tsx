import Link from "next/link";
import { priceParts } from "@/config/site";
import type { Product } from "@/data/products";
import { Pearls, Price } from "./Brand";
import { ProductImage } from "./ProductImage";

/** Товар как мини-сертификат: фото, жемчужина, название прописными, цена золотом. */
export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const price = priceParts(product.price);
  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group flex flex-col items-center border border-line bg-cream p-2.5 pb-4 text-center transition-colors hover:border-gold/60 sm:p-3 sm:pb-5"
    >
      <div className="relative w-full overflow-hidden">
        <ProductImage
          product={product}
          priority={priority}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {product.bestseller && (
          <span className="absolute left-2.5 top-1.5 font-script text-lg text-gold">хит</span>
        )}
      </div>
      <Pearls count={1} size={9} className="mt-3" />
      <h3 className="mt-2 font-serif text-[15px] uppercase leading-tight tracking-[0.08em] sm:text-base">
        {product.name}
      </h3>
      <div className="mt-1">
        <Price value={price.value} currency={price.currency} size="card" />
      </div>
    </Link>
  );
}
