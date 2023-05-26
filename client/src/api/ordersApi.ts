import { IOrder } from '@types';
import axiosInstance from './axiosInterceptors';
import env from 'config/env';

export const fetchOrders = async (): Promise<IOrder[]> => {
  let orders: IOrder[] = [];
  try {
    const ordersRes = await axiosInstance.get(env.ORDERS_URL!);
    orders = await ordersRes.data;
  } catch (error) {
    console.log(error);
  }
  return orders;
};
export const addOrder = async (order: IOrder): Promise<IOrder | null> => {
  try {
    const orderRes = await axiosInstance.post(env.ORDERS_URL!, order);
    return await orderRes.data;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
