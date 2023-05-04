import { Router } from 'express'
import userControllers from '../controllers/user.controller'
import { isAddmin, isLogedIn } from '../middlewares/auth'
const usersRoute = Router()



usersRoute.get('/', isLogedIn, isAddmin, userControllers.fetchAllUsers)
usersRoute.get('/:id', isLogedIn, userControllers.fetchOneUser)
usersRoute.delete('/', isLogedIn, userControllers.deleteOneUser)
usersRoute.delete('/:id', isLogedIn, isAddmin, userControllers.deleteOneUser)
usersRoute.post('/profile', isLogedIn, userControllers.userProfile)
usersRoute.post('/admin', isLogedIn, isAddmin, userControllers.admin)
usersRoute.put('/:id', isLogedIn, userControllers.updateOneUser)


export default usersRoute
