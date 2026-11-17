// Каталог. Названия и цены взяты из таблицы продаж, описания — черновики: Юля, поправь под себя.
// Фото: положите файл в public/products/<slug>.jpg и укажите image: "/products/<slug>.jpg".
// Пока фото нет — показывается нарисованное превью в цветах украшения.

export type Category = "chokers" | "necklaces" | "bracelets" | "earrings" | "sets";

export type Pendant = "heart" | "sun" | "flower" | "bird" | "berry" | "none";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  materials: string[];
  /** цвета бусин для превью, пока нет фото */
  palette: string[];
  pendant: Pendant;
  image?: string;
  bestseller?: boolean;
  inStock?: boolean;
};

export const categories: { id: Category; label: string; plural: string }[] = [
  { id: "chokers", label: "Чокер", plural: "Чокеры" },
  { id: "necklaces", label: "Колье", plural: "Колье" },
  { id: "bracelets", label: "Браслет", plural: "Браслеты" },
  { id: "earrings", label: "Серьги", plural: "Серьги" },
  { id: "sets", label: "Набор", plural: "Наборы" },
];

const pearl = "#F4EDE4";
const hematiteSilver = "#9EA3A8";
const hematiteGold = "#C9A86A";
const champagne = "#E8D3B5";
const smoky = "#A89A94";
const blue = "#A9C4DA";
const pink = "#E9B9BE";
const red = "#C9686E";
const glass = "#E7EEF0";

export const products: Product[] = [
  {
    slug: "gematit-serebro",
    name: "Гематит серебро",
    category: "chokers",
    price: 220,
    description: "Лаконичный чокер из серебристого гематита — спокойный блеск на каждый день.",
    materials: ["гематит", "фурнитура серебристого цвета"],
    palette: [hematiteSilver, "#B7BBBF"],
    pendant: "none",
    bestseller: true,
  },
  {
    slug: "gematit-zoloto",
    name: "Гематит золото",
    category: "chokers",
    price: 220,
    description: "Тёплый золотистый гематит. Подходит и к белой футболке, и к вечернему платью.",
    materials: ["гематит", "фурнитура золотистого цвета"],
    palette: [hematiteGold, "#D9BE87"],
    pendant: "none",
    bestseller: true,
  },
  {
    slug: "sharlotta",
    name: "Шарлотта",
    category: "chokers",
    price: 300,
    description: "Нежный чокер с жемчугом — одна из самых любимых моделей.",
    materials: ["жемчуг", "стеклянные бусины"],
    palette: [pearl, champagne],
    pendant: "heart",
    bestseller: true,
  },
  {
    slug: "arabella",
    name: "Арабелла",
    category: "chokers",
    price: 280,
    description: "Чокер с переливающимися бусинами и подвеской.",
    materials: ["стеклянные бусины", "подвеска"],
    palette: [glass, pink, pearl],
    pendant: "flower",
    bestseller: true,
  },
  {
    slug: "elizabetta",
    name: "Элизабетта",
    category: "chokers",
    price: 330,
    description: "Самая нарядная модель коллекции — для особых случаев.",
    materials: ["жемчуг", "стеклянные бусины", "подвеска"],
    palette: [pearl, champagne, pearl],
    pendant: "heart",
    bestseller: true,
  },
  {
    slug: "tyulpan-goluboy",
    name: "Тюльпан голубой",
    category: "chokers",
    price: 240,
    description: "Чокер с цветком-тюльпаном в нежно-голубых тонах.",
    materials: ["стеклянные бусины", "подвеска-тюльпан"],
    palette: [blue, pearl],
    pendant: "flower",
    bestseller: true,
  },
  {
    slug: "tyulpan-rozovyy",
    name: "Тюльпан розовый",
    category: "chokers",
    price: 240,
    description: "Тот же тюльпан — в пудрово-розовом.",
    materials: ["стеклянные бусины", "подвеска-тюльпан"],
    palette: [pink, pearl],
    pendant: "flower",
  },
  {
    slug: "tyulpan-krasnyy",
    name: "Тюльпан красный",
    category: "chokers",
    price: 240,
    description: "Яркий акцент: красный тюльпан на светлых бусинах.",
    materials: ["стеклянные бусины", "подвеска-тюльпан"],
    palette: [red, pearl],
    pendant: "flower",
  },
  {
    slug: "shampanskiy",
    name: "Шампанский",
    category: "chokers",
    price: 250,
    description: "Бусины цвета шампанского с сердцем — мягко и празднично.",
    materials: ["стеклянные бусины", "подвеска-сердце"],
    palette: [champagne, "#F1E2CC"],
    pendant: "heart",
  },
  {
    slug: "ptichka",
    name: "Птичка",
    category: "chokers",
    price: 290,
    description: "Чокер с маленькой подвеской-птичкой.",
    materials: ["стеклянные бусины", "подвеска-птичка"],
    palette: [pearl, smoky],
    pendant: "bird",
  },
  {
    slug: "metallicheskiy-serdce",
    name: "Металлический с сердцем",
    category: "chokers",
    price: 225,
    description: "Бусины 6 мм с металлическим отливом и металлическое сердце.",
    materials: ["бусины 6 мм", "подвеска-сердце"],
    palette: [hematiteSilver, "#C4C7CA"],
    pendant: "heart",
  },
  {
    slug: "malinka-zhemchug",
    name: "Чокер с малинкой",
    category: "chokers",
    price: 420,
    description: "Жемчуг и ягодка-малинка — игриво и нежно.",
    materials: ["жемчуг", "подвеска-малинка"],
    palette: [pearl, pearl, pink],
    pendant: "berry",
  },
  {
    slug: "vitoe-kolie",
    name: "Витое колье",
    category: "necklaces",
    price: 350,
    description: "Объёмное колье из нескольких переплетённых нитей.",
    materials: ["жемчуг", "стеклянные бусины"],
    palette: [pearl, champagne, glass],
    pendant: "none",
  },
  {
    slug: "braslet-malinka",
    name: "Браслет с малинкой",
    category: "bracelets",
    price: 160,
    description: "Пара к чокеру с малинкой или самостоятельный акцент.",
    materials: ["жемчуг", "подвеска-малинка"],
    palette: [pearl, pink],
    pendant: "berry",
  },
  {
    slug: "braslet-zhemchug",
    name: "Жемчужный браслет",
    category: "bracelets",
    price: 200,
    description: "Классика, которая подходит ко всему.",
    materials: ["жемчуг"],
    palette: [pearl, "#EFE6DA"],
    pendant: "none",
  },
  {
    slug: "braslet-snezhinka",
    name: "Браслет «Снежинка»",
    category: "bracelets",
    price: 170,
    description: "Жемчуг и маленькая снежинка — зимнее настроение.",
    materials: ["жемчуг", "подвеска-снежинка"],
    palette: [pearl, glass],
    pendant: "sun",
  },
  {
    slug: "sergi-solnce-serebro",
    name: "Серьги «Солнце» серебро",
    category: "earrings",
    price: 150,
    description: "Лёгкие серьги-солнышки серебристого цвета.",
    materials: ["фурнитура серебристого цвета"],
    palette: [hematiteSilver],
    pendant: "sun",
  },
  {
    slug: "sergi-solnyshko-zoloto",
    name: "Серьги «Солнышко» золото",
    category: "earrings",
    price: 160,
    description: "Те же солнышки — в тёплом золотистом цвете.",
    materials: ["фурнитура золотистого цвета"],
    palette: [hematiteGold],
    pendant: "sun",
  },
  {
    slug: "nabor-dzhuletta",
    name: "Набор «Джульетта»",
    category: "sets",
    price: 480,
    description: "Фирменный набор: чокер и браслет в одном стиле. Отличный подарок.",
    materials: ["жемчуг", "стеклянные бусины"],
    palette: [pearl, pink, champagne],
    pendant: "heart",
  },
  {
    slug: "goluboy-nabor",
    name: "Голубой набор",
    category: "sets",
    price: 340,
    description: "Чокер и браслет в нежно-голубой гамме.",
    materials: ["стеклянные бусины"],
    palette: [blue, glass],
    pendant: "none",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function categoryLabel(id: Category) {
  return categories.find((c) => c.id === id)?.label ?? "";
}
