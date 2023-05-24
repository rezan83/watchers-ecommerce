import { ICategory } from '@types';
import axiosInstance from './axiosInterceptors';

const fetchCategories = async (): Promise<ICategory[]> => {
  let categories: ICategory[] = [];
  try {
    const categoriesRes = await axiosInstance.get(process.env.REACT_APP_CATEGORIES_URL!);
    categories = await categoriesRes.data;
  } catch (error) {
    console.log(error);
  }
  return categories;
};

export default fetchCategories;
