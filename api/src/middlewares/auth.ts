import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'
import { env } from '../config/index.js'
import User from '../models/user.model.js'
interface JwtPayload {
  name: string;
  email: string;
  hashedPass: string;
  phone: number;
  image?: { type: Buffer; mimetype: string; originalFilename: string; filepath: string };
}
export const isLogedIn = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization || req.headers.Authorization) {
      const token = req.headers.authorization?.split(' ')[1] || ''

      jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' })
        }

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
    if (req.headers.authorization || req.headers.Authorization) {
      if (
        !req.headers.authorization?.startsWith('Bearer ') ||
        !req.headers.authorization.startsWith('JWT ')
      ) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const token = req.headers.authorization.split(' ')[1]

      jwt.verify(token, env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' })
        }
        const { email } = decoded as JwtPayload
        const user = await User.findOne({email})

        if (user && user.is_admin) {
          req.body.author_id = user._id
          next()
        }
      })
    } else {
      return res
        .status(403)
        .json({ message: "unauthorized, don't have privilage" })
    }
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' })
  }
}
