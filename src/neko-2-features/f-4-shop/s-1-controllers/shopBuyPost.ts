import {Request, Response, Router} from "express";
// import Product, {IProduct} from "../s-2-models/product";

export const shopBuyPost = (path: string, shop: Router) =>

    shop.post(path, async (req: Request, res: Response) => {
        res.status(200).json({answer: 'Your order is accepted. Please wait while the operator calls.'});

        // if (!req.body.product) res.status(400).json({error: `No product in body!`});
        //
        // else if (!req.body.product.productName || (req.body.product.productName + '').length < 6)
        //     res.status(400)
        //         .json({
        //             error: `Product name [${req.body.product.productName}] not valid! must be more than 5 characters...`,
        //             productName: req.body.product.productName
        //         });
        //
        // else if (!Number(req.body.product.price) || Number(req.body.product.price) <= 0)
        //     res.status(400)
        //         .json({
        //             error: `Product price [${req.body.product.price}] not valid! must be more than 0...`,
        //             price: req.body.product.price
        //         });
        //
        // else Product.create(
        //         {
        //             productName: req.body.product.productName,
        //             price: +req.body.product.price,
        //             productType: req.body.product.productType
        //         }
        //     )
        //         .then((product: IProduct) => res.status(201).json({addedProduct: product, success: true}))
        //
        //         .catch(e => res.status(400)
        //             .json({error: 'some error', errorObject: e, in: 'shopPost/Product.create'}));

    });