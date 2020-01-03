// const {addUserMongo, getUsersMongo, deleteUsersMongo, getUsersMongoById, updateUsersMongo} = require("./mongoRep");
// let {getUsers, addUser} = require('./rep.js');

// @ts-ignore
const express = require('express');
// @ts-ignore
const shopStore = require('./../bd/shopFake');
// @ts-ignore
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req: any, res: any, next: any) {
    console.log('Time: ', Date.now(), shopStore);
    next();
});
router.get('/', async (req: any, res: any) => {
    const products = shopStore.getProducts(
        req.query.productName,
        Number(req.query.min),
        Number(req.query.max),
        req.query.sortProducts,
        Number(req.query.page),
        Number(req.query.pageCount)
    );

    if (products) res.send(JSON.stringify(products));
    else res.send(404);
});
router.post('/', async (req: any, res: any) => {
    const product = shopStore.addProduct(req.body.product);

    if (product) res.send(JSON.stringify(product));
    else res.send(404);
});
router.delete('/', async (req: any, res: any) => {
    const product = shopStore.deleteProduct(req.query.id);

    if (product) res.send(JSON.stringify(product));
    else res.send(404);
});
router.put('/', async (req: any, res: any) => {
    const product = shopStore.updateProduct(req.body.product);

    if (product) res.send(JSON.stringify(product));
    else res.send(404);
});

module.exports = router;
