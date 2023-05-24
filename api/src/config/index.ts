import { config } from 'dotenv'
import { resolve } from 'path'

config()
export const env = {
  PORT: process.env.PORT || 3001,
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'hbsdkjbjcbhtysscbbc',
  JWT_REFRESH: process.env.JWT_REFRESH || 'hbsdkjbjcbhdhshcbbc',
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_USER: process.env.MAIL_USER,
  CLIENT_URL: process.env.CLIENT_URL,
  SERVER_URL: process.env.SERVER_URL,
  SESSION_SEC: process.env.SESSION_SEC,

  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  ENV: process.env.ENV,

  UPLOAD: `${resolve(__dirname, '..')}/uploads/`,
}
