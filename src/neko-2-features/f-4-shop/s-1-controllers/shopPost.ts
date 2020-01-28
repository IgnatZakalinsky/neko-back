import {Request, Response, Router} from "express";
import Product, {IProduct} from "../s-2-models/product";

export const shopPost = (path: string, shop: Router) =>

    shop.get(path, async (req: Request, res: Response) => {

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

        Product.create({productName: req.body.productName, price: +req.body.price})
            .then((product: IProduct) => res.status(201).json({addedProduct: product, success: true}))

            .catch(e => res.status(400)
                .json({error: 'some error', errorObject: e, in: 'shopPost/Product.create'}));

    });