import { Address } from '@paypal/paypal-js'
import { ObjectId, Schema, model } from 'mongoose'

export interface IOrder {
  _id?: ObjectId
  user: ObjectId
  createdAt: Date
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
  }
  address: {
    city: string
    country: string
    lat: string
    lng: string
  }
}

const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
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
  },
  address: {
    address_line_1: { type: String, required: false },
    address_line_2: { type: String, required: false },
    admin_area_1: { type: String, required: false },
    city: { type: String, required: false },
    postal_code: { type: String, required: false },
    country: String,
    lat: String,
    lng: String,
  },
})

const Order = model<IOrder>('Order', orderSchema)

export default Order
