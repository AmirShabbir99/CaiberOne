import { useEffect } from "react";

const SITE = "https://caiberone.com", NAME = "CaiberOne";
const DEFAULT = `${NAME} | Cybersecurity Operations & Advisory`;

function upsert(selector, make) {
  let el = document.head.querySelector(selector);
  if (!el) { el = make(); document.head.appendChild(el); }
  return el;
}
const setMeta = (attr, key, content) => {
  upsert(`meta[${attr}="${key}"]`, () => { const m = document.createElement("meta"); m.setAttribute(attr, key); return m; }).setAttribute("content", content);
};

/** Per-route <title>, description, canonical, Open Graph, Twitter card and optional JSON-LD. */
export default function Seo({ title, description, path = "/", image = "/og-image.jpg", jsonLd }) {
  useEffect(() => {
    const full = title ? `${title} | ${NAME}` : DEFAULT;
    const url = `${SITE}${path === "/" ? "/" : path}`, img = image.startsWith("http") ? image : `${SITE}${image}`;
    document.title = full;
    setMeta("name", "description", description);
    setMeta("property", "og:title", full); setMeta("property", "og:description", description);
    setMeta("property", "og:url", url); setMeta("property", "og:image", img);
    setMeta("name", "twitter:title", full); setMeta("name", "twitter:description", description); setMeta("name", "twitter:image", img);
    upsert('link[rel="canonical"]', () => { const l = document.createElement("link"); l.rel = "canonical"; return l; }).href = url;
    let ld;
    if (jsonLd) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.dataset.seo = "page"; ld.text = JSON.stringify(jsonLd); document.head.appendChild(ld); }
    return () => ld?.remove();
  }, [title, description, path, image, jsonLd]);
  return null;
}
