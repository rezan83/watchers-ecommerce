class EnvCalss {
  BASE_URL = process.env.REACT_APP_BASE_URL || '';
  Url = (url: string) => this.BASE_URL + url;
  BASE_REFRESH_URL = this.Url('auth/refresh/');
  REFRESH_URL = this.Url('auth/refresh/');
  FORGET_URL = this.Url('auth/forget-password/');
  LOGIN_URL = this.Url('auth/login/');
  REGISTER_URL = this.Url('auth/register/');
  PROFILE_URL = this.Url('users/profile/');
  USERS_URL = this.Url('users/');
  ADMIN_URL = this.Url('admin/');
  ALL_USERS_URL = this.Url('admin/all-users/');
  ALL_REVIEWS_URL = this.Url('reviews/');
  
  PRODUCTS_URL = this.Url('products/');
  AVAILABLE_PRODUCTS_URL = this.Url('products/available');
  
  FEATURED_URL = this.Url('products/featured');
  CATEGORIES_URL = this.Url('categories/');
  ORDERS_URL = this.Url('orders/');

  //   paypal
  PAYPAL_CLIENT = process.env.REACT_APP_PAYPAL_CLIENT;
  PAYPAL_SECRET = process.env.REACT_APP_PAYPAL_SECRET;

  PAYPAL_SANDBOX_EMAIL = process.env.REACT_APP_PAYPAL_SANDBOX_EMAIL;
  PAYPAL_SANDBOX_PASS = process.env.REACT_APP_PAYPAL_SANDBOX_PASS;
}
const env = new EnvCalss();
export default env;
