"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authGet_1 = require("./a-1-controllers/authGet");
const authLoginPost_1 = require("./a-1-controllers/authLoginPost");
const authRegisterPost_1 = require("./a-1-controllers/authRegisterPost");
const authForgotPost_1 = require("./a-1-controllers/authForgotPost");
const authMePost_1 = require("./a-1-controllers/authMePost");
const auth = express_1.default.Router();
authGet_1.authGet('/', auth); // for dev
authLoginPost_1.authLoginPost('/login', auth);
authRegisterPost_1.authRegisterPost('/register', auth);
authForgotPost_1.authForgotPost('/forgot', auth);
authMePost_1.authMePost('/me', auth);
exports.default = auth;
//# sourceMappingURL=index.js.map