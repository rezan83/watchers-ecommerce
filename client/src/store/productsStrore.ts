import { create } from 'zustand';
import { IProduct } from '../@types';
import {fetchProducts} from 'api/crudProducts';

interface IProductsStore {
  products: IProduct[];

  setProducts: (products: IProduct[]) => void;
  fetchStoreProducts: () => void;
  clearProducts: () => void;
}

const useProductsStore = create<IProductsStore>((set, get) => ({
  products: [],

  setProducts: products => {
    set({ products });
  },

  fetchStoreProducts: async () => {
    const products = await fetchProducts();
    set({ products });
  },
  clearProducts: () => set(state => ({ products: [] }))
}));

export default useProductsStore;