import { Request, Response } from 'express'
import { SortOrder } from 'mongoose'

import User from '../models/user.model'

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
