import { IProduct } from '@types';
import axiosInstance from './axiosInterceptors';

export const fetchProducts = async (priceFilter: number[] | null = null): Promise<IProduct[]> => {
  let products: IProduct[] = [];
  const filter = priceFilter? `?minPrice=${priceFilter[0]}&&maxPrice=${priceFilter[1]}` : ''
  try {
    const productsRes = await axiosInstance.get(process.env.REACT_APP_PRODUCTS_URL!+filter);
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
  const { image, name, description, price } = product;
  const productInfo = { image, name, description, price };
  productInfo &&
    Object.entries(productInfo as IProduct).forEach(entry => {
      multiForm.append(entry[0], entry[1]);
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