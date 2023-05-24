import { Request, Response } from 'express'

import User from '../models/user.model'
import { authReq } from '../models/@types'
import { uploadToCloudinary } from '../middlewares/uploader'

const userControllers = {
  userProfile: (req: Request, res: Response) => {
    const user = req.user
    try {
      return res.status(200).json({
        message: 'Profile returned',
        user,
      })
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      })
    }
  },

  deleteOneUser: (req: authReq, res: Response) => {
    User.findByIdAndRemove(req.user?._id)
      .then((data) =>
        res.status(200).json({
          message: `user with id:${req.user?._id} deleted successfully`,
        })
      )
      .catch((err) =>
        res.status(404).json({ message: 'user not found', error: err.message })
      )
  },

  updateOneUser: async (req: authReq, res: Response) => {
    const image = await uploadToCloudinary(req, res)
    User.findOneAndUpdate(
      req.user._id,
      { ...req.body, image },
      {
        new: true,
      }
    )
      .then((user) => {
        console.log(user)
        res.status(200).json({ message: 'updated successfully', user })
      })
      .catch((err) =>
        res.status(404).json({ message: 'user not found', error: err.message })
      )
  },
}

export default userControllers
