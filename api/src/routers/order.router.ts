import { Router } from 'express'
import orderControllers from '../controllers/order.controller'
import { isAddmin, isLogedIn } from '../middlewares/auth'
const categoriesRoute = Router()

categoriesRoute.get(
  '/',
  isLogedIn,
  orderControllers.fetchAllOrders
)
// categoriesRoute.get('/:id', isLogedIn, orderControllers.fetchOneOrder)

// only admin
categoriesRoute.put(
  '/',
  isLogedIn,
  isAddmin,
  orderControllers.updateOneOrder
)
categoriesRoute.delete(
  '/',
  isLogedIn,
  isAddmin,
  orderControllers.deleteOneOrder
)
categoriesRoute.post(
  '/',
  isLogedIn,
  isAddmin,
  orderControllers.addOneOrder
)

export default categoriesRoute
