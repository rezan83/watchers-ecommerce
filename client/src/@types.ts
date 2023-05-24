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
}

export interface ICategory {
  _id?: string;
  name: string
}

export interface IProduct {
  _id?: string;
  name: string;
  description?: string;
  categories?: string[]
  price: number;
  image?: Blob | string;
}

export interface IProductPages {
  products: IProduct[];
  page?: number;
  pages?: number;
  next?: boolean;
}

