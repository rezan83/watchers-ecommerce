"use strict";
// import errorHandler from 'errorhandler'
// import mongoose from 'mongoose'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
try {
    (0, db_1.default)();
}
catch (error) {
    console.log(error);
}
const app_1 = __importDefault(require("./app"));
// import { MONGODB_URI } from './util/secrets'
// import logger from './util/logger'
// const mongoUrl = MONGODB_URI
// mongoose
//   .connect(mongoUrl)
//   .then(() => {
//     logger.info('Connected to MongoDB')
//   })
//   .catch((err: Error) => {
//     console.log(
//       'MongoDB connection error. Please make sure MongoDB is running. ' + err
//     )
//     process.exit(1)
//   })
/**
 * Error Handler. Provides error handing middleware
   only use in development
 */
// if (process.env.NODE_ENV === 'development') {
//   app.use(errorHandler())
// }
// Start Express server
app_1.default.listen(app_1.default.get('port'), () => {
    console.log('  App is running at http://localhost:%d in %s mode', app_1.default.get('port'), app_1.default.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
//# sourceMappingURL=server.js.map