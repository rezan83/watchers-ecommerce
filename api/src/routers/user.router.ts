import { Router } from 'express'
import userControllers from '../controllers/user.controller'
import { isLogedIn } from '../middlewares/auth'
const usersRoute = Router()

usersRoute.put('/', isLogedIn, userControllers.updateOneUser)
usersRoute.delete('/', isLogedIn, userControllers.deleteOneUser)
usersRoute.post('/profile', isLogedIn, userControllers.userProfile)

export default usersRoute
