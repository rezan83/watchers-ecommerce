import { ObjectId, Schema, model } from 'mongoose'

export interface IProduct {
  _id?: ObjectId
  name: string
  description?: string
  price: number
  categories?: Schema.Types.ObjectId[]
  createdAt: Date
  createdBy: Schema.Types.ObjectId
  image: string
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, contentType: String , required: true},
})

const Product = model<IProduct>('Product', productSchema)

export default Product
