import User, { IUser } from './user.model'
import {Request} from 'express'

// declare global{
//   namespace Express {
//     export interface Request {
//       // user?: User | undefined
//       user?: any
//     }
//   }
// }

// declare namespace Express {
//    interface Request {
//     // user?: User | undefined
//     user?: any
//   }
// }

export interface authReq extends Request {
  user?: IUser | any
}
