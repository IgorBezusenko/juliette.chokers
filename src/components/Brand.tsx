import type { ReactNode } from "react";

/** Логотип из Figma (силуэт | J + JULIETTE.CHOKERS). Пропорции 118.75 × 59.67. */
export function Logo({ width = 120, className = "" }: { width?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo.svg"
      alt="Juliette chokers"
      width={width}
      height={Math.round((width * 59.67) / 118.75)}
      className={`block ${className}`}
    />
  );
}

/** Карточка-сертификат: светлый лист на фоне страницы, по желанию — отверстие под ленту. */
export function Card({
  children,
  hole = false,
  className = "",
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  hole?: boolean;
  className?: string;
  as?: "div" | "section";
  id?: string;
}) {
  return (
    <Tag id={id} className={`border border-line bg-cream ${className}`}>
      {hole && (
        <span
          className="mx-auto block h-4 w-4 rounded-full border border-[#d6cdc3] bg-paper"
          aria-hidden="true"
        />
      )}
      {children}
    </Tag>
  );
}

/** Жемчужина как на сертификате. */
function Pearl({ size }: { size: number }) {
  return (
    <span
      className="inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle at 35% 30%, #ffffff, #e4dbd4 55%, #b8aba4)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
      }}
    />
  );
}

/** Ряд жемчужин: 1, 3 или 5 — по центру самая крупная. */
export function Pearls({ count = 3, size = 11, className = "" }: { count?: 1 | 3 | 5; size?: number; className?: string }) {
  const scale = count === 5 ? [0.5, 0.71, 1, 0.71, 0.5] : count === 3 ? [0.64, 1, 0.64] : [1];
  return (
    <span className={`flex items-center justify-center gap-[0.35em] ${className}`} aria-hidden="true">
      {scale.map((k, i) => (
        <Pearl key={i} size={Math.round(size * k)} />
      ))}
    </span>
  );
}

/**
 * Заголовок как «подарочный СЕРТИФИКАТ»: рукописное слово золотом,
 * заходящее на заголовок прописными.
 */
export function SectionTitle({
  script,
  children,
  as: Tag = "h2",
  align = "center",
  size = "md",
}: {
  script?: string;
  children: ReactNode;
  as?: "h1" | "h2";
  align?: "center" | "left";
  size?: "md" | "lg";
}) {
  const titleSize = size === "lg" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl";
  const scriptSize = size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl";
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {/* inline-block: рукописное слово привязано к началу заголовка, как «подарочный» на сертификате */}
      <div className="inline-block text-left">
        {script && (
          <p className={`font-script text-gold ${scriptSize} -mb-2 -ml-[0.4em] leading-none sm:-mb-3`}>{script}</p>
        )}
        <Tag className={`font-serif font-light uppercase leading-tight tracking-[0.08em] ${titleSize}`}>{children}</Tag>
      </div>
    </div>
  );
}

/** Цена: цифры Italiana золотом, валюта — рукописно, как «1000 рублей». */
const priceSizes = {
  md: ["text-2xl", "text-base"],
  card: ["text-[34px]", "text-[15px]"],
  lg: ["text-6xl", "text-2xl"],
  xl: ["text-7xl sm:text-8xl", "text-2xl sm:text-3xl"],
} as const;

export function Price({
  value,
  currency,
  size = "md",
  prefix,
}: {
  value: string;
  currency: string;
  size?: keyof typeof priceSizes;
  prefix?: string;
}) {
  const [num, cur] = priceSizes[size];
  return (
    <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap">
      {prefix && <span className="text-xs text-muted">{prefix}</span>}
      <span className={`font-display text-gold leading-[1.1] ${num}`}>{value}</span>
      <span className={`font-script text-gold leading-none ${cur}`}>{currency}</span>
    </span>
  );
}
