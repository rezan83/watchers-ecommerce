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
