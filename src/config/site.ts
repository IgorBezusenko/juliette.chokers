// Всё, что Юля может захотеть поменять без программиста, лежит здесь.
export const site = {
  name: "Juliette",
  tagline: "chokers",
  title: "Juliette chokers — украшения ручной работы",
  description:
    "Чокеры, браслеты и серьги ручной работы из жемчуга, гематита и стеклянных бусин. Каждое украшение собирается вручную.",
  url: "https://juliette-chokers.vercel.app", // TODO: заменить на свой домен
  city: "Тирасполь",
  currency: "руб.", // TODO: «лей», «руб.» — как вам удобнее
  contacts: {
    instagram: "juliette.chokers",
    telegram: "", // TODO: ник без @, например "juliette_chokers"
    viber: "", // TODO: номер в формате 37377712345
  },
} as const;

export const links = {
  instagram: `https://instagram.com/${site.contacts.instagram}`,
  instagramDm: `https://ig.me/m/${site.contacts.instagram}`,
  // Telegram подставляет ?text= в поле ввода — остаётся нажать «Отправить».
  telegram: (text?: string) =>
    site.contacts.telegram
      ? `https://t.me/${site.contacts.telegram}${text ? `?text=${encodeURIComponent(text)}` : ""}`
      : "",
  viber: (text?: string) =>
    site.contacts.viber
      ? `viber://chat?number=%2B${site.contacts.viber}${text ? `&draft=${encodeURIComponent(text)}` : ""}`
      : "",
};

export function formatPrice(value: number) {
  return `${value.toLocaleString("ru-RU")} ${site.currency}`;
}
