import { create } from "zustand";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,

  getLoggedStatus: () => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        set({ user: parsed?.user });
      } catch (error) {
        set({ user: null });
      }
    } else set({ user: null });
  },
  setLogin: async (val) => {
    try {
      set({ loading: true });
      const res = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
      });
      if (!res.ok) return set({ login: res });

      const data = await res.json();
      console.log(data);

      localStorage.setItem("user", JSON.stringify(data));

      set({ user: data, loading: false });
    } catch (error) {
      console.log("error in login:", error);
      set({ loading: false });
    }
  },
  setSignup: async (val) => {
    try {
      set({ loading: true });
      const res = await fetch(`${backendUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
      });
      if (!res.ok) return set({ login: res });

      const data = await res.json();
      console.log(data);

      set({ loading: false });
    } catch (error) {
      console.log("error in login:", error);
      set({ loading: false });
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: "" });
  },
}));
