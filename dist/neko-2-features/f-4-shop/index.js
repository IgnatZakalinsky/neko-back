"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shopGet_1 = require("./s-1-controllers/shopGet");
const shop = express_1.default.Router();
shopGet_1.shopGet('/', shop);
exports.default = shop;
//# sourceMappingURL=index.js.map