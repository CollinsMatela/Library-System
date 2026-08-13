
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(persist((set) => ({

  user: null,
  token: null,
  role: null,

  setUser: (user) => set({ user }),

  updateUser: (updatedData) => set((state) => ({
                                                    user:{...state.user, ...updatedData}
                                                    })),

  setAuth: (user, token, role) => set({ user, token, role }),

  logout: () => set({ user: null, token: null, role: null }),
  
}),
  {name: "auth-storage"},
));

export default useAuthStore;