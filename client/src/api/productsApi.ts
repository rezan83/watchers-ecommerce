import { IProduct, IProductPages } from '@types';
import axiosInstance from './axiosInterceptors';
import env from '../config/env';

export const fetchProducts = async (
  priceFilter: number[] | null = null,
  nameFilter: string | null = null,
  limit: number | null = null,
  page: number | null = null,
  searchCategories: null | string[]
): Promise<IProductPages> => {
  let products: IProductPages = { products: [] };
  const setLimit = limit || 6;
  let filter = `?limit=${setLimit}`;
  filter += page ? `&&page=${page}` : '';

  const categories = searchCategories
    ? searchCategories.map(c => (c ? `&&searchCategories=${c}` : '')).join('')
    : '';
  filter += categories;
  filter += priceFilter ? `&&minPrice=${priceFilter[0]}&&maxPrice=${priceFilter[1]}` : '';
  filter += nameFilter ? `&&searchName=${nameFilter}` : '';
  try {
    const productsRes = await axiosInstance.get(env.PRODUCTS_URL + filter);
    products = await productsRes.data;
  } catch (error) {
    console.log(error);
  }
  return products;
};

export const getFeatured = async (): Promise<{ products: IProduct[] } | void> => {
  try {
    const productRes = await axiosInstance.get(env.FEATURED_URL!);
    return await productRes.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchAvailableProducts = async (ids: string[]): Promise<IProduct[] | null> => {
  let products: IProduct[] | null = null;
  try {
    const productsRes = await axiosInstance.post(env.AVAILABLE_PRODUCTS_URL, {ids});
    products = await productsRes.data;
  } catch (error) {
    console.log(error);
  }
  return products;
};
export const fetchOneProduct = async (id: string): Promise<IProduct | void> => {
  try {
    const productRes = await axiosInstance.get(env.PRODUCTS_URL! + id);
    return await productRes.data;
  } catch (error) {
    console.log(error);
  }
};

export async function multiFormReq(product: IProduct, edit = false) {
  const multiForm = new FormData();
  const { image, name, description, price, categories } = product;
  const productInfo = { image, name, description, price };
  productInfo &&
    Object.entries(productInfo as IProduct).forEach(entry => {
      multiForm.append(entry[0], entry[1]);
    });
  categories?.forEach(entry => {
    if (entry) {
      multiForm.append('categories', entry);
    }
  });

  let response;
  try {
    if (edit) {
      response = await axiosInstance.put(env.PRODUCTS_URL! + product._id, multiForm, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      response = await axiosInstance.post(env.PRODUCTS_URL!, multiForm, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }

    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = await axiosInstance.delete(env.PRODUCTS_URL + id);

    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
