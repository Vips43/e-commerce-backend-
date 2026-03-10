import { create } from "zustand";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useWishStore = create((set) => ({
  wishlist: [],

  getWishlist: async (id) => {
    if (!id) return;
    try {
      const res = await fetch(`${backendUrl}/user/wishlist/${id}`);
      const data = await res.json();
      set({ wishlist: Array.isArray(data) ? data : (data.wishlist || []) });
    } catch (error) {
      console.log("error in get wishlist", error);
    }
  },

  setAddWishlist: async (userId, productId) => {
    try {
      const res = await fetch(`${backendUrl}/user/add-to-wishlist`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("added to the wishlist", productId);
        set({ wishlist: data.wishlist });
      }
    } catch (error) {
      console.log("error adding to wishlist", error);
    }
  },

  removeWishlist: async (userId, productId) => {
    try {
      const res = await fetch(`${backendUrl}/user/wishlist/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("removed from the wishlist", productId);
        set({ wishlist: data.wishlist });
      }
    } catch (error) {
      console.log("error removing from wishlist", error);
    }
  },
}));
