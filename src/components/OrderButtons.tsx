"use client";

import { useState } from "react";
import { formatPrice, links, site } from "@/config/site";
import type { Product } from "@/data/products";
import { CopyIcon, InstagramIcon, TelegramIcon, ViberIcon } from "./icons";

/** Запасное копирование через скрытый textarea — работает в iOS Safari и без HTTPS. */
function legacyCopy(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", ""); // не открывать клавиатуру на iOS
  // font-size 16px — чтобы iOS не зумил страницу при фокусе
  ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px;";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  ta.setSelectionRange(0, text.length); // iOS игнорирует select()
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

export function OrderButtons({ product }: { product: Product }) {
  const [copied, setCopied] = useState(false);
  const message = `Здравствуйте! Хочу заказать «${product.name}» (${formatPrice(product.price)}).`;
  const viber = links.viber(message);
  const telegram = links.telegram(message);

  async function copy() {
    let ok = false;
    // Clipboard API доступен только в secure context (HTTPS / localhost).
    if (window.isSecureContext && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(message);
        ok = true;
      } catch {
        /* упадём в запасной вариант ниже */
      }
    }
    if (!ok) ok = legacyCopy(message);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const btn =
    "flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm transition-colors";

  return (
    <div className="space-y-3">
      <a
        href={links.instagramDm}
        target="_blank"
        rel="noopener noreferrer"
        onClick={copy}
        className={`${btn} bg-ink text-pearl hover:bg-rose-dark`}
      >
        <InstagramIcon className="h-4 w-4" />
        Заказать в Instagram
      </a>

      {telegram && (
        <a
          href={telegram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={copy}
          className={`${btn} border border-ink/20 text-ink hover:border-rose hover:text-rose-dark`}
        >
          <TelegramIcon className="h-4 w-4" />
          Написать в Telegram
        </a>
      )}

      {viber && (
        <a href={viber} className={`${btn} border border-ink/20 text-ink hover:border-rose hover:text-rose-dark`}>
          <ViberIcon className="h-4 w-4" />
          Написать в Viber
        </a>
      )}

      <button
        type="button"
        onClick={copy}
        className="flex w-full items-center justify-center gap-2 py-2 text-xs text-muted hover:text-rose-dark"
      >
        <CopyIcon className="h-3.5 w-3.5" />
        {copied ? "Текст скопирован — вставьте его в сообщение" : "Скопировать текст заказа"}
      </button>

      <p className="text-center text-xs leading-relaxed text-muted">
        Текст заказа копируется автоматически — просто вставьте его в чат. Ответим, уточним детали и
        договоримся о доставке ({site.city}).
      </p>
    </div>
  );
}
