import { create } from 'zustand';
import { ICategory } from '../@types';
import fetchCategories from 'api/fetchCategories';
import { persist } from 'zustand/middleware';

interface ICategoriesStore {
  categories: ICategory[];
  selectedCategories: string[];
  setCategories: (categories: ICategory[]) => void;
  setSelectedCategories: (categories: ICategory[]) => void;
  fetchStoreCategories: () => void;
  clearCategories: () => void;
}

const useCategoriesStore = create(
  persist<ICategoriesStore>(
    (set, get) => ({
      categories: [],
      selectedCategories: [],
      setSelectedCategories: selectedCategories => {
        const selected = selectedCategories.map(c => c._id) as string[];
        set({ selectedCategories: selected });
      },
      setCategories: categories => {
        set({ categories });
      },

      fetchStoreCategories: async () => {
        const categories = await fetchCategories();
        set({ categories });
      },
      clearCategories: () => set(state => ({ categories: [] }))
    }),
    {
      name: 'CategoriesStore'
    }
  )
);

export default useCategoriesStore;
