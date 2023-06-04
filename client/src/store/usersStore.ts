import { create } from 'zustand';
import { IUser } from '../@types';
import fetchUsers, { fetchUserProfile } from 'api/usersApi';

interface IUsersStore {
  users: IUser[];
  userProfile: IUser | null;
  setUsers: (users: IUser[]) => void;
  fetchStoreUsers: () => void;
  fetchStroeUserProfile: () => void;
  clearUsers: () => void;
}

const useUsersStore = create<IUsersStore>((set, get) => ({
  users: [],
  userProfile: null,
  setUsers: users => {
    set({ users });
  },

  fetchStoreUsers: async () => {
    const users = await fetchUsers();
    set({ users });
  },
  fetchStroeUserProfile: async () => {
    const userProfile = await fetchUserProfile();
    set({ userProfile });
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
