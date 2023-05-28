import { create } from 'zustand';
import { ICategory, IShowCategory } from '../@types';
import fetchCategories from 'api/categoriesApi';
import { persist } from 'zustand/middleware';

interface ICategoriesStore {
  categories: ICategory[];
  optionCategories: IShowCategory[];
  showCategories: IShowCategory[];
  searchCategories: string[];
  setCategories: (categories: ICategory[]) => void;
  setSelectedCategories: (categories: ICategory[]) => void;
  fetchStoreCategories: () => void;
  clearSelectedCategories: () => void;
}

const useCategoriesStore = create(
  persist<ICategoriesStore>(
    (set, get) => ({
      categories: [],
      optionCategories: [],
      showCategories: [{label: 'All', value:''}],
      searchCategories: [],
      setSelectedCategories: searchCategories => {
        const search = searchCategories.map(c => c._id) as string[];
        const showCat = searchCategories.map(c => ({ value: c._id, label: c.name }));
        set({ showCategories: showCat });
        set({ searchCategories: search });
      },
      setCategories: categories => {
        set({ categories });
      },

      fetchStoreCategories: async () => {
        const categories = await fetchCategories();
        const optionCategories = categories.map(c => ({
          label: c.name,
          value: c._id
        })) as IShowCategory[];
        set({ optionCategories });

        set({ categories });
      },
      clearSelectedCategories: () => set(state => ({ showCategories: [], searchCategories: [] }))
    }),
    {
      name: 'CategoriesStore'
    }
  )
);

export default useCategoriesStore;
