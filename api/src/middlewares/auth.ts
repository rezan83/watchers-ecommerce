import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'
import { env } from '../config'
import User, { IUser } from '../models/user.model'
import { authReq } from '../models/@types'

interface JwtPayload {
  name: string
  email: string
  password: string
  phone: number
  // image?: {
  //   type: Buffer
  //   mimetype: string
  //   originalFilename: string
  //   filepath: string
  // }
}

export const isLogedIn = (req: authReq, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization || req.headers.Authorization) {
      const token = req.headers.authorization?.split(' ')[1] || ''
      jwt.verify(token, env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' })
        }
        const { email } = decoded as JwtPayload
        const user  = await User.findOne({ email }).select(
          '-password'
        ) 
        req.user = user

        next()
      })
    }
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' })
  }
}

export const isAddmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user && (req.user as any).is_admin) {
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
