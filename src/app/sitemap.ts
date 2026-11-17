import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/catalog`, priority: 0.9 },
    ...products.map((p) => ({ url: `${site.url}/catalog/${p.slug}`, priority: 0.7 })),
  ];
}
