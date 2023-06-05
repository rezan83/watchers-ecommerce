import { create } from 'zustand';
import { IProduct, IUser } from '../@types';
import fetchUsers, { fetchUserProfile } from 'api/usersApi';
import { fetchAvailableProducts } from 'api/productsApi';

interface IUsersStore {
  users: IUser[];
  userProfile: IUser | null;
  purchasedAndAvailableProducts: IProduct[] | null;
  setUsers: (users: IUser[]) => void;
  fetchStoreUsers: () => void;
  fetchStroeUserProfile: () => void;
  clearUsers: () => void;
}

const useUsersStore = create<IUsersStore>((set, get) => ({
  users: [],
  userProfile: null,
  purchasedAndAvailableProducts: null,
  setUsers: users => {
    set({ users });
  },

  fetchStoreUsers: async () => {
    const users = await fetchUsers();
    set({ users });
  },

  fetchStroeUserProfile: async () => {
    const userProfile = await fetchUserProfile();
    const ids = userProfile?.orders?.flatMap(order => {
      return order.products?.map(p => p.id);
    });

    const purchasedAndAvailableProducts = await fetchAvailableProducts(ids as string[]);

    set({ userProfile, purchasedAndAvailableProducts });
  },

  clearUsers: () => set(state => ({ users: [] }))
}));

export default useUsersStore;
