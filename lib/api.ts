import type { Category, Product } from "./types";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get<T>(path: string): Promise<T> {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`);
      if (res.status === 404) throw new NotFoundError();
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as T;
    } catch (e) {
      if (e instanceof NotFoundError) throw e;
      lastErr = e;
    }
  }
  throw lastErr ?? new Error("API unavailable");
}
export class NotFoundError extends Error {}

const cache = new Map<string, Promise<unknown>>();
function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (!cache.has(key)) {
    const p = fn().catch((e) => { cache.delete(key); throw e; });
    cache.set(key, p);
  }
  return cache.get(key) as Promise<T>;
}

const arr = <T,>(x: unknown): T[] => (Array.isArray(x) ? x : ((x as { data?: T[] })?.data ?? []));

export const getProducts = () => cached("products", async () => arr<Product>(await get("/products")));
export const getCategories = () => cached("categories", async () => arr<Category>(await get("/categories")));
export const getProductsByCategory = (slug: string) =>
  cached(`cat:${slug}`, async () => arr<Product>(await get(`/products?category=${encodeURIComponent(slug)}`)));
export const getCategory = (slug: string) => cached(`c:${slug}`, async () => get<Category>(`/categories/${encodeURIComponent(slug)}`));

/** Product detail by slug (or id). Resolves id from list, then loads the single item (includes markets). */
export const getProduct = (slugOrId: string) =>
  cached(`p:${slugOrId}`, async () => {
    try {
      const list = await get<unknown>(`/products?slug=${encodeURIComponent(slugOrId)}`);
      const hit = arr<Product>(list)[0];
      if (hit) {
        if (hit.markets) return hit;
        return await get<Product>(`/products/${hit.id}`);
      }
    } catch (e) {
      if (!(e instanceof NotFoundError)) throw e;
    }
    return await get<Product>(`/products/${encodeURIComponent(slugOrId)}`);
  });
