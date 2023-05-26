import { IOrder } from '@types';
import axiosInstance from './axiosInterceptors';
import env from 'config/env';
import { OrderResponseBody } from '@paypal/paypal-js';

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

export const addOrder = async (
  orderRes: OrderResponseBody | undefined,
  total: number
): Promise<IOrder | null> => {
  const purchasedProducts = orderRes?.purchase_units.map((p: any) => ({
    id: p.reference_id,
    name: p.description,
    price: p.amount.value
  }));
  const order: IOrder = {
    order_id: orderRes?.id,
    products: purchasedProducts,
    total: total,
    buyer: {
      full_name: orderRes?.purchase_units[0]?.shipping?.name?.full_name,
      email: orderRes?.payer.email_address,
    },
    address: {
        city: orderRes?.purchase_units[0]?.shipping?.address?.admin_area_2,
        country: orderRes?.purchase_units[0]?.shipping?.address?.country_code,
    }
  };
  try {
    const orderRes = await axiosInstance.post(env.ORDERS_URL!, order);
    return await orderRes.data;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
