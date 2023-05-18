import { IUser } from 'store/@types';
import axiosInstance from './axiosInterceptors';

const fetchUsers = async (): Promise<IUser[]> => {
  let users: IUser[] = [];
  try {
    const usersRes = await axiosInstance.get(process.env.REACT_APP_ALL_USERS_URL!);
    users = await usersRes.data;
  } catch (error) {
    console.log(error);
  }
  return users;
};

export default fetchUsers;
