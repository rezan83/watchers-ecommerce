import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'
import { env } from '../config'
import User, { IUser } from '../models/user.model'

interface JwtPayload {
  name: string
  email: string
  password: string
  phone: number
  image?: {
    type: Buffer
    mimetype: string
    originalFilename: string
    filepath: string
  }
}

export interface authReq extends Request {
  user?: any
}
export const isLogedIn = (req: authReq, res: Response, next: NextFunction) => {
  try {
    console.log(req.headers.authorization)
    if (req.headers.authorization || req.headers.Authorization) {
      const token = req.headers.authorization?.split(' ')[1] || ''
      console.log(token)

      jwt.verify(token, env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' })
        }
        const { email } = decoded as JwtPayload
        const user = await User.findOne({ email }).select('-password')
        req.user = user

        next()
      })
    }
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' })
  }
}

export const isAddmin = async (
  req: authReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user && req.user.is_admin) {
      next()
    } else {
      return res
        .status(403)
        .json({ message: "unauthorized, don't have privilage" })
    }
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' })
  }
}
