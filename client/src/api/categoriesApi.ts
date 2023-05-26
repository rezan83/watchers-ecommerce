import { ICategory } from '@types';
import axiosInstance from './axiosInterceptors';
import env from 'config/env';

const fetchCategories = async (): Promise<ICategory[]> => {
  let categories: ICategory[] = [];
  try {
    const categoriesRes = await axiosInstance.get(env.CATEGORIES_URL!);
    categories = await categoriesRes.data;
  } catch (error) {
    console.log(error);
  }
  return categories;
};

export default fetchCategories;
