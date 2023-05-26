import { Request, Response } from 'express'

import Category from '../models/category.model'

const categoryControllers = {
  fetchAllCategorys: async (req: Request, res: Response) => {
    Category.find()
      .then((categorys) => {
        return res.status(200).json(categorys)
      })
      .catch((err: any) =>
        res
          .status(404)
          .json({ message: 'categorys not found', error: err.message })
      )
  },

  addOneCategory: (req: Request, res: Response) => {
    try {
      const newCategory = new Category(req.body)

      newCategory.save()
      res.status(201).json({ message: 'updated successfully', newCategory })
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
    Category.findByIdAndUpdate(req.params.id, req.body)
      .then((data) =>
        res.status(200).json({ message: 'updated successfully', data })
      )
      .catch((err) =>
        res
          .status(404)
          .json({ message: 'category not found', error: err.message })
      )
  },
}

export default categoryControllers
