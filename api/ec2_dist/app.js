"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// import session from 'express-session'
// import cookieParser from 'cookie-parser'
// import passport from 'passport'
// import apiErrorHandler from './middlewares/apiErrorHandler'
// import apiContentType from './middlewares/apiContentType'
// import movieRouter from './routers/movie.router'
const user_router_1 = __importDefault(require("./routers/user.router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("./config");
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const product_router_1 = __importDefault(require("./routers/product.router"));
const admin_router_1 = __importDefault(require("./routers/admin.router"));
const category_router_1 = __importDefault(require("./routers/category.router"));
const order_router_1 = __importDefault(require("./routers/order.router"));
const review_router_1 = __importDefault(require("./routers/review.router"));
dotenv_1.default.config({ path: '.env' });
const app = (0, express_1.default)();
// Express configuration
app.set('port', config_1.env.PORT);
// Global middleware
app.use((0, cors_1.default)({
    origin: config_1.env.CLIENT_URL,
    credentials: true,
}));
app.use((0, morgan_1.default)('dev'));
// app.use(apiContentType)
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.set("trust proxy", 1);
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
app.use('/api/v1/auth', auth_router_1.default);
app.use('/api/v1/admin', admin_router_1.default);
app.use('/api/v1/users', user_router_1.default);
app.use('/api/v1/products', product_router_1.default);
app.use('/api/v1/categories', category_router_1.default);
app.use('/api/v1/orders', order_router_1.default);
app.use('/api/v1/reviews', review_router_1.default);
app.get('/', (req, res) => {
    res.status(200).json({ message: "hello world" });
});
// Custom API error handler
// app.use(apiErrorHandler)
exports.default = app;
//# sourceMappingURL=app.js.map