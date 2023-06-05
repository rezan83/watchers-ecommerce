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

reviewSchema.post('findOneAndUpdate', async function (doc, next) {
  const relatedProduct: any = await Product.findById(doc.product)
  if (relatedProduct) {
    if (!!relatedProduct.reviews?.length) {
      relatedProduct.reviews = [doc._id]
    } else if (!relatedProduct.reviews.includes(doc._id)) {
      relatedProduct.reviews.push(doc._id)
    }
    await relatedProduct.save()
    relatedProduct.populate('reviews').then(() => {
      relatedProduct.rating = relatedProduct.reviews.length
        ? (relatedProduct.reviews.reduce((a: number, b: any) => {
            return a + b.rating
          }, 0) +
            doc.rating) /
          (relatedProduct.reviews.length + 1)
        : doc.rating
      relatedProduct.save()
    })
  }
  next()
})

const Review = model<IReview>('Review', reviewSchema)
export default Review
