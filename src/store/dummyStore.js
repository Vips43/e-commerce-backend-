import { random } from "lodash";
import { create } from "zustand";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDummyStore = create((set, get) => ({
  categories: [],
  catsByName: [],
  productById: [],
  cartProducts: [],
  search: [],
  productCache: {},
  random: [],
  refresh: false,
  skip: 0,

  loading: false,
  err: null,

  setCategories: async () => {
    if (get().categories.length > 0) return;
    try {
      set({ loading: true });
      const res = await fetch(`${backendUrl}/product/categories`);
      const data = await res.json();

      set({ categories: data?.data, loading: true });
    } catch (error) {
      console.error("error in fetching categories:", error);
      set({ error: error, loading: false });
    }
  },
  getCatsByName: async (id) => {
    if (!id || get().catsByName[id]) return;

    set({ loading: true });
    try {
      const res = await fetch(`${backendUrl}/product/categories/${id}`);
      const data = await res.json();

      set({ catsByName: data, loading: false });
    } catch (error) {
      console.error("error in fetching categories:", error);
      set({ error: error, loading: false });
    }
  },

  fetchProductById: async (cart) => {
    if (!cart || cart.length === 0) {
      set({ productById: [] });
      return;
    }

    const items = Array.isArray(cart) ? cart : [cart];
    const cache = get().productCache;

    const missingIds = [
      ...new Set(
        items
          .map((c) => c?.product || c?.productId)
          .filter((id) => id != null && !cache[id]),
      ),
    ];

    try {
      if (missingIds.length > 0) set({ loading: true });

      const fetchedProducts = await Promise.all(
        missingIds.map((id) =>
          fetch(`https://dummyjson.com/products/${id}`).then((r) => r.json()),
        ),
      );

      const updatedCache = { ...cache };
      fetchedProducts.forEach((p) => {
        if (p?.id) updatedCache[p.id] = p;
      });

      const newData = items
        .map((c) => {
          const id = c?.product || c?.productId;
          const product = updatedCache[id];
          return product ? { ...product, quantity: c?.quantity || null } : null;
        })
        .filter(Boolean);

      set({
        productCache: updatedCache,
        productById: newData,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  fetchSearch: async (query) => {
    if (!query) return;
    try {
      set({ loading: true });
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${query}`,
      );
      const data = await res.json();

      set({ search: data.products, loading: false });
    } catch (error) {
      console.error("Error in fetching search results", error);
      set({ err: error, loading: false });
    }
  },

  fetchRandom: async () => {
    const { refresh, skip } = get();
    const cacheKey = "random_product";
    const local = JSON.parse(localStorage.getItem(cacheKey));

    if (!refresh && local) {
      set({ random: local, loading: false });
      return;
    }

    try {
      set({ loading: true });
      const currentSkip = refresh ? skip + 25 : skip;
      const res = await fetch(
        `https://dummyjson.com/products?sortBy=title&order=asc&skip=${currentSkip}&limit=10&select=title,price,thumbnail`,
      );
      const data = await res.json();
      localStorage.setItem(cacheKey, JSON.stringify(data.products));

      console.log("live served", data.products);
      set({
        random: data.products,
        loading: false,
        refresh: false,
        skip: currentSkip,
      });
    } catch (error) {
      console.error("Error fetching random", error);
      set({ loading: false, refresh: false });
    }
  },
  setRefresh: () => {
    set({ refresh: true });
    get().fetchRandom();
  },
}));
