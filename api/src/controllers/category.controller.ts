import { Request, Response } from 'express'

import Category from '../models/category.model'

const categoryControllers = {
  fetchAllCategorys: async (req: Request, res: Response) => {
    Category.find()
      .then((categories) => {
        return res.status(200).json(categories)
      })
      .catch((err: any) =>
        res
          .status(404)
          .json({ message: 'categories not found', error: err.message })
      )
  },

  addOneCategory: async (req: Request, res: Response) => {
    try {
      const category = new Category(req.body)

      await category.save()
      res.status(201).json({ message: 'updated successfully', category })
    } catch (err: any) {
      res
        .status(404)
        .json({ message: 'category not found', error: err.message })
    }
  },

  //   fetchOneCategory: (req: Request, res: Response) => {
  //     Category.findById(req.params.id)
  //       .then((category) => res.status(200).json(category))
  //       .catch((err) =>
  //         res
  //           .status(404)
  //           .json({ message: 'category not found', error: err.message })
  //       )
  //   },

  deleteOneCategory: (req: Request, res: Response) => {
    Category.findByIdAndRemove(req.params.id)
      .then((data) =>
        res.status(200).json({
          message: `category with id:${req.params.id} deleted successfully`,
        })
      )
      .catch((err) =>
        res
          .status(404)
          .json({ message: 'category not found', error: err.message })
      )
  },

  updateOneCategory: (req: Request, res: Response) => {
    Category.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then((category) =>
        res.status(200).json({ message: 'updated successfully', category })
      )
      .catch((err) =>
        res
          .status(404)
          .json({ message: 'category not found', error: err.message })
      )
  },
}

export default categoryControllers
