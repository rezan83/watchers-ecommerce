import { Router } from 'express';
// import session from 'express-session';
import userControllers from '../controllers/user.controller';
// import env from '../config';
import { isAddmin, isLogedIn } from '../middlewares/auth';
const usersRoute = Router();

// app.set('trust proxy', 1) // trust first proxy
// usersRoute.use(
//   session({
//     name: 'user_session',
//     secret: env.SESSION_SEC,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 10 * 60 * 1000 }
//   })
// );

usersRoute.get('/', isAddmin, userControllers.fetchAllUsers);
usersRoute.get('/:id', isLogedIn, userControllers.fetchOneUser);
usersRoute.delete('/', isLogedIn, userControllers.deleteOneUser);
usersRoute.delete('/:id', isAddmin, userControllers.deleteOneUser);
usersRoute.put('/:id', isLogedIn, userControllers.updateOneUser);
usersRoute.post('/auth/register', userControllers.registerUser);
usersRoute.post('/auth/login', userControllers.loginUser);
usersRoute.post('/auth/refresh', userControllers.refreshUser);
usersRoute.post('/auth/logout', userControllers.logoutUser);
usersRoute.post('/auth/profile', isLogedIn, userControllers.userProfile);
usersRoute.post('/auth/admin', isAddmin, userControllers.admin);
usersRoute.post('/auth/forgetPassword', userControllers.forgetPassword);
usersRoute.get('/auth/verify/:token', userControllers.verifyUser);
usersRoute.get('/auth/verifyPassword/:token', userControllers.verifyPassword);

export default usersRoute;

