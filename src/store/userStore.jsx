import { create } from "zustand";

export const useUserStore = create((set) => ({
  userData: {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  },
  setUserData: (data) =>
    set((state) => ({
      userData: { ...state.userData, ...data },
    })),
}));
