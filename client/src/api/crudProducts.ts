import { IProduct, IProductPages } from '@types';
import axiosInstance from './axiosInterceptors';

export const fetchProducts = async (
  priceFilter: number[] | null = null,
  nameFilter: string | null = null,
  limit: number | null = null,
  page: number | null = null,
  selectedCategories: null | string[]
): Promise<IProductPages> => {
  let products: IProductPages = { products: [] };
  const setLimit = limit || 6;
  let filter = `?limit=${setLimit}`;
  filter += page ? `&&page=${page}` : '';

  const categories = selectedCategories
    ? selectedCategories.map(c => (c ? `&&selectedCategories=${c}` : '')).join('')
    : '';
  filter += categories;
  filter += priceFilter ? `&&minPrice=${priceFilter[0]}&&maxPrice=${priceFilter[1]}` : '';
  filter += nameFilter ? `&&searchName=${nameFilter}` : '';
  try {
    const productsRes = await axiosInstance.get(process.env.REACT_APP_PRODUCTS_URL! + filter);
    products = await productsRes.data;
  } catch (error) {
    console.log(error);
  }
  return products;
};

export const fetchOneProduct = async (id: string): Promise<IProduct | void> => {
  try {
    const productRes = await axiosInstance.get(process.env.REACT_APP_PRODUCTS_URL! + id);
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
      response = await axiosInstance.put(
        process.env.REACT_APP_PRODUCTS_URL! + product._id,
        multiForm,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
    } else {
      response = await axiosInstance.post(process.env.REACT_APP_PRODUCTS_URL!, multiForm, {
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
    const response = await axiosInstance.delete(process.env.REACT_APP_PRODUCTS_URL! + id);

    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
