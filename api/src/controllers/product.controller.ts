import { Request, Response } from 'express'
import { SortOrder } from 'mongoose'

import Product from '../models/product.model'
import { authReq } from '../models/@types'
import { uploadToCloudinary } from '../middlewares/uploader'

const productControllers = {
  fetchAllProducts: async (req: Request, res: Response) => {
    const {
      limit = 0,
      page = 1,
      createdAt,
      minPrice = 0,
      maxPrice,
      searchName = '',
    } = req.query
    const pages = !limit
      ? null
      : Math.ceil((await Product.countDocuments({})) / +limit)
    const next = pages === null ? false : +page < pages

    const searchNameRgx = new RegExp(searchName as string, 'i')
    const filters = {
      price: { $gte: minPrice, ...(maxPrice && { $lte: maxPrice }) },
      $or: [
        { name: { $regex: searchNameRgx } },
        { description: { $regex: searchNameRgx } },
      ],
    }
    
    Product.find(filters)
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .sort({ createdAt: createdAt } as { [key: string]: SortOrder })
      .then((products) => {
        return pages
          ? res.json({
              page: +page,
              pages,
              next,
              products,
            })
          : res.json(products)
      })
      .catch((err: any) =>
        res
          .status(404)
          .json({ message: 'products not found', error: err.message })
      )
  },

  addOneProduct: async (req: authReq, res: Response) => {
    const image = await uploadToCloudinary(req, res)
    try {
      const newProduct = new Product({
        createdBy: String(req.user?._id),
        image,
        ...req.body,
      })

      await newProduct.save()
      res.status(200).json({ message: 'updated successfully' })
    } catch (err: any) {
      res.status(500).json({ message: err.message, error: err })
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

  updateOneProduct: async (req: Request, res: Response) => {
    const image = await uploadToCloudinary(req, res)
    try {
      await Product.findByIdAndUpdate(
        req.params.id,
        { ...(image && { image: image }), ...req.body },
        { new: true }
      )
        .then((product) =>
          res.status(200).json({ message: 'updated successfully', product })
        )
        .catch((err) =>
          res
            .status(404)
            .json({ message: 'product not found', error: err.message })
        )
    } catch (err: any) {
      res.status(500).json({ message: err.message, error: err })
    }

    // Product.findByIdAndUpdate(req.params.id, req.body)
    //   .then((data) =>
    //     res.status(200).json({ message: 'updated successfully', data })
    //   )
    //   .catch((err) =>
    //     res
    //       .status(404)
    //       .json({ message: 'product not found', error: err.message })
    //   )
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
