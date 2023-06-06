import { create } from 'zustand';
import { IProduct, IProductPages, IReview } from '../@types';
import { fetchOneProduct, fetchProducts, getFeatured } from 'api/productsApi';
import { fetchProductReview } from 'api/reviewsApi';

interface IProductsStore {
  products: IProductPages;
  featuredProducts: IProduct[];
  setProducts: (products: IProductPages) => void;
  productToReview: IProduct | null;
  oldReview: IReview | null;
  fetchStroeProductToReview: (id: string | null) => void;
  productToEdit: IProduct | null;
  setProductToEdit: (productToEdit: IProduct | null) => void;
  page: number;
  setPage: (num: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  priceFilter: number[] | null;
  setPriceFilter: (priceFilter: number[] | null) => void;
  nameFilter: string | null;
  setNameFilter: (nameFilter: string | null) => void;
  fetchStoreFeatured: () => Promise<void>;
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
  productToReview: null,
  oldReview: null,
  fetchStroeProductToReview: async (id: string | null) => {
    if (id) {
      const product = await fetchOneProduct(id);
      const oldReview = await fetchProductReview(id);
      set(state => ({ productToReview: product || null, oldReview: oldReview || null }));
    } else {
      set(state => ({ productToReview: null }));
    }
  },
  productToEdit: null,
  setProductToEdit: (productToEdit: IProduct | null) => set(state => ({ productToEdit })),
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
  clearSearchAndPrice: () => set(state => ({ nameFilter: null, priceFilter: null }))
}));

export default useProductsStore;
