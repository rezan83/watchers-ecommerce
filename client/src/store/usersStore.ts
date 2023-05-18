import { create } from 'zustand';
import { IUser } from './@types';
import fetchUsers from 'helpers/fetchUsers';

interface IUsersStore {
  users: IUser[];
  anotherUserToEdit: IUser | null;
  setUsers: (users: IUser[]) => void;
  setUserToEdit: (user: IUser | null) => void;
  fetchStoreUsers: () => void;
  clearUsers: () => void;
}

const useUsersStore = create<IUsersStore>((set, get) => ({
  users: [],
  anotherUserToEdit: null,
  setUsers: users => {
    set({ users });
  },
  setUserToEdit: anotherUserToEdit => {
    set({ anotherUserToEdit });
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
