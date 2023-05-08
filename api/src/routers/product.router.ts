import { Router } from 'express'
import productControllers from '../controllers/product.controller'
import { isAddmin, isLogedIn } from '../middlewares/auth'
const productsRoute = Router()

productsRoute.get('/', isLogedIn, productControllers.fetchAllProducts)
productsRoute.get('/:id', isLogedIn, productControllers.fetchOneProduct)
productsRoute.put('/', isLogedIn, isAddmin, productControllers.updateOneProduct)
productsRoute.delete(
  '/',
  isLogedIn,
  isAddmin,
  productControllers.deleteOneProduct
)
// productsRoute.post('/', isLogedIn,isAddmin, productControllers.addProduct)

export default productsRoute
