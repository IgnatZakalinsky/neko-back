import {Request, Response, Router} from "express";
import Product, {IProduct} from "../s-2-models/product";

export const shopRatingPut = (path: string, shop: Router) =>

    shop.put(path, async (req: Request, res: Response) => {
        if (!req.body.product) res.status(400).json({error: `No product in body!`});

        else if (!req.body.product.id)
            res.status(400).json({error: `No product id`, id: req.body.product.id});
        else if (
            !req.body.product.rating
            || Number(req.body.product.rating)
            || Number(req.body.product.rating) < 0
            || Number(req.body.product.rating) > 5

        )
            res.status(400).json(
                {error: `Not valid product rating, must be between 0 and 5...`, rating: req.body.product.rating}
            );

        else Product.findById(req.body.product.id)
                .exec()
                .then((product: IProduct | null) => {
                    if (!product) res.status(400).json({error: `no product with id=${req.body.product.id}`});

                    else Product.findByIdAndUpdate(
                        req.body.product.id,
                        {
                            productName: req.body.product.productName,
                            price: +req.body.product.price,
                            productType: req.body.product.productType,
                            rating: ((product.rating * 6) + req.body.product.rating) / 7,
                        },
                        {new: true}
                    )
                        .exec()
                        .then((product: IProduct | null) => {
                            if (!product) res.status(400)
                                .json({error: `Product id not valid`, id: req.body.product.id});

                            else res.status(200).json({updatedProduct: product, success: true})
                        })
                        .catch(e => res.status(400)
                            .json({
                                error: 'some error',
                                errorObject: e,
                                in: 'shopRatingPut/Product.findByIdAndUpdate'
                            }));
                })
                .catch(e => res.status(400)
                    .json({error: 'some error', errorObject: e, in: 'shopRatingPut/Product.findById'}));
    });