import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import session from 'express-session'
// import cookieParser from 'cookie-parser'
// import passport from 'passport'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import movieRouter from './routers/movie.router'
import usersRouter from './routers/user.router'
import cookieParser from 'cookie-parser'
import { env } from './config'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)
app.use(apiContentType)
app.use(express.json())
app.use(cookieParser())
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.initialize())
app.use(passport.session())
*/

// Set up routers
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/users', usersRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
