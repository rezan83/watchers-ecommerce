import { ObjectId, Schema, model } from 'mongoose'

export interface ICategory {
  _id?: ObjectId
  name: string
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

const Category = model<ICategory>('Category', categorySchema)

export default Category
