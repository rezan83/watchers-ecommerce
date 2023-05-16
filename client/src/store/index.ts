import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUser {
  name: string;
  is_admin: boolean;
  status?: string;
}

interface IAuthStore {
  token: null | string;
  refreshToken: null | string;
  user: null | IUser;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: IUser) => void;
  clearAuth: () => void;
}

const useAuthStore = create(
  persist<IAuthStore>(
    (set, get) => ({
      token: null,
      refreshToken: null,
      user: null,
      setToken: token => set(state => ({ token })),

      setRefreshToken: refreshToken => set(state => ({ refreshToken })),

      setUser: user =>
        set(state => {
          user.status = user.is_admin ? 'Admin' : 'User';
          return { user };
        }),
      clearAuth: () => set(state => ({ token: null, refreshToken: null, user: null }))
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

export const setZustandAuthUser = (user: IUser) =>
  useAuthStore.setState(state => ({
    ...state,
    user
  }));

export const getZustandAuthToken = () => useAuthStore.getState().token;
export const getZustandAuthRefreshToken = () => useAuthStore.getState().refreshToken;

export default useAuthStore;
