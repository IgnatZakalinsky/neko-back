"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersGet_1 = require("./usersGet");
const users = express_1.default.Router();
usersGet_1.usersGet('/', users);
exports.default = users;
//# sourceMappingURL=index.js.map