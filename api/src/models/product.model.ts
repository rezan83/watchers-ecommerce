import { ObjectId, Schema, model } from 'mongoose'

export interface IProduct {
  _id?: ObjectId
  name: string
  description?: string
  categories?: string[]
  createdAt: Date
  image?: string
  //   variants, sizes
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: [String],

  createdAt: { type: Date, default: Date.now },
  image: { type: String, contentType: String },
  //   variants, sizes
})

const Product = model<IProduct>('Product', productSchema)

export default Product
