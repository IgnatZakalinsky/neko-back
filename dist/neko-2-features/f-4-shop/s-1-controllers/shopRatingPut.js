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
exports.shopRatingPut = (path, shop) => shop.put(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.product)
        res.status(400).json({ error: `No product in body!` });
    else if (!req.body.product.id)
        res.status(400).json({ error: `No product id`, id: req.body.product.id });
    else if (!req.body.product.rating
        || Number(req.body.product.rating)
        || Number(req.body.product.rating) < 0
        || Number(req.body.product.rating) > 5)
        res.status(400).json({ error: `Not valid product rating, must be between 0 and 5...`, rating: req.body.product.rating });
    else
        product_1.default.findById(req.body.product.id)
            .exec()
            .then((product) => {
            if (!product)
                res.status(400).json({ error: `no product with id=${req.body.product.id}` });
            else
                product_1.default.findByIdAndUpdate(req.body.product.id, {
                    productName: req.body.product.productName,
                    price: +req.body.product.price,
                    productType: req.body.product.productType,
                    rating: ((product.rating * 6) + req.body.product.rating) / 7,
                }, { new: true })
                    .exec()
                    .then((product) => {
                    if (!product)
                        res.status(400)
                            .json({ error: `Product id not valid`, id: req.body.product.id });
                    else
                        res.status(200).json({ updatedProduct: product, success: true });
                })
                    .catch(e => res.status(400)
                    .json({
                    error: 'some error',
                    errorObject: e,
                    in: 'shopRatingPut/Product.findByIdAndUpdate'
                }));
        })
            .catch(e => res.status(400)
            .json({ error: 'some error', errorObject: e, in: 'shopRatingPut/Product.findById' }));
}));
//# sourceMappingURL=shopRatingPut.js.map