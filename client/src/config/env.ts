class EnvCalss {
  BASE_URL = process.env.REACT_APP_BASE_URL || '';
  Url = (url: string) => this.BASE_URL + url;
  BASE_REFRESH_URL = this.Url('auth/refresh/');
  REFRESH_URL = this.Url('auth/refresh/');
  FORGET_URL = this.Url('auth/forget-password/');
  LOGIN_URL = this.Url('auth/login/');
  REGISTER_URL = this.Url('auth/register/');
  PROFILE_URL = this.Url('users/profile/') ;
  USERS_URL =  this.Url('users/') ;
  ADMIN_URL = this.Url('admin/');
  ALL_USERS_URL = this.Url('admin/all-users/');

  PRODUCTS_URL = this.Url('products/');
  CATEGORIES_URL = this.Url('categories/');

  //   paypal
  PAYPAL_CLIENT = process.env.REACT_APP_PAYPAL_CLIENT;
  PAYPAL_SECRET = process.env.REACT_APP_PAYPAL_SECRET;

  PAYPAL_SANDBOX_EMAIL = process.env.REACT_APP_PAYPAL_SANDBOX_EMAIL;
  PAYPAL_SANDBOX_PASS = process.env.REACT_APP_PAYPAL_SANDBOX_PASS;
}
const env = new EnvCalss();
export default env;
