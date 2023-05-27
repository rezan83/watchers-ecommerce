import { IOrder, ISalesStat } from '@types';
import axiosInstance from './axiosInterceptors';
import env from 'config/env';
import { OrderResponseBody } from '@paypal/paypal-js';

export const fetchOrders = async (): Promise<{
  orders: IOrder[];
  salesStat: ISalesStat[];
}> => {
  let orders: IOrder[] = [];
  let salesStat: ISalesStat[] = [];
  try {
    const ordersRes = await axiosInstance.get(env.ORDERS_URL!);
    orders = await ordersRes.data;
    salesStat = orders.map(order => {
      const { city, country, lat, lng } = order.address;

      return { city, country, lat: Number(lat), lon: Number(lng), z: order.total };
    });
  } catch (error) {
    console.log(error);
  }
  return { orders, salesStat };
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
      email: orderRes?.payer.email_address
    },
    address: {
      address_line1: orderRes?.purchase_units[0]?.shipping?.address?.address_line_1,
      address_line2: orderRes?.purchase_units[0]?.shipping?.address?.address_line_2,
      postal_code: orderRes?.purchase_units[0]?.shipping?.address?.postal_code,
      city: orderRes?.purchase_units[0]?.shipping?.address?.admin_area_2,
      country: orderRes?.purchase_units[0]?.shipping?.address?.country_code
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
