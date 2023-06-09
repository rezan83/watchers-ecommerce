import { ObjectId, Schema, model } from 'mongoose'
import Review from './review.model'

export interface IProduct {
  _id?: ObjectId
  name: string
  description?: string
  price: number
  categories?: Schema.Types.ObjectId[]
  createdAt: Date
  createdBy: Schema.Types.ObjectId
  image?: string
  featured?: boolean
  reviews?: Schema.Types.ObjectId[]
  rating: number
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
  image: { type: String, contentType: String },
  featured: { type: Boolean, default: false },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  rating: { type: Number, default: 0 },
}, { toJSON: { virtuals: true } })

productSchema.virtual('reviews_count').get(function() {
  return this.reviews?.length || 0;
});

const Product = model<IProduct>('Product', productSchema)

export default Product
