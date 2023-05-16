import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
// import session from 'express-session'
// import cookieParser from 'cookie-parser'
// import passport from 'passport'

// import apiErrorHandler from './middlewares/apiErrorHandler'
// import apiContentType from './middlewares/apiContentType'
// import movieRouter from './routers/movie.router'
import usersRouter from './routers/user.router'
import cookieParser from 'cookie-parser'
import { env } from './config'
import authRouter from './routers/auth.router'
import productsRoute from './routers/product.router'
import adminRouter from './routers/admin.router'
import categoriesRoute from './routers/category.router'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', env.PORT)

// Global middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(morgan('dev'))
// app.use(apiContentType)
app.use(express.json())
app.use(cookieParser())
app.set("trust proxy", 1)
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,

//     cookie: {
//       sameSite: 'none',
//       httpOnly: false,
//       secure: false,
//       maxAge: 10 * 24 * 60 * 60 * 1000,
//     },
//     secret: 'secret',
//   })
// )
app.use(passport.initialize())
app.use(passport.session())
*/

// Set up routers
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/products', productsRoute)
app.use('/api/v1/categories', categoriesRoute)

// Custom API error handler
// app.use(apiErrorHandler)

export default app
