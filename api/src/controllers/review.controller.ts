import { Request, Response } from 'express'

import Review from '../models/review.model'
import { authReq } from '../models/@types'

const reviewControllers = {
  fetchAllReviews: async (req: Request, res: Response) => {
    Review.find()
      .then((reviews) => {
        return res.status(200).json(reviews)
      })
      .catch((err: any) =>
        res
          .status(404)
          .json({ message: 'reviews not found', error: err.message })
      )
  },

  addOneReview: async (req: authReq, res: Response) => {
    try {
      const review = new Review({
        user: req.user._id,
        ...req.body,
      })

      await review.save()

      res.status(201).json({ message: 'updated successfully', review })
    } catch (err: any) {
      res.status(404).json({ message: 'review not found', error: err.message })
    }
  },

  //   fetchOneReview: (req: Request, res: Response) => {
  //     Review.findById(req.params.id)
  //       .then((review) => res.status(200).json(review))
  //       .catch((err) =>
  //         res
  //           .status(404)
  //           .json({ message: 'review not found', error: err.message })
  //       )
  //   },

  deleteOneReview: (req: Request, res: Response) => {
    Review.findByIdAndRemove(req.params.id)
      .then((data) =>
        res.status(200).json({
          message: `review with id:${req.params.id} deleted successfully`,
        })
      )
      .catch((err) =>
        res
          .status(404)
          .json({ message: 'review not found', error: err.message })
      )
  },

  updateOneReview: (req: Request, res: Response) => {
    Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((review) =>
        res.status(200).json({ message: 'updated successfully', review })
      )
      .catch((err) =>
        res
          .status(404)
          .json({ message: 'review not found', error: err.message })
      )
  },
}

export default reviewControllers
