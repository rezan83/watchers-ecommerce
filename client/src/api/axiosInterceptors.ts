import axios from 'axios';
import {
  setZustandAuthToken,
  setZustandAuthRefreshToken,
  getZustandAuthToken,
  setZustandAuthUser,
  getZustandAuthRefreshToken
} from '../store/authStore';
import env from 'config/env';

const axiosInstance = axios.create({
  baseURL: env.BASE_URL,
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getZustandAuthToken();
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const rToken = getZustandAuthRefreshToken();
        const response = await axios.post(env.REFRESH_URL, {
          refreshToken: rToken
        });
        const { accessToken, refreshToken, user } = response.data;

        // save the new access token in state and localStorage
        setZustandAuthToken(accessToken);
        setZustandAuthRefreshToken(refreshToken);
        setZustandAuthUser(user);
        // retry the original request with the new access token
        originalRequest.headers.authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.error(error);
        // handle refresh error
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
