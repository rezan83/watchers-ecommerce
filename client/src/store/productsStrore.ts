import { create } from 'zustand';
import { IProduct } from '../@types';
import { fetchProducts } from 'api/crudProducts';

interface IProductsStore {
  products: IProduct[];

  setProducts: (products: IProduct[]) => void;
  fetchStoreProducts: (priceFilter?: null | number[], nameFilter?: string | null) => void;
  clearProducts: () => void;
}

const useProductsStore = create<IProductsStore>((set, get) => ({
  products: [],

  setProducts: products => {
    set({ products });
  },

  fetchStoreProducts: async (priceFilter = null, nameFilter = null) => {
    const products = await fetchProducts(priceFilter, nameFilter);
    set({ products });
  },
  clearProducts: () => set(state => ({ products: [] }))
}));

export default useProductsStore;
