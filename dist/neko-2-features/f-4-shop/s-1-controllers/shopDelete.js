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
exports.shopDelete = (path, shop) => shop.delete(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.id)
        res.status(400).json({ error: `No product id`, id: req.query.id });
    else
        product_1.default.findByIdAndDelete(req.query.id)
            .exec()
            .then((product) => {
            if (!product)
                res.status(400).json({ error: `Product id not valid`, id: req.query.id });
            else
                res.status(200).json({ deletedProduct: product, success: true });
        })
            .catch(e => res.status(400)
            .json({ error: 'some error', errorObject: e, in: 'shopPost/Product.create' }));
}));
//# sourceMappingURL=shopDelete.js.map