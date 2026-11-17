import Link from "next/link";
import { Pearls } from "@/components/Brand";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-display text-gold text-8xl leading-none">404</p>
      <Pearls count={3} className="mt-6" />
      <h1 className="mt-6 font-serif text-3xl font-light uppercase tracking-[0.08em]">Такой страницы нет</h1>
      <p className="mt-3 text-sm text-muted">Возможно, украшение уже продано или ссылка изменилась.</p>
      <Link
        href="/catalog"
        className="mt-8 inline-flex min-h-11 items-center bg-ink px-8 py-3.5 text-sm text-cream transition-colors hover:bg-gold"
      >
        В каталог
      </Link>
    </section>
  );
}
