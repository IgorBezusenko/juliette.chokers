# Juliette chokers — сайт-витрина

Next.js 15 (App Router) + Tailwind CSS v4. Каталог украшений с заказом через Instagram / Telegram / Viber — без бэкенда и базы данных.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # проверка продакшен-сборки
```

## Что заполнить перед запуском

1. **`src/config/site.ts`** — Telegram-ник, номер Viber, валюта, будущий домен.
   Пустой Telegram/Viber просто скрывает соответствующую кнопку.
2. **Фото товаров** — положите в `public/products/<slug>.jpg` (лучше вертикальные 4:5, ~1200×1500)
   и в `src/data/products.ts` добавьте товару `image: "/products/<slug>.jpg"`.
   Пока фото нет, показывается нарисованное превью в цветах украшения.
3. **Описания** — в `src/data/products.ts` черновики; названия и цены взяты из таблицы продаж.
4. **Блок «О нас»** — `src/app/page.tsx`, помечен `TODO`.

## Как добавить товар

Скопируйте любой объект в `products.ts`, поменяйте `slug` (латиница, через дефис), название, цену, категорию.
`bestseller: true` — попадает на главную в «Хиты продаж».

## Структура

```
src/
  app/
    page.tsx                 главная: hero, хиты, категории, «как заказать», «о нас»
    catalog/page.tsx         каталог с фильтром (?c=chokers)
    catalog/[slug]/page.tsx  страница товара + кнопки заказа (статически генерируется)
    sitemap.ts, robots.ts    SEO
  components/                Header, Footer, ProductCard, ProductImage, OrderButtons, CatalogGrid
  config/site.ts             контакты и настройки бренда
  data/products.ts           каталог
```

## Деплой

Проще всего — Vercel: залить репозиторий на GitHub → Import на vercel.com → Deploy. Бесплатно, свой домен подключается в настройках.
