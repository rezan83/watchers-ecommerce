import { Router } from 'express'
import categoryControllers from '../controllers/category.controller'
import { isAddmin, isLogedIn } from '../middlewares/auth'
const categoriesRoute = Router()

categoriesRoute.get(
  '/',
  // isLogedIn,
  categoryControllers.fetchAllCategorys
)
// categoriesRoute.get('/:id', isLogedIn, categoryControllers.fetchOneCategory)

// only admin
categoriesRoute.put(
  '/',
  isLogedIn,
  isAddmin,
  categoryControllers.updateOneCategory
)
categoriesRoute.delete(
  '/',
  isLogedIn,
  isAddmin,
  categoryControllers.deleteOneCategory
)
categoriesRoute.post(
  '/',
  isLogedIn,
  isAddmin,
  categoryControllers.addOneCategory
)

export default categoriesRoute
