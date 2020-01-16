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
const user_1 = __importDefault(require("../a-2-models/user"));
const validators_1 = require("../validators");
exports.authRegisterPost = (path, auth) => auth.post(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validators_1.emailValidator(req.body.email))
        res.status(400).json({
            error: 'Email not valid! /^[\\w]{1}[\\w-\\.]*@[\\w-]+\\.[a-z]{2,7}$/i.test(\'x@x.xx\')',
            email: req.body.email
        });
    else if (!validators_1.passwordValidator(req.body.password))
        res.status(400)
            .json({
            error: 'Password not valid! must be more than 7 characters...',
            password: req.body.password
        });
    else
        user_1.default.create({
            email: req.body.email,
            password: req.body.password,
            rememberMe: false,
            isAdmin: false
        })
            .then((user) => res.status(201).json({ addedUser: user, success: true }))
            .catch(e => res.status(400)
            .json({
            error: 'email address already exists',
            errorObject: e,
            in: 'authRegisterPost/User.create'
        }));
}));
//# sourceMappingURL=authRegisterPost.js.map