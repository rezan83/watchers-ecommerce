import { Router } from 'express'
import productControllers from '../controllers/product.controller'
import { isAddmin, isLogedIn } from '../middlewares/auth'
// import { upload, uploadToCloudinary } from '../middlewares/uploader'
const productsRoute = Router()

productsRoute.get('/', isLogedIn, productControllers.fetchAllProducts)

productsRoute.get('/:id', isLogedIn, productControllers.fetchOneProduct)

// only admin
productsRoute.put(
  '/:id',
  isLogedIn,
  isAddmin,
  // upload.single('image'),
  // uploadToCloudinary,
  productControllers.updateOneProduct
)
productsRoute.delete(
  '/:id',
  isLogedIn,
  isAddmin,
  productControllers.deleteOneProduct
)
productsRoute.post(
  '/',
  isLogedIn,
  isAddmin,
  // upload.single('image'),
  // uploadToCloudinary,
  productControllers.addOneProduct
)

export default productsRoute
