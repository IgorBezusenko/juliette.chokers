import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-serif text-7xl italic text-rose">404</p>
      <h1 className="mt-4 font-serif text-3xl">Такой страницы нет</h1>
      <p className="mt-3 text-sm text-muted">Возможно, украшение уже продано или ссылка изменилась.</p>
      <Link href="/catalog" className="mt-8 inline-block rounded-full bg-ink px-8 py-3.5 text-sm text-pearl hover:bg-rose-dark">
        В каталог
      </Link>
    </section>
  );
}
