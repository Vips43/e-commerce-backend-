import { create } from "zustand";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCartStore = create((set, get) => ({
  userCart: [],
  cart: [],
  loading: false,
  error: null,

  // 1. Get Cart
  getUserCart: async (userId) => {
    if (!userId) return;
    set({ loading: true });
    try {
      const res = await fetch(`${backendUrl}/user/cart/${userId}`);
      const data = await res.json();
      set({ cart: data, userCart: [], loading: false });
    } catch (error) {
      console.log("error fetching cart", error);
      set({ loading: false, error });
    }
  },

  addToCart: async (userId, productId, quantity) => {
    try {
      const res = await fetch(`${backendUrl}/user/add-to-cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Item added to cart:", productId);
        set({ cart: data });
      } else {
        throw new Error("Failed to add");
      }
    } catch (error) {
      console.log("Error adding to cart, reverting:", error);
      set({ cart: currentCart });
    }
  },

  decreaseQuantity: async (userId, productId) => {
    const currentCart = get().cart;
    const itemIndex = currentCart.findIndex(
      (item) => (item.product?.id || item.product) === productId,
    );

    if (itemIndex === -1) return;

    // Don't decrease below 1 (Use remove for that)
    if (currentCart[itemIndex].quantity <= 1) return;

    // OPTIMISTIC UPDATE
    let optimisticCart = [...currentCart];
    optimisticCart[itemIndex] = {
      ...optimisticCart[itemIndex],
      quantity: optimisticCart[itemIndex].quantity - 1,
    };
    set({ cart: optimisticCart });

    try {
      const res = await fetch(`${backendUrl}/user/add-to-cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // Sending -1 tells backend to subtract
        body: JSON.stringify({ userId, productId, quantity: -1 }),
      });
      const data = await res.json();
      set({ cart: data });
    } catch (error) {
      console.log("Error decreasing quantity:", error);
      set({ cart: currentCart }); // Revert
    }
  },

  removeFromCart: async (userId, productId) => {
    try {
      const res = await fetch(`${backendUrl}/user/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();
      console.log(data)
      set({ cart: data.cart || data });
    } catch (error) {
      console.log("Error removing item:", error);
      set({ cart: error }); // Revert
    }
  },
  emptyCart: async (userId) => {
    try {
      const res = await fetch(`${backendUrl}/user/cart/empty`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      set({ cart: data });
    } catch (error) {
      console.log("cart empty error", error);
      set({ error: error });
    }
  },
}));
