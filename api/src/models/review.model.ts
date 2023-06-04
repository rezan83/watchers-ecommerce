import { ObjectId, Schema, model } from 'mongoose'
import Product, { IProduct } from './product.model'

export interface IReview {
  _id?: ObjectId
  user: ObjectId
  product: ObjectId
  rating: number
  comment?: string
}

const reviewSchema = new Schema<IReview>({
  // _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  rating: {
    type: Number,
    required: true,
  },
  comment: String,
})

reviewSchema.post('save', async function (doc, next) {
  const relatedProduct: any = await Product.findById(this.product).populate(
    'reviews'
  )

  relatedProduct.rating = relatedProduct.reviews.length
    ? (relatedProduct.reviews.reduce((a: number, b: any) => a + b.rating, 0) +
        this.rating) /
      (relatedProduct.reviews.length + 1)
    : this.rating
  relatedProduct.reviews = relatedProduct.reviews.length
    ? [...relatedProduct.reviews, this._id]
    : [this._id]

  relatedProduct.save()
  next()
})

const Review = model<IReview>('Review', reviewSchema)
export default Review
