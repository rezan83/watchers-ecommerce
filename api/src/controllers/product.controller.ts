import { Request, Response } from 'express'
import { SortOrder } from 'mongoose'

import Product from '../models/product.model'
import { authReq } from '../models/@types'

const productControllers = {
  fetchAllProducts: async (req: Request, res: Response) => {
    const { limit = 0, page = 1, createdAt, minPrice = 0, maxPrice } = req.query
    const pages = !limit
      ? null
      : Math.ceil((await Product.countDocuments({})) / +limit)
    const next = pages === null ? false : +page < pages
    Product.find({ price: { $gte: minPrice, ...(maxPrice && {$lte: maxPrice}) } })
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .sort({ createdAt: createdAt } as { [key: string]: SortOrder })
      .then((products) => {
        return (
          pages
          ? res.json({
              page: +page,
              pages,
              next,
              products,
            })
          : 
          res.json(products))
      })
      .catch((err: any) =>
        res
          .status(404)
          .json({ message: 'products not found', error: err.message })
      )
  },

  addOneProduct: (req: authReq, res: Response) => {
    const id = req.user?._id
    console.log('addOneProduct:', req.body)
    try {
      const newProduct = new Product({
        createdBy: String(id),
        ...req.body,
      })

      newProduct.save()
      res.status(200).json({ message: 'updated successfully' })
    } catch (err: any) {
      res.status(404).json({ message: 'product not found', error: err.message })
    }
  },

  fetchOneProduct: (req: Request, res: Response) => {
    Product.findById(req.params.id)
      .then((product) => res.status(200).json(product))
      .catch((err) =>
        res
          .status(404)
          .json({ message: 'product not found', error: err.message })
      )
  },

  deleteOneProduct: (req: Request, res: Response) => {
    Product.findByIdAndRemove(req.params.id)
      .then((data) =>
        res.status(200).json({
          message: `product with id:${req.params.id} deleted successfully`,
        })
      )
      .catch((err) =>
        res
          .status(404)
          .json({ message: 'product not found', error: err.message })
      )
  },

  updateOneProduct: (req: Request, res: Response) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then((data) =>
        res.status(200).json({ message: 'updated successfully', data })
      )
      .catch((err) =>
        res
          .status(404)
          .json({ message: 'product not found', error: err.message })
      )
  },
}

export default productControllers

// Products
// Have different attributes: ID, name, description, categories, variants, sizes

// Get list of all products with/without pagination
// Get list of products, filtering (search) by: name, categories, variant
// Get a product by ID
// Admin:
// Add a new product, update info of a product, remove a product
// Ban a user, unban a user

// Sign up a new user (username, password, first name, last name, email)
// Sign in user with username/password
// Update user profile (first name, last name, email)
// Forget password request
// Change password (username, old password, new password)
