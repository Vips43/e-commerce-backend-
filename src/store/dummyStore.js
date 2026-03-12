import { create } from "zustand";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDummyStore = create((set, get) => ({
  categories: [],
  catsByName: [],
  productById: [],
  cartProducts: [],
  loading: false,

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
    if (!cart) return;
    const items = Array.isArray(cart) ? cart : [cart];
    const currentCache = get().productById || [];

    const missingIds = items
      .map((c) => c?.product || c?.productId)
      .filter((id) => !currentCache.some((p) => p.id === id));

    try {
      if (missingIds.length > 0) set({ loading: true });

      const fetched = await Promise.all(
        missingIds.map((id) =>
          fetch(`https://dummyjson.com/products/${id}`).then((r) => r.json()),
        ),
      );

      const combinedPool = [...currentCache, ...fetched];

      const newData = items
        .map((c) => {
          const id = c?.product || c?.productId;
          if (!id) return null;
          const product = combinedPool.find((p) => p.id === id);
          return product ? { ...product, quantity: c?.quantity || null } : null;
        })
        .filter(Boolean);

      set({ productById: newData, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));
