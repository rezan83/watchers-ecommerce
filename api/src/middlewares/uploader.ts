import multer from 'multer'
import cloudinary from '../db/cloudinary'
import { Request, Response, NextFunction } from 'express'

const storage = multer.memoryStorage()
const upload = multer({ storage })

interface uploadReq extends Request {
  image?: string
}
const uploadToCloudinary = async (
  req: uploadReq,
  res: Response,
  next: NextFunction
) => {
  const { file } = req
  if (file?.originalname) {
    cloudinary.uploader
      .upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          return next(error)
        }

        req.body.image = result?.secure_url
        next()
      })
      .end(file?.buffer)
  }
  next()
}

export { upload, uploadToCloudinary }