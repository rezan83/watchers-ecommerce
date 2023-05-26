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

export async function multiFormReq(url: string, user: IUser) {
  const multiForm = new FormData();
  const { image, name, phone } = user;
console.log("multiFormReq",image)
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
