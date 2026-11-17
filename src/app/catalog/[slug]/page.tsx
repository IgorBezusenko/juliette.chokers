import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderButtons } from "@/components/OrderButtons";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { formatPrice } from "@/config/site";
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
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
        <nav className="mb-8 text-xs text-muted" aria-label="Навигация">
          <Link href="/catalog" className="hover:text-rose-dark">Каталог</Link>
          <span className="mx-2">/</span>
          <Link href={`/catalog?c=${product.category}`} className="hover:text-rose-dark">{category?.plural}</Link>
        </nav>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <ProductImage product={product} priority className="rounded-[2rem]" sizes="(min-width: 768px) 50vw, 100vw" />

          <div className="md:py-6">
            <p className="text-xs uppercase tracking-[0.3em] text-rose">{category?.label}</p>
            <h1 className="mt-3 font-serif text-5xl leading-tight">{product.name}</h1>
            <p className="mt-4 text-2xl">{formatPrice(product.price)}</p>

            <p className="mt-8 leading-relaxed text-ink/85">{product.description}</p>

            <dl className="mt-8 space-y-3 border-y border-line py-6 text-sm">
              <div className="flex gap-4">
                <dt className="w-28 shrink-0 text-muted">Материалы</dt>
                <dd>{product.materials.join(", ")}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-28 shrink-0 text-muted">Изготовление</dt>
                <dd>ручная работа</dd>
              </div>
            </dl>

            <div className="mt-8">
              <OrderButtons product={product} />
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <h2 className="mb-8 font-serif text-3xl sm:text-4xl">Может понравиться</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
