import { Address } from '@paypal/paypal-js'
import { ObjectId, Schema, model } from 'mongoose'

export interface IOrder {
  user: ObjectId
  _id?: ObjectId
  order_id: string | undefined
  products?: {
    id: ObjectId
    name: string
    price: string
  }[]
  total: number
  buyer: {
    full_name: string | undefined
    email: string | undefined
    address: Address | undefined
  }
}

const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  order_id: String,
  products: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: String,
    },
  ],
  total: Number,
  buyer: {
    full_name: String,
    email: String,
    address: {
      address_line_1: { type: String, required: false },
      address_line_2: { type: String, required: false },
      admin_area_1: { type: String, required: false },
      admin_area_2: { type: String, required: false },
      postal_code: { type: String, required: false },
      country_code: String,
    },
  },
})

const Order = model<IOrder>('Order', orderSchema)

export default Order
