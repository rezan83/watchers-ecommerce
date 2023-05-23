import { create } from 'zustand';
import { IProductPages } from '../@types';
import { fetchProducts } from 'api/crudProducts';

interface IProductsStore {
  products: IProductPages;

  setProducts: (products: IProductPages) => void;
  page: number;
  setPage: (num: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  priceFilter: number[] | null;
  setPriceFilter: (priceFilter: number[] | null) => void;
  nameFilter: string | null;
  setNameFilter: (nameFilter: string | null) => void;
  fetchStoreProducts: (
    priceFilter?: null | number[],
    nameFilter?: string | null,
    limit?: null | number,
    page?: null | number
  ) => void;
  clearProducts: () => void;
}

const useProductsStore = create<IProductsStore>((set, get) => ({
  products: { products: [] },
  page: 1,
  setPage: num => {
    // if (get().products.pages !== undefined) {
    //   if (get().page + num <= get().products.pages) {
    //   }
    // }
    set({ page: get().page + num });
  },
  limit: 4,
  setLimit: limit => {
    set({ limit });
  },
  priceFilter: null,
  setPriceFilter: priceFilter => set({ priceFilter }),
  nameFilter: null,
  setNameFilter: nameFilter => set({ nameFilter }),
  setProducts: products => {
    set({ products });
  },

  fetchStoreProducts: async (priceFilter = null, nameFilter = null, limit = null, page = null) => {
    const products = await fetchProducts(priceFilter, nameFilter, limit, page);
    set({ products });
  },
  clearProducts: () => set(state => ({ products: { products: [] } }))
}));

export default useProductsStore;
