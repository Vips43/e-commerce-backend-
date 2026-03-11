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
      console.log("error in fetching categories:", error);
      set({ error: error, loading: false });
    }
  },
  getCatsByName: async (id) => {
    if (get().catsByName[id]) return;
    set({ loading: true });
    try {
      console.log(id);
      const res = await fetch(`${backendUrl}/product/categories/${id}`);
      const data = await res.json();

      set({ catsByName: data, loading: false });
    } catch (error) {
      console.log("error in fetching categories:", error);
      set({ error: error, loading: false });
    }
  },
  fetchProductById: async (cart) => {
    const ids = Array.isArray(cart) ? cart.map((c) => c.product) : [cart];
    const currentCache = get().productById;

    const missingIds = ids.filter((id) => !currentCache[id]);

    if (missingIds.length === 0) return;

    try {
      set({ loading: true });
      const promises = ids.map((id) =>
        fetch(`https://dummyjson.com/products/${id}`).then((r) => r.json()),
      );
      const data = await Promise.all(promises);

      const newData = data.map((d, i) => ({
        ...d,
        quantity: cart[i].quantity,
      }));

      set({ productById: newData, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ loading: false });
    }
  },
}));
