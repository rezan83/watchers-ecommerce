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
exports.uploadToCloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("../db/cloudinary"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
const multerUploadMiddleware = upload.single('image');
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}
const uploadToCloudinary = (req, res
// next: NextFunction
) => __awaiter(void 0, void 0, void 0, function* () {
    let secure_url = '';
    yield runMiddleware(req, res, multerUploadMiddleware);
    if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        yield cloudinary_1.default.uploader
            .upload(dataURI, {
            resource_type: 'auto',
        })
            .then((data) => {
            secure_url = data === null || data === void 0 ? void 0 : data.secure_url;
        })
            .catch((err) => {
            console.log(err);
        });
    }
    return secure_url;
});
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=uploader.js.map