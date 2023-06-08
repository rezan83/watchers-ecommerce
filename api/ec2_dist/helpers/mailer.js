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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config_1.env.MAIL_USER,
        pass: config_1.env.MAIL_PASS, // generated ethereal password
    },
});
// async..await is not allowed in global scope, must use a wrapper
function sendEmail(emailInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //   let testAccount = await nodemailer.createTestAccount();
        // send mail with defined transport object
        let sendingEmail = yield transporter.sendMail({
            from: config_1.env.MAIL_USER,
            to: emailInfo.email,
            subject: emailInfo.subject,
            // text: emailInfo.text || '', // plain text body
            html: emailInfo.html, // html body
        });
        console.log('Message sent: %s', sendingEmail.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(sendingEmail));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}
exports.default = sendEmail;
//# sourceMappingURL=mailer.js.map