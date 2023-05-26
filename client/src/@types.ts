import { Address } from '@paypal/paypal-js';

export interface IUser {
  _id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: number;
  email: string;
  is_admin: boolean;
  is_banned: boolean;
  status?: string;
  image?: Blob | string;
}

export interface ICategory {
  _id?: string;
  name: string;
}

export interface IProduct {
  _id?: string;
  name: string;
  description?: string;
  categories?: string[];
  price: number;
  image?: Blob | string;
}

export interface IProductPages {
  products: IProduct[];
  page?: number;
  pages?: number;
  next?: boolean;
}

export interface IOrder {
  user?: string;
  _id?: string;
  order_id: string | undefined;
  products?: {
    id: string;
    name: string;
    price: string;
  }[];
  total: number;
  buyer: {
    full_name: string | undefined;
    email: string | undefined;
  };
  address: {
    city?: string;
    country?: string;
    lng?: string;
    lan?: string;
  };
}
