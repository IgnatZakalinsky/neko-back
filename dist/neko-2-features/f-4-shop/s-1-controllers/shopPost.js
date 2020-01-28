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
const product_1 = __importDefault(require("../s-2-models/product"));
exports.shopPost = (path, shop) => shop.get(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.productName || (req.body.productName + '').length < 6)
        res.status(400)
            .json({
            error: `Product name [${req.body.productName}] not valid! must be more than 5 characters...`,
            productName: req.body.productName
        });
    else if (!Number(req.body.price) || Number(req.body.price) <= 0)
        res.status(400)
            .json({
            error: `Product price [${req.body.price}] not valid! must be more than 0...`,
            price: req.body.price
        });
    product_1.default.create({ productName: req.body.productName, price: +req.body.price })
        .then((product) => res.status(201).json({ addedProduct: product, success: true }))
        .catch(e => res.status(400)
        .json({ error: 'some error', errorObject: e, in: 'shopPost/Product.create' }));
}));
//# sourceMappingURL=shopPost.js.map