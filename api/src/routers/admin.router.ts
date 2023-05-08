import { Router } from 'express'
import adminControllers from '../controllers/admin.controller'
import { isAddmin, isLogedIn } from '../middlewares/auth'
const adminRoute = Router()

adminRoute.get('/all-users', isLogedIn, isAddmin, adminControllers.fetchAllUsers)
adminRoute.get('/', isLogedIn, isAddmin, adminControllers.admin)
adminRoute.delete('/:id', isLogedIn, isAddmin, adminControllers.deleteOneUser)
adminRoute.put('/ban/:id', isLogedIn, isAddmin, adminControllers.banUser)
adminRoute.put('/unban/:id', isLogedIn, isAddmin, adminControllers.unbanUser)

export default adminRoute
