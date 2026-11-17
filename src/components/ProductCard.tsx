import Link from "next/link";
import { formatPrice } from "@/config/site";
import { categoryLabel, type Product } from "@/data/products";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/catalog/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl">
        <ProductImage
          product={product}
          priority={priority}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">{categoryLabel(product.category)}</p>
          <h3 className="mt-1 font-serif text-xl leading-tight text-ink group-hover:text-rose-dark">
            {product.name}
          </h3>
        </div>
        <p className="shrink-0 text-sm text-ink">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
