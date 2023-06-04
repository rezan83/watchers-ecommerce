import { Router } from 'express'
import reviewControllers from '../controllers/review.controller'
import { isAddmin, isLogedIn } from '../middlewares/auth'
const veviewsRoute = Router()

veviewsRoute.post('/', isLogedIn, reviewControllers.addOneReview)

veviewsRoute.get('/', isLogedIn, reviewControllers.fetchAllReviews)
// veviewsRoute.get('/:id', isLogedIn, reviewControllers.fetchOneReview)

// only admin
veviewsRoute.put('/', isLogedIn, reviewControllers.updateOneReview)
veviewsRoute.delete('/', isLogedIn, reviewControllers.deleteOneReview)

export default veviewsRoute
