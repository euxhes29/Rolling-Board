import { create } from "zustand";

export const useUserStore = create((set) => ({
  id: null,
  setId: (id) => set({ id }),
}));
