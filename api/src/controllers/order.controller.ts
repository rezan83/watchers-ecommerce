import { Request, Response } from 'express'

import Order from '../models/order.model'
import { authReq } from '../models/@types'
import City, { ICity } from '../models/city.model'

const orderControllers = {
  fetchAllOrders: async (req: Request, res: Response) => {
    Order.find()
      .then((orders) => {
        return res.status(200).json(orders)
      })
      .catch((err: any) =>
        res
          .status(404)
          .json({ message: 'orders not found', error: err.message })
      )
  },

  addOneOrder: async (req: authReq, res: Response) => {
    const city = (await City.findOne({
      name: req.body.address.city,
      country: req.body.address.country,
    })) as ICity
    const address = { ...req.body.address, lat: city.lat, lng: city.lng }
    try {
      const order = new Order({
        user: req.user._id,
        ...req.body,
        address,
      })

      await order.save()

      res.status(201).json({ message: 'updated successfully', order })
    } catch (err: any) {
      res.status(404).json({ message: 'order not found', error: err.message })
    }
  },

  //   fetchOneOrder: (req: Request, res: Response) => {
  //     Order.findById(req.params.id)
  //       .then((order) => res.status(200).json(order))
  //       .catch((err) =>
  //         res
  //           .status(404)
  //           .json({ message: 'order not found', error: err.message })
  //       )
  //   },

  deleteOneOrder: (req: Request, res: Response) => {
    Order.findByIdAndRemove(req.params.id)
      .then((data) =>
        res.status(200).json({
          message: `order with id:${req.params.id} deleted successfully`,
        })
      )
      .catch((err) =>
        res.status(404).json({ message: 'order not found', error: err.message })
      )
  },

  updateOneOrder: (req: Request, res: Response) => {
    Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((order) =>
        res.status(200).json({ message: 'updated successfully', order })
      )
      .catch((err) =>
        res.status(404).json({ message: 'order not found', error: err.message })
      )
  },
}

export default orderControllers
