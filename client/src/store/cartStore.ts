import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PurchaseUnit } from '@paypal/paypal-js';

import { IProduct } from '../@types';
import { fetchOneProduct } from 'api/productsApi';

interface ICartStore {
  cartItems: IProduct[];
  productDetails: IProduct | null;
  setProductDetails: (id: string) => void;
  
  currency: string;
  setCurrency: (currency: string) => void;
  addToCartStore: (product: IProduct) => void;
  isProductInCart: (id: string) => boolean;
  isCartEmpty: () => boolean;
  cartCount: () => number;
  cartTotal: () => number;
  purchase_units: () => PurchaseUnit[];
  clearCartStore: () => void;
}

const useCartStore = create(
  persist<ICartStore>(
    (set, get) => ({
      cartItems: [],
      purchase_units: () => {
        return get().cartItems.reduce<PurchaseUnit[]>((a, b) => {
          a.push({
            reference_id: b._id,
            description: b.name,
            amount: {
              currency_code: 'EUR',
              value: String(b.price)
            }
          });
          return a;
        }, []);
      },
      productDetails: null,
      setProductDetails: async (id: string) => {
        const product = await fetchOneProduct(id);
        if (product) {
          set(state => ({ productDetails: product }));
        }
      },
   
      addToCartStore: (product: IProduct) => {
        if (!get().isProductInCart(product._id!)) {
          set(state => ({ cartItems: [...state.cartItems, product] }));
        } else {
          set(state => ({ cartItems: state.cartItems.filter(p => p._id !== product._id) }));
        }
      },
      currency: '$',
      setCurrency: (currency: string) => set(state => ({ currency })),
      cartCount: () => get().cartItems.length,
      isCartEmpty: () => get().cartItems.length === 0,
      cartTotal: () => get().cartItems.reduce((a, b) => a + b.price, 0),
      isProductInCart: (id: string) => get().cartItems.some(p => p._id === id),
      clearCartStore: () => set(state => ({ cartItems: [] }))
    }),
    {
      name: 'CartStorage'
    }
  )
);

// purchase_units: [
//     {
//       description: 'Your description',
//       amount: {
//         currency_code: 'EUR',
//         value: '200.0'
//       }
//     }
//   ]
// export const setZustandAuthToken = (token: string) =>
//   useAuthStore.setState(state => ({
//     ...state,
//     token
//   }));

// export const setZustandAuthRefreshToken = (refreshToken: string) =>
//   useAuthStore.setState(state => ({
//     ...state,
//     refreshToken
//   }));

// export const setZustandAuthUser = (authUser: IUser) =>
//   useAuthStore.setState(state => ({
//     ...state,
//     authUser
//   }));

// export const getZustandAuthToken = () => useAuthStore.getState().token;
// export const getZustandAuthUser = () => useAuthStore.getState().authUser;
// export const getZustandAuthRefreshToken = () => useAuthStore.getState().refreshToken;

export default useCartStore;
