import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IUser } from '../@types';

interface IAuthStore {
  token: null | string;
  refreshToken: null | string;
  authUser: null | IUser;
  userToEdit: IUser | null;
  setUserToEdit: (user: IUser | null) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setAuthUser: (user: IUser) => void;
  clearAuth: () => void;
}

const useAuthStore = create(
  persist<IAuthStore>(
    (set, get) => ({
      token: null,
      refreshToken: null,
      authUser: null,
      userToEdit: null,
      setToken: token => set(state => ({ token })),

      setRefreshToken: refreshToken => set(state => ({ refreshToken })),

      setAuthUser: authUser => {
        authUser.status = authUser.is_admin ? 'Admin' : 'User';
        set({ authUser });
      },
      setUserToEdit: userToEdit => {
        set({ userToEdit });
      },
      clearAuth: () =>
        set(state => ({ token: null, refreshToken: null, user: null, authUser: null }))
    }),
    {
      name: 'AuthStorage'
    }
  )
);

export const setZustandAuthToken = (token: string) =>
  useAuthStore.setState(state => ({
    ...state,
    token
  }));

export const setZustandAuthRefreshToken = (refreshToken: string) =>
  useAuthStore.setState(state => ({
    ...state,
    refreshToken
  }));

export const setZustandAuthUser = (authUser: IUser) =>
  useAuthStore.setState(state => ({
    ...state,
    authUser
  }));

export const getZustandAuthToken = () => useAuthStore.getState().token;
export const getZustandAuthUser = () => useAuthStore.getState().authUser;
export const getZustandAuthRefreshToken = () => useAuthStore.getState().refreshToken;

export default useAuthStore;

// const useFishStore = create((set) => ({
//   fishies: {},
//   fetch: async (pond) => {
//     const response = await fetch(pond)
//     set({ fishies: await response.json() })
//   },
// }))
