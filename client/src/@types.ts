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
  orders?: IOrder[]
}

export interface ICategory {
  _id?: string;
  name: string;
}
export interface IShowCategory {
  label: string;
  value: string | undefined;
}
export interface IProduct {
  _id?: string;
  name: string;
  description?: string;
  categories?: string[];
  price: number;
  image?: Blob | string;
  featured?: boolean
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
    lat?: string;
    postal_code?: string;
    address_line1?: string;
    address_line2?: string;
  };
}

export interface ISalesStat {
  city: string | undefined;
  country: string | undefined;
  lat: number | undefined;
  lon: number | undefined;
  z: number;
}

export interface IOrdersData {
  orders: IOrder[];
  salesStat: ISalesStat[];
}
