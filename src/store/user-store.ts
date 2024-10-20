/* eslint-disable @typescript-eslint/no-unused-vars */
import type { User } from "@/shared/models/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  user: User;
  addUser: (user: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: {} as User,
      addUser: (user) => set({ user }),
      removeUser: () => set({ user: {} as User }),
    }),
    {
      name: "currentUser",
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as User),
      }),
    }
  )
);
