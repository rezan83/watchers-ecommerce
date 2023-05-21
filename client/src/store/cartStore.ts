import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IProduct } from '../@types';

interface ICartStore {
  cartItems: IProduct[];
  productToEdit: IProduct | null;
  setProductToEdit: (productToEdit: IProduct | null) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  addToCartStore: (product: IProduct) => void;
  isProductInCart: (id: string) => boolean;
  isCartEmpty: () => boolean;
  cartCount: () => number;
  cartTotal: () => number;
  clearCartStore: () => void;
}

const useCartStore = create(
  persist<ICartStore>(
    (set, get) => ({
      cartItems: [],
      productToEdit: null,
      setProductToEdit: (productToEdit: IProduct | null) => set(state => ({ productToEdit })),
      addToCartStore: (product: IProduct) => {
        console.log(product);
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
