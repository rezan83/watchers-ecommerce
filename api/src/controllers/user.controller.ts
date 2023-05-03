import { Request, Response } from 'express'
import { SortOrder } from 'mongoose'
import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import { comparePass, hashPass } from '../helpers/bcryptPass'
import { env } from '../config'
import sendEmail from '../helpers/mailer'

const userControllers = {
  fetchAllUsers: async (req: Request, res: Response) => {
    const { limit = 0, page = 1, title } = req.query
    const pages = !limit
      ? null
      : Math.ceil((await User.countDocuments({})) / +limit)
    const next = pages === null ? false : +page < pages
    User.find()
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .sort({ title: title } as { [key: string]: SortOrder })
      .then((users) => {
        pages
          ? res.json({
              page: +page,
              pages,
              next,
              users,
            })
          : res.json(users)
      })
      .catch((err) =>
        res.status(404).json({ message: 'users not found', error: err.message })
      )
  },
  registerUser: async (req: Request, res: Response) => {
    // const form = formidable({ multiples: true })

    // form.parse(req, async (err, fields, files) => {
    const { name, password, email, phone } = req.body
    if (!name || !email || !phone || !password) {
      return res.status(404).json({
        message: 'name, email, phone or password is missing',
      })
    }
    if (password.length < 8) {
      return res.status(404).json({
        message: 'minimum length for password is 8 characters',
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
      { name, hashedPass, email, phone },
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
             <a style="color:white;text-decoration:none;padding:1rem;line-height:2rem;background:dodgerblue;" href="${env.CLIENT_URL}/api/users/auth/verify/${token}" target="_blank">ACTIVATE</a>
             `,
        }

        sendEmail(emailInfo)
        return res.status(200).json({
          message: 'A verification link has been sent to your email.',
          token: token,
        })
      }
    )
    // })
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
        phone: number
        image?: {
          type: Buffer
          mimetype: string
          originalFilename: string
          filepath: string
        }
      }

      const { name, email, hashedPass, phone, image } = decoded as JwtPayload
      console.log('image:', image)
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
        phone: phone,
        is_verified: 1,
        image: undefined,
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
      res.status(200).json({
        message: 'user was created, ready to sign in',
      })
    })
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
          is_verified: 1,
        },
        { new: true }
      )
      if (!isUserUpdated) {
        res.status(400).json({
          message: 'could not perform action',
        })
      }
      const newUser = new User({
        password: hashedPass,
        is_verified: 1,
      })

      res.status(200).json({
        message: 'user was created, ready to sign in',
      })
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
      if (password.length < 8) {
        return res.status(404).json({
          message: 'minimum length for password is 8 characters',
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
              <a style="color:white;text-decoration:none;padding:1rem;line-height:2rem;background:dodgerblue;" href="${env.CLIENT_URL}/api/users/auth/verifyPassword/${token}" target="_blank">ACTIVATE</a>
              `,
          }

          sendEmail(emailInfo)
          return res.status(200).json({
            message: 'A verification link has been sent to your email.',
            token: token,
          })
        }
      )
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      })
    }
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(404).json({
          message: 'email or password is missing',
        })
      }
      if (password.length < 8) {
        return res.status(404).json({
          message: 'minimum length for password is 8 characters',
        })
      }
      const user = await User.findOne({ email: email })
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
      //   req.session.userId = user._id;
      //creating a access token
      const accessToken = jwt.sign(
        {
          email,
        },
        env.JWT_SECRET,
        {
          expiresIn: '10m',
        }
      )
      // Creating refresh token not that expiry of refresh
      //token is greater than the access token

      const refreshToken = jwt.sign(
        {
          email,
        },
        env.JWT_REFRESH,
        { expiresIn: '1d' }
      )

      // Assigning refresh token in http-only cookie
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })

      return res.status(200).json({
        accessToken,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
        },
        message: 'login successful',
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      })
    }
  },
  refreshUser: async (req: Request, res: Response) => {
    try {
      if (req.cookies?.jwt) {
        const refreshToken = req.cookies.jwt

        jwt.verify(
          refreshToken,
          env.JWT_REFRESH,
          (err: any, userCredentials: any) => {
            if (err) {
              return res.status(406).json({ message: 'Unauthorized' })
            } else {
              const accessToken = jwt.sign(
                {
                  username: userCredentials.username,
                  email: userCredentials.email,
                },
                env.JWT_SECRET,
                {
                  expiresIn: '10m',
                }
              )
              return res.json({ accessToken })
            }
          }
        )
      } else {
        return res.status(406).json({ message: 'Unauthorized' })
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  },
  userProfile: (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: 'Profile returned',
      })
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      })
    }
  },

  admin: (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: 'Admin returned',
      })
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      })
    }
  },

  logoutUser: (req: Request, res: Response) => {
    try {
      req.session.destroy(() => {})
      res.clearCookie('user_session')
      res.status(200).json({
        message: 'logout successful',
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      })
    }
  },

  fetchOneUser: (req: Request, res: Response) => {
    User.findById(req.params.id)
      .then((user) => res.status(200).json(user))
      .catch((err) =>
        res.status(404).json({ message: 'user not found', error: err.message })
      )
  },

  deleteOneUser: (req: Request, res: Response) => {
    User.findByIdAndRemove(req.params.id)
      .then((data) =>
        res.status(200).json({
          message: `user with id:${req.params.id} deleted successfully`,
        })
      )
      .catch((err) =>
        res.status(404).json({ message: 'user not found', error: err.message })
      )
  },

  updateOneUser: (req: Request, res: Response) => {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then((data) =>
        res.status(200).json({ message: 'updated successfully', data })
      )
      .catch((err) =>
        res.status(404).json({ message: 'user not found', error: err.message })
      )
  },
}

export default userControllers
