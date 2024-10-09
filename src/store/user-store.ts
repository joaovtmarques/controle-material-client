/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  warName: string;
  rank: string;
  company: string;
  cpf: string;
  telephone: string;
  type: string;
  email: string;
  roles: [
    {
      id: number;
      role: string;
    }
  ];
  authorities: [
    {
      authority: string;
    }
  ];
  username: string;
}

interface UserStore {
  user: User;
  addUser: (user: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {} as User,
  addUser: (user) => set((_state) => ({ user: user })),
  removeUser: () => set({ user: {} as User }),
}));
