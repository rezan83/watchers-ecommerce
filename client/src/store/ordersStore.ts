import { create } from 'zustand';
import { IOrdersData } from '../@types';
import { fetchOrders } from 'api/ordersApi';
// import { persist } from 'zustand/middleware';

interface IOrdersStore {
  ordersData: IOrdersData | null;
  setOrders: (ordersData: IOrdersData) => void;
  fetchStoreOrders: () => void;
  clearOrders: () => void;
}

const useOrdersStore = create<IOrdersStore>((set, get) => ({
  ordersData: null,

  setOrders: ordersData => {
    set({ ordersData });
  },

  fetchStoreOrders: async () => {
    const ordersData = await fetchOrders();
    set({ ordersData });
  },
  clearOrders: () => set(state => ({ ordersData: null }))
}));

export default useOrdersStore;
