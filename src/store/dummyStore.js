import { create } from "zustand";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDummyStore = create((set, get) => ({
  categories: [],
  catsByName: [],
  cartProducts: [],
  productById: [],
  loading: false,

  setCategories: async () => {
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
  fetchProductById: async (ids) => {
    try {
      if (Array.isArray(ids)) {
        const promises = ids.map((id) =>
          fetch(`https://dummyjson.com/products/${id}`),
        );
        const res = await Promise.all(promises);
        const data = await Promise.all(res.map((r) => r.json()));
        
        set({ productById: data, loading: false });
      } else {
        const res = await fetch(`https://dummyjson.com/products/${ids}`);
        const data = await res.json();
        
        set({ productById: data, loading: false });
      }
    } catch (error) {}
  },
}));
