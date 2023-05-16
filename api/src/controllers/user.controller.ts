import { Request, Response } from 'express'

import User from '../models/user.model'

const userControllers = {
  userProfile: (req: Request, res: Response) => {
    console.log("user:", req.body)
    try {
      return res.status(200).json({
        message: 'Profile returned', user: req.body.user,
      })
    } catch (error: any) {
      return res.status(500).json({
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
    const userId = req.params.id || req.body.user?._id
    User.findByIdAndRemove(userId)
      .then((data) =>
        res.status(200).json({
          message: `user with id:${userId} deleted successfully`,
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
