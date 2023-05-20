import { IProduct } from '@types';
import axiosInstance from './axiosInterceptors';

export default async function multiFormReq(product: IProduct) {
  const multiForm = new FormData();
  product &&
    Object.entries(product).forEach(entry => {
      multiForm.append(entry[0], entry[1]);
    });
  try {
    const response = await axiosInstance.post(process.env.REACT_APP_PRODUCTS_URL!, multiForm, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
