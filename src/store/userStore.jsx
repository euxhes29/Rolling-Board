import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      userData: {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      },
      setUserData: (data) =>
        set((state) => ({
          userData: { ...state.userData, ...data },
        })),
    }),
    {
      name: "user-storage",
    }
  )
);
