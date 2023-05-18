import { Router } from 'express'
import adminControllers from '../controllers/admin.controller'
import { isAddmin, isLogedIn } from '../middlewares/auth'
const adminRoute = Router()

adminRoute.get(
  '/all-users',
  isLogedIn,
  isAddmin,
  adminControllers.fetchAllUsers
)
adminRoute.get('/:id', isLogedIn, isAddmin, adminControllers.fetchOneUser)

adminRoute.get('/', isLogedIn, isAddmin, adminControllers.admin)
adminRoute.delete('/:id', isLogedIn, isAddmin, adminControllers.deleteOneUser)
adminRoute.put('/:id', isLogedIn, isAddmin, adminControllers.updateOneUser)
adminRoute.put('/ban/:id', isLogedIn, isAddmin, adminControllers.banUser)
adminRoute.put('/unban/:id', isLogedIn, isAddmin, adminControllers.unbanUser)

export default adminRoute
