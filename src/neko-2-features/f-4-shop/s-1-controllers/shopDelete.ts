import {Request, Response, Router} from "express";
import Product, {IProduct} from "../s-2-models/product";

export const shopDelete = (path: string, shop: Router) =>

    shop.delete(path, async (req: Request, res: Response) => {
        if (!req.query.id)
            res.status(400).json({error: `No product id`, id: req.query.id});

        else Product.findByIdAndDelete(req.query.id)
                .exec()
                .then((product: IProduct | null) => {
                    if (!product) res.status(400).json({error: `Product id not valid`, id: req.query.id});

                    else res.status(200).json({deletedProduct: product, success: true})
                })

                .catch(e => res.status(400)
                    .json({error: 'some error', errorObject: e, in: 'shopPost/Product.create'}));
    });