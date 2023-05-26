import { ObjectId, Schema, model } from 'mongoose'

export interface ICity {
  _id?: ObjectId
  country: string
  name: string
  lat: string
  lng: string
}

const citySchema = new Schema<ICity>({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
})

const City = model<ICity>('City', citySchema)

export default City
