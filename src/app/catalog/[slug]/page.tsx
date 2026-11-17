import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderButtons } from "@/components/OrderButtons";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Card, Pearls, Price, SectionTitle } from "@/components/Brand";
import { priceParts } from "@/config/site";
import { categories, getProduct, products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = categories.find((c) => c.id === product.category);
  const price = priceParts(product.price);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-8">
        <nav className="mb-4 text-xs text-muted" aria-label="Навигация">
          <Link href="/catalog" className="hover:text-gold">Каталог</Link>
          <span className="mx-2">/</span>
          <Link href={`/catalog?c=${product.category}`} className="hover:text-gold">{category?.plural}</Link>
        </nav>

        <Card className="grid gap-6 p-3 sm:p-4 md:grid-cols-2 md:gap-10">
          <div className="relative">
            <ProductImage product={product} priority sizes="(min-width: 768px) 50vw, 100vw" />
            {product.bestseller && (
              <span className="absolute left-3 top-2 font-script text-2xl text-gold">хит продаж</span>
            )}
          </div>

          <div className="flex flex-col items-center px-3 pb-6 text-center md:justify-center md:px-6 md:py-8">
            <SectionTitle as="h1" script={category?.label.toLowerCase()}>
              {product.name}
            </SectionTitle>
            <Pearls count={5} size={12} className="mt-4" />
            <div className="mt-2">
              <Price value={price.value} currency={price.currency} size="xl" />
            </div>

            <p className="mt-5 max-w-sm text-[13px] leading-relaxed">{product.description}</p>
            <div className="mt-5 h-px w-9 bg-line" aria-hidden="true" />
            <p className="mt-4 text-xs leading-relaxed text-muted">
              {product.materials.join(", ")}
              <br />
              ручная работа
            </p>

            <div className="mt-7 w-full max-w-sm text-left">
              <OrderButtons product={product} />
            </div>
          </div>
        </Card>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <SectionTitle script="ещё">Может понравиться</SectionTitle>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
