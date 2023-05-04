import mongoose, { ConnectOptions } from 'mongoose'
import { env } from '../config'

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI || '', connectOptions)

    console.log('MongoDB is connected')
  } catch (err: any) {
    console.error('err:', err.message)
  }
}

export default connectDB
