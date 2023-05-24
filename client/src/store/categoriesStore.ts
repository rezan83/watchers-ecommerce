import { create } from 'zustand';
import { ICategory } from '../@types';
import fetchCategories from 'api/fetchCategories';

interface ICategoriesStore {
  categories: ICategory[];
  selectedCategories: string[];
  setCategories: (categories: ICategory[]) => void;
  setSelectedCategories: (categories: ICategory[]) => void;
  fetchStoreCategories: () => void;
  clearCategories: () => void;
}

const useCategoriesStore = create<ICategoriesStore>((set, get) => ({
  categories: [],
  selectedCategories: [],
  setSelectedCategories: selectedCategories => {
    const selected = selectedCategories.map(c=>c._id) as string[]
    set({ selectedCategories: selected});
  },
  setCategories: categories => {
    set({ categories });
  },

  fetchStoreCategories: async () => {
    const categories = await fetchCategories();
    set({ categories });
  },
  clearCategories: () => set(state => ({ categories: [] }))
}));

export default useCategoriesStore;
