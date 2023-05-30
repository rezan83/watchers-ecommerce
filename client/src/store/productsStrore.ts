import { create } from 'zustand';
import { IProduct, IProductPages } from '../@types';
import { fetchProducts, getFeatured } from 'api/productsApi';

interface IProductsStore {
  products: IProductPages;
  featuredProducts: IProduct[];
  setProducts: (products: IProductPages) => void;
  page: number;
  setPage: (num: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  priceFilter: number[] | null;
  setPriceFilter: (priceFilter: number[] | null) => void;
  nameFilter: string | null;
  setNameFilter: (nameFilter: string | null) => void;
  fetchStoreFeatured: () => Promise<void> ;
  fetchStoreProducts: (
    priceFilter?: null | number[],
    nameFilter?: string | null,
    limit?: null | number,
    page?: null | number,
    searchCategories?: null | string[]
  ) => Promise<void>;
  clearProducts: () => void;
  clearSearchAndPrice: () => void;
}

const useProductsStore = create<IProductsStore>((set, get) => ({
  products: { products: [] },
  featuredProducts: [],
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
  fetchStoreFeatured: async () => {
    const products = await getFeatured();
    if (products) {
      set({ featuredProducts: products.products });
    }
  },
  fetchStoreProducts: async (
    priceFilter = null,
    nameFilter = null,
    limit = null,
    page = null,
    searchCategories = null
  ) => {
    const products = await fetchProducts(priceFilter, nameFilter, limit, page, searchCategories);
    set({ products });
  },
  clearProducts: () => set(state => ({ products: { products: [] } })),
  clearSearchAndPrice: () => set(state => ({ nameFilter:null , priceFilter:null }))
}));

export default useProductsStore;
