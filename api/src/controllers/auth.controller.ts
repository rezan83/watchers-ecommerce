import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/user.model'
import { comparePass, hashPass } from '../helpers/bcryptPass'
import { env } from '../config'
import sendEmail from '../helpers/mailer'
import {
  generateAccessToken,
  generateRefreshToken,
  // setJwtRefreshToCookie,
} from '../helpers/jwtGenerator'

const authController = {

  registerUser: async (req: Request, res: Response) => {
    const { name, password, email } = req.body
    if (!name || !email || !password) {
      return res.status(404).json({
        message: 'name, email, phone or password is missing',
      })
    }
    if (password.length < 6) {
      return res.status(404).json({
        message: 'minimum length for password is 6 characters',
      })
    }
    const isUserFound = await User.findOne({ email })
    if (isUserFound) {
      return res
        .status(400)
        .json({ message: 'there is a user with same email' })
    }

    const hashedPass = await hashPass(password)
    jwt.sign(
      { name, hashedPass, email },
      env.JWT_SECRET,
      { expiresIn: '10min' },
      function (err, token) {
        if (err) {
          return res.status(400).json({ message: 'something went wrong' })
        }
        const emailInfo = {
          email,
          subject: 'hello',
          html: `<h2>Hello ${name}</h2>
                 <p>Please click the link bellow to verify your email</p>
                 <p>Then login using your credentials</p>
                 <a style="color:white;text-decoration:none;padding:1rem;line-height:2rem;background:dodgerblue;" href="${env.SERVER_URL}/api/v1/auth/verify/${token}" target="_blank">ACTIVATE</a>
                 `,
        }

        sendEmail(emailInfo)
        return res.status(200).json({
          message: 'A verification link has been sent to your email.',
        })
      }
    )
  },

  verifyUser: async (req: Request, res: Response) => {
    const { token } = req.params
    if (!token) {
      return res.status(404).json({
        message: 'token is missing',
      })
    }
    jwt.verify(token, env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: 'token is expired',
        })
      }
      interface JwtPayload {
        name: string
        email: string
        hashedPass: string
        phone?: number
        // image?: {
        //   type: Buffer
        //   mimetype: string
        //   originalFilename: string
        //   filepath: string
        // }
      }

      const { name, email, hashedPass } = decoded as JwtPayload
      const isUserFound = await User.findOne({ email: email })
      if (isUserFound) {
        res.status(400).json({
          message: 'user with this email is already there',
        })
      }
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPass,
        is_verified: true,
      })

      //   if (image) {
      //     const userImag = {
      //       data: fs.readFileSync(image.filepath),
      //       contentType: image.mimetype
      //     };
      //     newUser.image = userImag;
      //   }

      const user = await newUser.save()
      if (!user) {
        res.status(400).json({
          message: 'user was not created',
        })
      }
      // res.status(200).json({
      //   message: 'user was created, ready to sign in',
      // })
      res.redirect(env.CLIENT_URL + '/login/success')
    })
  },

  forgetPassword: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(404).json({
          message: 'email or password is missing',
        })
      }
      if (password.length < 6) {
        return res.status(404).json({
          message: 'minimum length for password is 6 characters',
        })
      }
      const user = await User.findOne({ email: email })
      if (!user) {
        return res.status(400).json({
          message: 'user with this email does not exist, please register first',
        })
      }
      const hashedPass = await hashPass(password)

      //   req.session.userId = user._id;

      jwt.sign(
        { hashedPass, email },
        env.JWT_SECRET,
        { expiresIn: '10min' },
        function (err, token) {
          if (err) {
            return res.status(400).json({ message: 'something went wrong' })
          }

          const emailInfo = {
            email,
            subject: 'hello',
            html: `<h2>Hello ${user.name}</h2>
                  <p>Please click the link bellow to verify your new password</p>
                  <p>After that, just use it to log in again</p>
                  <a style="color:white;text-decoration:none;padding:1rem;line-height:2rem;background:dodgerblue;" href="${env.SERVER_URL}/api/v1/auth/verify-password/${token}" target="_blank">ACTIVATE</a>
                  `,
          }

          sendEmail(emailInfo)
          return res.status(200).json({
            message: 'A verification link has been sent to your email.',
          })
        }
      )
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      })
    }
  },

  verifyPassword: async (req: Request, res: Response) => {
    const { token } = req.params
    if (!token) {
      return res.status(404).json({
        message: 'token is missing',
      })
    }
    jwt.verify(token, env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: 'token is expired',
        })
      }
      interface JwtPayload {
        name: string
        email: string
        hashedPass: string
      }

      const { email, hashedPass } = decoded as JwtPayload
      const isUserUpdated = await User.findOneAndUpdate(
        { email: email },
        {
          password: hashedPass,
          is_verified: true,
        },
        { new: true }
      )
      if (!isUserUpdated) {
        res.status(400).json({
          message: 'could not perform action',
        })
      }

      res.redirect(env.CLIENT_URL + '/login')
    })
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(404).json({
          message: 'email or password is missing',
        })
      }
      if (password.length < 6) {
        return res.status(404).json({
          message: 'minimum length for password is 6 characters',
        })
      }
      const user = await User.findOne({ email: email }).populate('orders')
      console.log(user)
      if (!user) {
        return res.status(400).json({
          message: 'user with this email does not exist, please register first',
        })
      }

      const isPasswordMatch = await comparePass(password, user.password)
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: 'email/password does not match',
        })
      }
      //creating a access token
      const accessToken = generateAccessToken({ email })
      // Creating refresh token not that expiry of refresh
      //token is greater than the access token

      const refreshToken = generateRefreshToken({ email })

      // setJwtRefreshToCookie(res, refreshToken)

      return res.status(200).json({
        accessToken,
        refreshToken,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          is_admin: user.is_admin,
          image: user.image
        },
        message: 'login successful',
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      })
    }
  },

  logoutUser: (req: Request, res: Response) => {
    try {
      res.clearCookie('refreshToken')
      res.status(200).json({
        message: 'logout successful',
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      })
    }
  },

  refreshUser: async (req: Request, res: Response) => {
    try {
      if (req.cookies?.refreshToken || req.body.refreshToken) {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken

        jwt.verify(
          refreshToken,
          env.JWT_REFRESH,
          async (err: any, userCredentials: any) => {
            if (err) {
              return res.status(401).json({ message: 'Unauthorized' })
            } else {
              const accessToken = generateAccessToken({
                email: userCredentials.email,
              })
              const refreshToken = generateRefreshToken({
                email: userCredentials.email,
              })

              // setJwtRefreshToCookie(res, refreshToken)
              const refreshUser = await User.findOne({email:userCredentials.email})
              
              return res.status(200).json({
                accessToken,
                refreshToken,
                user: {
                  name: refreshUser?.name,
                  email: refreshUser?.email,
                  phone: refreshUser?.phone,
                  image: refreshUser?.image,
                  is_admin: refreshUser?.is_admin,
                },
              })
            }
          }
        )
      } else {
        return res.status(401).json({ message: 'Unauthorized' })
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  },
}

export default authController
