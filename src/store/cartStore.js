import { create } from "zustand";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCartStore = create((set, get) => ({
  userCart: [],
  cart: [],
  loading: false,
  error: null,

  getUserCart: async (userId) => {
    if (!userId) return;
    try {
      
      set({ loading: true });
      const res = await fetch(`${backendUrl}/user/cart/${userId}`);
      const data = await res.json();
      
      set({ cart: data, userCart: [], loading: false });
    } catch (error) {
      console.log("error fetching cart", error);
      set({ loading: false, error });
    }
  },

  addToCart: async (userId, productId, quantity) => {
    if (!userId && !productId && !quantity) return;
    try {
      const res = await fetch(`${backendUrl}/user/add-to-cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity }),
      });

      const data = await res.json();

      if (res.ok) {
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

    if (currentCart[itemIndex].quantity <= 1)
      return get().removeFromCart(userId, productId);

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

        body: JSON.stringify({ userId, productId, quantity: -1 }),
      });
      const data = await res.json();
      set({ cart: data });
    } catch (error) {
      console.log("Error decreasing quantity:", error);
      set({ cart: currentCart });
    }
  },

  removeFromCart: async (userId, productId) => {
    if (!userId && !productId) return;
    try {
      const res = await fetch(`${backendUrl}/user/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();
      set({ cart: data.cart || data });
    } catch (error) {
      console.log("Error removing item:", error);
      set({ cart: error });
    }
  },
  emptyCart: async (userId) => {
    if (!userId) return;
    try {
      const res = await fetch(`${backendUrl}/user/cart/empty`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      set({ cart: data.cart });
    } catch (error) {
      console.log("cart empty error", error);
      set({ error: error });
    }
  },
}));
