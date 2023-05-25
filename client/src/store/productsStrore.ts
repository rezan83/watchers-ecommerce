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
    page?: null | number,
    selectedCategories?: null | string[]
  ) => void;
  clearProducts: () => void;
}

const useProductsStore = create<IProductsStore>((set, get) => ({
  products: { products: [] },
  page: 1,
  setPage: num => {
    set({ page: get().page + num });
  },
  limit: 6,
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

  fetchStoreProducts: async (
    priceFilter = null,
    nameFilter = null,
    limit = null,
    page = null,
    selectedCategories = null
  ) => {
    const products = await fetchProducts(priceFilter, nameFilter, limit, page, selectedCategories);
    set({ products });
  },
  clearProducts: () => set(state => ({ products: { products: [] } }))
}));

export default useProductsStore;
