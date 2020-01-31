import {Request, Response, Router} from "express";
import Product, {IProduct} from "../s-2-models/product";

export const shopGet = (path: string, shop: Router) =>

    shop.get(path, async (req: Request, res: Response) => {
        let page = +req.query.page || 1;
        const pageCount = +req.query.pageCount || 7;

        // await Product.create({productName: 'fakeProduct', price: 2000}); // seed

        Product.count({}).exec().then(productTotalCount => {
            if (pageCount * (page - 1) > productTotalCount) page = 1;

            // sortProducts

            Product.findOne().sort({price: 1}).exec()
                .then((productMin: IProduct | null) => {
                    const min = productMin ? productMin.price : 1000;

                    Product.findOne().sort({price: -1}).exec()
                        .then((productMax: IProduct | null) => {
                            const max = productMax ? productMax.price : min;

                            Product.find({productName: new RegExp(req.query.productName)})
                                .skip(pageCount * (page - 1))
                                .limit(pageCount)
                                .lean()
                                .exec()
                                .then(products =>
                                    res.status(200)
                                        .json({
                                            products: products.map(p => ({...p, id: p._id})),
                                            page, pageCount, productTotalCount,
                                            minPrice: min, maxPrice: max,
                                        }))

                                .catch(e => res.status(500)
                                    .json({error: 'some error', errorObject: e, in: 'shopGet/Product.find'}))
                        })
                        .catch(e => res.status(500)
                            .json({error: 'some error', errorObject: e, in: 'shopGet/Product.findOne/max'}));
                })
                .catch(e => res.status(500)
                    .json({error: 'some error', errorObject: e, in: 'shopGet/Product.findOne/min'}));


        })
            .catch(e => res.status(500)
                .json({error: 'some error', errorObject: e, in: 'shopGet/Product.count'}))

    });

// Имя Описание
// $eq Соответствует значениям, которые равны указанному значению.
// $gt Соответствует значениям, которые больше указанного значения.
// $gte Соответствует значениям, которые больше или равны указанному значению.
// $in Соответствует любому из значений, указанных в массиве.
// $lt Соответствует значениям, которые меньше указанного значения.
// $lte Соответствует значениям, которые меньше или равны указанному значению.
// $ne Соответствует всем значениям, которые не равны указанному значению.
// $nin Не соответствует ни одному из значений, указанных в массиве.

// $and Объединяет предложения запроса с логическим И возвращает все документы, которые соответствуют условиям обоих предложений.
// $not Инвертирует эффект выражения запроса и возвращает документы, которые не соответствуют выражению запроса.
// $nor Объединяет предложения запроса с логическим NOR и возвращает все документы, которые не соответствуют обоим предложениям.
// $or Объединяет предложения запроса с логическим ИЛИ возвращает все документы, которые соответствуют условиям любого из предложений.

// $exists Соответствует документам с указанным полем.
// $type Выбирает документы, если поле имеет указанный тип.

// $expr Позволяет использовать выражения агрегации на языке запросов.
// $jsonSchema Проверять документы на соответствие данной JSON-схеме.
// $mod Выполняет операцию по модулю над значением поля и выбирает документы с указанным результатом.
// $regex Выбирает документы, значения которых соответствуют заданному регулярному выражению.
// $text Выполняет текстовый поиск.
// $where Соответствует документам, которые удовлетворяют выражению JavaScript.