
import { create } from "zustand";

const useAuthStore = create((set) => ({

  user: null,
  token: null,
  role: null,

  setUser: (user) => set({ user }),

  setAuth: (user, token, role) => set({ user, token, role }),

  logout: () => set({ user: null, token: null, role: null })
  
}));

export default useAuthStore;