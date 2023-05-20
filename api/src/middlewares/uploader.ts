import multer from 'multer'
import cloudinary from '../db/cloudinary'
import { Request, Response, NextFunction } from 'express'

const storage = multer.memoryStorage()
const upload = multer({ storage })
const multerUploadMiddleware = upload.single('image')

function runMiddleware(req: Request, res: Response, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}
interface uploadReq extends Request {
  image?: string
}

const uploadToCloudinary = async (
  req: uploadReq,
  res: Response
  // next: NextFunction
) => {
  let secure_url: string = ''
  await runMiddleware(req, res, multerUploadMiddleware)

  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64

    await cloudinary.uploader
      .upload(dataURI, {
        resource_type: 'auto',
      })

      .then((data: any) => {
        secure_url = data?.secure_url
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
  return secure_url
}

export { upload, uploadToCloudinary }
