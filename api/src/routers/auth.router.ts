import { Router } from 'express'
import authControllers from '../controllers/auth.controller'
const authRoute = Router()

authRoute.post('/register', authControllers.registerUser)
authRoute.post('/login', authControllers.loginUser)
authRoute.post('/refresh', authControllers.refreshUser)
authRoute.post('/logout', authControllers.logoutUser)
authRoute.post('/forgetPassword', authControllers.forgetPassword)
authRoute.get('/verify/:token', authControllers.verifyUser)
authRoute.get('/verifyPassword/:token', authControllers.verifyPassword)

export default authRoute
