import { create } from 'zustand';
import { IUser } from '../@types';
import fetchUsers from 'api/usersApi';

interface IUsersStore {
  users: IUser[];

  setUsers: (users: IUser[]) => void;
  fetchStoreUsers: () => void;
  clearUsers: () => void;
}

const useUsersStore = create<IUsersStore>((set, get) => ({
  users: [],

  setUsers: users => {
    set({ users });
  },

  fetchStoreUsers: async () => {
    const users = await fetchUsers();
    set({ users });
  },
  clearUsers: () => set(state => ({ users: [] }))
}));

export default useUsersStore;

// export const setZustandAuthUser = (user: IUser) =>
//   useAuthStore.setState(state => ({
//     ...state,
//     user
//   }));

// export const getZustandAuthToken = () => useAuthStore.getState().token;

// const useFishStore = create((set) => ({
//   fishies: {},
//   fetch: async (pond) => {
//     const response = await fetch(pond)
//     set({ fishies: await response.json() })
//   },
// }))
