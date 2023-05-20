import jwt from 'jsonwebtoken'
import { env } from '../config'
// import { Response } from 'express'

export const cookieAge10Days = 10 * 24 * 60 * 60 * 1000
// Assigning refresh token in http-only cookie
// export const setJwtRefreshToCookie = (res: Response, refreshToken: string) => {

//    res.cookie('refreshToken', refreshToken,
//   {
//     sameSite:'none',
//     httpOnly: false,
//     expires: new Date(Date.now() + cookieAge10Days),
//     secure: process.env.NODE_ENV === "production",
//   }

//   )
// }

export const generateAccessToken = (payload: object): string => {
  const secret = env.JWT_SECRET
  const options = { expiresIn: '20min' }
  return jwt.sign(payload, secret, options)
}
export const generateRefreshToken = (payload: object): string => {
  const secret = env.JWT_REFRESH
  const options = { expiresIn: '10d' }
  return jwt.sign(payload, secret, options)
}
