"use strict";
const PRODUCT_NAME_UP = 'PRODUCT_NAME_UP';
const PRODUCT_NAME_DOWN = 'PRODUCT_NAME_DOWN';
const PRICE_UP = 'PRICE_UP';
const PRICE_DOWN = 'PRICE_DOWN';
// @ts-ignore
const shopStore = {
    products: [
        {
            id: '0.2342353626',
            productName: 'car1',
            price: 3000,
        },
        {
            id: '0.2342353627',
            productName: 'car2',
            price: 1000,
        },
        {
            id: '0.2342353628',
            productName: 'car3',
            price: 5000,
        },
    ],
    getProducts(productName, min, max, sortProducts, page, pageCount) {
        const productTotalCount = this.products.length;
        const minPrice = Math.min(...this.products.map(p => p.price));
        const maxPrice = Math.max(...this.products.map(p => p.price));
        let someProducts = this.products;
        if (productName)
            someProducts = someProducts.filter(p => p.productName.indexOf(productName) > -1);
        if (min)
            someProducts = someProducts.filter(p => p.price >= min && p.price <= max);
        if (sortProducts) {
            switch (sortProducts) {
                case PRODUCT_NAME_UP:
                    someProducts = someProducts.sort((a, b) => a.productName > b.productName
                        ? 1 : a.productName < b.productName ? -1 : 0);
                    break;
                case PRODUCT_NAME_DOWN:
                    someProducts = someProducts.sort((a, b) => a.productName > b.productName
                        ? -1 : a.productName < b.productName ? 1 : 0);
                    break;
                case PRICE_UP:
                    someProducts = someProducts.sort((a, b) => a.price - b.price);
                    break;
                case PRICE_DOWN:
                    someProducts = someProducts.sort((a, b) => b.price - a.price);
                    break;
            }
        }
        if (page && pageCount) {
            if (pageCount * (page - 1) < productTotalCount)
                someProducts = someProducts.slice(pageCount * (page - 1), pageCount * page);
        }
        else
            someProducts = someProducts.slice(0, pageCount || 7);
        return {
            products: someProducts,
            minPrice,
            maxPrice,
            productTotalCount,
            page,
            pageCount,
        };
    },
    addProduct(product) {
        const newProduct = Object.assign(Object.assign({}, product), { id: Math.random().toString() });
        this.products.push(newProduct);
        return { newProduct: newProduct };
    },
    deleteProduct(id) {
        const product = this.products.find(p => p.id === id);
        this.products = this.products.filter(p => p.id !== id);
        return { deletedProduct: product };
    },
    updateProduct(product) {
        const selectedProduct = this.products.find(p => p.id === product.id);
        this.products = this.products.map(p => p.id === product.id ? product : p);
        return { updatedProduct: product };
    },
};
module.exports = shopStore;
//# sourceMappingURL=shopFake.js.map