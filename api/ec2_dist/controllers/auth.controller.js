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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptPass_1 = require("../helpers/bcryptPass");
const config_1 = require("../config");
const mailer_1 = __importDefault(require("../helpers/mailer"));
const jwtGenerator_1 = require("../helpers/jwtGenerator");
const authController = {
    registerUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, password, email } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({
                message: 'name, email, phone or password is missing',
            });
        }
        if (password.length < 6) {
            return res.status(404).json({
                message: 'minimum length for password is 6 characters',
            });
        }
        const isUserFound = yield user_model_1.default.findOne({ email });
        if (isUserFound) {
            return res
                .status(400)
                .json({ message: 'there is a user with same email' });
        }
        const hashedPass = yield (0, bcryptPass_1.hashPass)(password);
        jsonwebtoken_1.default.sign({ name, hashedPass, email }, config_1.env.JWT_SECRET, { expiresIn: '10min' }, function (err, token) {
            if (err) {
                return res.status(400).json({ message: 'something went wrong' });
            }
            const emailInfo = {
                email,
                subject: 'hello',
                html: `<h2>Hello ${name}</h2>
                 <p>Please click the link bellow to verify your email</p>
                 <p>Then login using your credentials</p>
                 <a style="color:white;text-decoration:none;padding:1rem;line-height:2rem;background:dodgerblue;" href="${config_1.env.SERVER_URL}/api/v1/auth/verify/${token}" target="_blank">ACTIVATE</a>
                 `,
            };
            (0, mailer_1.default)(emailInfo);
            return res.status(200).json({
                message: 'A verification link has been sent to your email.',
            });
        });
    }),
    verifyUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.params;
        if (!token) {
            return res.status(404).json({
                message: 'token is missing',
            });
        }
        jsonwebtoken_1.default.verify(token, config_1.env.JWT_SECRET, function (err, decoded) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(401).json({
                        message: 'token is expired',
                    });
                }
                const { name, email, hashedPass } = decoded;
                const isUserFound = yield user_model_1.default.findOne({ email: email });
                if (isUserFound) {
                    res.status(400).json({
                        message: 'user with this email is already there',
                    });
                }
                const newUser = new user_model_1.default({
                    name: name,
                    email: email,
                    password: hashedPass,
                    is_verified: true,
                });
                //   if (image) {
                //     const userImag = {
                //       data: fs.readFileSync(image.filepath),
                //       contentType: image.mimetype
                //     };
                //     newUser.image = userImag;
                //   }
                const user = yield newUser.save();
                if (!user) {
                    res.status(400).json({
                        message: 'user was not created',
                    });
                }
                // res.status(200).json({
                //   message: 'user was created, ready to sign in',
                // })
                res.redirect(config_1.env.CLIENT_URL + '/login/success');
            });
        });
    }),
    forgetPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(404).json({
                    message: 'email or password is missing',
                });
            }
            if (password.length < 6) {
                return res.status(404).json({
                    message: 'minimum length for password is 6 characters',
                });
            }
            const user = yield user_model_1.default.findOne({ email: email });
            if (!user) {
                return res.status(400).json({
                    message: 'user with this email does not exist, please register first',
                });
            }
            const hashedPass = yield (0, bcryptPass_1.hashPass)(password);
            //   req.session.userId = user._id;
            jsonwebtoken_1.default.sign({ hashedPass, email }, config_1.env.JWT_SECRET, { expiresIn: '10min' }, function (err, token) {
                if (err) {
                    return res.status(400).json({ message: 'something went wrong' });
                }
                const emailInfo = {
                    email,
                    subject: 'hello',
                    html: `<h2>Hello ${user.name}</h2>
                  <p>Please click the link bellow to verify your new password</p>
                  <p>After that, just use it to log in again</p>
                  <a style="color:white;text-decoration:none;padding:1rem;line-height:2rem;background:dodgerblue;" href="${config_1.env.SERVER_URL}/api/v1/auth/verify-password/${token}" target="_blank">ACTIVATE</a>
                  `,
                };
                (0, mailer_1.default)(emailInfo);
                return res.status(200).json({
                    message: 'A verification link has been sent to your email.',
                });
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }),
    verifyPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.params;
        if (!token) {
            return res.status(404).json({
                message: 'token is missing',
            });
        }
        jsonwebtoken_1.default.verify(token, config_1.env.JWT_SECRET, function (err, decoded) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(401).json({
                        message: 'token is expired',
                    });
                }
                const { email, hashedPass } = decoded;
                const isUserUpdated = yield user_model_1.default.findOneAndUpdate({ email: email }, {
                    password: hashedPass,
                    is_verified: true,
                }, { new: true });
                if (!isUserUpdated) {
                    res.status(400).json({
                        message: 'could not perform action',
                    });
                }
                res.redirect(config_1.env.CLIENT_URL + '/login');
            });
        });
    }),
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(404).json({
                    message: 'email or password is missing',
                });
            }
            if (password.length < 6) {
                return res.status(404).json({
                    message: 'minimum length for password is 6 characters',
                });
            }
            const user = yield user_model_1.default.findOne({ email: email }).populate('orders');
            console.log(user);
            if (!user) {
                return res.status(400).json({
                    message: 'user with this email does not exist, please register first',
                });
            }
            const isPasswordMatch = yield (0, bcryptPass_1.comparePass)(password, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({
                    message: 'email/password does not match',
                });
            }
            //creating a access token
            const accessToken = (0, jwtGenerator_1.generateAccessToken)({ email });
            // Creating refresh token not that expiry of refresh
            //token is greater than the access token
            const refreshToken = (0, jwtGenerator_1.generateRefreshToken)({ email });
            // setJwtRefreshToCookie(res, refreshToken)
            return res.status(200).json({
                accessToken,
                refreshToken,
                user: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    is_admin: user.is_admin,
                    image: user.image
                },
                message: 'login successful',
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }),
    logoutUser: (req, res) => {
        try {
            res.clearCookie('refreshToken');
            res.status(200).json({
                message: 'logout successful',
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },
    refreshUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken) || req.body.refreshToken) {
                const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
                jsonwebtoken_1.default.verify(refreshToken, config_1.env.JWT_REFRESH, (err, userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        return res.status(401).json({ message: 'Unauthorized' });
                    }
                    else {
                        const accessToken = (0, jwtGenerator_1.generateAccessToken)({
                            email: userCredentials.email,
                        });
                        const refreshToken = (0, jwtGenerator_1.generateRefreshToken)({
                            email: userCredentials.email,
                        });
                        // setJwtRefreshToCookie(res, refreshToken)
                        const refreshUser = yield user_model_1.default.findOne({ email: userCredentials.email });
                        return res.status(200).json({
                            accessToken,
                            refreshToken,
                            user: {
                                name: refreshUser === null || refreshUser === void 0 ? void 0 : refreshUser.name,
                                email: refreshUser === null || refreshUser === void 0 ? void 0 : refreshUser.email,
                                phone: refreshUser === null || refreshUser === void 0 ? void 0 : refreshUser.phone,
                                image: refreshUser === null || refreshUser === void 0 ? void 0 : refreshUser.image,
                                is_admin: refreshUser === null || refreshUser === void 0 ? void 0 : refreshUser.is_admin,
                            },
                        });
                    }
                }));
            }
            else {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }),
};
exports.default = authController;
//# sourceMappingURL=auth.controller.js.map