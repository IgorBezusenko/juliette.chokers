import Image from "next/image";
import type { ReactNode } from "react";
import type { Pendant, Product } from "@/data/products";

type Props = {
  product: Product;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function ProductImage({ product, priority, sizes, className = "" }: Props) {
  return (
    <div className={`relative aspect-[4/5] overflow-hidden bg-blush ${className}`}>
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
      ) : (
        <Illustration product={product} />
      )}
    </div>
  );
}

/* ---------- нарисованное превью, пока нет фото ---------- */

type Pt = { x: number; y: number };

/** точки по дуге эллипса: от чуть выше левого края, через низ, до чуть выше правого */
function arc(cx: number, cy: number, rx: number, ry: number, count: number, from = -0.1, to = 1.1): Pt[] {
  return Array.from({ length: count }, (_, i) => {
    const a = Math.PI * (from + ((to - from) * i) / (count - 1));
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });
}

function ring(cx: number, cy: number, rx: number, ry: number, count: number): Pt[] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry };
  });
}

function Bead({ x, y, r, color }: { x: number; y: number; r: number; color: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} stroke="rgba(58,46,44,0.12)" strokeWidth={0.8} />
      <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.32} fill="#fff" opacity={0.75} />
    </g>
  );
}

function Scaled({ x, y, k, children }: { x: number; y: number; k: number; children: ReactNode }) {
  return <g transform={`translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})`}>{children}</g>;
}

function PendantShape({ type, x, y, color }: { type: Pendant; x: number; y: number; color: string }) {
  const stroke = "rgba(58,46,44,0.25)";
  switch (type) {
    case "heart":
      return (
        <path
          transform={`translate(${x - 16} ${y})`}
          d="M16 30 C4 20 0 13 0 8 C0 3 4 0 8 0 C12 0 15 3 16 6 C17 3 20 0 24 0 C28 0 32 3 32 8 C32 13 28 20 16 30 Z"
          fill={color}
          stroke={stroke}
        />
      );
    case "sun":
      return (
        <g transform={`translate(${x} ${y + 16})`} stroke={color} strokeWidth={2.5} strokeLinecap="round">
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return <line key={i} x1={Math.cos(a) * 11} y1={Math.sin(a) * 11} x2={Math.cos(a) * 17} y2={Math.sin(a) * 17} />;
          })}
          <circle r={8} fill={color} stroke={stroke} strokeWidth={1} />
        </g>
      );
    case "flower":
      return (
        <g transform={`translate(${x} ${y + 4})`}>
          <path d="M0 0 L0 30" stroke="#8fa58a" strokeWidth={2} />
          <path d="M0 26 C-10 22 -12 16 -12 16 C-6 16 -2 20 0 24" fill="#a9bea3" />
          <path d="M-11 2 C-11 14 -6 19 0 19 C6 19 11 14 11 2 C7 6 4 6 0 0 C-4 6 -7 6 -11 2 Z" fill={color} stroke={stroke} />
        </g>
      );
    case "bird":
      return (
        <path
          transform={`translate(${x - 16} ${y + 4})`}
          d="M2 14 C6 4 16 2 22 6 L30 4 L26 10 C27 18 20 24 12 24 C6 24 2 20 2 14 Z"
          fill={color}
          stroke={stroke}
        />
      );
    case "berry":
      return (
        <g transform={`translate(${x} ${y + 14})`}>
          <path d="M-6 -12 L0 -6 L6 -12" stroke="#8fa58a" strokeWidth={2} fill="none" />
          {[
            [0, 0], [-6, 2], [6, 2], [-3, 8], [3, 8], [0, 14], [-6, -4], [6, -4], [0, -5],
          ].map(([dx, dy], i) => (
            <circle key={i} cx={dx} cy={dy} r={4.2} fill="#d9536a" stroke={stroke} strokeWidth={0.6} />
          ))}
        </g>
      );
    default:
      return null;
  }
}

function Illustration({ product }: { product: Product }) {
  const { palette, pendant, category, slug } = product;
  const color = (i: number) => palette[i % palette.length];
  const pendantColor = palette.length > 1 ? palette[1] : palette[0];
  const gid = `bg-${slug}`;

  let content: ReactNode = null;

  if (category === "chokers" || category === "necklaces") {
    const strands =
      category === "chokers"
        ? [{ cy: 165, rx: 125, ry: 120, n: 24, r: 10 }]
        : [
            { cy: 150, rx: 125, ry: 115, n: 24, r: 9.5 },
            { cy: 150, rx: 140, ry: 165, n: 30, r: 8.5 },
          ];
    const top = strands[0];
    content = (
      <>
        {strands.map((s, si) =>
          arc(200, s.cy, s.rx, s.ry, s.n).map((b, i) => <Bead key={`${si}-${i}`} x={b.x} y={b.y} r={s.r} color={color(i + si)} />),
        )}
        <Scaled x={200} y={top.cy + top.ry + top.r} k={1.4}>
          <PendantShape type={pendant} x={200} y={top.cy + top.ry + top.r} color={pendantColor} />
        </Scaled>
      </>
    );
  } else if (category === "sets") {
    content = (
      <>
        {arc(200, 110, 105, 100, 20).map((b, i) => (
          <Bead key={`c${i}`} x={b.x} y={b.y} r={9} color={color(i)} />
        ))}
        <Scaled x={200} y={219} k={1.3}>
          <PendantShape type={pendant} x={200} y={219} color={pendantColor} />
        </Scaled>
        {ring(200, 385, 80, 30, 20).map((b, i) => (
          <Bead key={`b${i}`} x={b.x} y={b.y} r={8.5} color={color(i)} />
        ))}
      </>
    );
  } else if (category === "bracelets") {
    content = (
      <>
        {ring(200, 235, 110, 55, 24).map((b, i) => (
          <Bead key={i} x={b.x} y={b.y} r={11} color={color(i)} />
        ))}
        <Scaled x={200} y={292} k={1.4}>
          <PendantShape type={pendant} x={200} y={292} color={pendantColor} />
        </Scaled>
      </>
    );
  } else {
    content = (
      <>
        {[140, 260].map((x) => (
          <g key={x} transform={`translate(${x} 200) scale(2.2) translate(${-x} -150)`}>
            <path d={`M${x} 150 C${x - 12} 150 ${x - 12} 170 ${x} 172`} stroke="#b9a99f" strokeWidth={1.5} fill="none" />
            <PendantShape type={pendant === "none" ? "sun" : pendant} x={x} y={176} color={palette[0]} />
          </g>
        ))}
      </>
    );
  }

  return (
    <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" role="img" aria-label={product.name}>
      <defs>
        <radialGradient id={gid} cx="50%" cy="40%" r="75%">
          <stop offset="0%" stopColor="#fffaf6" />
          <stop offset="100%" stopColor="#f1dfd7" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${gid})`} />
      <ellipse cx="200" cy="445" rx="130" ry="10" fill="rgba(58,46,44,0.05)" />
      {content}
    </svg>
  );
}
