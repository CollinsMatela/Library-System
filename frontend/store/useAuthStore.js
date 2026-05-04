
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(persist((set) => ({

  user: null,
  token: null,
  role: null,

  setUser: (user) => set({ user }),

  setAuth: (user, token, role) => set({ user, token, role }),

  logout: () => set({ user: null, token: null, role: null }),
  
}),
  {name: "auth-storage"},
));

export default useAuthStore;