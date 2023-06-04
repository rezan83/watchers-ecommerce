import { IUser } from '@types';
import axiosInstance from './axiosInterceptors';
import env from 'config/env';

const fetchUsers = async (): Promise<IUser[]> => {
  let users: IUser[] = [];
  try {
    const usersRes = await axiosInstance.get(env.ALL_USERS_URL!);
    users = await usersRes.data;
  } catch (error) {
    console.log(error);
  }
  return users;
};

export default fetchUsers;

export const fetchUserProfile = async (): Promise<IUser | null> => {
  // PROFILE_URL
  let user: IUser | null = null;
  try {
    const userRes = await axiosInstance.post(env.PROFILE_URL!);
    user = await userRes.data;
  } catch (error) {
    console.log(error);
  }
  return user;
};

export async function multiFormReq(url: string, user: IUser) {
  const multiForm = new FormData();
  const { image, name, phone } = user;
  Object.entries({ image, name, phone } as IUser).forEach(entry => {
    multiForm.append(entry[0], entry[1]);
  });

  let response;
  try {
    response = await axiosInstance.put(url, multiForm, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    // else {
    //   response = await axiosInstance.post(env.PRODUCTS_URL!, multiForm, {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   });
    // }

    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
