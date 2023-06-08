"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../models/order.model"));
const city_model_1 = __importDefault(require("../models/city.model"));
const orderControllers = {
    fetchAllOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        order_model_1.default.find()
            .then((orders) => {
            return res.status(200).json(orders);
        })
            .catch((err) => res
            .status(404)
            .json({ message: 'orders not found', error: err.message }));
    }),
    addOneOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const city = (yield city_model_1.default.findOne({
                name: req.body.address.city,
                country: req.body.address.country,
            }));
            console.log(city);
            const address = Object.assign(Object.assign({}, req.body.address), { lat: city.lat, lng: city.lng });
            const order = new order_model_1.default(Object.assign(Object.assign({ user: req.user._id }, req.body), { address }));
            yield order.save();
            res.status(201).json({ message: 'updated successfully', order });
        }
        catch (err) {
            res.status(404).json({ message: 'order not found', error: err.message });
        }
    }),
    //   fetchOneOrder: (req: Request, res: Response) => {
    //     Order.findById(req.params.id)
    //       .then((order) => res.status(200).json(order))
    //       .catch((err) =>
    //         res
    //           .status(404)
    //           .json({ message: 'order not found', error: err.message })
    //       )
    //   },
    deleteOneOrder: (req, res) => {
        order_model_1.default.findByIdAndRemove(req.params.id)
            .then((data) => res.status(200).json({
            message: `order with id:${req.params.id} deleted successfully`,
        }))
            .catch((err) => res.status(404).json({ message: 'order not found', error: err.message }));
    },
    updateOneOrder: (req, res) => {
        order_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((order) => res.status(200).json({ message: 'updated successfully', order }))
            .catch((err) => res.status(404).json({ message: 'order not found', error: err.message }));
    },
};
exports.default = orderControllers;
//# sourceMappingURL=order.controller.js.map